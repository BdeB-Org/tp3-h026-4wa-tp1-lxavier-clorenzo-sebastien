//Connexion à la base de données ProjetsEtudiants.db

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ProjetsEtudiants.db');
module.exports = db;
