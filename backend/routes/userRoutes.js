const express = require('express');
const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', (req, res) => {
  res.status(201).json({
    message: 'Register route working',
    user: req.body,
  });
});

// @route   POST /api/users/login
// @desc    Authenticate user
// @access  Public
router.post('/login', (req, res) => {
  res.status(200).json({
    message: 'Login route working',
    user: req.body,
  });
});

module.exports = router;
