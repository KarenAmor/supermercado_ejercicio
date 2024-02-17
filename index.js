const app = require('express')();
const cors = require('cors');
const swaggerUiExpress = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const { createConnection } = require("typeorm");
const { connectToDatabase } = require("./database");
const bodyParser = require("body-parser");

// Habilitar CORS para todos los orígenes
app.use(cors());

const EmpleadosRoute = require("./routes/registroEmpleadosRoutes");
const RegistroSesionRoutes = require("./routes/registroSesionRoutes");
const AreasRoutes = require("./routes/areasRegistroRoutes");

// Configuracion bodyParser
app.use(bodyParser.json());
// Agrega swagger a la aplicación
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));

// Ruta para manejar la solicitud a la raíz de la aplicación
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la página principal!");
});

app.use("/empleados", EmpleadosRoute);
app.use("/sesion", RegistroSesionRoutes)
app.use("/areas", AreasRoutes);

// Inicia la aplicación en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor en funcionamiento en el puerto 3000");
});

module.exports = app;
