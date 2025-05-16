module.exports = (sequelize, DataTypes) => {
  const Sensor = sequelize.define("Sensor", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM("humedad", "temperatura"),
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
    },
    marca: {
      type: DataTypes.STRING,
    }
  });

  Sensor.associate = (models) => {
    Sensor.hasMany(models.Lectura, { foreignKey: "sensorId" });
  };

  return Sensor;
};
