// Initializes the npm
var mysql = require("mysql");
var inquirer = require("inquirer");
var figlet = require('figlet');
var clc = require('cli-color');
require("console.table");


// Initializes the connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  // Your password
  password: "************ENTER PASSWORD*********************",
  database: "Bamazon"
});


figlet("Welcome to Bamazon!", function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data)

});

// Creates the connection with the server
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

// Function to load the products table from the database 
function loadProducts() {
  // Selects all of the data from the MySQL
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    // Then prompt the customer for their choice of product
    promptCustomerForItem(res);
  });
}

function promptCustomerForItem(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: tableColor("What is the ID of the item you would you like to purchase? [Quit with Q]"),
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      // If there is a product with the id the user chose, prompt the customer for a desired quantity
      if (product) {
        // Pass the chosen product to promptCustomerForQuantity
        promptCustomerForQuantity(product);
      }
      else {
        // Otherwise let them know the item is not in the inventory, re-run loadProducts
        console.log("\nThat item is not in the inventory.");
        loadProducts();
      }
    });
}

// Prompt the customer for a product quantity
function promptCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      // Check if the user wants to quit the program
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);

      // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        loadProducts();
      }
      else {
        // Otherwise run makePurchase, give it the product information and desired quantity to purchase
        makePurchase(product, quantity);
      }
    });
}

// Purchase the desired quantity of the desired item
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      // Let the user know the purchase was successful, re-run loadProducts
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      loadProducts();
    }
  );
}

// Check to see if the product the user chose exists in the inventory
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}

// Check to see if the user wants to quit the program
function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    // Log a message and exit the current node process
    console.log("Goodbye!");
    process.exit(0);
  }
}
