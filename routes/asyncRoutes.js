const express = require('express');
const router = express.Router();
const SensorController = require('../controllers/SensorController');
const AlarmController = require('../controllers/AlarmController');
const ReportController = require('../controllers/ReportController');
const RealTimeDataController = require('../controllers/RealTimeDataController');
const autenticacion = require('../middleware/autenticacion');
const autorizarRoles = require('../middleware/roles');

// Sensor routes
router.post('/sensors', autenticacion, autorizarRoles('admin'), SensorController.createSensor);
router.get('/sensors', autenticacion, SensorController.getAllSensors);
router.get('/sensors/:id', autenticacion, SensorController.getSensorById);
router.put('/sensors/:id', autenticacion, autorizarRoles('admin'), SensorController.updateSensor);
router.delete('/sensors/:id', autenticacion, autorizarRoles('admin'), SensorController.deleteSensor);

// Alarm routes
router.post('/alarms', autenticacion, AlarmController.createAlarm);
router.get('/alarms', autenticacion, AlarmController.getAllAlarms);
router.get('/alarms/:id', autenticacion, AlarmController.getAlarmById);
router.put('/alarms/:id', autenticacion, AlarmController.updateAlarm);
router.delete('/alarms/:id', autenticacion, AlarmController.deleteAlarm);

// Report routes
router.post('/reports', autenticacion, autorizarRoles('admin'), ReportController.createReport);
router.get('/reports', autenticacion, ReportController.getAllReports);
router.get('/reports/sensor/:sensorId', autenticacion, ReportController.getReportsBySensorId);
router.get('/reports/type/:type', autenticacion, ReportController.getReportsByType);

// RealTimeData routes
router.post('/realtime', autenticacion, autorizarRoles('admin'), RealTimeDataController.createRealTimeData);
router.get('/realtime/sensor/:sensorId', autenticacion, RealTimeDataController.getRealTimeDataBySensorId);
router.get('/realtime/type/:type', autenticacion, RealTimeDataController.getRealTimeDataByType);

module.exports = router;