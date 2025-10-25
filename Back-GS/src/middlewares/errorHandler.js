const errorHandler = (err, req, res, next) => {
  console.error('Error capturado:', err);

  // Error de MySQL
  if (err.code) {
    switch (err.code) {
      case 'ER_DUP_ENTRY':
        return res.status(409).json({
          success: false,
          error: 'El registro ya existe',
          details: 'Email duplicado'
        });
      
      case 'ER_NO_REFERENCED_ROW':
      case 'ER_NO_REFERENCED_ROW_2':
        return res.status(400).json({
          success: false,
          error: 'Referencia inválida',
          details: err.message
        });
      
      case 'ER_BAD_FIELD_ERROR':
        return res.status(400).json({
          success: false,
          error: 'Campo inválido',
          details: err.message
        });
      
      case 'ECONNREFUSED':
        return res.status(503).json({
          success: false,
          error: 'Error de conexión a la base de datos'
        });
    }
  }

  // Error de validación personalizado
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Error de validación',
      details: err.message
    });
  }

  // Error genérico
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;