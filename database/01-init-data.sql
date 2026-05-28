-- -----------------------------------------------------------------------------
-- SCRIPT DE INICIALIZACIÓN DE DATOS (DOCKER ENTRYPOINT)
-- Para que este script no falle la primera vez (antes de que Spring Boot 
-- lance su Hibernate), creamos las tablas mínimas y luego insertamos la data.
-- -----------------------------------------------------------------------------
SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

CREATE DATABASE IF NOT EXISTS step_app_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
  
USE step_app_db;

-- 1. ESTRUCTURAS DE TABLAS 
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description LONGTEXT,
    created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS project_memberships (
    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS columns (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    project_id BIGINT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
    id_task BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description LONGTEXT,
    priority VARCHAR(50) NOT NULL,
    due_date DATE,
    percentage INT NOT NULL,
    column_id BIGINT NOT NULL,
    assigned_user BIGINT,
    FOREIGN KEY (column_id) REFERENCES columns(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_user) REFERENCES users(id) ON DELETE SET NULL
);

-- -----------------------------------------------------------------------------
-- 2. POBLACIÓN DE DATOS PARA PRUEBAS
-- NOTA: El hash de las contraseñas es BCrypt. 
-- El hash proporcionado equivale a la contraseña en texto plano: "123456"
-- -----------------------------------------------------------------------------

-- Insertamos Usuarios
INSERT IGNORE INTO users (id, username, password, email, role) VALUES 
(1, 'jacob_admin', '$2a$10$H/NXSypzOyzHrdzikSXIGeFqAXgW00woHE3jXrLY62ST2rGqiFh5O', 'jacob@test.com', 'USER'),
(2, 'desarrollador_1', '$2a$10$H/NXSypzOyzHrdzikSXIGeFqAXgW00woHE3jXrLY62ST2rGqiFh5O', 'dev1@test.com', 'USER'),
(3, 'tester_qa', '$2a$10$H/NXSypzOyzHrdzikSXIGeFqAXgW00woHE3jXrLY62ST2rGqiFh5O', 'qa@test.com', 'USER');

-- Insertamos Proyectos
INSERT IGNORE INTO projects (id, name, description, created_at) VALUES 
(1, 'Lanzamiento STEP V1', 'Proyecto final para el ciclo de DAW, incluye Frontend y Backend.', NOW()),
(2, 'Migración de Servidores', 'Mover la infraestructura on-premise hacia AWS', NOW());

-- Insertamos Relaciones y Roles en el Proyecto
INSERT IGNORE INTO project_memberships (project_id, user_id, role) VALUES 
(1, 1, 'OWNER'),   -- jacob_admin es propietario del proyecto 1
(1, 2, 'MEMBER'),  -- desarrollador_1 es miembro
(1, 3, 'VIEWER'),  -- tester_qa solo ve
(2, 2, 'OWNER');   -- desarrollador_1 es propietario del proyecto 2

-- Insertamos Columnas (Workflow Kanban) para los Proyectos
-- Columnas Proyecto 1
INSERT IGNORE INTO columns (id, name, project_id) VALUES 
(1, 'Backlog', 1),
(2, 'En Progreso', 1),
(3, 'Testeo UI', 1),
(4, 'Completado', 1);

-- Columnas Proyecto 2
INSERT IGNORE INTO columns (id, name, project_id) VALUES 
(5, 'Planificación', 2),
(6, 'Ejecución', 2);

-- Insertamos Tareas y las asignamos a columnas y usuarios
INSERT IGNORE INTO tasks (id_task, title, description, priority, due_date, percentage, column_id, assigned_user) VALUES 
-- Tareas Proyecto 1
(1, 'Diseñar Base de Datos', 'Generar esquema E/R y crear contenedor Docker', 'HIGH', '2026-05-01', 100, 4, 1),
(2, 'Autenticación JWT', 'Configurar Spring Security interceptors', 'HIGH', '2026-05-15', 50, 2, 1),
(3, 'Crear maquetación en React', 'Vite, TailwindCSS y routing con React Router DOM', 'MEDIUM', '2026-05-20', 0, 1, 2),
(4, 'Testear Endpoints en Postman', 'Hacer colección general para comprobar CRUD completo', 'LOW', '2026-05-25', 10, 3, 3),

-- Tareas Proyecto 2
(5, 'Contratar instancias EC2', 'Levantar servidores t2.micro en Amazon AWS', 'HIGH', '2026-06-01', 100, 6, 2),
(6, 'Configurar Load Balancer', 'Asignar balanceadores de red', 'MEDIUM', '2026-06-10', 0, 5, 2);
