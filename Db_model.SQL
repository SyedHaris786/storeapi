CREATE TABLE products(
    product_id BIGSERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    category VARCHAR(50),
    price INT NOT NULL,
    product_description VARCHAR(254) NOT NULL
);

CREATE TABLE users(
user_id BIGSERIAL PRIMARY KEY NOT NULL,
username VARCHAR(50) NOT NULL,
email VARCHAR(200) NOT NULL UNIQUE,
password VARCHAR(50) NOT NULL,
address TEXT NOT NULL,
AGE INT NOT NULL,
phone_number INT 
);

CREATE TABLE orders (
    order_id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id BIGSERIAL NOT NULL,
    product_id BIGSERIAL references products (product_id),
    delivered VARCHAR(1) NOT NULL,
    address TEXT NOT NULL,
    quantity INT NOT NULL
);


ALTER TABLE users ALTER COLUMN phone_number TYPE VARCHAR(12);
ALTER TABLE users ADD CONSTRAINT phone_number CHECK ( phone_number ~ $$^(\+92|0|92)[0-9]{10}$$);

ALTER TABLE products ALTER COLUMN price TYPE FLOAT;

ALTER TABLE products ADD COLUMN stock_qty BIGINT NOT NULL;
