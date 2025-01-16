const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const CartItem = require("./cart_item");
const Contract = require("./contract");

const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(16, 2),
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Cart.hasMany(Contract);
Contract.belongsTo(Cart);

module.exports = Cart;
