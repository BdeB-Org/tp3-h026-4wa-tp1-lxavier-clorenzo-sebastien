const db = require('../Config/ProjetsEtudiants.js');

//TABLE ETUDIANTS - Sebastien

//Fonction GET pour appeler tous les etudiants de la table Etudiants
exports.getEtudiants = (req,res)=> {
    db.all('SELECT * FROM Etudiants',(err,rows)=> { 
        res.json(rows);
        });
    };

//Fonction GET pour appeler un étudiant de la table Etudiants
exports.getEtudiantById = (req,res)=>{
 const id = req.params.id;
 db.get(
  'SELECT * FROM etudiants WHERE id_etudiants=?',
  [id],
  (err,row)=>{
   if(err){
    return res.status(500).json({
     message:"Erreur serveur"
    }); }
   if(!row){
    return res.status(404).json({
     message:"Étudiant non trouvé"  }); }
   res.json(row);});};

//Fonction POST pour ajouter un étudiants à la table Etudiants
exports.addEtudiant = (req,res)=>{
    const Nom = (req.body.Nom || '').trim(); 
    const Prenom = (req.body.Prenom || '').trim(); 
    if (!Nom || !Prenom) {
        return res.status(400).json({ message: 'Nom et Prénom sont requis' });
    }
    console.log("Insertion:",Nom,Prenom); 
    db.run("INSERT INTO Etudiants(Nom,Prenom) VALUES (?,?)",
        [Nom,Prenom],
        function(err) {
            if(err) {
                console.log(err);return res.status(500).json({erreur:err.message});
            }
            res.json({message:"Étudiant ajouté",id:this.lastID}

            );
        });
    };

//Fonction POST pour ajouter un étudiants à la table Etudiants
exports.addEtudiant2 = (req,res)=>{
    const Nom = (req.body.Nom || '').trim(); 
    const Prenom = (req.body.Prenom || '').trim(); 
    if (!Nom || !Prenom) {
        return res.status(400).json({ message: 'Nom et Prénom sont requis' });
    }
    console.log("Insertion:",Nom,Prenom); 
    db.run("INSERT INTO Etudiants(Nom,Prenom) VALUES (?,?)",
        [Nom,Prenom],
        function(err) {
            if(err) {
                console.log(err);
                return res.status(500).json({erreur:err.message});
            }
            res.json({message:"Étudiant ajouté",id:this.lastID}

            );
        });
    };

//Fonction UPDATE pour modifier un étudiants à la table Etudiants
exports.updateEtudiant2 = (req, res) => {
    const id = req.params.id;
    const { Nom, Prenom } = req.body;
    db.run('UPDATE etudiants SET Nom=?, Prenom=? WHERE id_etudiants=?',
        [Nom, Prenom, id],
        function(err){
            if(err){
                return res.status(500).json({ erreur: err.message });
            }
            res.json({message: "Étudiant modifié",id: id});
        });
    };


//Fonction DELETE pour supprimer un étudiants à la table Etudiants
exports.deleteEtudiant2ById = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "ID manquant" });
    }
    // Exécuter la requête SQL avec callback
    db.run('DELETE FROM Etudiants WHERE id_etudiants = ?',
        [id],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }
            // Vérifier si une ligne a été supprimée
            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucun étudiant trouvé avec cet ID" });
            }res.json({ message: "Étudiant supprimé", id: id });
        });
    };

//TABLE Technologie -Xavier

//Fonction GET pour appeler tous les technologies de la table Technologies
exports.getTechnos = (req,res)=> {
    db.all('SELECT * FROM Technologies',(err,rows)=> { 
        res.json(rows);
    });
};

//Fonction GET pour appeler une technologies de la table Technologies
exports.getTechnosById = (req,res)=>{
    const id = req.params.id;
    db.get(
        'SELECT * FROM Technologies WHERE id_technologies=?',
        [id],
        (err,row)=>{
            if(err){
                return res.status(500).json({
                message:"Erreur serveur"
            }); }
            if(!row){
                return res.status(404).json({
                message:"Technologies non trouvé"  }); }
            res.json(row);
        }
    );
};

