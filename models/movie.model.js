const DataTypes = require('sequelize');

//Utils
const { sequelize } = require('../utils/database');

const Movie = sequelize.define('movie', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 1
  },
  img: {
    //this will change
    type: DataTypes.STRING(100),
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'active',
    allowNull: false
  }
});

module.exports = { Movie };
