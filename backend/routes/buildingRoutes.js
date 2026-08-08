const express = require('express');
const router = express.Router();
const {
  createBuilding,
  getBuildings,
  getBuildingById,
  deleteBuilding,
} = require('../controllers/buildingController');

// Route-Level Input Validation Middleware
const validateBuildingInput = (req, res, next) => {
  const { type, area, energyUsage, waterUsage, materials } = req.body;

  if (!type || area === undefined || energyUsage === undefined || waterUsage === undefined || !materials) {
    res.status(400);
    return next(
      new Error('Validation Failed: Missing required fields (type, area, energyUsage, waterUsage, materials)')
    );
  }

  next();
};

// Route-Level Logger Middleware
const logRouteHit = (req, res, next) => {
  console.log(`[API Route Hit] ${req.method} ${req.baseUrl}${req.path} - ${new Date().toISOString()}`);
  next();
};

// Apply router-level logging
router.use(logRouteHit);

// @route   GET /api/buildings & POST /api/buildings
router
  .route('/')
  .get(getBuildings)
  .post(validateBuildingInput, createBuilding);

// @route   GET /api/buildings/:id & DELETE /api/buildings/:id
router
  .route('/:id')
  .get(getBuildingById)
  .delete(deleteBuilding);

module.exports = router;
