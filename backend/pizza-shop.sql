\echo 'Delete and recreate pizza-shop db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE pizza_shop;
CREATE DATABASE pizza_shop;
\connect pizza_shop

\i pizza-shop-schema.sql
-- \i student-store-seed.sql
