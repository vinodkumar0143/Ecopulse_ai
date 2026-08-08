const { getAIBuildingAnalysis } = require('../services/openaiService');
const { calculateSustainabilityScore } = require('../services/scoringService');

// @desc    Generate structured AI sustainability recommendations & insights
// @route   POST /api/ai/recommend
// @access  Public
const generateAIAnalysis = async (req, res, next) => {
  try {
    const { buildingType, type, area, energyUsage, waterUsage, materials, sustainabilityScore } = req.body;

    const propertyType = buildingType || type;

    if (!propertyType || area === undefined || energyUsage === undefined || waterUsage === undefined || !materials) {
      res.status(400);
      throw new Error('Please provide all building fields: type, area, energyUsage, waterUsage, materials');
    }

    const numericArea = Number(area);
    const numericEnergy = Number(energyUsage);
    const numericWater = Number(waterUsage);

    let computedScore = sustainabilityScore;
    if (computedScore === undefined) {
      const scoringResult = calculateSustainabilityScore({
        area: numericArea,
        energyUsage: numericEnergy,
        waterUsage: numericWater,
        materials,
      });
      computedScore = scoringResult.sustainabilityScore;
    }

    const aiPayload = {
      type: String(propertyType).toLowerCase().trim(),
      area: numericArea,
      energyUsage: numericEnergy,
      waterUsage: numericWater,
      materials: String(materials).toLowerCase().trim(),
      sustainabilityScore: computedScore,
    };

    const aiAnalysis = await getAIBuildingAnalysis(aiPayload);

    res.status(200).json({
      success: true,
      data: {
        sustainabilityScore: computedScore,
        ...aiAnalysis,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateAIAnalysis };
