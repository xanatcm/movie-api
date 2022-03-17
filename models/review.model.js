const DataTypes = require("sequelize");

//Utils
const { sequelize } = require("../utils/database");

const Reviews = sequelize.define("reviews", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  rating: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue : 1
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: "active",
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Reviews };
