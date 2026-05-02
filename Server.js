const express = require("express");

const app = express();

const ProjetsEtudiantsRoutes = require("./Routes/ProjetsEtudiantsRoutes");

app.use(express.json());

app.use("/", ProjetsEtudiantsRoutes);

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});