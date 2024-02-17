const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Empleados = require("../db/entities/empleados");
const bcrypt = require('bcryptjs');

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

    // Validar datos de entrada
    const { nombre_completo, documento, email, id_area, id_cargo, sueldo_bruto, sueldo_neto, status } = req.body;
    if (!nombre_completo || !documento || !email || !id_area || !id_cargo || !sueldo_bruto || !sueldo_neto || !status) {
      return res.status(400).json({ error: "Faltan datos obligatorios para crear el empleado" });
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

    res.status(201).json({ message: "Empleado creado con éxito", empleado: empleadoNuevo });
  } catch (error) {
    console.error("Error al crear el empleado:", error);
    res.status(500).json({ error: "Hubo un error al crear al empleado" });
  }
}

async function actualizarEmpleado(req, res) {
  try {
    const connection = await connectToDatabase();
    const empleadoRepository = getRepository(Empleados);

    const { id } = req.params;
    const empleado = await empleadoRepository.findOne({ where: { id } });

    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // Actualiza solo los campos proporcionados en la solicitud
    Object.assign(empleado, req.body);

    await empleadoRepository.save(empleado);
    res.status(200).json({ message: "Empleado actualizado con éxito", empleado });
  } catch (error) {
    console.error("Error al actualizar el empleado:", error);
    res.status(500).json({ error: "Hubo un error al actualizar el empleado" });
  }
}

async function eliminarEmpleado(req, res) {
  try {
    const empleadoRepository = getRepository(Empleados);

    const { id } = req.params;
    const empleado = await empleadoRepository.findOne({ where: { id } });

    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    empleado.status = 'liquidado';

    await empleadoRepository.save(empleado);
    res.status(200).json({ message: "Empleado eliminado con éxito", empleado });
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    res.status(500).json({ error: "Hubo un error al eliminar el empleado" });
  }
}

module.exports = { getEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado };