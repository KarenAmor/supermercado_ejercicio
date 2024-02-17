const { EntitySchema } = require("typeorm");

const RegistroSesion = new EntitySchema({
  name: "RegistroSesion",
  tableName: "registro_sesion",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    documento: {
      type: "varchar",
      nullable: false,
    },
    contrasena: {
      type: "varchar",
      nullable: false,
    },
    token: {
      type: "varchar",
      nullable: true,
    },
    fecha_hora: {
      type: "datetime",
    },
  }
});

module.exports = RegistroSesion;