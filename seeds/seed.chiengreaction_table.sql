BEGIN;

INSERT INTO products (id, title, description)
VALUES
(1, 'Charizard', 'Pokemon!'),
(2, 'Snorlax', 'Pokemon!'),
(3, 'Jigglypuff', 'Pokemon!');

INSERT INTO users (users_id, username, password)
VALUES
(1, 'Luis', 'Luis123'),
(2, 'Luis1', 'Luis1234'),
(3, 'Luis2', 'Luis12345');

COMMIT;