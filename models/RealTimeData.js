"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RealTimeData extends Model {
    static associate(models) {
      // RealTimeData belongs to a Sensor
      RealTimeData.belongsTo(models.Sensor, { foreignKey: "sensorId", as: "sensor" });
    }
  }

  RealTimeData.init(
    {
      sensorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Sensors",
          key: "id",
        },
      },
      type: {
        type: DataTypes.ENUM("temperature", "humidity", "light"),
        allowNull: false,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "RealTimeData",
      tableName: "RealTimeData",
    }
  );

  return RealTimeData;
};