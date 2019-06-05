CREATE TABLE reviews (
    reviews_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    ratings integer NOT NULL,
    reviews text NOT NULL,
    users_id INTEGER REFERENCES users(users_id) ON DELETE CASCADE NOT NULL,
    products_id INTEGER REFERENCES products(id) ON DELETE CASCADE NOT NULL
);