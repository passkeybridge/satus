-- PostGIS: why "any bytes" is not a geometry.
--
-- Run against a database with PostGIS installed:
--   psql -f 01-postgis.sql
--
-- Each failure case is wrapped in a DO block that catches the error and
-- prints it, so the whole script runs top to bottom and you can read the
-- exact server messages instead of stopping at the first one.

CREATE EXTENSION IF NOT EXISTS postgis;

DROP TABLE IF EXISTS sensor_reading;
CREATE TABLE sensor_reading (
  id       bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label    text NOT NULL,
  -- Typmod pins BOTH the geometry subtype and the SRID.
  location geometry(Point, 4326) NOT NULL
);

-- ---------------------------------------------------------------------------
-- FAILURE 1: random bytea passed where EWKB is expected.
-- A generic seeder that dispatches on "it's binary-ish" produces this.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  INSERT INTO sensor_reading (label, location)
  VALUES ('random-bytes', '\x0102030405060708'::bytea::geometry);
  RAISE NOTICE 'FAILURE 1: unexpectedly succeeded';
EXCEPTION WHEN others THEN
  RAISE NOTICE 'FAILURE 1 (random bytea): %', SQLERRM;
END $$;

-- ---------------------------------------------------------------------------
-- FAILURE 2: right extension, wrong geometry subtype.
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  INSERT INTO sensor_reading (label, location)
  VALUES ('wrong-subtype',
          ST_GeomFromEWKT('SRID=4326;LINESTRING(-73.98 40.75, -73.97 40.76)'));
  RAISE NOTICE 'FAILURE 2: unexpectedly succeeded';
EXCEPTION WHEN others THEN
  RAISE NOTICE 'FAILURE 2 (wrong subtype): %', SQLERRM;
END $$;

-- ---------------------------------------------------------------------------
-- FAILURE 3: right subtype, wrong SRID (web-mercator point into a 4326 column).
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  INSERT INTO sensor_reading (label, location)
  VALUES ('wrong-srid',
          ST_GeomFromEWKT('SRID=3857;POINT(-8235000 4975000)'));
  RAISE NOTICE 'FAILURE 3: unexpectedly succeeded';
EXCEPTION WHEN others THEN
  RAISE NOTICE 'FAILURE 3 (wrong SRID): %', SQLERRM;
END $$;

-- ---------------------------------------------------------------------------
-- FAILURE 4: the quiet one. A self-intersecting polygon parses and stores
-- fine; only ST_IsValid (and every operator that assumes validity) objects.
-- ---------------------------------------------------------------------------
DROP TABLE IF EXISTS service_area;
CREATE TABLE service_area (
  id      bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label   text NOT NULL,
  polygon geometry(Polygon, 4326) NOT NULL
);

INSERT INTO service_area (label, polygon) VALUES
  -- Bowtie: ring closes, edges cross. Accepted by the type system.
  ('bowtie',
   ST_GeomFromEWKT('SRID=4326;POLYGON((0 0, 1 1, 1 0, 0 1, 0 0))')),
  -- Well-formed square.
  ('square',
   ST_GeomFromEWKT('SRID=4326;POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))'));

SELECT label,
       ST_IsValid(polygon)       AS is_valid,
       ST_IsValidReason(polygon) AS reason,
       ST_Area(polygon)          AS area
FROM service_area
ORDER BY label;

-- ---------------------------------------------------------------------------
-- CORRECT SEED: EWKT with the column's exact subtype and SRID, validity
-- asserted before the rows are trusted.
-- ---------------------------------------------------------------------------
INSERT INTO sensor_reading (label, location)
SELECT 'sensor-' || g,
       ST_SetSRID(ST_MakePoint(-73.99 + random() * 0.05,
                                40.72 + random() * 0.05), 4326)
FROM generate_series(1, 25) AS g;

SELECT count(*)                                    AS rows_seeded,
       bool_and(ST_SRID(location) = 4326)          AS srid_ok,
       bool_and(GeometryType(location) = 'POINT')  AS subtype_ok
FROM sensor_reading;
