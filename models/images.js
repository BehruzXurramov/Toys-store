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
