DROP DATABASE IF EXISTS Bamazon;
CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name,price,stock_quantity)
VALUES ("Batman Returns","ENTERTAINMENT",30,200),
    ("Call of Duty","ENTERTAINMENT",50,100),
    ("Organic Whole Milk","GROCERY",50,50),
    ("Yeezy Boost","CLOTHING",250,15),
    ("White T-Shirts","CLOTHING",10,300),
    ("Ski Gloves","SPORTS & OUTDOORS",40,50),
    ("Ready Player One","ENTERTAINMENT",30,70),
    ("Crazy Rich Asians","ENTERTAINMENT",30,50),
    ("Chutes and Ladders","ENTERTAINMENT",30,35),
    ("Risk","ENTERTAINMENT", 80,23);