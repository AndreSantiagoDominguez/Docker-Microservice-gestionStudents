module.exports = {
  // Servidor
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT) || 5000,
  SERVER_HOST: process.env.SERVER_HOST || '0.0.0.0',
  API_PREFIX: process.env.API_PREFIX || '/api',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',

  // Base de datos
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT) || 3306,
  DB_NAME: process.env.DB_NAME || 'students_db_AndreSantiago',
  DB_USER: process.env.DB_USER || 'admin_AndreSantiago',
  DB_PASSWORD: process.env.DB_PASSWORD || 'SecurePass2024_AndreSantiago!',
  DB_CONNECTION_LIMIT: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
  DB_QUEUE_LIMIT: parseInt(process.env.DB_QUEUE_LIMIT) || 0,

  // Información del autor
  AUTHOR_NAME: process.env.AUTHOR_NAME || 'André Santiago',
  AUTHOR_EMAIL: process.env.AUTHOR_EMAIL || 'andre.santiago@universidad.edu',

  // Logs
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};