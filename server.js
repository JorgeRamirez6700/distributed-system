const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const asyncRoutes = require('./routes/asyncRoutes');

const app = express();
const server = http.createServer(app);

// Middleware para permitir CORS (frontend)
app.use(cors({
  origin: '*', // cambiar si lo deseas a origen específico
  methods: ['GET', 'POST']
}));

// Middleware para parsear JSON
app.use(express.json());

// API REST
app.use('/api', asyncRoutes);

// Socket.IO con CORS habilitado
const io = new Server(server, {
  cors: {
    origin: '*', // cambiar por origen específico si es necesario
    methods: ['GET', 'POST']
  }
});

// Conexión WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado:', socket.id);

  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);
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
