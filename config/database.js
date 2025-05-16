require('dotenv').config();
const { Sequelize } = require('sequelize');

// Validación de variables necesarias
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_DIALECT'];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`La variable de entorno ${varName} no está definida en el archivo .env`);
  }
});

// Instancia de Sequelize usando variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nombre de la base de datos
  process.env.DB_USER,       // Usuario de la base de datos
  process.env.DB_PASSWORD,   // Contraseña
  {
    host: process.env.DB_HOST,       // Host de conexión (e.g., localhost)
    dialect: process.env.DB_DIALECT, // Dialecto: mysql | postgres | sqlite | mssql
    logging: false,                  // Desactiva logs SQL en consola
  }
);

module.exports = sequelize;
