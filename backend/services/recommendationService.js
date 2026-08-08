/**
 * Smart Recommendation Engine
 * Generates dynamic sustainability recommendations based on energy, water, and material analysis
 */
const generateRecommendations = ({ area, energyUsage, waterUsage, materials }, efficiencyMetrics) => {
  const recommendations = [];
  const validArea = Math.max(Number(area) || 1, 1);
  const energyIntensity = energyUsage / validArea;
  const waterIntensity = waterUsage / validArea;
  const matLower = (materials || '').toLowerCase().trim();

  // Energy Usage & Efficiency Conditions
  if (energyUsage > 500 || energyIntensity > 3 || efficiencyMetrics.energyEfficiency < 70) {
    recommendations.push('Install rooftop solar panels to offset high grid energy reliance.');
    recommendations.push('Upgrade building insulation and use double-pane low-emissivity smart windows.');
    recommendations.push('Use energy-efficient HVAC equipment and automated occupancy sensors.');
  } else {
    recommendations.push('Maintain smart LED lighting systems and optimize off-peak energy scheduling.');
  }

  // Water Usage & Efficiency Conditions
  if (waterUsage > 300 || waterIntensity > 2 || efficiencyMetrics.waterEfficiency < 70) {
    recommendations.push('Implement a rainwater harvesting system for non-potable irrigation and flushing.');
    recommendations.push('Install low-flow aerated fixtures and automated leak detection valves.');
  } else {
    recommendations.push('Conduct bi-annual water audits and maintain sub-metering systems.');
  }

  // Material Efficiency Conditions
  if (matLower === 'non-eco') {
    recommendations.push('Switch to certified eco-friendly building materials such as bamboo and FSC timber.');
    recommendations.push('Use recycled construction materials and non-toxic low-VOC paints.');
  } else if (matLower === 'moderate') {
    recommendations.push('Increase the proportion of regionally sourced renewable materials.');
  } else {
    recommendations.push('Promote circular economy principles and sustainable vendor procurement.');
  }

  return recommendations;
};

module.exports = { generateRecommendations };
