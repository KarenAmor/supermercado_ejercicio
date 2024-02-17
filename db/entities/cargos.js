const { EntitySchema } = require("typeorm");

const Cargos = new EntitySchema({
  name: "Cargos",
  tableName: "cargos",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    descripcion: {
      type: "varchar",
    }
}
});

module.exports = Cargos;