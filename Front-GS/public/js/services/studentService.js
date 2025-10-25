const StudentService = {
    /**
     * Realizar petición HTTP
     */
    async request(endpoint, options = {}) {
        const url = CONFIG.getUrl(endpoint);
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: CONFIG.TIMEOUT
        };
        
        const fetchOptions = { ...defaultOptions, ...options };
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);
            
            const response = await fetch(url, {
                ...fetchOptions,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Tiempo de espera agotado');
            }
            throw error;
        }
    },

    /**
     * Obtener todos los estudiantes
     */
    async getAll() {
        return await this.request(CONFIG.ENDPOINTS.STUDENTS);
    },

    /**
     * Obtener estudiante por ID
     */
    async getById(id) {
        return await this.request(`${CONFIG.ENDPOINTS.STUDENTS}/${id}`);
    },

    /**
     * Crear nuevo estudiante
     */
    async create(studentData) {
        return await this.request(CONFIG.ENDPOINTS.STUDENTS, {
            method: 'POST',
            body: JSON.stringify(studentData)
        });
    },

    /**
     * Actualizar estudiante
     */
    async update(id, studentData) {
        return await this.request(`${CONFIG.ENDPOINTS.STUDENTS}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(studentData)
        });
    },

    /**
     * Eliminar estudiante
     */
    async delete(id) {
        return await this.request(`${CONFIG.ENDPOINTS.STUDENTS}/${id}`, {
            method: 'DELETE'
        });
    },

    /**
     * Obtener estadísticas
     */
    async getStats() {
        return await this.request(CONFIG.ENDPOINTS.STATS);
    },

    /**
     * Obtener información del sistema
     */
    async getSystemInfo() {
        return await this.request(CONFIG.ENDPOINTS.INFO);
    },

    /**
     * Health check
     */
    async healthCheck() {
        const url = `${CONFIG.API_URL}/health`;
        const response = await fetch(url);
        return await response.json();
    }
};

// Hacer StudentService disponible globalmente
window.StudentService = StudentService;