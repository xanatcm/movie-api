//App
const { app } = require('./app');

//Utils
const { sequelize } = require('./utils/database');
const { initModel } = require('./utils/initModel');

//Connection to database
sequelize
  .authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

//Relations
initModel();

//DB scynced with models relations
sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

//Run server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Movie api running on port ${PORT}!`);
});
