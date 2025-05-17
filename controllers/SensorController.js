const SensorDAO = require("../dataAccess/SensorDAO");

class SensorController {
  static async createSensor(req, res, next) {
    try {
      const { name, type, location, status } = req.body;

      if (!name || !type || !location) {
        return next(
          new Error("Missing required fields: name, type, location", 400)
        );
      }

      const sensor = await SensorDAO.createSensor(
        name,
        type,
        location,
        status || "active"
      );

      res.status(201).json({
        status: "success",
        data: sensor,
      });
    } catch (error) {
      console.error("Error creating sensor:", error);
      next(new Error("Error creating sensor", 500));
    }
  }

  static async getAllSensors(req, res, next) {
    try {
      const sensors = await SensorDAO.getAllSensors();
      if (!sensors.length) {
        return res.status(404).json({ message: "No sensors found" });
      }
      res.status(200).json({
        status: "success",
        data: sensors,
      });
    } catch (error) {
      console.error("Error fetching sensors:", error);
      res.status(500).json({ message: "Error fetching sensors" });
    }
  }

  static async getSensorById(req, res, next) {
    try {
      const { id } = req.params;
      const sensor = await SensorDAO.getSensorById(id);

      res.status(200).json({
        status: "success",
        data: sensor,
      });
    } catch (error) {
      console.error("Error fetching sensor:", error);
      next(
        new Error(
          error.message,
          error.message === "Sensor not found" ? 404 : 500
        )
      );
    }
  }

  static async updateSensor(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const sensor = await SensorDAO.updateSensor(id, updates);

      res.status(200).json({
        status: "success",
        data: sensor,
      });
    } catch (error) {
      console.error("Error updating sensor:", error);
      next(
        new Error(
          error.message,
          error.message === "Sensor not found" ? 404 : 500
        )
      );
    }
  }

  static async deleteSensor(req, res, next) {
    try {
      const { id } = req.params;
      await SensorDAO.deleteSensor(id);

      res.status(200).json({
        status: "success",
        message: "Sensor deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting sensor:", error);
      next(
        new Error(
          error.message,
          error.message === "Sensor not found" ? 404 : 500
        )
      );
    }
  }
}

module.exports = SensorController;
