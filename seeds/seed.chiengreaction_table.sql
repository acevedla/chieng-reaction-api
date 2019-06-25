BEGIN;

INSERT INTO products (title, description, images)
VALUES
('Charizard', 'Pokemon!', 'IMG_1935.jpg'),
('Snorlax', 'Pokemon!', 'IMG_1936.jpg'),
('Jigglypuff', 'Pokemon!', 'IMG_1938.jpg'),
('Squirtle', 'Pokemon!', 'IMG_1939.jpg');

COMMIT;