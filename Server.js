const express = require('express');
const path = require('path');
const app = express();
const authMiddleware = require('./Middleware/middlewares');

// Initialise la BD
require('./Config/ProjetsEtudiants.js');

app.use(express.json());
app.use(express.static('public'));

const ProjetsEtudiantsRoutes = require('./Routes/ProjetsEtudiantsRoutes');
const authRoutes = require('./Routes/authRoutes');

// Routes d'authentification (SANS middleware)
app.use('/api/auth', authRoutes);

// Routes API avec middleware d'authentification
app.use('/api/Etudiants', authMiddleware, ProjetsEtudiantsRoutes);
app.use('/api/Projets', authMiddleware, ProjetsEtudiantsRoutes);
app.use('/api/Technologies', authMiddleware, ProjetsEtudiantsRoutes);

// Redirection par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
