const RealTimeDataDAO = require("../dataAccess/RealTimeDataDAO");

class RealTimeDataController {
  static async createRealTimeData(req, res, next) {
    try {
      const { sensorId, type, value } = req.body;

      if (!sensorId || !type || !value) {
        return next(new Error("Missing required fields: sensorId, type, value", 400));
      }

      const data = await RealTimeDataDAO.createRealTimeData(sensorId, type, value);

      res.status(201).json({
        status: "success",
        data,
      });
    } catch (error) {
      console.error("Error creating real-time data:", error);
      next(new Error("Error creating real-time data", 500));
    }
  }

  static async getRealTimeDataBySensorId(req, res, next) {
    try {
      const { sensorId } = req.params;
      const data = await RealTimeDataDAO.getRealTimeDataBySensorId(sensorId);
      if (!data.length) {
        return next(new Error("No real-time data found for this sensor", 404));
      }

      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      console.error("Error fetching real-time data:", error);
      next(new Error("Error fetching real-time data", 500));
    }
  }

  static async getRealTimeDataByType(req, res, next) {
    try {
      const { type } = req.params;
      const data = await RealTimeDataDAO.getRealTimeDataByType(type);
      if (!data.length) {
        return next(new Error("No real-time data found for this type", 404));
      }

      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      console.error("Error fetching real-time data:", error);
      next(new Error("Error fetching real-time data", 500));
    }
  }
}

module.exports = RealTimeDataController;