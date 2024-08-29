const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const notesRouter = require('./routes/notes.js');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Activer CORS pour toutes les requêtes
app.use(cors());

app.use(express.json());
app.use('/api', notesRouter);

app.listen(port, () => {
  console.log(`API listening at ${process.env.API_BASE_URL || `http://localhost:${port}`}`);
});
