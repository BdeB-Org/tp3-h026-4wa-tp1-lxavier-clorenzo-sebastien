const express = require("express");
const router = express.Router();

const ProjetsEtudiantsControllers = require("../Controllers/ProjetsEtudiantsControllers");

//TABLE ETUDIANTS -Sebastien

//GET Etudiants
router.get("/", ProjetsEtudiantsControllers.getEtudiants);

//GET 1 Etudiant
router.get("/:id", ProjetsEtudiantsControllers.getEtudiantById);

//POST Etudiants
router.post("/", ProjetsEtudiantsControllers.addEtudiant);

//POST Etudiants
router.post("/2", ProjetsEtudiantsControllers.addEtudiant2);

//UPDATE Etudiants
router.put("/:id", ProjetsEtudiantsControllers.updateEtudiant2);

//DELETE Etudiants
router.delete("/:id", ProjetsEtudiantsControllers.deleteEtudiant2ById);



//TABLE TECHNOLOGIES -XAVIER

//GET 1 Techologie
router.get("/Technologies/:id", ProjetsEtudiantsControllers.getTechnosById);

//GET Technologies
router.get("/Technologies", ProjetsEtudiantsControllers.getTechnos);

//POST Technologies
router.post("/Technologies", ProjetsEtudiantsControllers.addTechnos);

//DELETE Technologies
router.delete("/Technologies/:id", ProjetsEtudiantsControllers.deleteTechnos);

//UPDATE Technologies
router.put("/Technologies/:id", ProjetsEtudiantsControllers.updateTechnos);


//TABLE PROJETS -Lorenzo

//GET 1 Projets
router.get("/Projets/:id", ProjetsEtudiantsControllers.getProjetsById);

//GET Projets
router.get("/Projets", ProjetsEtudiantsControllers.getProjets);

//POST Projets
router.post("/Projets", ProjetsEtudiantsControllers.addProjets);

//DELETE Projets
router.delete("/Projets/:id", ProjetsEtudiantsControllers.deleteProjets);

//UPDATE Projets
router.put("/Projets/:id", ProjetsEtudiantsControllers.updateProjets);

module.exports = router;