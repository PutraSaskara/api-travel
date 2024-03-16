const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// const secretKey = '121314'; // This should be a secure, randomly generated string
const secretKey = require('../secret/secret.js');

// Define your single user
const user = {
    id: 1,
    username: 'sas',
    password: bcrypt.hashSync("123", 10)
};

router.post('/login', (req, res) => {
    // Check if the provided username and password match the single user
    const { username, password } = req.body;
    if (username !== user.username || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

    res.json({ token });
});


module.exports = router;
