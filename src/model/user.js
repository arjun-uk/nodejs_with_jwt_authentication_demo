"use strict";
const { Model } = require("sequelize");
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      mobile: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users", // lowercase!
      timestamps: true, // enable automatic timestamps
      underscored: true, // converts createdAt -> created_at

      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        }
      }
    }
  );
  return User;
};
