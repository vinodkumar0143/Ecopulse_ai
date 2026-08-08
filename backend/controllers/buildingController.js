const Building = require('../models/Building');
const { calculateSustainabilityScore } = require('../services/scoringService');
const { generateRecommendations } = require('../services/recommendationService');
const { generateAIRecommendations } = require('../services/aiService');

// @desc    Create new building assessment with AI recommendations (and rule fallback)
// @route   POST /api/buildings
// @access  Public
const createBuilding = async (req, res, next) => {
  try {
    const { type, area, energyUsage, waterUsage, materials } = req.body;

    // 1. Input Validation
    if (!type || area === undefined || energyUsage === undefined || waterUsage === undefined || !materials) {
      res.status(400);
      throw new Error('Please provide all required fields: type, area, energyUsage, waterUsage, materials');
    }

    const numericArea = Number(area);
    const numericEnergy = Number(energyUsage);
    const numericWater = Number(waterUsage);

    if (isNaN(numericArea) || numericArea < 10 || numericArea > 100000) {
      res.status(400);
      throw new Error('Building area must be a valid number between 10 and 100,000');
    }

    if (isNaN(numericEnergy) || numericEnergy < 0) {
      res.status(400);
      throw new Error('Energy usage must be a non-negative number');
    }

    if (isNaN(numericWater) || numericWater < 0) {
      res.status(400);
      throw new Error('Water usage must be a non-negative number');
    }

    const validMaterials = ['eco-friendly', 'moderate', 'non-eco'];
    const formattedMaterials = String(materials).toLowerCase().trim();
    if (!validMaterials.includes(formattedMaterials)) {
      res.status(400);
      throw new Error('Materials must be one of: eco-friendly, moderate, non-eco');
    }

    // 2. Compute Sustainability Score & Efficiency Metrics
    const { sustainabilityScore, efficiencyMetrics } = calculateSustainabilityScore({
      area: numericArea,
      energyUsage: numericEnergy,
      waterUsage: numericWater,
      materials: formattedMaterials,
    });

    // 3. Generate Recommendations (AI Engine with Rule Fallback)
    let recommendations = [];
    const buildingParams = {
      type: String(type).toLowerCase().trim(),
      area: numericArea,
      energyUsage: numericEnergy,
      waterUsage: numericWater,
      materials: formattedMaterials,
      sustainabilityScore,
    };

    try {
      recommendations = await generateAIRecommendations(buildingParams);
    } catch (aiErr) {
      console.log(`[AI Engine Status] Using rule-based fallback recommendations (${aiErr.message})`);
      recommendations = generateRecommendations(buildingParams, efficiencyMetrics);
    }

    // 4. Save Record to MongoDB
    const building = await Building.create({
      type: String(type).toLowerCase().trim(),
      area: numericArea,
      energyUsage: numericEnergy,
      waterUsage: numericWater,
      materials: formattedMaterials,
      sustainabilityScore,
      recommendations,
      efficiencyMetrics,
    });

    // 5. Success Response
    res.status(201).json({
      success: true,
      data: building,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all building assessments sorted by latest
// @route   GET /api/buildings
// @access  Public
const getBuildings = async (req, res, next) => {
  try {
    const buildings = await Building.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: buildings.length,
      data: buildings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single building assessment by ID
// @route   GET /api/buildings/:id
// @access  Public
const getBuildingById = async (req, res, next) => {
  try {
    const building = await Building.findById(req.params.id);

    if (!building) {
      res.status(404);
      throw new Error(`Building assessment not found with ID ${req.params.id}`);
    }

    res.status(200).json({
      success: true,
      data: building,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete building assessment by ID
// @route   DELETE /api/buildings/:id
// @access  Public
const deleteBuilding = async (req, res, next) => {
  try {
    const building = await Building.findByIdAndDelete(req.params.id);

    if (!building) {
      res.status(404);
      throw new Error(`Building assessment not found with ID ${req.params.id}`);
    }

    res.status(200).json({
      success: true,
      message: 'Building assessment deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBuilding,
  getBuildings,
  getBuildingById,
  deleteBuilding,
};
