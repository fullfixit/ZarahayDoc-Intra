const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zarahay',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connecté à la base de données MySQL');
});

// Configuration Express
app.use(express.json());


//Création user SigIn
app.post('/signup', (req, res) => {
    const { name, firstname, mail, password, photo } = req.body;
  
    // Vérifier si l'utilisateur existe déjà
    const checkUserQuery = 'SELECT * FROM user WHERE mail = ?';
    db.query(checkUserQuery, [mail], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur du serveur' });
      }
  
      if (results.length > 0) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
      }
  
      // Insérer l'utilisateur dans la base de données
      const insertUserQuery = 'INSERT INTO user (name, firstname, mail, password, photo) VALUES (?, ?, ?, ?, ?)';
      db.query(insertUserQuery, [name, firstname, mail, password, photo], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Erreur du serveur' });
        }
  
        // Réponse au client
        res.json({ message: 'Inscription réussie !' });
      });
    });
  });
  

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
