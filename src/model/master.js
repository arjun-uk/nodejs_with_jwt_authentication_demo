"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Master.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "masters",
      tableName: "masters", // lowercase!
      timestamps: true, // enable automatic timestamps
      underscored: true, // converts createdAt -> created_at
    }
  );
  return Master;
};
