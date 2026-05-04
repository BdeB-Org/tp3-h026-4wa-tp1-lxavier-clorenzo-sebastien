//Connexion à la base de données ProjetsEtudiants.db

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./ProjetsEtudiants.db', (err) => {
    if (err) {
        console.error('Erreur SQLite :', err.message);
    } else {
        console.log('Connecté à SQLite');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Etudiants (
            id_etudiants INTEGER PRIMARY KEY AUTOINCREMENT,
            Nom TEXT,
            Prenom TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Projets (
            id_projets INTEGER PRIMARY KEY AUTOINCREMENT,
            Nom_Projet TEXT,
            description_projet TEXT,
            date_creation TEXT,
            id_equipes INTEGER
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Technologies (
            id_technologies INTEGER PRIMARY KEY AUTOINCREMENT,
            Nom_Technologies TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    db.run(
        "INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)",
        ['admin', 'admin123']
    );

});

module.exports = db;
