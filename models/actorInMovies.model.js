const { DataTypes } = require('sequelize');

//Utils
const { sequelize } = require('../utils/database');

const ActorInMovies = sequelize.define('actor in movies', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  actorsId: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  moviesId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { ActorInMovies };
