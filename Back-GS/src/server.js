require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

// Importar configuraciones
const { PORT, SERVER_HOST } = require('./src/config/environment');
const { testConnection } = require('./src/config/database');

// Importar rutas
const routes = require('./src/routes');

// Importar middlewares
const errorHandler = require('./src/middlewares/errorHandler');
const logger = require('./src/middlewares/logger');

// Crear aplicación Express
const app = express();

// Seguridad HTTP headers
app.use(helmet());

// CORS configurado
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger de peticiones HTTP
app.use(morgan('combined'));
app.use(logger);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API REST - Sistema de Gestión de Estudiantes',
    author: 'André Santiago',
    version: '1.0.0',
    status: 'active',
    endpoints: {
      health: '/health',
      info: '/api/info',
      students: '/api/students'
    },
    documentation: 'README.md'
  });
});

// Montar rutas de la API
app.use('/api', routes);

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    method: req.method
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    // Probar conexión a base de datos
    await testConnection();
    console.log('✓ Conexión a base de datos establecida');

    // Iniciar servidor
    app.listen(PORT, SERVER_HOST, () => {
      console.log('========================================');
      console.log('🚀 Servidor iniciado correctamente');
      console.log(`📍 Host: ${SERVER_HOST}`);
      console.log(`🔌 Puerto: ${PORT}`);
      console.log(`🌐 URL: http://${SERVER_HOST}:${PORT}`);
      console.log(`📊 Base de datos: ${process.env.DB_NAME}`);
      console.log(`👤 Autor: André Santiago`);
      console.log(`🐳 Container: backend-container-AndreSantiago`);
      console.log('========================================');
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

// Manejo de cierre graceful
process.on('SIGTERM', async () => {
  console.log('⚠️  SIGTERM recibido, cerrando servidor...');
  const { closePool } = require('./src/config/database');
  await closePool();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n  SIGINT recibido, cerrando servidor...');
  const { closePool } = require('./src/config/database');
  await closePool();
  process.exit(0);
});

// Iniciar servidor
startServer();

module.exports = app;