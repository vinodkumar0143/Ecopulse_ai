const express = require('express');
const router = express.Router();
const { generateAIAnalysis } = require('../controllers/aiController');
const { handleChatMessage } = require('../controllers/chatController');

router.post('/recommend', generateAIAnalysis);
router.post('/chat', handleChatMessage);

module.exports = router;
