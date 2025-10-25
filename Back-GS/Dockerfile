FROM node:18-alpine

# Justificación técnica: node:18-alpine
# - Node.js 18 LTS: Versión estable con soporte a largo plazo
# - Alpine Linux: Imagen ligera (~150MB vs ~900MB de node:18)
# - Incluye npm para gestión de dependencias
# - Compatible con mysql2 y express

LABEL maintainer="andre.santiago@universidad.edu"
LABEL description="Backend API REST - GestionStudents"
LABEL author="André Santiago"
LABEL version="1.0.0"

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar código fuente
COPY . .

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Cambiar a usuario no-root
USER nodejs

# Exponer puerto
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node /app/src/utils/healthcheck.js || exit 1

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=5000

# Comando de inicio
CMD ["node", "server.js"]