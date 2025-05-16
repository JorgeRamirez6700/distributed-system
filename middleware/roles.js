function autorizarRoles(...rolesPermitidos) {
  return (req, res, next) => {
    const tipoUsuario = req.usuario?.type;

    if (!tipoUsuario || !rolesPermitidos.includes(tipoUsuario)) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: rol no autorizado" });
    }

    next();
  };
}

module.exports = autorizarRoles;
