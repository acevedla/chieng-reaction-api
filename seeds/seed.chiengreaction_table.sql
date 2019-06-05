BEGIN;

INSERT INTO products (id, title, description, images)
VALUES
(1, 'Charizard', 'Pokemon!', './images/IMG_1935.jpg'),
(2, 'Snorlax', 'Pokemon!', './images/IMG_1936.jpg'),
(3, 'Jigglypuff', 'Pokemon!', './images/IMG_1937.jpg');

INSERT INTO users (users_id, username, password, admin)
VALUES
(1, 'Luis', 'Luis123', 1),
(2, 'Luis1', 'Luis1234', 2),
(3, 'Luis2', 'Luis12345', 2);

INSERT INTO reviews (reviews_id, ratings, reviews, users_id, products_id)
VALUES
(1, 4, 'This is so great', 1, 1),
(2, 5, 'This is the best', 2, 2),
(3, 3, 'HEYOOO', 2, 2 ),
(4, 3, 'This is ok', 2, 3);

COMMIT;