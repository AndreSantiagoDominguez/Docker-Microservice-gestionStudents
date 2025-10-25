FROM node:18-alpine

# Metadatos con tu nombre
LABEL maintainer="André Santiago"
LABEL description="Frontend personalizado GestionStudents - André Santiago"

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Exponer puerto 3000
EXPOSE 3000

# Comando personalizado
CMD ["node", "server.js"]