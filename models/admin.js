const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const BlockList = require("./block_list");

const Admin = sequelize.define(
  "admin",
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
    email: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(250),
    },
    is_creator: {
      type: DataTypes.BOOLEAN,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
    refresh_token: {
      type: DataTypes.STRING(250),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Admin.hasMany(BlockList);
BlockList.belongsTo(Admin);

module.exports = Admin;
