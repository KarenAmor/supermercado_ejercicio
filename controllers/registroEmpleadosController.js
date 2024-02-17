const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Empleados = require("../db/entities/empleados");
const RegistroSesion = require("../db/entities/registroSesion");
const bcrypt = require("bcryptjs");

async function getEmpleados(req, res) {
  try {
    const connection = await connectToDatabase();
    const empleadosRepository = getRepository(Empleados);
    const empleados = await empleadosRepository.find();
    res.status(200).json(empleados);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ error: "Hubo un error al obtener empleados" });
  }
}

async function crearEmpleado(req, res) {
  try {
    const connection = await connectToDatabase();
    const empleadoRepository = getRepository(Empleados);
    const registroSesionRepository = getRepository(RegistroSesion);
    // Validar datos de entrada
    const {
      nombre_completo,
      documento,
      email,
      id_area,
      id_cargo,
      sueldo_bruto,
      sueldo_neto,
      status,
    } = req.body;
    if (
      !nombre_completo ||
      !documento ||
      !email ||
      !id_area ||
      !id_cargo ||
      !sueldo_bruto ||
      !sueldo_neto ||
      !status
    ) {
      return res
        .status(400)
        .json({ error: "Faltan datos obligatorios para crear el empleado" });
    }

    const empleado = {
      nombre_completo,
      documento,
      email,
      id_area,
      id_cargo,
      sueldo_bruto,
      sueldo_neto,
      status,
    };

    const empleadoNuevo = await empleadoRepository.save(empleado);

    const passwordPrimeraVez = "mimamamemima";
    const contrasenaEncriptada = await bcrypt.hash(passwordPrimeraVez, 10);

    const credenciales = {
      documento,
      contrasena: contrasenaEncriptada,
    };

    await registroSesionRepository.save(credenciales);

    res
      .status(201)
      .json({
        message: "Empleado creado con éxito",
        empleado: empleadoNuevo,
        credenciales: passwordPrimeraVez,
      });
  } catch (error) {
    console.error("Error al crear el empleado:", error);
    res.status(500).json({ error: "Hubo un error al crear al empleado" });
  }
}

module.exports = { getEmpleados, crearEmpleado };