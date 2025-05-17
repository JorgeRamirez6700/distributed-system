const SensorDAO = require("../dataAccess/SensorDAO");

class SensorController {
  static async crearSensor(req, res, next) {
    try {
      const sensor = await SensorDAO.crearSensor(req.body);
      res.status(201).json({ status: "success", data: sensor });
    } catch (error) {
      next(error);
    }
  }

  static async registrarLectura(req, res, next) {
    try {
      const { sensorId, valor } = req.body;
      const lectura = await SensorDAO.registrarLectura(sensorId, valor);
      res.status(201).json({ status: "success", data: lectura });
    } catch (error) {
      next(error);
    }
  }

  static async obtenerLecturas(req, res, next) {
    try {
      const { sensorId, inicio, fin } = req.query;
      const lecturas = await SensorDAO.obtenerLecturas(sensorId, inicio, fin);
      res.status(200).json({ status: "success", data: lecturas });
    } catch (error) {
      next(error);
    }
  }

  static async listarSensores(req, res, next) {
    try {
      const sensores = await SensorDAO.obtenerSensores();
      res.status(200).json({ status: "success", data: sensores });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SensorController;
