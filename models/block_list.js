const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const BlockList = sequelize.define(
  "block_list",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    reason: {
      type: DataTypes.STRING(250),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = BlockList;
