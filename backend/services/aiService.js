const { OpenAI } = require('openai');

/**
 * AI Recommendation Generator Service
 * Connects to OpenAI API if OPENAI_API_KEY is configured, returning 5 actionable suggestions
 */
const generateAIRecommendations = async (buildingData) => {
  const { type, area, energyUsage, waterUsage, materials, sustainabilityScore } = buildingData;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey.trim() === '') {
    throw new Error('OPENAI_API_KEY is not configured in .env');
  }

  const openai = new OpenAI({ apiKey, timeout: 8000 });

  const prompt = `You are a green building sustainability expert.

Analyze the following building parameters:
Building Type: ${type}
Building Area: ${area} sq ft
Monthly Energy Usage: ${energyUsage} kWh
Monthly Water Usage: ${waterUsage} units
Materials Classification: ${materials}
Calculated Sustainability Score: ${sustainabilityScore}/100

Provide 5 actionable, practical, and realistic recommendations to improve this building's sustainability score.
Format your output as 5 concise bullet points without numbering prefixes. Keep each point under 25 words.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 250,
    temperature: 0.7,
  });

  const content = completion.choices[0]?.message?.content || '';
  const lines = content
    .split('\n')
    .map((line) => line.replace(/^[-*•\d.\s]+/, '').trim())
    .filter((line) => line.length > 5);

  if (lines.length === 0) {
    throw new Error('Received empty response from OpenAI');
  }

  return lines.slice(0, 5);
};

module.exports = { generateAIRecommendations };
