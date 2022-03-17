//Create Express server
const express = require("express");

//Init app
const app = express();

app.use(express.json());

module.exports = { app };
