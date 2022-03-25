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
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { ActorInMovies };
