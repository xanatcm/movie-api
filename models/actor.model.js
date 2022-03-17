const DataTypes = require("sequelize");

//Utils
const { sequelize } = require("../utils/database");

const Actors = sequelize.define("actors", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  rating: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING(10),
    defaultValue: "active",
    allowNull: false,
  },
  profilePic: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = { Actors };
