const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Servir archivos estáticos desde múltiples ubicaciones
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname))); // Para archivos en raíz como app.js
app.use(express.static(path.join(__dirname, 'utils'))); // Para la carpeta utils

// Rutas específicas para archivos en diferentes ubicaciones
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/src/css', express.static(path.join(__dirname, 'src'))); // Para styles.css en src

// Servir archivos JS desde sus diferentes ubicaciones
app.use('/js/components', express.static(path.join(__dirname, 'public', 'js', 'components')));
app.use('/js/config', express.static(path.join(__dirname, 'public', 'js', 'config')));
app.use('/js/services', express.static(path.join(__dirname, 'public', 'js', 'services')));
app.use('/js/utils', express.static(path.join(__dirname, 'utils'))); // helpers.js en utils
app.use('/js', express.static(path.join(__dirname))); // app.js en raíz

// Ruta principal - sirve el index.html desde src
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Para SPA - todas las rutas sirven el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('========================================');
  console.log('🚀 GestionStudents - Servidor personalizado');
  console.log('👤 Desarrollado por: André Santiago');
  console.log('📁 Estructura actual sin cambios');
  console.log(`📍 Puerto: ${PORT}`);
  console.log('✅ Servidor corriendo correctamente');
  console.log('========================================');
});