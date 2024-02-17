const { getRepository } = require("typeorm");
const { connectToDatabase } = require("../database");
const Empleados = require("../db/entities/empleados");
const RegistroSesion = require("../db/entities/registroSesion");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function iniciarSesion(req, res) {
  try {
    const connection = await connectToDatabase();
    const empleadoRepository = getRepository(Empleados);
    const registroSesionRepository = getRepository(RegistroSesion);

    const { documento, contrasena } = req.body;

    try {
      const credenciales = await registroSesionRepository.findOne({ where: { documento } });

      if (!credenciales) {
        return res.status(404).send({ message: "Credenciales inválidas" });
      }

      const passwordMatch = await bcrypt.compare(contrasena, credenciales.contrasena);

      if (!passwordMatch) {
        return res.status(401).send({ message: "Credenciales inválidas" });
      }

      const empleado = await empleadoRepository.findOne({ where: { documento } });

      const token = jwt.sign({ documento: empleado.documento }, 'secretKey', { expiresIn: '1h' });

      res.send({ message: "Inicio de sesión exitoso, Bienvenido", empleado, token });
    } catch (tokenError) {
      console.error('Error al generar el token:', tokenError); 
      res.status(500).send({ error: "Error al iniciar sesión" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error); 
    res.status(500).send({ error: "Error al iniciar sesión" });
  }
}

module.exports = { iniciarSesion };