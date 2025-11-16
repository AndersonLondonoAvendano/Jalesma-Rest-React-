# Arquitectura del Proyecto Jalesma-Rest-React

Este proyecto adopta una arquitectura modular dividida en dos componentes independientes: un backend API REST en Spring Boot y un frontend web en React con Tailwind CSS. Esta estructura promueve la separación de responsabilidades, facilitando el mantenimiento, la escalabilidad y la integración de nuevas características.

## Backend: API REST (Spring Boot)

La API gestiona operaciones CRUD para las entidades Bolsos, Marcas y Materiales, respetando relaciones Many-to-One (Bolsos-Marcas) y Many-to-Many (Bolsos-Materiales). Incluye controladores eficientes, validaciones estrictas y manejo de estados HTTP, con una capa de servicios que encapsula la lógica de negocio.

### Endpoints Principales

#### Bolsos (/api/v1/bolsos)
- **GET /all-bolsos**: Lista todos los bolsos con DTOs, incluyendo marcas y materiales.
- **GET /{id}**: Detalles de un bolso por ID.
- **POST /crear**: Crea un bolso nuevo, validando marca y materiales.
- **PUT /editar/{id}**: Actualiza un bolso, verificando ID, marca y materiales.
- **DELETE /eliminar/{id}**: Elimina un bolso, gestionando errores.

#### Marcas (/api/v1/marcas)
- **GET /all-marcas**: Lista todas las marcas.
- **GET /{id}**: Detalles de una marca por ID.
- **POST /crear**: Crea una nueva marca.
- **PUT /editar/{id}**: Modifica una marca existente.
- **DELETE /eliminar/{id}**: Elimina una marca, respetando restricciones de relación.

#### Materiales (/api/v1/materiales)
- **GET /all-materiales**: Lista todos los materiales.
- **GET /{id}**: Detalles de un material por ID.
- **POST /crear**: Crea un nuevo material.
- **PUT /editar/{id}**: Actualiza un material.
- **DELETE /eliminar/{id}**: Elimina un material.

### Notas Técnicas
- Uso de DTOs para exposición limpia de datos.
- Respuestas estandarizadas con mensajes, IDs y manejo de errores HTTP.
- Validaciones: Existencia de entidades relacionadas, IDs y casos no encontrados.

## Frontend: Aplicación Web (React + Tailwind CSS)

El frontend consume la API directamente, ofreciendo una interfaz responsiva y moderna. Tailwind CSS asegura un diseño limpio y adaptable, optimizando la experiencia del usuario en la gestión de entidades.

## Vistas Principales

### CRUD Materiales
<img width="1889" height="898" alt="image" src="https://github.com/user-attachments/assets/d0d3a6f6-ece5-4494-b470-756346a9a560" />

### CRUD Marcas
<img width="1885" height="901" alt="image" src="https://github.com/user-attachments/assets/9142ccae-6408-477a-bb08-7f86fd76d351" />

### CRUD Bolsos
<img width="1887" height="897" alt="image" src="https://github.com/user-attachments/assets/7f8a3e72-a3a3-407e-9d08-1b571a0ed1e3" />
