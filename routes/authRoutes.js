const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/UserController");
const autenticacion = require("../middleware/autenticacion");
const autorizarRoles = require("../middleware/roles");

router.post("/login", AuthController.login);
router.post("/register", AuthController.crearUsuario);

// Ruta protegida para cualquier usuario autenticado
router.get("/perfil", autenticacion, (req, res) => {
  res.json({ usuario: req.usuario });
});

// Ruta protegida solo para administradores
router.get("/admin", autenticacion, autorizarRoles("admin"), (req, res) => {
  res.json({ mensaje: "Acceso autorizado como admin" });
});

module.exports = router;
