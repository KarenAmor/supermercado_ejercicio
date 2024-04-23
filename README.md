# Proyecto de Gestión de Clientes y Asesores

- Este proyecto es una aplicación de gestión de empleados, supervisores y administradores para un supermercado


## Características


## Tecnologías utilizadas

- Node.js para el entorno de backend.
- SQLite como base de datos para el almacenamiento de clientes, asesores y credenciales.
- TypeORM para la configuración y gestión de la base de datos.
- Express.js para el enrutamiento y la creación de API.
- Bcrypt para el hashing de contraseñas y garantizar la seguridad de las credenciales.

## Estructura del Proyecto

|-- controllers

|-- database

|-- db

    |-- entities

|-- routes

|-- util

|-- node_modules

|-- index.js

|-- package.json

|-- README.md


## Configuración del proyecto

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto con `npm install`.
3. Asegúrate de tener Node.js y npm instalados en tu sistema.
4. Ejecuta el servidor con `npm start` y accede a la aplicación en `http://localhost:3000`.


## Swagger

La aplicación tiene una documentación de swagger que se puede encontrar en la siguiente URL: http://localhost:3000/api-docs/#/

## Servicios
/empleados, get: trae la lista de todos los empleados
/empleados, post: Crea un empleado con credenciales
/iniciosesion, post: Permite iniciar sesion y construye un token

## Contribución

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor sigue las pautas estándar de desarrollo y crea una solicitud de extracción detallada para revisión.

## Autor

Este proyecto fue creado por [Karen Edith Moreno].

## Licencia

Este proyecto está licenciado bajo Licencia MIT. Consulta el archivo LICENSE para obtener más detalles.


## Mejoras pendientes
- Modificar y eliminar empleados
- Modificar y eliminar areas
- Mejorar la parte de autenticacion
- Gestion de productos por area

## Funcionalidades Pendiente
