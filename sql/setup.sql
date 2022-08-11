-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users;
DROP TABLE IF EXISTS gits;

CREATE TABLE github_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    username VARCHAR NOT NULL,
    email VARCHAR,
    avatar VARCHAR
);

CREATE TABLE gits (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    git VARCHAR
)