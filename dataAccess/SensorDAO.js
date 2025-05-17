const { Sensor } = require("../models");

class SensorDAO {
  // Create a sensor
  async createSensor(name, type, location, status) {
    try {
      const sensor = await Sensor.create({ name, type, location, status });
      return sensor.get({ plain: true });
    } catch (error) {
      console.error("Error creating sensor:", error);
      throw error;
    }
  }

  // Get all sensors
  async getAllSensors() {
    try {
      return await Sensor.findAll({ raw: true });
    } catch (error) {
      console.error("Error fetching sensors:", error);
      throw error;
    }
  }

  // Get sensor by ID
  async getSensorById(id) {
    try {
      const sensor = await Sensor.findByPk(id, { raw: true });
      if (!sensor) {
        throw new Error("Sensor not found");
      }
      return sensor;
    } catch (error) {
      console.error("Error fetching sensor:", error);
      throw error;
    }
  }

  // Update sensor
  async updateSensor(id, updates) {
    try {
      const sensor = await Sensor.findByPk(id);
      if (!sensor) {
        throw new Error("Sensor not found");
      }
      await sensor.update(updates);
      return sensor.get({ plain: true });
    } catch (error) {
      console.error("Error updating sensor:", error);
      throw error;
    }
  }

  // Delete sensor
  async deleteSensor(id) {
    try {
      const sensor = await Sensor.findByPk(id);
      if (!sensor) {
        throw new Error("Sensor not found");
      }
      await sensor.destroy();
      return true;
    } catch (error) {
      console.error("Error deleting sensor:", error);
      throw error;
    }
  }
}

module.exports = new SensorDAO();