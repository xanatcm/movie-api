//App
const { app } = require("./app");

//Utils
const { sequelize } = require("./utils/database");

//Connection to database
sequelize
  .authenticate()
  .then(() => console.log("Database authenticated"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));

//Run server
app.listen(PORT, () => {
  console.log(`Movie api running on port ${PORT}!`);
});
