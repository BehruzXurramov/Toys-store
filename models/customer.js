const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const BlockList = require("./block_list");
const Cart = require("./cart");
const Review = require("./review");

const Customer = sequelize.define(
  "customer",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
    },
    last_name: {
      type: DataTypes.STRING(50),
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    email: {
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING(100),
    },
    adress: {
      type: DataTypes.STRING(250),
    },
    birthday: {
      type: DataTypes.DATE,
    },
    passport_number: {
      type: DataTypes.STRING(10),
    },
    refresh_token: {
      type: DataTypes.STRING(250),
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
    activate_link: {
      type: DataTypes.STRING(250),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Customer.hasMany(BlockList);
BlockList.belongsTo(Customer);

Customer.hasMany(Cart);
Cart.belongsTo(Customer);

Customer.hasMany(Review);
Review.belongsTo(Customer)

module.exports = Customer;
