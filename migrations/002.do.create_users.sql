CREATE TABLE users (
    users_id SERIAL PRIMARY KEY,
    username text NOT NULL,
    password text NOT NULL,
    admin INTEGER,
    date_created TIMESTAMP NOT NULL DEFAULT now(),
    date_modified TIMESTAMP 
);