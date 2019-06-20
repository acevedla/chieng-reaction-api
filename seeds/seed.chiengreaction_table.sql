BEGIN;

INSERT INTO products (id, title, description, images)
VALUES
(1, 'Charizard', 'Pokemon!', '../images/IMG_1935.jpg'),
(2, 'Snorlax', 'Pokemon!', '../images/IMG_1936.jpg'),
(3, 'Jigglypuff', 'Pokemon!', '../images/IMG_1937.jpg');

COMMIT;