const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Image = sequelize.define(
  "image",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.BIGINT,
    },
    link: {
      type: DataTypes.STRING(250),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Image;
