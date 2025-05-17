module.exports = (sequelize, DataTypes) => {
  const Lectura = sequelize.define("Lectura", {
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fechaHora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Lectura.associate = (models) => {
    Lectura.belongsTo(models.Sensor, { foreignKey: "sensorId" });
  };

  return Lectura;
};
