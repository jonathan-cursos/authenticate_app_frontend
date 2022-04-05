# Authenticate App - Prueba de distintos métodos de autenticación

Aplicación en la que probamos diferentes estrategias de Passport.js, y una vez
que ingresamos, nos muestra nuestro nombre, y correo o nombre de usuario.

[![Authenticate app](https://dav-dev.com/assets/projects/authenticate.jpg 'Authenticate app')](https://dav-dev.com/assets/projects/authenticate.jpg 'Authenticate app')

## Backend

En este caso, el integramos el backend y frontend en un solo servicio.

## Instrucciones de uso

- Seleccionamos nuestro metodo de ingreso.
- Una vez ingresamos, nos muestra nuestro nombre, y correo o usuario.
- Si nos queremos registrar con un usuario del sitio propio, sin pasar por
  ninguna plataforma, damos click en "Sign up".
- Una vez registrados, tambien nos muestra nuestros datos.

## Tecnologías usadas

- JavaScript.
- React.js.
- Node.js.
- Express.js.
- Passport.js.
- Heroku.
- CSS.
- MongoDB.

## Correr aplicación en local

- Debes clonar este repositorio.
- Abrir una terminal e ingresar a la carpeta creada.
- Instalar las dependencias con el comando "npm install".
- En otra terminal, entramos a la carpeta server.
- Renombrar el archivo ".env.example" por ".env". Colocar los valores a las
  variables de entorno, en este caso sería el puerto en el que correrá este
  servidor en local (3001, pero puede ser cualquiera), la URI de nuestra Base de
  datos, el host (localhost), el "secret" o contraseña para el codificado de
  algunos elementos.
- También, debemos crear cuentas de desarrollo en Google, Twitter y Facebook,
  obtener las credenciales y colocarlas en las demás variables de entorno.
- Debemos colocar el comando "npm run dev", estando en la raíz del proyecto.
