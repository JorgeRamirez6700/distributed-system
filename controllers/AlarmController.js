const AlarmDAO = require("../dataAccess/AlarmDAO");

class AlarmController {
  static async createAlarm(req, res, next) {
    try {
      const { type, threshold, sensorId } = req.body;

      if (!type || !threshold || !sensorId) {
        return next(new Error("Missing required fields: type, threshold, sensorId", 400));
      }

      const alarm = await AlarmDAO.createAlarm(type, threshold, sensorId);

      res.status(201).json({
        status: "success",
        data: alarm,
      });
    } catch (error) {
      console.error("Error creating alarm:", error);
      next(new Error("Error creating alarm", 500));
    }
  }

  static async getAllAlarms(req, res, next) {
    try {
      const alarms = await AlarmDAO.getAllAlarms();
      res.status(200).json({
        status: "success",
        data: alarms, // Return empty array if no alarms
      });
    } catch (error) {
      console.error("Error fetching alarms:", error);
      res.status(500).json({ message: "Error fetching alarms" });
    }
  }

  static async getAlarmById(req, res, next) {
    try {
      const { id } = req.params;
      const alarm = await AlarmDAO.getAlarmById(id);

      res.status(200).json({
        status: "success",
        data: alarm,
      });
    } catch (error) {
      console.error("Error fetching alarm:", error);
      next(new Error(error.message, error.message === "Alarm not found" ? 404 : 500));
    }
  }

  static async updateAlarm(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const alarm = await AlarmDAO.updateAlarm(id, updates);

      res.status(200).json({
        status: "success",
        data: alarm,
      });
    } catch (error) {
      console.error("Error updating alarm:", error);
      next(new Error(error.message, error.message === "Alarm not found" ? 404 : 500));
    }
  }

  static async deleteAlarm(req, res, next) {
    try {
      const { id } = req.params;
      await AlarmDAO.deleteAlarm(id);

      res.status(200).json({
        status: "success",
        message: "Alarm deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting alarm:", error);
      next(new Error(error.message, error.message === "Alarm not found" ? 404 : 500));
    }
  }
}

module.exports = AlarmController;