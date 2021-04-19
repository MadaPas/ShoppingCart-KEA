INSERT INTO brands (name, description) VALUES
('H&M', 'It is Swedish'),
('Zara', 'It is Spanish');

INSERT INTO products (brand_id, name, price, rating, description) VALUES
((SELECT id FROM brands WHERE title='H&M'), '', , , ''),
((SELECT id FROM brands WHERE title='Zara'), '', , , '');

INSERT INTO users (first_name, last_name, password, date_joined, last_active) VALUES
('', '', '', '', TIMESTAMP('2020-05-27 15:30'), TIMESTAMP('2020-05-27 15:30'), ''),
('', '', '', '', TIMESTAMP('2020-05-27 15:45'),TIMESTAMP('2020-05-27 18:30'), '');

INSERT INTO carts (user_id, time_stamp) VALUES
(, TIMESTAMP('2020-06-24 18:30')),
(, TIMESTAMP('2020-06-26 15:45'));

INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
(, , ,),
(, , ,);

INSERT INTO orders (user_id, cart_id, card_type, card_number, card_holder, timestamp, amount float) VALUES
(, , '', , '', ,),
(, , '', , '', ,);


INSERT INTO favourite_products (product_id, user_id) VALUES
(, ),
(, );
