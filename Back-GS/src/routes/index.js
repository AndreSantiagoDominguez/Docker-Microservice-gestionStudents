const express = require('express');
const router = express.Router();

// Importar rutas
const studentRoutes = require('./studentRoutes');
const systemRoutes = require('./systemRoutes');

// Montar rutas
router.use('/students', studentRoutes);
router.use('/', systemRoutes);

module.exports = router;