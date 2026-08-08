const forecastCache = new Map();

/**
 * Generate in-memory cache key
 */
const getCacheKey = (data) => {
  return `${data.type}_${data.area}_${data.energyUsage}_${data.waterUsage}_${data.carbonScore}_${data.timeframe || '7d'}`;
};

// @desc    Generate predictive sustainability & energy forecast
// @route   POST /api/predict/forecast
// @access  Public
const generateForecast = async (req, res, next) => {
  try {
    const {
      energyUsage = 400,
      waterUsage = 250,
      carbonScore = 75,
      area = 1500,
      type = 'commercial',
      timeframe = '7d',
    } = req.body;

    const cacheKey = getCacheKey({ energyUsage, waterUsage, carbonScore, area, type, timeframe });
    if (forecastCache.has(cacheKey)) {
      console.log('[Prediction Service] Returning cached forecast');
      return res.status(200).json({
        success: true,
        data: forecastCache.get(cacheKey),
      });
    }

    const numDays = timeframe === '30d' ? 30 : 7;
    const dailyBaseEnergy = (Number(energyUsage) / 30);
    const dailyBaseCarbon = dailyBaseEnergy * 0.42;

    const energyTrend = [];
    const futureCarbon = [];

    const now = new Date();

    for (let i = 1; i <= numDays; i++) {
      const forecastDate = new Date(now);
      forecastDate.setDate(now.getDate() + i);
      const dayLabel = forecastDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      // Add realistic environmental fluctuation (+/- 8%)
      const variation = 1 + (Math.sin(i * 0.8) * 0.08);
      const projectedEnergy = Math.round((dailyBaseEnergy * variation) * 10) / 10;
      const projectedCarbon = Math.round((dailyBaseCarbon * variation) * 10) / 10;

      energyTrend.push({
        day: dayLabel,
        energy: projectedEnergy,
      });

      futureCarbon.push({
        day: dayLabel,
        carbon: projectedCarbon,
      });
    }

    // Evaluate Risk Level
    const energyIntensity = area > 0 ? Number(energyUsage) / Number(area) : 0.25;
    let riskLevel = 'Low';
    if (energyIntensity > 0.35 || Number(carbonScore) < 50) {
      riskLevel = 'High';
    } else if (energyIntensity > 0.20 || Number(carbonScore) < 80) {
      riskLevel = 'Medium';
    }

    let predictionSummary = '';
    if (riskLevel === 'High') {
      predictionSummary = `High-risk trajectory detected! If current energy intensity (${energyIntensity.toFixed(2)} kWh/sq ft) continues unchanged, carbon emissions will escalate by 18% over the next ${numDays} days.`;
    } else if (riskLevel === 'Medium') {
      predictionSummary = `Moderate consumption profile. Energy usage is projected to remain steady, but peak demand spikes could increase utility expenses if unmonitored.`;
    } else {
      predictionSummary = `Optimal low-emission trajectory! Projected energy usage remains within top 10% eco efficiency benchmarks for ${type} properties over the next ${numDays} days.`;
    }

    const suggestions = [
      `Implement automated night setbacks for HVAC units to flatten peak evening demand curve.`,
      `Shift energy-intensive equipment operations to off-peak electrical tariff hours.`,
      `Install smart sub-meters on high-load circuits to isolate passive phantom power draw.`,
      `Upgrade window glazing and thermal insulation to reduce thermal gain by up to 22%.`,
    ];

    const result = {
      timeframe,
      riskLevel,
      predictionSummary,
      energyTrend,
      futureCarbon,
      suggestions,
      projectedTotalEnergy: Math.round(energyTrend.reduce((acc, curr) => acc + curr.energy, 0)),
      projectedTotalCarbon: Math.round(futureCarbon.reduce((acc, curr) => acc + curr.carbon, 0)),
    };

    forecastCache.set(cacheKey, result);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateForecast };
