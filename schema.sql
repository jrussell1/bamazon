CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
    ItemID MEDIUMINT AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT(10) NOT NULL,
    primary key(ItemID)
);

select * from Products;

INSERT INTO Products(ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Batman Returns","ENTERTAINMENT",29.99,200),
    ("Call of Duty","ENTERTAINMENT",49.99,100),
    ("Organic Whole Milk","GROCERY",24.50,50),
    ("Yeezy Boost","CLOTHING",249.99,15),
    ("White T-Shirts","CLOTHING",4.99,300),
    ("Ski Gloves","SPORTS & OUTDOORS",39.99,50),
    ("Ready Player One","ENTERTAINMENT",25.00,70),
    ("Crazy Rich Asians","ENTERTAINMENT",30.40,50),
    ("Chutes and Ladders","ENTERTAINMENT",30.50,35),
    ("Risk","ENTERTAINMENT", 75.00,23);

CREATE TABLE Departments(
    DepartmentID MEDIUMINT AUTO_INCREMENT NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    OverHeadCosts DECIMAL(10,2) NOT NULL,
    TotalSales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(DepartmentID));



