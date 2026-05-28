# STEP - Structured Tasks, Easy Progress 🚀

> "Tareas estructuradas, fácil progreso"

**STEP** es una plataforma de gestión de proyectos diseñada para desglosar objetivos complejos en pasos manejables. Basada en la metodología de "divide y vencerás", la aplicación ayuda a usuarios y equipos a organizar desafíos de gran envergadura (como proyectos de software, reformas o preparación de eventos) sin sentirse abrumados.

---

## 📌 Estado del Proyecto: **Backend en Desarrollo** 🛠️

Actualmente, el repositorio contiene el **Core del Backend**. El desarrollo del Frontend (React) comenzará próximamente. Este proyecto es mi Trabajo de Fin de Grado para el ciclo de **Desarrollo de Aplicaciones Web (DAW)**.

---

## ✨ Características Principales

- **Jerarquía Lógica:** Organización de proyectos en Bloques (Columnas) y Tareas detalladas.
- **Gestión de Miembros:** Sistema de invitaciones y roles granulares por proyecto.
- **Control de Acceso (RBAC):** Roles definidos: `OWNER` (control total), `MEMBER` (colaborador) y `VIEWER` (solo lectura).
- **Seguridad Robusta:** Autenticación y autorización mediante **Spring Security** y cifrado de credenciales con **BCrypt**.
- **Filtrado Inteligente:** Búsqueda de proyectos por nombre, prioridad y fechas de entrega.

---

## 🛠️ Stack Tecnológico

### Backend

- **Lenguaje:** Java 17
- **Framework:** Spring Boot 3.x
- **Persistencia:** Spring Data JPA / Hibernate
- **Seguridad:** Spring Security + JWT (en proceso)
- **Base de Datos:** MySQL 8.0

### Herramientas & DevOps

- **Contenerización:** Docker & Docker Compose
- **Gestión de Dependencias:** Maven
- **API Testing:** Postman
- **Control de Versiones:** Git / GitHub

---

## 🏗️ Arquitectura y Buenas Prácticas

El proyecto sigue una arquitectura limpia orientada a servicios, aplicando patrones de diseño para garantizar la escalabilidad:

- **Patrón DTO (Data Transfer Object):** Implementado para desacoplar las entidades de JPA de la capa de presentación, evitando problemas de recursión infinita y optimizando la transferencia de datos.
- **Manejo de Carga Perezosa (Lazy Loading):** Uso estratégico de `JOIN FETCH` y consultas personalizadas en JPQL para resolver el problema de las N+1 consultas.
- **Validación de Datos:** Uso de `Jakarta Bean Validation` para asegurar la integridad de la información de entrada.
- **Estructura de Paquetes:** Separación clara entre `Controller`, `Service`, `Repository`, `Model` y `DTO`.

---

## 📊 Modelo de Datos (E-R)

La base de datos está normalizada y consta de las siguientes entidades principales:

- **Users:** Gestión de credenciales y roles globales (`ADMIN`, `USER`).
- **Projects:** Cabecera del proyecto y relación con el `Owner`.
- **Columns:** Secciones lógicas dentro de un proyecto.
- **Tasks:** Tareas individuales con prioridad y fechas.
- **Project Memberships:** Tabla intermedia con atributos adicionales para gestionar roles específicos dentro de cada proyecto.

---

## 🚀 Instalación y Ejecución

### Requisitos previos

- Java 17 o superior
- Maven 3.x
- MySQL 8.0 o Docker

### Pasos para replicar el entorno:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/step-backend.git](https://github.com/tu-usuario/step-backend.git)
   cd step-backend
   ```
