const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Récupérer le token JWT de l'en-tête Authorization

  if (token == null) {
    return res.sendStatus(401); // Si aucun token n'est fourni, renvoyer un statut 401 Unauthorized
  }

  jwt.verify(token, 'your_secret_key', (err, user) => { // Vérifier et décoder le token JWT
    if (err) {
      return res.sendStatus(403); // Si le token est invalide, renvoyer un statut 403 Forbidden
    }
    req.user = user; // Ajouter l'utilisateur décrypté à l'objet de requête pour une utilisation ultérieure
    next(); // Passer à la prochaine fonction middleware
  });
}

module.exports = { authenticateToken };
