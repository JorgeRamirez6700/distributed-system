"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    static associate(models) {
      // Sensors can have multiple Alarms
      Sensor.hasMany(models.Alarm, { foreignKey: "sensorId", as: "alarms" });
      // Sensors can have multiple Reports
      Sensor.hasMany(models.Report, { foreignKey: "sensorId", as: "reports" });
    }
  }

  Sensor.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("temperature", "humidity", "light"),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "Sensor",
      tableName: "Sensors",
    }
  );

  return Sensor;
};