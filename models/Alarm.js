"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Alarm extends Model {
    static associate(models) {
      // Alarm belongs to a Sensor
      Alarm.belongsTo(models.Sensor, { foreignKey: "sensorId", as: "sensor" });
    }
  }

  Alarm.init(
    {
      type: {
        type: DataTypes.ENUM("temperature", "humidity", "light"),
        allowNull: false,
      },
      threshold: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      sensorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Sensors",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Alarm",
      tableName: "Alarms",
    }
  );

  return Alarm;
};