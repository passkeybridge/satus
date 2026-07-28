-- pgvector: dimension is part of the type, and "valid" depends on intent.
--
-- Run against a database with pgvector installed:
--   psql -f 02-pgvector.sql

CREATE EXTENSION IF NOT EXISTS vector;

DROP TABLE IF EXISTS document_embedding;
CREATE TABLE document_embedding (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  body      text NOT NULL,
  -- Dimension is declared here and enforced on every insert.
  embedding vector(1536) NOT NULL
);

-- ---------------------------------------------------------------------------
-- FAILURE 1: wrong dimension. The classic "our seeder used 384 because the
-- example in the README used 384" bug. Hard error, every row.
-- ---------------------------------------------------------------------------
DO $$
DECLARE v vector;
BEGIN
  SELECT array(SELECT random() FROM generate_series(1, 384))::vector INTO v;
  INSERT INTO document_embedding (body, embedding) VALUES ('wrong-dim', v);
  RAISE NOTICE 'FAILURE 1: unexpectedly succeeded';
EXCEPTION WHEN others THEN
  RAISE NOTICE 'FAILURE 1 (wrong dimension): %', SQLERRM;
END $$;

-- ---------------------------------------------------------------------------
-- FAILURE 2: the zero vector. Inserts fine. Cosine distance is undefined for
-- it, so `<=>` yields NaN and your ORDER BY silently stops meaning anything.
-- ---------------------------------------------------------------------------
SELECT '[0,0,0]'::vector <=> '[1,2,3]'::vector AS cosine_distance_from_zero,
       '[0,0,0]'::vector <-> '[1,2,3]'::vector AS l2_distance_from_zero;

-- ---------------------------------------------------------------------------
-- Helper: random unit vector of a given dimension, never the zero vector.
-- Adequate for "rows exist and the index builds" seeds. NOT adequate for
-- testing search quality (see the note at the bottom).
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION random_unit_vector(dim int)
RETURNS vector
LANGUAGE plpgsql
AS $$
DECLARE
  a    double precision[];
  norm double precision;
BEGIN
  a := array(SELECT random() * 2 - 1 FROM generate_series(1, dim));
  SELECT sqrt(sum(x * x)) INTO norm FROM unnest(a) AS x;
  IF norm = 0 THEN
    -- Astronomically unlikely, but a zero vector poisons cosine distance.
    a[1] := 1;
    norm := 1;
  END IF;
  RETURN (SELECT array_agg(x / norm ORDER BY i)
          FROM unnest(a) WITH ORDINALITY AS t(x, i))::vector;
END $$;

-- ---------------------------------------------------------------------------
-- CORRECT SEED (structural): right dimension, no zero vectors, index builds.
-- ---------------------------------------------------------------------------
INSERT INTO document_embedding (body, embedding)
SELECT 'document ' || g, random_unit_vector(1536)
FROM generate_series(1, 200) AS g;

CREATE INDEX document_embedding_hnsw
  ON document_embedding USING hnsw (embedding vector_cosine_ops);

SELECT count(*)                                AS rows_seeded,
       bool_and(vector_dims(embedding) = 1536) AS dims_ok,
       -- Cosine distance to a fixed non-zero probe is NaN only for zero vectors.
       bool_and(NOT isnan((embedding <=> array_fill(1.0::real, ARRAY[1536])::vector)::float8))
         AS no_zero_vectors
FROM document_embedding;

-- Nearest-neighbour query: returns rows, and the distances are near-identical.
-- That is the point. Random high-dimensional points are all roughly equidistant,
-- so recall measured against this seed is noise. If the test is "does search
-- work", embed a real corpus with the model production uses and seed that.
SELECT id, round((embedding <=> (SELECT embedding FROM document_embedding
                                 WHERE id = 1))::numeric, 4) AS cosine_distance
FROM document_embedding
WHERE id <> 1
ORDER BY embedding <=> (SELECT embedding FROM document_embedding WHERE id = 1)
LIMIT 5;
