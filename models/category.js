const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Product = require("./products");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.STRING(250),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = Category;
