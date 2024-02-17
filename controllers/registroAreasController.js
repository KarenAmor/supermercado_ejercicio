const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Areas = require("../db/entities/areas");

async function getAreas(req, res) {
  try {
    const connection = await connectToDatabase();
    const areasRepository = getRepository(Areas);
    const areas = await areasRepository.find();
    res.status(200).json(areas);
  } catch (error) {
    console.error("Error al obtener areas:", error);
    res.status(500).json({ error: "Hubo un error al obtener areas" });
  }
}

async function crearAreas(req, res) {
  try {
    const connection = await connectToDatabase();
    const areasRepository = getRepository(Areas);

    // Validar datos de entrada
    const { descripcion, numero_empleados } = req.body;
    if (!descripcion || !numero_empleados) {
      return res
        .status(400)
        .json({ error: "Faltan datos obligatorios para crear el area" });
    }

    const area = {
      descripcion,
      numero_empleados,
    };

    const areaNueva = await areasRepository.save(area);

    res.status(201).json({ message: "Área creada con éxito", area: areaNueva });
  } catch (error) {
    console.error("Error al crear el área:", error);
    res.status(500).json({ error: "Hubo un error al crear el área" });
  }
}

module.exports = { getAreas, crearAreas };