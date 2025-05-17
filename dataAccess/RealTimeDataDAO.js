const { RealTimeData } = require("../models");

class RealTimeDataDAO {
  // Create real-time data
  async createRealTimeData(sensorId, type, value) {
    try {
      const data = await RealTimeData.create({ sensorId, type, value });
      return data.get({ plain: true });
    } catch (error) {
      console.error("Error creating real-time data:", error);
      throw error;
    }
  }

  // Get real-time data by sensor ID
  async getRealTimeDataBySensorId(sensorId) {
    try {
      return await RealTimeData.findAll({
        where: { sensorId },
        raw: true,
        order: [["timestamp", "DESC"]],
        limit: 10, // Limit to last 10 readings
      });
    } catch (error) {
      console.error("Error fetching real-time data:", error);
      throw error;
    }
  }

  // Get real-time data by type
  async getRealTimeDataByType(type) {
    try {
      return await RealTimeData.findAll({
        where: { type },
        raw: true,
        order: [["timestamp", "DESC"]],
        limit: 10,
      });
    } catch (error) {
      console.error("Error fetching real-time data:", error);
      throw error;
    }
  }
}

module.exports = new RealTimeDataDAO();