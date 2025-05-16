const express = require("express");
const SensorController = require("../controllers/SensorController");
const autenticacion = require("../middleware/autenticacion");

const router = express.Router();

router.post("/", autenticacion, SensorController.crearSensor);
router.post("/lectura", autenticacion, SensorController.registrarLectura);
router.get("/lecturas", autenticacion, SensorController.obtenerLecturas);
router.get("/", autenticacion, SensorController.listarSensores);

module.exports = router;
