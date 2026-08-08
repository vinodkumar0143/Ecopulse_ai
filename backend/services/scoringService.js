/**
 * Scoring Engine Logic:
 * Energy Efficiency (40%)
 * Water Efficiency (30%)
 * Material Efficiency (30%)
 * Computes normalized sustainabilityScore (0–100)
 */
const calculateSustainabilityScore = ({ area, energyUsage, waterUsage, materials }) => {
  const validArea = Math.max(Number(area) || 1, 1);
  const validEnergy = Math.max(Number(energyUsage) || 0, 0);
  const validWater = Math.max(Number(waterUsage) || 0, 0);

  // 1. Energy Efficiency Score (40% weight) - Lower energy usage per sq unit yields higher score
  const energyIntensity = validEnergy / validArea;
  const rawEnergyScore = Math.max(0, 100 - energyIntensity * 10);
  const energyScore = Math.max(0, Math.min(100, rawEnergyScore));

  // 2. Water Efficiency Score (30% weight) - Lower water usage per sq unit yields higher score
  const waterIntensity = validWater / validArea;
  const rawWaterScore = Math.max(0, 100 - waterIntensity * 10);
  const waterScore = Math.max(0, Math.min(100, rawWaterScore));

  // 3. Material Efficiency Score (30% weight)
  let materialScore = 50;
  const matLower = (materials || '').toLowerCase().trim();
  if (matLower === 'eco-friendly') {
    materialScore = 90;
  } else if (matLower === 'moderate') {
    materialScore = 60;
  } else if (matLower === 'non-eco') {
    materialScore = 30;
  }

  // Weighted total (0–100 scale)
  const totalScore = (energyScore * 0.40) + (waterScore * 0.30) + (materialScore * 0.30);
  const sustainabilityScore = Math.max(0, Math.min(100, Math.round(totalScore)));

  return {
    sustainabilityScore,
    efficiencyMetrics: {
      energyEfficiency: Math.round(energyScore * 100) / 100,
      waterEfficiency: Math.round(waterScore * 100) / 100,
      materialEfficiency: Math.round(materialScore * 100) / 100,
    },
  };
};

module.exports = { calculateSustainabilityScore };
