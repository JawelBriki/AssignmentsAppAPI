let User = require ('../model/user');
let bcrypt = require('bcrypt')

// Inscription d'un utilisateur (POST)
function registerUser(req, res) {
  let { username, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  User.findOne({ username: username }, (err, existingUser) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash du mot de passe
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).send(err);
      }

      // Créer un nouvel utilisateur
      let newUser = new User({
        username: username,
        password: hashedPassword,
        admin: false
      });

      newUser.save((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
}

// Connexion d'un utilisateur (POST)
function loginUser(req, res) {
  let { username, password } = req.body;

  // Vérifier si l'utilisateur existe
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Vérifier le mot de passe
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      res.status(200).json({ message: 'Login successful' });
    });
  });
}

module.exports = { registerUser, loginUser };