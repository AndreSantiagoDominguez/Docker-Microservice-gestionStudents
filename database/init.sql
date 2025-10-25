-- Usar la base de datos
USE students_db_AndreSantiago;

-- Crear tabla de estudiantes con campos CRUD
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único del estudiante',
    name VARCHAR(100) NOT NULL COMMENT 'Nombre completo del estudiante',
    email VARCHAR(100) UNIQUE NOT NULL COMMENT 'Correo electrónico único',
    birth_date DATE NOT NULL COMMENT 'Fecha de nacimiento del estudiante',
    career VARCHAR(100) COMMENT 'Carrera que estudia',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del registro',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización',
    INDEX idx_email (email),
    INDEX idx_name (name),
    INDEX idx_birth_date (birth_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla de estudiantes del sistema';

-- Insertar datos de ejemplo
INSERT INTO students (name, email, birth_date, career) VALUES
    ('André Santiago López Pérez', 'andre.santiago@universidad.edu', '2003-05-14', 'Ingeniería en Software'),
    ('María Fernanda López Hernández', 'maria.lopez@universidad.edu', '2004-08-09', 'Ingeniería de Software'),
    ('Carlos Eduardo Martínez García', 'carlos.martinez@universidad.edu', '2002-02-11', 'Ciencias de la Computación'),
    ('Ana Patricia Rodríguez Sánchez', 'ana.rodriguez@universidad.edu', '2005-10-21', 'Ingeniería en Redes'),
    ('Roberto Alejandro Gómez Torres', 'roberto.gomez@universidad.edu', '2001-03-30', 'Ingeniería en Sistemas'),
    ('Laura Daniela Pérez Ramírez', 'laura.perez@universidad.edu', '2003-12-15', 'Desarrollo de Software')
ON DUPLICATE KEY UPDATE name=name;

-- Crear función para calcular edad a partir de fecha de nacimiento
DELIMITER $$
CREATE FUNCTION IF NOT EXISTS calculate_age(birth_date DATE) 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE age INT;
    SET age = TIMESTAMPDIFF(YEAR, birth_date, CURDATE());
    RETURN age;
END$$
DELIMITER ;

-- Crear vista con edad calculada
CREATE OR REPLACE VIEW students_with_age AS
SELECT 
    id,
    name,
    email,
    birth_date,
    calculate_age(birth_date) AS age,
    career,
    created_at,
    updated_at
FROM students;

-- Trigger para validar fecha de nacimiento
DELIMITER $$
CREATE TRIGGER IF NOT EXISTS validate_birth_date_before_insert
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
    IF NEW.birth_date > CURDATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La fecha de nacimiento no puede ser futura';
    END IF;
    
    IF TIMESTAMPDIFF(YEAR, NEW.birth_date, CURDATE()) < 15 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El estudiante debe tener al menos 15 años';
    END IF;
    
    IF TIMESTAMPDIFF(YEAR, NEW.birth_date, CURDATE()) > 100 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Fecha de nacimiento inválida';
    END IF;
END$$

CREATE TRIGGER IF NOT EXISTS validate_birth_date_before_update
BEFORE UPDATE ON students
FOR EACH ROW
BEGIN
    IF NEW.birth_date > CURDATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La fecha de nacimiento no puede ser futura';
    END IF;
    
    IF TIMESTAMPDIFF(YEAR, NEW.birth_date, CURDATE()) < 15 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El estudiante debe tener al menos 15 años';
    END IF;
    
    IF TIMESTAMPDIFF(YEAR, NEW.birth_date, CURDATE()) > 100 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Fecha de nacimiento inválida';
    END IF;
END$$
DELIMITER ;

-- Comentarios descriptivos de la base de datos
ALTER TABLE students COMMENT = 'Tabla principal de estudiantes - Sistema GestionStudents by André Santiago';

-- Mensaje de éxito
SELECT '========================================' AS '';
SELECT 'Base de datos students_db_AndreSantiago inicializada correctamente' AS 'MENSAJE';
SELECT '========================================' AS '';
SELECT CONCAT('Total de estudiantes registrados: ', COUNT(*)) AS 'ESTADÍSTICAS' FROM students;
SELECT CONCAT('Autor del sistema: André Santiago') AS 'INFORMACIÓN';
SELECT '========================================' AS '';