const mysql = require('mysql2/promise');
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_CONNECTION_LIMIT,
  DB_QUEUE_LIMIT
} = require('./environment');

// Crear pool de conexiones
const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: DB_CONNECTION_LIMIT,
  queueLimit: DB_QUEUE_LIMIT,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  timezone: 'Z',
  dateStrings: true
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Conexión a MySQL establecida');
    console.log(`  - Host: ${DB_HOST}:${DB_PORT}`);
    console.log(`  - Base de datos: ${DB_NAME}`);
    console.log(`  - Usuario: ${DB_USER}`);
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error.message);
    throw error;
  }
};

const closePool = async () => {
  try {
    await pool.end();
    console.log('✓ Pool de conexiones cerrado correctamente');
  } catch (error) {
    console.error('❌ Error al cerrar pool:', error.message);
    throw error;
  }
};

const query = async (sql, params = []) => {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    console.error('Error en query:', error.message);
    throw error;
  }
};

module.exports = {
  pool,
  testConnection,
  closePool,
  query
};