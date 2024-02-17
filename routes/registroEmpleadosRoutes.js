const express = require("express");
const router = express.Router();
//const clienteValidate = require("../controllers/clientesController.validate");
const { getEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado} = require("../controllers/registroEmpleadosController");

router.get("/",  getEmpleados);
router.post("/", crearEmpleado);
router.put("/:id", actualizarEmpleado);
router.post("/:id", eliminarEmpleado);

module.exports = router;