
// Dependencies
var mysql = require("mysql");
var inquirer = require('inquirer');
var Table = new require('cli-table');
// establish connection to my sql database 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

var showProducts = function () {

    // connect to the database and retrieve the information from  the  product database to display to the user 
    
    connection.query("SELECT * FROM Products ", function (error, results) {
        if (error) throw error;
        // instantiate table
        var table = new Table({
            head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity']

        });
        console.log(" THE TABLE BELOW SHOWS ALL AVAILABLE ITEMS FOR SALE:");

        console.log("----------------------------------------------------")
        //Loop through each item in the mysql database   
        for (var i = 0; i < results.length; i++) {
            table.push([results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        }
        console.log(table.toString());
        //connection.end();

        ////creates the questions that will be prompted to the user
        inquirer.prompt([
            {
                name: "item_id",
                type: "input",
                message: "What is the ID of the product you want to buy ?",

                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }

            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How many UNITS of the product you want to buy",
                validate: function (value) {

                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
        ]).then(function (answer) {

            var query = "SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?";
            connection.query(query, { item_id: answer.item_id }, function (error, results) {

                for (var i = 0; i < results.length; i++) {
                      

				//if the stock amount available is more than or equal to the amount being asked for then the purchase is continued and the user is alerted of what items are being purchased, how much one item is and what the total amount is
                    if (answer.stock_quantity <= results[i].stock_quantity) {
                        console.log("----------------------------------------");
                        var total = results[i].price * answer.stock_quantity;
                        console.log("Your total cost for", answer.stock_quantity, results[i].product_name, "is:", total);

                    }
                    else {
                        console.log("Insufficient Amount");
                    }
                  // connect to mysql database Department and updates the total sale 
                    if (answer.stock_quantity <= results[i].stock_quantity) {
                        var query1 = "UPDATE products SET ? WHERE ?";
                        connection.query(query1,

                            [
                                {
                                    stock_quantity: results[i].stock_quantity - answer.stock_quantity
                                },
                                {
                                    item_id: answer.item_id
                                }
                            ],

                            function (error, results) {

                                console.log("----------------------------------------");
                                showProducts();

                            });
                    }
                }
            });

        });
    });

}
showProducts();







