const express = require("express");
const router = express.Router();
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

router.get("/", (req, res, next) => {
	connection.query("SELECT * FROM tickets", function (err, rows) {
		if (err) {
			console.log("Error: " + err.message);
		} else {
			var result = [];
			for (var i = 0; i < rows.length; i++) {
				result.push({
					"Ticket number": rows[i].id,
					"Cinema hall number": rows[i].id_hall,
					Price: rows[i].price
				});
			}
 	 		res.status(200).json(result);
		}
		});
});

router.get("/:ticketId", (req, res, next) => {
	connection.query("SELECT * FROM tickets WHERE id=" + req.params.ticketId, function (err, rows) {
		if (err) {
			console.log("Error: " + err.message);
		} else {
			res.status(200).json({
				"Ticket number": rows[0].id,
				"Cinema hall number": rows[0].id_hall,
				Price: rows[0].price
			});
		}
	})
});

router.post("/", (req, res, next) => {
	connection.query("INSERT INTO tickets (id_hall, price) VALUES (2, 450)", function (err, rows) {
		if (err) {
			console.log("Error" + err.message);
		} else {
			res.status(200).json({
				message: "New ticket has been added"
			});
		}
	});
});

router.patch("/:ticketId", (req, res, next) => {
		connection.query("UPDATE tickets SET id_hall=1, price=700 WHERE id=" + req.params.ticketId, function (err, rows) {
		if (err) {
			console.log("Error" + err.message);
		} else {
			res.status(200).json({
				message: "Ticket has bees updated"
			});
		}
	});
});

router.delete("/:ticketId", (req, res, next) => {
		connection.query("DELETE FROM tickets WHERE id=" + req.params.ticketId, function (err, rows) {
		if (err) {
			console.log("Error" + err.message);
		} else {
			res.status(200).json({
				message: "Ticket has been deleted"
			});
		}
	});
});

module.exports = router;