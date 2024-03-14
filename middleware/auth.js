const jwt = require('jsonwebtoken');
// const secretKey = '121314'; // This should be a secure, randomly generated string
const secretKey = require('../secret/secret');
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401); // No token provided

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Token is not valid
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = authenticateToken;
