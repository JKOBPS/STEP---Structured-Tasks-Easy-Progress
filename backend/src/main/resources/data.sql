-- -----------------------------------------------------------------------------
-- SCRIPT DE POBLACIÓN DE DATOS (SPRING BOOT DATA INITIALIZER)
-- Este script se ejecutará automáticamente por Spring Boot al iniciar la
-- aplicación si la base de datos está vacía o faltan los registros clave.
-- Usa INSERT IGNORE para no solaparse ni producir errores si se han insertado
-- previamente (por ejemplo, desde el Docker).
-- -----------------------------------------------------------------------------
SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

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
(1, 1, 'OWNER'),   
(1, 2, 'MEMBER'),  
(1, 3, 'VIEWER'),  
(2, 2, 'OWNER');   

-- Insertamos Columnas (Workflow Kanban) para los Proyectos
INSERT IGNORE INTO columns (id, name, project_id) VALUES 
(1, 'Backlog', 1),
(2, 'En Progreso', 1),
(3, 'Testeo UI', 1),
(4, 'Completado', 1),
(5, 'Planificación', 2),
(6, 'Ejecución', 2);

-- Insertamos Tareas y las asignamos a columnas y usuarios
INSERT IGNORE INTO tasks (id_task, title, description, priority, due_date, percentage, column_id, assigned_user) VALUES 
(1, 'Diseñar Base de Datos', 'Generar esquema E/R y crear contenedor Docker', 'HIGH', '2026-05-01', 100, 4, 1),
(2, 'Autenticación JWT', 'Configurar Spring Security interceptors', 'HIGH', '2026-05-15', 50, 2, 1),
(3, 'Crear maquetación en React', 'Vite, TailwindCSS y routing con React Router DOM', 'MEDIUM', '2026-05-20', 0, 1, 2),
(4, 'Testear Endpoints en Postman', 'Hacer colección general para comprobar CRUD completo', 'LOW', '2026-05-25', 10, 3, 3),
(5, 'Contratar instancias EC2', 'Levantar servidores t2.micro en Amazon AWS', 'HIGH', '2026-06-01', 100, 6, 2),
(6, 'Configurar Load Balancer', 'Asignar balanceadores de red', 'MEDIUM', '2026-06-10', 0, 5, 2);
