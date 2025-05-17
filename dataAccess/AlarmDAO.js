const { Alarm } = require("../models");

class AlarmDAO {
  // Create an alarm
  async createAlarm(type, threshold, sensorId) {
    try {
      const alarm = await Alarm.create({ type, threshold, sensorId });
      return alarm.get({ plain: true });
    } catch (error) {
      console.error("Error creating alarm:", error);
      throw error;
    }
  }

  // Get all alarms
  async getAllAlarms() {
    try {
      return await Alarm.findAll({ raw: true });
    } catch (error) {
      console.error("Error fetching alarms:", error);
      throw error;
    }
  }

  // Get alarm by ID
  async getAlarmById(id) {
    try {
      const alarm = await Alarm.findByPk(id, { raw: true });
      if (!alarm) {
        throw new Error("Alarm not found");
      }
      return alarm;
    } catch (error) {
      console.error("Error fetching alarm:", error);
      throw error;
    }
  }

  // Update alarm
  async updateAlarm(id, updates) {
    try {
      const alarm = await Alarm.findByPk(id);
      if (!alarm) {
        throw new Error("Alarm not found");
      }
      await alarm.update(updates);
      return alarm.get({ plain: true });
    } catch (error) {
      console.error("Error updating alarm:", error);
      throw error;
    }
  }

  // Delete alarm
  async deleteAlarm(id) {
    try {
      const alarm = await Alarm.findByPk(id);
      if (!alarm) {
        throw new Error("Alarm not found");
      }
      await alarm.destroy();
      return true;
    } catch (error) {
      console.error("Error deleting alarm:", error);
      throw error;
    }
  }
}

module.exports = new AlarmDAO();