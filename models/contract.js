const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Payment = require("./payment");

const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM(["birinchi", "ikkinchi", "uchinchi"]),
      defaultValue: "birinchi"
    },
    remaining_balance: {
      type: DataTypes.DECIMAL(16, 2),
    },
    first_payment: {
      type: DataTypes.DECIMAL(16, 2),
    },
    first_payment_rate: {
      type: DataTypes.BIGINT,
    },
    monthly_payment: {
      type: DataTypes.DECIMAL(16, 2),
    },
    day_of_month: {
      type: DataTypes.BIGINT,
    },
    other_side: {
      type: DataTypes.STRING(250),
      defaultValue: "Toys store MCHJ",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Contract.hasMany(Payment);
Payment.belongsTo(Contract);

module.exports = Contract;
