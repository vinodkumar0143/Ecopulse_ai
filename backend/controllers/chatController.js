const { OpenAI } = require('openai');

/**
 * Intelligent fallback chatbot generator providing expert eco answers
 */
const generateFallbackChatReply = (message, contextData) => {
  const msg = message.toLowerCase();

  if (msg.includes('energy') || msg.includes('power') || msg.includes('electricity')) {
    return 'To optimize energy consumption: 1) Transition to LED lighting with occupancy sensors, 2) Install smart programmable thermostats with night setbacks, and 3) Consider rooftop solar PV installations which can reduce peak energy grid reliance by up to 45%.';
  }
  if (msg.includes('water') || msg.includes('plumbing') || msg.includes('leak')) {
    return 'For water efficiency: 1) Retrofit low-flow aerators on all faucets (reducing flow to 1.5 GPM), 2) Implement rainwater harvesting for irrigation, and 3) Install smart ultrasonic flow sensors to detect subsurface pipe leakage in real time.';
  }
  if (msg.includes('material') || msg.includes('building') || msg.includes('insulation')) {
    return 'Selecting sustainable building materials: Focus on FSC-certified timber, recycled steel structures, low-VOC non-toxic paints, and cellulose insulation. These materials lower embodied carbon footprints by over 30%.';
  }
  if (msg.includes('score') || msg.includes('dashboard') || msg.includes('rating')) {
    return 'Your sustainability score (0–100) is calculated using a 40/30/30 weighted index across energy intensity, water consumption efficiency, and material classification. Higher efficiency in energy consumption yields the largest score increase!';
  }
  if (msg.includes('cost') || msg.includes('save') || msg.includes('money') || msg.includes('roi')) {
    return 'Eco-retrofits typically deliver a high financial return. Smart HVAC retrofits and LED lighting upgrades yield an average 20–35% annual utility bill reduction, with typical payback periods under 24 months.';
  }

  return 'As your ECOPULSE AI Assistant, I can help you analyze energy consumption, reduce water intensity, select low-embodied carbon materials, and lower utility costs. What specific building area would you like to optimize?';
};

// @desc    Handle interactive AI chatbot message
// @route   POST /api/ai/chat
// @access  Public
const handleChatMessage = async (req, res, next) => {
  try {
    const { message, contextData } = req.body;

    if (!message || message.trim() === '') {
      res.status(400);
      throw new Error('Message text is required');
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey.trim() === '') {
      const fallbackReply = generateFallbackChatReply(message, contextData);
      return res.status(200).json({
        success: true,
        reply: fallbackReply,
      });
    }

    try {
      const openai = new OpenAI({ apiKey, timeout: 8000 });

      let contextPrompt = '';
      if (contextData) {
        contextPrompt = `Current Building Context:
- Type: ${contextData.type || 'N/A'}
- Area: ${contextData.area || 'N/A'} sq ft
- Energy: ${contextData.energyUsage || 'N/A'} kWh
- Water: ${contextData.waterUsage || 'N/A'} units
- Materials: ${contextData.materials || 'N/A'}
- Score: ${contextData.sustainabilityScore || 'N/A'}/100`;
      }

      const systemPrompt = `You are ECOPULSE AI, a world-class green building sustainability expert and assistant.
You help users improve energy efficiency, reduce water usage, select eco-friendly materials, and lower utility costs.
Always provide practical, clear, concise, and actionable advice in a friendly professional tone. Keep responses under 100 words.
${contextPrompt}`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      const reply = response.choices[0]?.message?.content || generateFallbackChatReply(message, contextData);

      res.status(200).json({
        success: true,
        reply,
      });
    } catch (openaiErr) {
      console.log(`[AI Chatbot Fallback] ${openaiErr.message}`);
      const fallbackReply = generateFallbackChatReply(message, contextData);
      res.status(200).json({
        success: true,
        reply: fallbackReply,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { handleChatMessage };
