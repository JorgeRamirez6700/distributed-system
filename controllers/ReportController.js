const ReportDAO = require("../dataAccess/ReportDAO");

class ReportController {
  static async createReport(req, res, next) {
    try {
      const { sensorId, type, value } = req.body;

      if (!sensorId || !type || !value) {
        return next(new Error("Missing required fields: sensorId, type, value", 400));
      }

      const report = await ReportDAO.createReport(sensorId, type, value);

      res.status(201).json({
        status: "success",
        data: report,
      });
    } catch (error) {
      console.error("Error creating report:", error);
      next(new Error("Error creating report", 500));
    }
  }

  static async getAllReports(req, res, next) {
    try {
      const reports = await ReportDAO.getAllReports();
      if (!reports.length) {
        return next(new Error("No reports found", 404));
      }

      res.status(200).json({
        status: "success",
        data: reports,
      });
    } catch (error) {
      console.error("Error fetching reports:", error);
      next(new Error("Error fetching reports", 500));
    }
  }

  static async getReportsBySensorId(req, res, next) {
    try {
      const { sensorId } = req.params;
      const reports = await ReportDAO.getReportsBySensorId(sensorId);
      if (!reports.length) {
        return next(new Error("No reports found for this sensor", 404));
      }

      res.status(200).json({
        status: "success",
        data: reports,
      });
    } catch (error) {
      console.error("Error fetching reports:", error);
      next(new Error("Error fetching reports", 500));
    }
  }

  static async getReportsByType(req, res, next) {
    try {
      const { type } = req.params;
      const reports = await ReportDAO.getReportsByType(type);
      res.status(200).json({
        status: "success",
        data: reports, // Return empty array if no reports
      });
    } catch (error) {
      console.error("Error fetching reports by type:", error);
      res.status(500).json({ message: "Error fetching reports" });
    }
  }
}

module.exports = ReportController;