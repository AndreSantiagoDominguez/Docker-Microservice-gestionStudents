GestionStudents - Sistema de Gestión de Estudiantes
Autor: André Santiago
Versión: 1.0.0
IP EC2: 54.160.112.30

Sistema completo de gestión de estudiantes con arquitectura de microservicios usando Docker Compose.

Descripción del Proyecto
Sistema modular con 3 contenedores Docker interconectados:

Frontend: HTML + JavaScript (Vanilla JS)
Backend: Node.js + Express (arquitectura modular)
Base de Datos: MySQL 8.0 con persistencia
🏗️ Arquitectura del Sistema
┌─────────────────────────────────────┐
│         Usuario (Browser)           │
│         http://54.160.112.30        │
└──────────────┬──────────────────────┘
               │ HTTP (Puerto 80)
               ▼
┌─────────────────────────────────────┐
│    Frontend (HTML + JavaScript)     │
│    Container: frontend-container    │
│             -AndreSantiago          │
│    - Interfaz modular               │
│    - Vanilla JavaScript             │
│    - Nginx como servidor web        │
└──────────────┬──────────────────────┘
               │ REST API
               │ http://backend-AndreSantiago:5000/api
               ▼
┌─────────────────────────────────────┐
│    Backend (Node.js + Express)      │
│    Container: backend-container     │
│             -AndreSantiago          │
│    - Arquitectura modular           │
│    - Controllers / Routes / Models  │
│    - Middlewares / Validators       │
└──────────────┬──────────────────────┘
               │ MySQL Connection
               │ Host: database-AndreSantiago:3306
               ▼
┌─────────────────────────────────────┐
│    Base de Datos (MySQL 8.0)        │
│    Container: database-container    │
│             -AndreSantiago          │
│    - DB: students_db_AndreSantiago  │
│    - Tabla: students                │
│    - Campo: birth_date (no age)     │
│    - Volumen persistente            │
└─────────────────────────────────────┘

📦 Estructura del Proyecto
gestionstudents/
├── .env                                    # Variables globales
├── .gitignore
├── docker-compose.yml                      # Orquestación
├── README.md
│
├── frontend/                               # Frontend HTML + JS
│   ├── .env
│   ├── Dockerfile
│   ├── server.js
│   ├── package.json
│   └── public/
│       ├── index.html
│       ├── css/
│       │   ├── styles.css
│       │   └── components.css
│       ├── js/
│       │   ├── config/
│       │   │   └── config.js              # Configuración API
│       │   ├── services/
│       │   │   └── studentService.js      # Servicio HTTP
│       │   ├── components/
│       │   │   ├── studentList.js         # Lista de estudiantes
│       │   │   └── studentForm.js         # Formulario
│       │   ├── utils/
│       │   │   └── helpers.js             # Funciones auxiliares
│       │   └── app.js                     # App principal
│       └── assets/
│           └── favicon.ico
│
├── backend/                                # Backend Node.js Modular
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js                          # Punto de entrada
│   └── src/
│       ├── config/
│       │   ├── database.js                # Pool MySQL
│       │   └── environment.js             # Variables de entorno
│       ├── controllers/
│       │   ├── studentController.js       # Lógica de estudiantes
│       │   └── systemController.js        # Info del sistema
│       ├── routes/
│       │   ├── index.js                   # Enrutador principal
│       │   ├── studentRoutes.js           # Rutas CRUD
│       │   └── systemRoutes.js            # Rutas de sistema
│       ├── middlewares/
│       │   ├── errorHandler.js            # Manejo de errores
│       │   ├── validator.js               # Validaciones
│       │   └── logger.js                  # Logger HTTP
│       ├── models/
│       │   └── studentModel.js            # Modelo de datos
│       └── utils/
│           ├── healthcheck.js             # Health check
│           └── helpers.js                 # Utilidades
│
└── database/                               # Base de datos
    ├── .env
    └── init.sql                           # Script de inicialización


Paso 1: Preparar EC2

# Conectar a EC2
ssh -i tu-llave.pem ubuntu@54.160.112.30

# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
sudo apt install -y docker.io docker-compose

# Agregar usuario a grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Verificar instalación
docker --version
docker-compose --version
Paso 2: Clonar Repositorio

# Clonar desde GitHub
git clone https://github.com/TU_USUARIO/gestionstudents.git
cd gestionstudents
Paso 3: Levantar Contenedores

# Construir y levantar servicios
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Verificar estado
docker-compose ps
Orden de Arranque Automático:
✅ database-AndreSantiago (MySQL)
✅ backend-AndreSantiago (Node.js - espera a DB)
✅ frontend-AndreSantiago (HTML - espera a Backend)
🌐 Acceso a la Aplicación
Una vez desplegado en EC2:

Frontend: http://54.160.112.30
Backend API: http://54.160.112.30:5000
API Info: http://54.160.112.30:5000/api/info
Health Check: http://54.160.112.30:5000/health
📊 Endpoints de la API
Sistema
GET / - Información general de la API
GET /health - Estado del backend y BD
GET /api/info - Información del sistema y autor
CRUD de Estudiantes
GET /api/students - Listar todos los estudiantes
GET /api/students/stats - Estadísticas
GET /api/students/:id - Obtener por ID
POST /api/students - Crear estudiante
PUT /api/students/:id - Actualizar estudiante
DELETE /api/students/:id - Eliminar estudiante
Ejemplo de Petición:

