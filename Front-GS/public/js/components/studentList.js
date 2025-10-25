/**
 * ========================================
 * Componente de Lista de Estudiantes
 * Autor: André Santiago
 * ========================================
 */

const StudentList = {
    students: [],
    
    /**
     * Cargar estudiantes desde la API
     */
    async load() {
        const loadingContainer = document.getElementById('loadingContainer');
        const errorContainer = document.getElementById('errorContainer');
        const studentsGrid = document.getElementById('studentsGrid');
        const emptyState = document.getElementById('emptyState');
        
        try {
            // Mostrar loading
            loadingContainer.style.display = 'flex';
            errorContainer.style.display = 'none';
            emptyState.style.display = 'none';
            
            // Obtener estudiantes
            const response = await StudentService.getAll();
            this.students = response.data || [];
            
            // Ocultar loading
            loadingContainer.style.display = 'none';
            
            // Renderizar
            if (this.students.length === 0) {
                emptyState.style.display = 'block';
                studentsGrid.style.display = 'none';
            } else {
                emptyState.style.display = 'none';
                studentsGrid.style.display = 'grid';
                this.render();
            }
            
            // Cargar estadísticas
            await this.loadStats();
            
        } catch (error) {
            console.error('Error cargando estudiantes:', error);
            loadingContainer.style.display = 'none';
            errorContainer.style.display = 'block';
            document.getElementById('errorMessage').textContent = 
                error.message || CONFIG.MESSAGES.ERROR_NETWORK;
        }
    },

    /**
     * Cargar estadísticas
     */
    async loadStats() {
        try {
            const response = await StudentService.getStats();
            const stats = response.data;
            
            document.getElementById('totalStudents').textContent = stats.total || 0;
            document.getElementById('avgAge').textContent = 
                stats.avgAge ? `${stats.avgAge} años` : 'N/A';
        } catch (error) {
            console.error('Error cargando estadísticas:', error);
        }
    },

    /**
     * Renderizar lista de estudiantes
     */
    render() {
        const grid = document.getElementById('studentsGrid');
        
        // Mantener la tarjeta de estadísticas
        const statsCard = grid.querySelector('.stats-card');
        
        // Limpiar el resto
        grid.innerHTML = '';
        grid.appendChild(statsCard);
        
        // Renderizar cada estudiante
        this.students.forEach(student => {
            const card = this.createStudentCard(student);
            grid.appendChild(card);
        });
    },

    /**
     * Crear tarjeta de estudiante
     */
    createStudentCard(student) {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.setAttribute('data-id', student.id);
        
        const age = student.age || Helpers.calculateAge(student.birth_date);
        const birthDateFormatted = Helpers.formatDate(student.birth_date);
        
        card.innerHTML = `
            <div class="student-header">
                <h3>${Helpers.escapeHtml(student.name)}</h3>
                <div class="student-actions">
                    <button class="btn-icon btn-edit" onclick="StudentList.edit(${student.id})" title="Editar">
                        ✏️
                    </button>
                    <button class="btn-icon btn-delete" onclick="StudentList.delete(${student.id})" title="Eliminar">
                        🗑️
                    </button>
                </div>
            </div>
            <div class="student-body">
                <p><strong>📧 Email:</strong> ${Helpers.escapeHtml(student.email)}</p>
                <p><strong>🎂 Edad:</strong> ${age} años</p>
                <p><strong>📅 Fecha de Nacimiento:</strong> ${birthDateFormatted}</p>
                ${student.career ? `<p><strong>🎓 Carrera:</strong> ${Helpers.escapeHtml(student.career)}</p>` : ''}
                <p class="student-date">
                    <small>📅 Registrado: ${new Date(student.created_at).toLocaleString('es-MX')}</small>
                </p>
            </div>
        `;
        
        return card;
    },

    /**
     * Editar estudiante
     */
    async edit(id) {
        try {
            const response = await StudentService.getById(id);
            const student = response.data;
            
            // Pasar datos al formulario
            window.StudentForm.loadStudent(student);
        } catch (error) {
            console.error('Error cargando estudiante:', error);
            Helpers.showNotification('Error al cargar estudiante', 'error');
        }
    },

    /**
     * Eliminar estudiante
     */
    async delete(id) {
        if (!confirm(CONFIG.MESSAGES.CONFIRM_DELETE)) {
            return;
        }
        
        try {
            await StudentService.delete(id);
            Helpers.showNotification(CONFIG.MESSAGES.SUCCESS_DELETE, 'success');
            await this.load();
        } catch (error) {
            console.error('Error eliminando estudiante:', error);
            Helpers.showNotification('Error al eliminar estudiante', 'error');
        }
    }
};

// Hacer StudentList disponible globalmente
window.StudentList = StudentList;