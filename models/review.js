const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Review = sequelize.define(
  "review",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING(250),
    },
    rating: {
      type: DataTypes.BIGINT,
    },
    is_anonymous: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Review;
