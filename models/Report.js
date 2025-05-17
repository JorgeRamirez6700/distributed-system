"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      // Report belongs to a Sensor
      Report.belongsTo(models.Sensor, { foreignKey: "sensorId", as: "sensor" });
    }
  }

  Report.init(
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
      modelName: "Report",
      tableName: "Reports",
    }
  );

  return Report;
};