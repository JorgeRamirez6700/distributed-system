const { Sensor, Lectura } = require("../models");

class SensorDAO {
  async crearSensor(data) {
    return await Sensor.create(data);
  }

  async registrarLectura(sensorId, valor) {
    return await Lectura.create({ sensorId, valor });
  }

  async obtenerLecturas(sensorId, fechaInicio, fechaFin) {
    return await Lectura.findAll({
      where: {
        sensorId,
        fechaHora: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      },
    });
  }

  async obtenerSensores() {
    return await Sensor.findAll();
  }
}

module.exports = new SensorDAO();
