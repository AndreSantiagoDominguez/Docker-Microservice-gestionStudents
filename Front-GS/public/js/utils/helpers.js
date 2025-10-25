/**
 * ========================================
 * Funciones Auxiliares
 * Autor: André Santiago
 * ========================================
 */

const Helpers = {
    /**
     * Calcular edad a partir de fecha de nacimiento
     */
    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    },

    /**
     * Formatear fecha a formato legible
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('es-MX', options);
    },

    /**
     * Formatear fecha para input type="date"
     */
    formatDateForInput(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    /**
     * Validar email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validar fecha de nacimiento
     */
    isValidBirthDate(birthDate) {
        const date = new Date(birthDate);
        const today = new Date();
        const age = this.calculateAge(birthDate);
        
        if (date > today) {
            return { valid: false, message: 'La fecha de nacimiento no puede ser futura' };
        }
        
        if (age < 15) {
            return { valid: false, message: 'El estudiante debe tener al menos 15 años' };
        }
        
        if (age > 100) {
            return { valid: false, message: 'Fecha de nacimiento inválida' };
        }
        
        return { valid: true };
    },

    /**
     * Escapar HTML para prevenir XSS
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    },

    /**
     * Mostrar notificación temporal
     */
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    /**
     * Debounce para optimizar búsquedas
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Hacer Helpers disponible globalmente
window.Helpers = Helpers;