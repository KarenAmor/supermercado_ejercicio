const express = require("express");
const router = express.Router();
const { getEmpleados, crearEmpleado} = require("../controllers/registroEmpleadosController");

router.get("/",  getEmpleados);
router.post("/", crearEmpleado);

module.exports = router;