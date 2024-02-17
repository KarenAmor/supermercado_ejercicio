const express = require("express");
const router = express.Router();
const { iniciarSesion} = require("../controllers/registroSesionController");

router.post("/", iniciarSesion);

module.exports = router;