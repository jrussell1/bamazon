//require
var mysql = require('mysql');
var inquirer = require('inquirer');
var figlet = require('figlet');
var clc = require('cli-color');
//global variables for color
var tableColor = clc.red.bold;
//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Raymondweil1",
  database: "Bamazon"
})

figlet("Welcome to Bamazon!", function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)

});

function start(){
//prints the items for sale and their details

connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;

  console.log('-----------------------------------------------------------------------------------------------------')

  for(var i = 0; i<res.length;i++){
    console.log(tableColor("ID: ") + tableColor(res[i].ItemID) + tableColor(" | ") + tableColor("Product: ") + tableColor(res[i].ProductName) + tableColor(" | ") + tableColor("Department: ") + tableColor(res[i].DepartmentName) + tableColor(" | ") + tableColor("Price: ") + tableColor(res[i].Price) + tableColor(" | ") + tableColor("QTY: ") + tableColor(res[i].StockQuantity));
    console.log('-----------------------------------------------------------------------------------------------------')
  }

  console.log(' ');
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the ID of the product you want purchase?",
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
          return true;
        } else{
          return false;
        }
      }
    },
    {
      type: "input",
      name: "qty",
      message: "How many do you want?",
      validate: function(value){
        if(isNaN(value)){
          return false;
        } else{
          return true;
        }
      }
    }
    ]).then(function(ans){
      var whatToBuy = (ans.id)-1;
      var howMuchToBuy = parseInt(ans.qty);
      var grandTotal = parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));

      //checks to see if it is in stock
      if(res[whatToBuy].StockQuantity >= howMuchToBuy){
        //updates quantity in products
        connection.query("UPDATE Products SET ? WHERE ?", [
        {StockQuantity: (res[whatToBuy].StockQuantity - howMuchToBuy)},
        {ItemID: ans.id}
        ], function(err, result){
            if(err) throw err;
            console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
        console.log("error");
          });
        //console.log("error");
        
        connection.query("SELECT * FROM Departments", function(err, deptRes){
          if(err) throw err;
          var index;
          for(var i = 0; i < deptRes.length; i++){
            if(deptRes[i].DepartmentName === res[whatToBuy].DepartmentName){
              index = i;
            }
          }
          
          //updates sales in department table
          connection.query("UPDATE Departments SET ? WHERE ?", [
          {TotalSales: deptRes[index].TotalSales + grandTotal},
          {DepartmentName: res[whatToBuy].DepartmentName}
          ], function(err, deptRes){
              if(err) throw err;
          });
        });

      } else{
        console.log("Sorry we don't have enough!");
      }

      reprompt();
    })
  })
}

//asks if they would like to purchase another item
function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Do you want anything else?"
  }]).then(function(ans){
    if(ans.reply){
      start();
    } else{
      console.log("Hope you come back and see you soon!");
    }
  });
}

start();