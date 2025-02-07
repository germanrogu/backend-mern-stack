# SaaS de Gestión de Tareas Colaborativas

Este proyecto implementa una **arquitectura de microservicios robusta** para la gestión colaborativa de tareas (similar a Trello/Notion) utilizando Node.js, TypeScript, Express, MongoDB y RabbitMQ. Se incluyen validaciones avanzadas con Zod, manejo centralizado de errores, y logging avanzado con Winston.

## Microservicios

**Auth Service:**

- Responsable de la autenticación y gestión de usuarios.
- Endpoints: `/api/auth/register` y `/api/auth/login`.
- Seguridad: Hasheo de contraseñas, JWT y ocultación de datos sensibles en la salida JSON.

**Task Service:**

- Encargado del CRUD de tareas.
- Endpoints: `/api/tasks`.
- Validación de datos mediante Zod y manejo de errores robusto.

**API Gateway:**

- Unifica la entrada de la aplicación y enruta las peticiones a los servicios correspondientes.
- Endpoints públicos: `/api/auth` y `/api/tasks`.

## Infraestructura & DevOps

- **Docker & Docker Compose:** Orquestación de contenedores para cada microservicio.
- **MongoDB y RabbitMQ:** Persistencia y comunicación asíncrona entre servicios.
- **Logging con Winston:** Registro centralizado de eventos para trazabilidad.
- **Validaciones y seguridad:** Validación de datos, manejo global de errores y protección con middleware.

## Pasos para iniciar el proyecto

1. Configura las variables de entorno en cada servicio (ver los archivos `.env`).
2. Levanta la infraestructura con Docker Compose:
   ```bash
   docker-compose up --build
   ```
