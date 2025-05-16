const UserDAO = require("../dataAccess/UserDAO");
const { createToken } = require("../util/token");
const bcrypt = require("bcryptjs");

class UsuarioController {
  static async login(req, res, next) {
    try {
      const { user, password } = req.body;

      if (!user || !password) {
        return next(
          new AppError("Faltan datos requeridos: usuario y contraseña", 400)
        );
      }

      const usuario = await UserDAO.autenticarUsuario(user, password);

      if (!usuario) {
        return next(new Error("Credenciales incorrectas", 401));
      }

      const token = createToken({
        id: usuario.id,
        user: usuario.user,
        type: usuario.type,
      });

      res.status(200).json({
        status: "success",
        message: "Autenticación exitosa",
        data: {
          id: usuario.id,
          user: usuario.user,
          type: usuario.type,
        },
        token,
      });
    } catch (error) {
      console.error("Error en el proceso de autenticación:", error);
      next(new Error("Error en el proceso de autenticación", 500));
    }
  }

  static async crearUsuario(req, res, next) {
    try {
      const { user, password, type } = req.body;

      if (!user || !password || !type) {
        return next(
          new Error("Faltan datos requeridos: usuario, contraseña y tipo", 400)
        );
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const nuevoUsuario = await UserDAO.crearUsuario(
        user,
        hashedPassword,
        type
      );

      res.status(201).json({
        status: "success",
        data: nuevoUsuario,
      });
    } catch (error) {
      console.error("Error al crear el usuario en el controlador:", error);
      next(new Error("Error al crear el usuario", 500));
    }
  }

  static async obtenerUsuarios(req, res, next) {
    try {
      const usuarios = await UserDAO.obtenerUsuarios();
      if (!usuarios.length) {
        return next(new Error("No se encontraron usuarios", 404));
      }

      res.status(200).json({
        status: "success",
        data: usuarios,
      });
    } catch (error) {
      next(new Error("Error al obtener los usuarios", 500));
    }
  }
}

module.exports = UsuarioController;
