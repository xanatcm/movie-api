//App
const { app } = require('./app');

//Utils
const { sequelize } = require('./utils/database');

//Connection to database
sequelize
  .authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

//DB scynced with models relations
sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

//Run server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Movie api running on port ${PORT}!`);
});
