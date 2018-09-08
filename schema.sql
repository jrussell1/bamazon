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

CREATE TABLE Departments(
    DepartmentID MEDIUMINT AUTO_INCREMENT NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    OverHeadCosts DECIMAL(10,2) NOT NULL,
    TotalSales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(DepartmentID));



