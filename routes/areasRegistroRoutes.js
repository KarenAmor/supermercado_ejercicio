const express = require("express");
const router = express.Router();

const { getAreas, crearAreas} = require("../controllers/registroAreasController");

router.get("/", getAreas);
router.post("/", crearAreas);

module.exports = router;