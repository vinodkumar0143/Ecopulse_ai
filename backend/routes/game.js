const express = require('express');
const router = express.Router();
const { updateScore, getLeaderboard, getUserBadges } = require('../controllers/gameController');

router.post('/update-score', updateScore);
router.get('/leaderboard', getLeaderboard);
router.get('/badges', getUserBadges);

module.exports = router;
