const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Convertir l'URL du fichier en chemin absolu
 __filename = __filename || path.basename(__filename);
 __dirname = path.dirname(__filename);

const app = express();
const port = process.env.WEB_PORT || 3001;

// Servir les fichiers statiques du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Web server running at http://localhost:${port}`);
});

module.exports = app;
