const { createConnection, getConnection } = require("typeorm");

let connection = null;

async function connectToDatabase() {
  if (!connection) {
    connection = await createConnection({
      type: "sqlite",
      database: "db/supermercado.db",
      synchronize: true,
      entities: [
       require("./db/entities/areas"),
       require("./db/entities/cargos"),
       require("./db/entities/empleados"),
       require("./db/entities/registroSesion")
      ],
    });
  }

  return connection;
}

module.exports = { connectToDatabase };