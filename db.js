const mysql = require("mysql");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'cinema'
});

connection.connect(function(err){
  if (err) {
    console.log("Error connecting to DataBase");
    return;
  } else {
  	console.log("Connection established");
	}
});

module.exports = connection;