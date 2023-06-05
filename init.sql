-- Connect to the volcanoes database
\c volcanoes;

-- Wait for the database to be fully initialized
SELECT pg_sleep(5);

-- Create the VolcanoActivity type
CREATE TYPE volcano_activity AS (
  VEI INT,
  type VARCHAR(255),
  start_date DATE,
  end_date DATE
);

-- Create the necessary tables
CREATE TABLE volcanoes (
  id SERIAL PRIMARY KEY,
  number INT,
  name VARCHAR(255),
  type VARCHAR(255),
  location VARCHAR(255),
  elevation INT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  activities volcano_activity[]
);
