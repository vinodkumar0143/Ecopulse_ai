const express = require('express');
const router = express.Router();
const { generateAIAnalysis } = require('../controllers/aiController');

router.post('/recommend', generateAIAnalysis);

module.exports = router;