//Fonction POST pour ajouter une technologie à la table Technologies
exports.addTechnos = (req,res)=>{
    const nom_technologies = req.body.nom_technologies; 
    const description_technologies = req.body.description_technologies; 
    const id_projets = req.body.id_projets
    console.log("Insertion:",nom_technologies,description_technologies,id_projets); 
    db.run("INSERT INTO Technologies(nom_technologies,description_technologies,id_projets) VALUES (?,?,?)",
        [nom_technologies,description_technologies,id_projets],
        function(err) {
            if(err) {
                console.log(err);return res.status(500).json({erreur:err.message});
            }
            res.json({message:"Technologie ajouté",id:this.lastID}
            );
        }
    );
};

//Fonction UPDATE pour ajouter une technologie à la table Technologies
exports.updateTechnos = (req, res) => {
    const id_technologies = req.params.id;
    const { nom_technologies, description_technologies, id_projets, } = req.body;
    db.run('UPDATE Technologies SET nom_technologies=?, description_technologies=?, id_projets=? WHERE id_technologies=?', 
        [nom_technologies, description_technologies, id_projets, id_technologies],
        function(err){
            if(err) {

                return res.status(500).json({ erreur: err.message });
            }

            if(this.changes === 0){
                return res.status(404).json({ message: "Aucune technologie trouvée avec cet ID" });
            }

            res.json({ message: "Technologie modifié",id: id_technologies }

            );
        }
    );

};


//Fonction DELETE pour retirer une technologie à la table Technologies
exports.deleteTechnos = (req, res) => {
    const id_technologies = req.params.id; 
    if (!id_technologies) {
        return res.status(400).json({ message: "ID manquant" });
    }
    
    db.run('DELETE FROM Technologies WHERE id_technologies = ?',
        [id_technologies],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ erreur: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Aucune technologie trouvée avec cet ID" });
            }

            res.json({ message: "Technologie supprimé", id: id_technologies });
        }
    );
};


//TABLE PROJETS -Lorenzo

//Fonction GET pour appeler tous les projets de la table Projets
exports.getProjets = (req,res)=> {
    db.all('SELECT * FROM Projets',(err,rows)=> { 
        res.json(rows);
        });
    };

//Fonction GET pour appeler un étudiant de la table Etudiants
exports.getProjetsById = (req,res)=>{
 const id = req.params.id;
 db.get(
  'SELECT * FROM Projets WHERE id_projets=?',
  [id],
  (err,row)=>{
   if(err){
    return res.status(500).json({
     message:"Erreur serveur"
    }); }
   if(!row){
    return res.status(404).json({
     message:"Projet non trouvé"  }); }
   res.json(row);});};


//Fonction GET pour ajouter un projet à la table Projets
exports.addProjets = (req,res)=>{
    const Nom_Projet = req.body.Nom_Projet; 
    const description_projet = req.body.description_projet; 
    const date_creation = req.body.date_creation; 
    const id_equipes = req.body.id_equipes; 
     
    console.log("Insertion:",Nom_Projet,description_projet, date_creation, id_equipes); 
    db.run("INSERT INTO Projets(Nom_Projet,description_projet,date_creation,id_equipes) VALUES (?,?,?,?)",
        [Nom_Projet,description_projet,date_creation,id_equipes],
        function(err) {
            if(err) {
                console.log(err);
                return res.status(500).json({erreur:err.message});
            }
            res.json({message:"Projet ajouté",id:this.lastID}

            );
        });
    };


//Fonction UPDATE pour ajouter un projet à la table Projets
exports.updateProjets = (req, res) => {
    const id_projets = req.params.id;
    const { Nom_Projet,description_projet,date_creation,id_equipes } = req.body;
db.run('UPDATE Projets SET Nom_Projet=?, description_projet=?, date_creation=?, id_equipes=? WHERE id_projets=?', 
    [Nom_Projet,description_projet,date_creation,id_equipes, id_projets],
    function(err){
        if(err) {

            return res.status(500).json({ erreur: err.message });
        }
        res.json({ message: "Projet modifié",id: id_projets }

        );
    });

};


//Fonction DELETE pour retirer un projet à la table Projets
exports.deleteProjets = (req, res) => {
    const id_projets = req.params.id; 
    if (!id_projets) {
        return res.status(400).json({ message: "ID manquant" });
    }
    
    db.run('DELETE FROM Projets WHERE id_projets = ?',
    [id_projets],
    function(err) {
    if (err) {
    console.error(err);
    return res.status(500).json({ erreur: err.message });
}

if (this.changes === 0) {
    return res.status(404).json({ message: "Aucun projet trouvé avec cet ID" });
}

res.json({ message: "Projet supprimé", id: id_projets });
}
);

};

