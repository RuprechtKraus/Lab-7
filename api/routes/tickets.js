const express = require("express");
const router = express.Router();
const db = require("../../db.js");

router.get("/", (req, res, next) => {
	db.query("SELECT * FROM tickets", function (err, rows) {
		if (err) {
			res.sendStatus(500);
		} else {
			var result = [];
			for (var i = 0; i < rows.length; i++) {
				result.push({
					ticketNumber: rows[i].id,
					cinemaHallNumber: rows[i].id_hall,
					Price: rows[i].price
				});
			}
 	 		res.status(200).json(result);
		}
		});
});

router.get("/:ticketId", (req, res, next) => {
	db.query("SELECT * FROM tickets WHERE id=" + req.params.ticketId, function (err, rows) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.status(200).json({
				ticketNumber: rows[0].id,
				cinemaHallNumber: rows[0].id_hall,
				Price: rows[0].price
			});
		}
	})
});

router.post("/", (req, res, next) => {
	db.query("INSERT INTO tickets (id_hall, price) VALUES (2, 450)", function (err, rows) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.status(200).json({
				message: "New ticket has been added"
			});
		}
	});
});

router.patch("/:ticketId/:idHall/:price", (req, res, next) => {
		db.query("UPDATE tickets SET id_hall=" + req.params.idHall + ", price=" + req.params.price + " WHERE id=" + req.params.ticketId, function (err, rows) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.status(200).json({
				message: "Ticket has bees updated"
			});
		}
	});
});

router.delete("/:ticketId", (req, res, next) => {
		db.query("DELETE FROM tickets WHERE id=" + req.params.ticketId, function (err, rows) {
		if (err) {
			res.sendStatus(500);
		} else {
			res.status(200).json({
				message: "Ticket has been deleted"
			});
		}
	});
});

module.exports = router;