# Crear estudiante
curl -X POST http://54.160.112.30:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan.perez@universidad.edu",
    "birth_date": "2003-05-14",
    "career": "Ingeniería en Sistemas"
  }'
Respuesta:

json
{
  "success": true,
  "message": "Estudiante creado exitosamente",
  "data": {
    "id": 7,
    "name": "Juan Pérez",
    "email": "juan.perez@universidad.edu",
    "birth_date": "2003-05-14",
    "age": 21,
    "career": "Ingeniería en Sistemas",
    "created_at": "2024-10-24T10:30:00.000Z",
    "updated_at": "2024-10-24T10:30:00.000Z"
  }
}
💾 Persistencia de Datos
Volumen Nombrado:
yaml
volumes:
  mysql-data-AndreSantiago:
    name: mysql-volume-AndreSantiago
Prueba de Persistencia:

# 1. Crear algunos estudiantes
# 2. Detener contenedores
docker-compose down

# 3. Levantar nuevamente
docker-compose up -d

# 4. Verificar que los datos persisten
Eliminar Datos Completamente:

docker-compose down -v  # ⚠️ Elimina TODOS los datos
🔧 Comandos Útiles

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend-AndreSantiago

# Reiniciar un servicio
docker-compose restart backend-AndreSantiago

# Detener servicios
docker-compose down

# Reconstruir imágenes
docker-compose build --no-cache

# Ver estado
docker-compose ps

# Ejecutar comando en contenedor
docker exec -it backend-container-AndreSantiago sh

# Ver volúmenes
docker volume ls

# Inspeccionar red
docker network inspect students-network-AndreSantiago
🔒 Variables de Entorno
El proyecto usa 4 archivos .env:

1. .env (Raíz)
env
PROJECT_NAME=gestionstudents
AUTHOR=AndreSantiago
EC2_PUBLIC_IP=54.160.112.30
2. frontend/.env
env
API_URL=http://54.160.112.30:5000
API_PREFIX=/api
APP_NAME=GestionStudents
AUTHOR_NAME=André Santiago
3. backend/.env
env
NODE_ENV=production
PORT=5000
DB_HOST=database-AndreSantiago
DB_PORT=3306
DB_NAME=students_db_AndreSantiago
DB_USER=admin_AndreSantiago
DB_PASSWORD=SecurePass2024_AndreSantiago!
AUTHOR_NAME=André Santiago
AUTHOR_EMAIL=andre.santiago@universidad.edu
4. database/.env
env
MYSQL_ROOT_PASSWORD=RootSecure2024_AndreSantiago!
MYSQL_DATABASE=students_db_AndreSantiago
MYSQL_USER=admin_AndreSantiago
MYSQL_PASSWORD=SecurePass2024_AndreSantiago!
Nota: Para subir a GitHub, descomenta las líneas en .gitignore que ignoran los archivos .env (si quieres proteger las credenciales).

📊 Esquema de Base de Datos
Tabla: students
Campo	Tipo	Descripción
id	INT (PK, AUTO_INCREMENT)	Identificador único
name	VARCHAR(100) NOT NULL	Nombre completo
email	VARCHAR(100) UNIQUE NOT NULL	Email único
birth_date	DATE NOT NULL	Fecha de nacimiento
career	VARCHAR(100)	Carrera (opcional)
created_at	TIMESTAMP	Fecha de creación
updated_at	TIMESTAMP	Fecha de actualización
Características:
✅ Cálculo automático de edad desde birth_date
✅ Triggers de validación (edad entre 15-100 años)
✅ Función calculate_age() en MySQL
✅ Vista students_with_age con edad calculada
✅ Índices en email, name, birth_date
🧪 Pruebas de Funcionalidad
1. Verificar Frontend

curl http://54.160.112.30
# Debe retornar HTML de la aplicación
2. Verificar Backend

curl http://54.160.112.30:5000/health
# Respuesta: {"status":"healthy",...}
3. Verificar Base de Datos

docker exec -it database-container-AndreSantiago mysql \
  -u admin_AndreSantiago -pSecurePass2024_AndreSantiago! \
  -e "USE students_db_AndreSantiago; SELECT COUNT(*) FROM students;"
4. Pruebas CRUD Completas
Crear:


curl -X POST http://54.160.112.30:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","birth_date":"2000-01-01","career":"Testing"}'
Leer:


curl http://54.160.112.30:5000/api/students
Actualizar:


curl -X PUT http://54.160.112.30:5000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","email":"updated@test.com","birth_date":"2000-01-01","career":"Updated"}'
Eliminar:


curl -X DELETE http://54.160.112.30:5000/api/students/1
🐛 Troubleshooting
Error: "Cannot connect to backend"

# Verificar que el backend esté corriendo
docker logs backend-container-AndreSantiago

# Verificar health check
curl http://54.160.112.30:5000/health
Error: "Database connection failed"

