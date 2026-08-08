const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Support both /register and /signup aliases
router.post('/register', signup);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
