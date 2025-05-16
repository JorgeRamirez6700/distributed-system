// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const asyncRoutes = require('./routes/asyncRoutes');
const { sequelize} = require('./models');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware para parsear JSON
app.use(express.json());

//crear modelos en base de datos 
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos');

    await sequelize.sync({ alter: true }); 
    console.log('Modelos sincronizados');
   
  } catch (error) {
    console.error('Error:', error);
  }
})();


// Middleware para rutas
app.use('/api', asyncRoutes);

// Conexión WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado:', socket.id);

  // Escuchar evento personalizado
  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);
    // Enviar respuesta al cliente
    socket.emit('respuesta', { text: 'Mensaje recibido en el servidor', recibido: true });
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
