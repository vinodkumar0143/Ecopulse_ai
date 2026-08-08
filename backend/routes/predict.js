const express = require('express');
const router = express.Router();
const { generateForecast } = require('../controllers/predictController');

router.post('/forecast', generateForecast);

module.exports = router;
