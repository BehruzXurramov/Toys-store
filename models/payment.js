const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    amount_paid: {
      type: DataTypes.DECIMAL(16, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Payment;
