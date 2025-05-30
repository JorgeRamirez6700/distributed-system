const { User } = require("../models");

const bcrypt = require("bcryptjs");

class UserDAO {
  // Autenticación
  async autenticarUsuario(user, contraseña) {
    try {
      const usuario = await User.findOne({ where: { user } });

      console.log("Usuario encontrado:", usuario);

      if (!usuario) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const contraseñaValida = await bcrypt.compare(
        contraseña,
        usuario.password
      );
      if (!contraseñaValida) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      return usuario.get({ plain: true });
    } catch (error) {
      console.error("Error en autenticación:", error.message);
      throw error;
    }
  }

  // Crear usuario
  async crearUsuario(user, password, type) {
    try {
      const usuario = await User.create({ user, password, type });
      return usuario;
    } catch (error) {
      console.error("Error en crearUsuario:", error);
      throw error;
    }
  }

  // Obtener usuarios
  async obtenerUsuarios() {
    try {
      return await User.findAll();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserDAO();
