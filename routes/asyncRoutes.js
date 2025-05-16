// routes/asyncRoutes.js
const express = require('express');
const router = express.Router();


// Simulación de procesamiento pesado asíncrono
router.get('/long-task', async (req, res) => {
  console.log("Inicio del proceso largo");

  // Simulamos un proceso que tarda 3 segundos usando una promesa
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log("Fin del proceso largo");
  res.json({ message: "Proceso largo completado exitosamente" });
});



module.exports = router;
