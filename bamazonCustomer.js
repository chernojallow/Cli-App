var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
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
        {   name: "item_id",
            type: "input",
            message: "What is the ID of the product you want to buy ?",
           
            validate: function(value){
                if (isNaN(value) === false){
                    return true;
                }
                return false;
            }

        },
        {
            name: "stock_quantity",
            type: "input",
            message: "How many UNITS of the product you want to buy",
            validate: function(value){
                
                if (isNaN(value)=== false ) {
                    return true;
                }
                return false;
            }
        

        },
    ]).then(function (answer) {
  
        var query = "SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?";
        connection.query(query, {item_id: answer.item_id}, function (error, results) {
        
            for (var i = 0; i < results.length; i++) {
               
               
                // if(results[i] < quantity){
                 console.log("product_name: " + results[i].product_name + " || department_name: " + results[i].department_name + " || price: " + results[i].price);

                 var total = results[i].price * "5";
                console.log("you total for" +  total);
              }
 
           //  else {
             //   console.log("Insufficient amount");
         //   }
          // }
            //console.log("Your products id are: ");
           // if (error) throw error;
           
        
        });
   
         // tellID();
       // }
       
    });
});
  
}
afterConnection();







//tellID();

