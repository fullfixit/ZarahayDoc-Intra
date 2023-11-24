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

const jwt = require('jsonwebtoken');

// Middleware d'authentification
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé. Jeton manquant.' });
  }

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Non autorisé. Jeton invalide.' });
    }
    req.user = user;
    next();
  });
}


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


// Endpoint de connexion
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  // Vérification du nom d'utilisateur et du mot de passe dans la base de données
  db.query('SELECT * FROM user WHERE name = ? AND password = ?', [name, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la connexion :', err);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    } else if (results.length > 0) {
      // Utilisateur trouvé, générer un token JWT avec des informations supplémentaires
      const user = results[0];
      const token = jwt.sign({ id: user.id, name: user.name,firstname: user.firstname, mail: user.mail}, 'secret_key');
      res.json({ name, firstname: user.firstname, mail: user.mail, token });
    } else {
      res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
  });
});

// Middleware pour vérifier le token JWT
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Accès non autorisé' });

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token non valide' });

    req.user = user;
    next();
  });
}

// Endpoint pour obtenir le profil de l'utilisateur
app.get('/user/profile', authenticateToken, (req, res) => {
  const userId = req.user.id;

  // Fetch user profile data from the database
  const getUserProfileQuery = 'SELECT * FROM user WHERE id = ?';
  db.query(getUserProfileQuery, [userId], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur du serveur' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Profil utilisateur non trouvé.' });
    }

    const user = results[0];
    // Remove sensitive information if necessary before sending the response
    const sanitizedProfile = {
      name: user.name,
      firstname: user.firstname,
      mail: user.mail,
      // Add more fields as needed
    };

    res.json(sanitizedProfile);
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
