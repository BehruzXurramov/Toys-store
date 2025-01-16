const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const CartItem = sequelize.define(
  "cart_item",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.BIGINT,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = CartItem;
