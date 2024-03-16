const jwt = require('jsonwebtoken');
const secretKey = require('../secret/secret');

function authenticateToken(req, res, next) {
    let token = req.headers['authorization'];

    // Check if the token starts with "Bearer "
    if (token && token.startsWith('Bearer ')) {
        // Remove the "Bearer " prefix
        token = token.slice(7);
    }

    // Log the received token
    console.log('Received token:', token);

    if (!token) {
        console.error('No token provided');
        return res.sendStatus(401); // No token provided
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err.message);
            return res.sendStatus(403); // Token is not valid
        }

        // Log the user extracted from the token
        console.log('User extracted from token:', user);

        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = authenticateToken;
