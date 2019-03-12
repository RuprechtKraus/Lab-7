const express = require("express");
const app = express();

const ticketRouters = require("./api/routes/tickets");

app.use("/tickets", ticketRouters);

module.exports = app;