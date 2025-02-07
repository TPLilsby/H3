const express = require("express");
const { getWeather } = require("../controllers/weatherController"); // Importerer funktionen fra controller
const router = express.Router();

// Definerer en GET rute for at hente vejrinformationer
router.get("/weather", getWeather);

module.exports = router;
