const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const asyncRoutes = require("./routes/asyncRoutes");
const authRoutes = require("./routes/authRoutes");
const { sequelize } = require("./models");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust to your frontend URL
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");
    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados");
  } catch (error) {
    console.error("Error:", error);
  }
})();

// Routes
app.use("/api", asyncRoutes);
app.use("/auth", authRoutes);

// WebSocket connection
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  socket.on("subscribeToSensor", (sensorId) => {
    socket.join(`sensor:${sensorId}`);
    console.log(`Cliente ${socket.id} suscrito al sensor ${sensorId}`);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Simulate real-time data emission (replace with actual sensor data logic)
setInterval(async () => {
  const { RealTimeData } = require("./models");
  try {
    const sensors = await require("./models").Sensor.findAll();
    for (const sensor of sensors) {
      const value = Math.random() * 100; // Simulate sensor value
      const data = await RealTimeData.create({
        sensorId: sensor.id,
        type: sensor.type,
        value,
      });
      io.to(`sensor:${sensor.id}`).emit("realtimeData", {
        sensorId: sensor.id,
        type: sensor.type,
        value,
        timestamp: data.timestamp,
      });
    }
  } catch (error) {
    console.error("Error emitting real-time data:", error);
  }
}, 2000);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});