const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const weatherRoutes = require("./routes/weatherRoutes"); // Importerer ruterne

dotenv.config(); // Læs miljøvariabler fra .env filen
const app = express();

app.use(cors()); // Tillader CORS, så frontend kan tilgå API'et
app.use(express.json()); // Middleware til at parse JSON data
app.use("/api", weatherRoutes); // Binder ruterne til "/api"

const PORT = process.env.PORT || 5000;  // Bruger porten fra miljøvariabler eller 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
