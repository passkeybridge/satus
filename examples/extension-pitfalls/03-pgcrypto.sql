-- pgcrypto: the column is bytea, so random bytes are accepted. The failure
-- lands later, in the application, on the first decrypt or hash lookup.
--
-- Run against a database with pgcrypto installed:
--   psql -f 03-pgcrypto.sql
--
-- Managed Postgres (Supabase and similar) often installs pgcrypto into an
-- `extensions` schema rather than `public`. If pgp_sym_encrypt "does not
-- exist", add it to the search path first:
--   SET search_path = public, extensions;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS customer_record;
CREATE TABLE customer_record (
  id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email        text   NOT NULL,
  -- digest(email, 'sha256') in production. Type-wise: just 32 bytes.
  email_sha256 bytea  NOT NULL,
  -- pgp_sym_encrypt(tax_id, key) in production. Type-wise: just bytea.
  tax_id_enc   bytea  NOT NULL
);

-- Stand-in for the application key. In a real test environment this comes
-- from the same secret store the app reads, never from a literal.
\set enc_key 'test-environment-key'

-- ---------------------------------------------------------------------------
-- FAILURE: random bytes. Every insert succeeds. Nothing warns you.
-- ---------------------------------------------------------------------------
INSERT INTO customer_record (email, email_sha256, tax_id_enc)
SELECT 'user' || g || '@example.test',
       gen_random_bytes(32),
       gen_random_bytes(96)
FROM generate_series(1, 10) AS g;

SELECT count(*) AS junk_rows_accepted FROM customer_record;

-- ... and then the application tries to read one.
DO $$
DECLARE v text;
BEGIN
  SELECT pgp_sym_decrypt(tax_id_enc, 'test-environment-key')
    INTO v FROM customer_record LIMIT 1;
  RAISE NOTICE 'DECRYPT: unexpectedly succeeded (%)', v;
EXCEPTION WHEN others THEN
  RAISE NOTICE 'DECRYPT of random bytes: %', SQLERRM;
END $$;

-- Hash lookup by a known plaintext returns nothing, forever.
SELECT count(*) AS rows_found_by_email_hash
FROM customer_record
WHERE email_sha256 = digest('user1@example.test', 'sha256');

-- ---------------------------------------------------------------------------
-- CORRECT SEED: generate the plaintext, then let the extension produce the
-- stored value. Ciphertext is created inside the INSERT, not offline.
-- ---------------------------------------------------------------------------
TRUNCATE customer_record;

INSERT INTO customer_record (email, email_sha256, tax_id_enc)
SELECT email,
       digest(email, 'sha256'),
       pgp_sym_encrypt(tax_id, 'test-environment-key')
FROM (
  SELECT 'user' || g || '@example.test' AS email,
         lpad(g::text, 9, '0')          AS tax_id
  FROM generate_series(1, 10) AS g
) AS src;

-- Decrypt round-trips.
SELECT id, email, pgp_sym_decrypt(tax_id_enc, 'test-environment-key') AS tax_id
FROM customer_record
ORDER BY id
LIMIT 3;

-- Hash lookup by known plaintext resolves.
SELECT count(*) AS rows_found_by_email_hash
FROM customer_record
WHERE email_sha256 = digest('user1@example.test', 'sha256');

-- ---------------------------------------------------------------------------
-- Password hashing has the same shape: crypt() output, not random bytes,
-- otherwise no login in the seeded environment ever succeeds.
-- ---------------------------------------------------------------------------
DROP TABLE IF EXISTS app_user;
CREATE TABLE app_user (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email         text NOT NULL UNIQUE,
  password_hash text NOT NULL
);

INSERT INTO app_user (email, password_hash)
SELECT 'user' || g || '@example.test',
       crypt('correct horse battery staple', gen_salt('bf'))
FROM generate_series(1, 5) AS g;

SELECT email,
       password_hash = crypt('correct horse battery staple', password_hash)
         AS login_succeeds,
       password_hash = crypt('wrong password', password_hash)
         AS wrong_password_succeeds
FROM app_user
ORDER BY email
LIMIT 3;
