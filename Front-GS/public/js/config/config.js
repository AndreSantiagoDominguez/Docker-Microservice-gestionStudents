const CONFIG = {
    // URL de la API Backend
    API_URL: 'http://54.160.112.30:5000',
    API_PREFIX: '/api',
    
    // Endpoints
    ENDPOINTS: {
        STUDENTS: '/students',
        STATS: '/students/stats',
        INFO: '/info',
        HEALTH: '/health'
    },
    
    // Configuración de la aplicación
    APP: {
        NAME: 'GestionStudents',
        VERSION: '1.0.0',
        AUTHOR: 'André Santiago',
        CONTAINER: 'frontend-container-AndreSantiago'
    },
    
    // Timeouts y límites
    TIMEOUT: 10000, // 10 segundos
    MAX_RETRIES: 3,
    
    // Mensajes
    MESSAGES: {
        LOADING: 'Cargando datos...',
        ERROR_NETWORK: 'Error de conexión. Verifica que el backend esté corriendo.',
        ERROR_SERVER: 'Error del servidor. Intenta nuevamente.',
        SUCCESS_CREATE: 'Estudiante creado exitosamente',
        SUCCESS_UPDATE: 'Estudiante actualizado exitosamente',
        SUCCESS_DELETE: 'Estudiante eliminado exitosamente',
        CONFIRM_DELETE: '¿Estás seguro de eliminar este estudiante?'
    }
};

// Función para construir URL completa
CONFIG.getUrl = function(endpoint) {
    return `${this.API_URL}${this.API_PREFIX}${endpoint}`;
};

// Hacer CONFIG disponible globalmente
window.CONFIG = CONFIG;