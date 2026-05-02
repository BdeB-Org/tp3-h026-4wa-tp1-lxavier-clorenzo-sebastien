const express = require('express');
const path = require('path');
const app = express();

// Initialise la BD
require('./Config/ProjetsEtudiants.js');

app.use(express.json());
app.use(express.static('public'));

const ProjetsEtudiantsRoutes = require('./Routes/ProjetsEtudiantsRoutes');
const authRoutes = require('./Routes/authRoutes');

app.use('/api/etudiants', ProjetsEtudiantsRoutes);
app.use('/api/auth', authRoutes);

// Redirection par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
