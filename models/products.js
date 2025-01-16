const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const CartItem = require("./cart_item");
const Review = require("./review");
const Image = require("./images");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    price: {
      type: DataTypes.DECIMAL(16, 2),
    },
    quantity: {
      type: DataTypes.BIGINT,
    },
    description: {
      type: DataTypes.STRING(2000),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Product.hasMany(Review);
Review.belongsTo(Product);

Product.hasMany(Image);
Image.belongsTo(Product);

module.exports = Product;
