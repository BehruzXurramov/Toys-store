const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Contract = require("./contract");

const PaymentPlan = sequelize.define(
  "payment_plan",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    interest_rate: {
      type: DataTypes.BIGINT,
    },
    months: {
      type: DataTypes.BIGINT,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

PaymentPlan.hasMany(Contract);
Contract.belongsTo(PaymentPlan);

module.exports = PaymentPlan;
