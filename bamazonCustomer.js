var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "7082505zika",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id" + connection.threadId);
    //connection.end();
    console.log("Connected");
    //afterConnection();

});

var afterConnection = function () {
    connection.query("SELECT * FROM Products ", function (error, results) {
        if (error) throw error;
        console.log(results);
        //connection.end();

    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the product you want to buy ?",
            name: "userChoice",
            validate: function(value){
                if (isNaN(value) === false){
                    return true;
                }
                return false;
            }

        },
        {
            type: "input",
            message: "How many UNITS of the product you want to buy",
            name: "confirmChoice",
            validate: function(value){
                if (isNaN(value)=== false) {
                    return true;
                }
                return false;
            }

        },
    ]).then(function (response) {
        var userChoice = response.userChoice;
        var confirmChoice = response.confirmChoice;

        if (userChoice) {
            console.log(" List of products: ");
           // afterConnection();

           tellID();
        }
       
    });
});
  
}
afterConnection();


var tellID = function () {
    connection.query("SELECT * FROM products WHERE item_id =2", function (error, results) {

        console.log("Your products id are: ");

        if (error) throw error;
        if (results.length > 0) {
            console.log(results);
        }
        else {
            console.log("not found");
        }


    });
}

