const { pool } = require('../config/database');
const { AUTHOR_NAME, AUTHOR_EMAIL, NODE_ENV, DB_NAME } = require('../config/environment');

class SystemController {
  static async health(req, res, next) {
    try {
      // Verificar conexión a base de datos
      let dbStatus = 'disconnected';
      try {
        await pool.query('SELECT 1');
        dbStatus = 'connected';
      } catch (error) {
        dbStatus = 'error';
      }

      const healthStatus = {
        status: dbStatus === 'connected' ? 'healthy' : 'unhealthy',
        service: 'backend-AndreSantiago',
        container: 'backend-container-AndreSantiago',
        database: {
          status: dbStatus,
          name: DB_NAME
        },
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: NODE_ENV
      };

      const statusCode = dbStatus === 'connected' ? 200 : 503;
      res.status(statusCode).json(healthStatus);
    } catch (error) {
      next(error);
    }
  }

  static async info(req, res, next) {
    try {
      res.json({
        sistema: 'GestionStudents',
        descripcion: 'Sistema de gestión de estudiantes con arquitectura de microservicios',
        version: '1.0.0',
        autor: {
          nombre: AUTHOR_NAME,
          email: AUTHOR_EMAIL
        },
        tecnologias: {
          frontend: 'HTML + JavaScript',
          backend: 'Node.js + Express',
          database: 'MySQL 8.0',
          containerization: 'Docker + Docker Compose'
        },
        arquitectura: 'Microservicios con 3 contenedores',
        contenedores: {
          frontend: 'frontend-container-AndreSantiago',
          backend: 'backend-container-AndreSantiago',
          database: 'database-container-AndreSantiago'
        },
        baseDatos: DB_NAME,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SystemController;