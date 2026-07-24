# STEP - Structured Tasks, Easy Progress

DISCLAIMER!: 
* En estas primeras versiones, servidor tarda 50 segundos en encenderse por primera vez, esto es debido a que el proyecto usa un plan gratuito en la nube.

Link para probar la Web:
https://step-structured-tasks-easy-progress.vercel.app/

> "Tareas estructuradas, fácil progreso"

**STEP** es una plataforma de gestión de proyectos diseñada para desglosar objetivos complejos en pasos manejables. Basada en la metodología de "divide y vencerás", la aplicación ayuda a usuarios y equipos a organizar desafíos de gran envergadura (como proyectos de software, reformas o preparación de eventos) sin sentirse abrumados por la magnitud del recorrido.

---

## 📌 Estado del Proyecto:

Actualmente el proyecto está en una versión inicial (PRE-ALPHA). La aplicación cumple con la funcionalidad que se desarrolla en la descripción, aunque esta versión es muy básica por ahora, se irá actualizando a lo largo del tiempo para mejorar sus funcionalidades, apariencia y accesibilidad entre otras.

---

## ✨ Características Principales

- **Jerarquía Lógica:** Organización de proyectos en Bloques (Columnas) y Tareas detalladas.
- **Gestión de Miembros:** Sistema de invitaciones y roles granulares por proyecto.
- **Control de Acceso (RBAC):** Roles definidos: `OWNER` (control total), `MEMBER` (colaborador) y `VIEWER` (solo lectura).
- **Seguridad Robusta:** Autenticación mediante **Spring Security**, JWT y cifrado de credenciales con **BCrypt**.
- **Filtrado Inteligente:** Búsqueda de proyectos por nombre, prioridad y fechas de entrega.

---

## 🛠️ Stack Tecnológico

### Backend & Base de Datos

- **Lenguaje:** Java 21
- **Framework:** Spring Boot 3.5.x (Spring Security, Data JPA, Hibernate)
- **Base de Datos:** MySQL 8.0
- **Seguridad:** JSON Web Tokens (JWT)

### Herramientas & DevOps
- **Despliegue en la nube:** Vercel, Aiven y Render
- **Contenerización:** Docker & Docker Compose
- **Gestión de Dependencias:** Maven
- **API Testing:** Postman
- **Control de Versiones:** Git / GitHub

---

## ⚙️ Instalación y Ejecución en local

El proyecto está diseñado con una filosofía **"Zero-Config"** para entornos locales, permitiendo levantar la infraestructura rápidamente mediante Docker.

### 1. Requisitos Previos

- **Docker** y **Docker Compose** instalados.
- **Java 17** o superior.
- **Maven** 3.x instalado (opcional si usas el wrapper `./mvnw`).

### 2. Variables de Entorno (Opcional) 🔧

Si solo deseas probar la aplicación, **puedes saltarte este paso**. El sistema conectará automáticamente a la base de datos de Docker usando credenciales por defecto (`root` sin contraseña) y una clave JWT de prueba.

Si deseas personalizar la seguridad, crea un archivo `.env` en la raíz de la carpeta `/backend`:

```env
# Database Configuration
DB_URL=jdbc:mysql://localhost:3306/step_app_db
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password

# Security (JWT)
JWT_SECRET_KEY=tu_clave_secreta_en_base64_aqui
```

### 3. Levantar la Infraestructura (Docker)

Desde la raíz del proyecto, ejecuta el siguiente comando para iniciar el contenedor de MySQL:

```bash
docker-compose up -d
```

_Este comando creará automáticamente la base de datos `step_app_db` en el puerto 3306._

### 4. Ejecutar el Backend (Spring Boot)

Una vez que el contenedor esté listo, navega a la carpeta `/backend` e inicia la aplicación:

```bash
# Usando Maven instalado
mvn spring-boot:run

# O usando el Maven Wrapper incluido
./mvnw spring-boot:run
```

---

## 🏗️ Arquitectura y Buenas Prácticas

El proyecto aplica patrones de diseño avanzados para garantizar la escalabilidad y limpieza del código:

- **Patrón DTO (Data Transfer Object):** Desacoplamiento total entre las entidades JPA y la capa de presentación para optimizar la transferencia de datos y evitar problemas de recursión infinita.
- **Gestión de Secretos:** Uso de la anotación `@Value` e inyección de dependencias para desacoplar claves críticas (JWT, DB) del código fuente, permitiendo configuraciones dinámicas mediante variables de entorno.
- **Manejo de Carga Perezosa (Lazy Loading):** Uso estratégico de `JOIN FETCH` y consultas personalizadas para mitigar el problema de las N+1 consultas en Hibernate.
- **Validación de Datos:** Integración de `Jakarta Bean Validation` para asegurar la integridad de los datos de entrada antes de su procesamiento.
- **Diseño y patrones, separación en componentes/módulos** Modularización del Frontend en base a componentes, hooks, llamadas a la API y sus consumiciones correspondientes + Tráfico del JWT. 
---

## 📊 Modelo de Datos - MySQL - Relational Data Bases

La base de datos está normalizada y diseñada para la colaboración eficiente:

*Básicos*:
- **Users:** Gestión de credenciales y roles globales de sistema (`ADMIN`, `USER`).
- **Projects:** Cabecera de proyectos vinculada a un dueño (`Owner`).
- **Columns:** Secciones lógicas dentro de un proyecto que agrupan tareas por estado o categoría.
- **Tasks:** Tareas individuales con descripción, prioridad, fechas de entrega y usuarios asignados.
- **Project Memberships:** Entidad de relación que define el rol específico de un usuario dentro de cada proyecto (`OWNER`, `MEMBER`, `VIEWER`).

---

## 👤 Autor

**Jacob Parra Silva** - Técnido Profesional - Desarrollo de Aplicaciones Web (DAW) | [LinkedIn](https://www.linkedin.com/in/jacob-parra-silva-66670b164/) | [GitHub](https://github.com/JKOBPS)