# Verificar logs de MySQL
docker logs database-container-AndreSantiago

# Verificar que MySQL esté listo
docker exec database-container-AndreSantiago mysqladmin ping -h localhost
Puerto 80 ya en uso

# Encontrar proceso
sudo lsof -i :80

# Detener Apache/Nginx si existe
sudo systemctl stop apache2
sudo systemctl stop nginx

# O cambiar puerto en docker-compose.yml
ports:
  - "8080:80"  # Usar puerto 8080 en lugar de 80
Reconstruir desde cero

# Detener y eliminar todo
docker-compose down -v

# Limpiar imágenes
docker system prune -a

# Reconstruir
docker-compose up --build -d
🔍 Verificación de Contenedores

# Estado de los 3 contenedores
docker-compose ps

# Deberías ver:
NAME                              STATUS    PORTS
database-container-AndreSantiago  Up        0.0.0.0:3306->3306/tcp
backend-container-AndreSantiago   Up        0.0.0.0:5000->5000/tcp
frontend-container-AndreSantiago  Up        0.0.0.0:80->80/tcp

# Verificar red
docker network inspect students-network-AndreSantiago

# Verificar volumen
docker volume inspect mysql-volume-AndreSantiago

# Ver recursos usados
docker stats
📚 Tecnologías Utilizadas
Frontend
HTML5: Estructura semántica
CSS3: Variables CSS, Flexbox, Grid
JavaScript (ES6+): Módulos, Async/Await, Fetch API
server personalizado con node

Backend
Node.js 18: Runtime de JavaScript
Express: Framework web minimalista
mysql2: Driver oficial de MySQL con soporte de promesas
express-validator: Validación de datos
Helmet: Headers de seguridad
CORS: Cross-Origin Resource Sharing
Morgan: Logger HTTP

Base de Datos
MySQL 8.0: Sistema de gestión de BD relacional
InnoDB: Motor de almacenamiento transaccional

DevOps
Docker: Contenedorización
Docker Compose: Orquestación multi-contenedor
AWS EC2: Infraestructura en la nube

🎯 Flujo de Datos Completo
Ejemplo: Crear un Estudiante
Usuario llena formulario en el navegador (http://54.160.112.30)
Frontend valida datos con JavaScript
Frontend envía POST a http://54.160.112.30:5000/api/students
Backend recibe en studentController.create()
Backend valida con express-validator
Backend verifica email único con studentModel.emailExists()
Backend ejecuta INSERT en MySQL:
sql
   INSERT INTO students (name, email, birth_date, career) 
   VALUES ('Juan', 'juan@email.com', '2003-05-14', 'Ingeniería');
MySQL valida con trigger (edad >= 15 años)
MySQL guarda en disco (volumen persistente)
Backend retorna JSON con estudiante creado
Frontend recibe respuesta y actualiza lista
Usuario ve el nuevo estudiante en la interfaz


1. Justificación de Imágenes Base
node:18-alpine (Backend): Node.js LTS con Alpine Linux (~150MB vs ~900MB)
mysql:8.0 (Database): Imagen oficial mantenida por Oracle

2. Seguridad Implementada
✅ Usuarios no-root en contenedores
✅ Helmet para headers HTTP seguros
✅ Validación de datos en backend y frontend
✅ Triggers de validación en MySQL
✅ CORS configurado
✅ Health checks en todos los servicios

3. Modularidad del Backend
src/
├── config/        # Configuraciones (DB, env)
├── controllers/   # Lógica de negocio
├── routes/        # Definición de endpoints
├── middlewares/   # Validación, errores, logs
├── models/        # Acceso a datos
└── utils/         # Funciones auxiliares
4. Modularidad del Frontend
public/js/
├── config/        # Configuración de API
├── services/      # Peticiones HTTP
├── components/    # Componentes UI
├── utils/         # Funciones auxiliares
└── app.js         # Inicialización
👨‍💻 Autor
André Santiago

Email: andre.santiago@universidad.edu
Proyecto: Arquitectura de Microservicios con Docker
Universidad: [Tu Universidad]
Materia: [Nombre de la Materia]
🔗 Repositorio GitHub
URL: https://github.com/TU_USUARIO/gestionstudents

Subir a GitHub:

# Inicializar Git
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "feat: Sistema completo de gestión de estudiantes

- Frontend: HTML + JavaScript modular
- Backend: Node.js + Express (arquitectura modular)
- Database: MySQL 8.0 con birth_date
- Docker Compose con 3 contenedores
- Configurado para EC2 (54.160.112.30)
- Autor: André Santiago"

# Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/gestionstudents.git
git branch -M main
git push -u origin main

📖 Documentación Adicional
Acceder a MySQL desde terminal:

docker exec -it database-container-AndreSantiago mysql \
  -u admin_AndreSantiago -pSecurePass2024_AndreSantiago! \
  students_db_AndreSantiago
Ver tabla students:
sql
USE students_db_AndreSantiago;
DESCRIBE students;
SELECT * FROM students;
Ver edad calculada:
sql
SELECT name, birth_date, 
       TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) as age 
FROM students;



# Docker-Microservice-gestionStudents
