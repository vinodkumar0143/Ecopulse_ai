const { OpenAI } = require('openai');

// In-memory cache map for AI responses
const aiCache = new Map();

/**
 * Generate a cache key string from building data
 */
const getCacheKey = (data) => {
  return `${data.type}_${data.area}_${data.energyUsage}_${data.waterUsage}_${data.materials}_${data.sustainabilityScore || 0}`;
};

/**
 * Fallback generator providing structured eco insights when OpenAI API is unavailable
 */
const generateFallbackAnalysis = (buildingData) => {
  const { type, area, energyUsage, waterUsage, materials, sustainabilityScore = 75 } = buildingData;

  const energyIntensity = area > 0 ? (energyUsage / area).toFixed(2) : '0.23';
  const waterIntensity = area > 0 ? (waterUsage / area).toFixed(2) : '0.17';

  let scoreExplanation = '';
  if (sustainabilityScore >= 80) {
    scoreExplanation = `This ${type} property exhibits exceptional environmental efficiency (${sustainabilityScore}/100) with low energy intensity (${energyIntensity} kWh/sq ft) and sustainable ${materials} materials.`;
  } else if (sustainabilityScore >= 50) {
    scoreExplanation = `This ${type} facility has moderate efficiency (${sustainabilityScore}/100). Consumption of ${energyUsage} kWh energy and ${waterUsage} units water leaves room for 20-30% optimization.`;
  } else {
    scoreExplanation = `This ${type} property needs immediate sustainability upgrades (${sustainabilityScore}/100). High energy density (${energyIntensity} kWh/sq ft) and non-eco materials significantly degrade performance.`;
  }

  const recommendations = [
    `Install rooftop solar PV array to offset up to 45% of peak electrical loads.`,
    `Upgrade HVAC systems with smart IoT thermostats and variable refrigerant flow (VRF) technology.`,
    `Retrofit water fixtures with high-efficiency low-flow aerators and greywater recycling systems.`,
    `Transition building materials to certified recycled low-embodied carbon insulation.`,
    `Deploy automated smart sub-metering to track real-time power distribution loss.`,
  ];

  const costSavings = `Estimated operational utility cost reduction of $1,850 to $3,200 annually through solar installation and smart HVAC retrofits.`;

  const environmentalImpact = `Optimizing building efficiency will reduce annual greenhouse gas emissions by approximately 4.8 metric tons CO2e and conserve 28,000 gallons of water per year.`;

  const improvementTips = [
    `Schedule HVAC filter changes quarterly to maintain airflow efficiency.`,
    `Set automated night setback temperatures for commercial spaces.`,
    `Utilize rainwater harvesting for exterior landscaping irrigation.`,
    `Conduct annual thermal imaging audits to detect insulation leakage.`,
  ];

  return {
    scoreExplanation,
    recommendations,
    costSavings,
    environmentalImpact,
    improvementTips,
  };
};

/**
 * OpenAI Service - Fetches structured AI building sustainability analysis with caching & fallback
 */
const getAIBuildingAnalysis = async (buildingData) => {
  const cacheKey = getCacheKey(buildingData);

  // Return cached result if available
  if (aiCache.has(cacheKey)) {
    console.log('[AI Service] Returning cached AI analysis');
    return aiCache.get(cacheKey);
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey.trim() === '') {
    console.log('[AI Service] OpenAI API key missing. Using fallback generator.');
    const fallback = generateFallbackAnalysis(buildingData);
    aiCache.set(cacheKey, fallback);
    return fallback;
  }

  try {
    const openai = new OpenAI({ apiKey, timeout: 8000 });

    const prompt = `You are a senior green building sustainability consultant.

Analyze the following building metrics:
- Building Type: ${buildingData.type}
- Total Area: ${buildingData.area} sq ft
- Monthly Energy Usage: ${buildingData.energyUsage} kWh
- Monthly Water Usage: ${buildingData.waterUsage} units
- Materials Classification: ${buildingData.materials}
- Sustainability Score: ${buildingData.sustainabilityScore || 'N/A'}/100

Respond strictly in valid JSON format with the exact keys:
{
  "scoreExplanation": "Concise paragraph explaining the score based on data",
  "recommendations": ["5 specific actionable recommendations"],
  "costSavings": "Estimated annual utility financial cost savings",
  "environmentalImpact": "CO2 emissions reduction and environmental impact",
  "improvementTips": ["4 practical optimization tips"]
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 450,
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const rawContent = response.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(rawContent);

    // Validate parsed format
    const structuredResult = {
      scoreExplanation: parsed.scoreExplanation || generateFallbackAnalysis(buildingData).scoreExplanation,
      recommendations: Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0
        ? parsed.recommendations.slice(0, 5)
        : generateFallbackAnalysis(buildingData).recommendations,
      costSavings: parsed.costSavings || generateFallbackAnalysis(buildingData).costSavings,
      environmentalImpact: parsed.environmentalImpact || generateFallbackAnalysis(buildingData).environmentalImpact,
      improvementTips: Array.isArray(parsed.improvementTips) && parsed.improvementTips.length > 0
        ? parsed.improvementTips.slice(0, 4)
        : generateFallbackAnalysis(buildingData).improvementTips,
    };

    aiCache.set(cacheKey, structuredResult);
    return structuredResult;
  } catch (error) {
    console.log(`[AI Service Error] ${error.message}. Returning structured fallback.`);
    const fallback = generateFallbackAnalysis(buildingData);
    aiCache.set(cacheKey, fallback);
    return fallback;
  }
};

module.exports = { getAIBuildingAnalysis };
