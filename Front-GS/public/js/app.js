// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    console.log('========================================');
    console.log('🚀 GestionStudents - Iniciando aplicación');
    console.log(`👤 Autor: ${CONFIG.APP.AUTHOR}`);
    console.log(`📦 Versión: ${CONFIG.APP.VERSION}`);
    console.log(`🐳 Container: ${CONFIG.APP.CONTAINER}`);
    console.log(`🔗 API: ${CONFIG.API_URL}`);
    console.log('========================================');
    
    // Inicializar componentes
    StudentForm.init();
    
    // Event listeners para botones principales
    document.getElementById('btnNewStudent').addEventListener('click', () => {
        StudentForm.reset();
        StudentForm.show();
    });
    
    document.getElementById('btnRefresh').addEventListener('click', () => {
        StudentList.load();
    });
    
    document.getElementById('btnRetry').addEventListener('click', () => {
        StudentList.load();
    });
    
    // Cargar información del sistema
    try {
        const systemInfo = await StudentService.getSystemInfo();
        document.getElementById('authorName').textContent = systemInfo.autor.nombre;
        console.log('✓ Información del sistema cargada');
    } catch (error) {
        console.warn('⚠ No se pudo cargar información del sistema:', error);
    }
    
    // Cargar estudiantes inicialmente
    await StudentList.load();
    
    // Health check periódico (cada 60 segundos)
    setInterval(async () => {
        try {
            await StudentService.healthCheck();
            console.log('✓ Health check OK');
        } catch (error) {
            console.error('✗ Health check failed:', error);
        }
    }, 60000);
});

// Manejo de errores globales
window.addEventListener('error', (event) => {
    console.error('Error global capturado:', event.error);
});

// Manejo de promesas rechazadas
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rechazada:', event.reason);
});