const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const sequelize = new Sequelize({
  host: process.env.DB_HOST, //"localhost",
  username: process.env.DB_USER, //"postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB, //"movies-api",
  port: 5432,
  dialect: 'postgres',
  logging: false
});

module.exports = { sequelize };
