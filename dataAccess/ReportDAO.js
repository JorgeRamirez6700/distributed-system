const { Report } = require("../models");

class ReportDAO {
  // Create a report
  async createReport(sensorId, type, value) {
    try {
      const report = await Report.create({ sensorId, type, value });
      return report.get({ plain: true });
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  }

  // Get all reports
  async getAllReports() {
    try {
      return await Report.findAll({ raw: true });
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  }

  // Get reports by sensor ID
  async getReportsBySensorId(sensorId) {
    try {
      return await Report.findAll({ where: { sensorId }, raw: true });
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  }

  // Get reports by type
  async getReportsByType(type) {
    try {
      return await Report.findAll({ where: { type }, raw: true });
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  }
}

module.exports = new ReportDAO();