// secret.js
const crypto = require('crypto');

// Generate a secure, randomly generated secret key
const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = secretKey;
