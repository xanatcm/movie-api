//Create Express server
const express = require("express");

//Utils
const { sequelize } = require("./utils/database");

//Init app
const app = express();

app.use(express.json());

//Conection to database
sequelize
  .authenticate()
  .then(() => console.log("Database authenticated"))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));

//Run server
app.listen(4000, () => {
  console.log("Movie app running!");
});
