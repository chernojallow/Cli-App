DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45),
department_name VARCHAR(50),
price DECIMAL(10,2),
stock_quantity INT(30) NOT NULL,
PRIMARY KEY (item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Polo Shirt","Clothing", $40, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Air Jordan", "Shoes", $100, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dining table","Furniture", $70, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung Tv", "Electronics", $80, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iphone 10", "Electronics", $500, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV Stand", "Furniture ", $150, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spare Tire", "Auto", $30, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NyQuil", "Health And Beauty", $50, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dove ", "Health And Beauty", $10, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Milk", "Food", %15, 50);