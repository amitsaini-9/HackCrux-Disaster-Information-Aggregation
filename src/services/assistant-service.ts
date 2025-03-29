interface AssistantResponse {
  message: string;
  actions?: string[];
  resources?: { name: string, url: string }[];
}

export function getEmergencyAssistance(
  disasterType: string,
  query: string
): AssistantResponse {
  // Identify intent from query
  const intents = [
    { name: 'evacuation', keywords: ['evacuate', 'leave', 'escape', 'flee', 'get out'] },
    { name: 'shelter', keywords: ['shelter', 'hide', 'stay', 'cover', 'protect'] },
    { name: 'medical', keywords: ['medical', 'injured', 'hurt', 'wound', 'hospital', 'doctor'] },
    { name: 'supplies', keywords: ['food', 'water', 'supplies', 'medicine', 'essentials'] },
    { name: 'rescue', keywords: ['rescue', 'help', 'save', 'trapped', 'stuck'] },
    { name: 'contacts', keywords: ['contact', 'call', 'phone', 'number', 'emergency'] }
  ];

  // Determine intent
  const matchedIntents = intents
    .map(intent => ({
      intent: intent.name,
      score: intent.keywords.filter(keyword => query.toLowerCase().includes(keyword)).length
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const primaryIntent = matchedIntents.length > 0 ? matchedIntents[0].intent : 'general';

  // Get response based on disaster type and intent
  const responses = {
    flood: {
      evacuation: {
        message: "Move to higher ground immediately. Avoid walking or driving through floodwaters. Six inches of moving water can knock you down, and one foot of water can sweep your vehicle away.",
        actions: ["Move to higher ground", "Do not walk or drive through floodwater", "Follow official evacuation routes"],
        resources: [
          { name: "NDRF Helpline", url: "https://ndrf.gov.in" },
          { name: "Flood Safety Tips", url: "https://ndma.gov.in/Natural-Hazards/Floods" }
        ]
      },
      // Add other intents...
    },
    // Add other disaster types...
  };

  // Get response for the specific disaster and intent, or fallback to general advice
  const specificResponse = responses[disasterType as keyof typeof responses]?.[primaryIntent as keyof typeof responses.flood];

  if (specificResponse) {
    return specificResponse;
  }

  // Fallback general response
  return {
    message: "Stay safe and follow instructions from local authorities. If you're in immediate danger, call emergency services immediately.",
    actions: ["Follow official guidance", "Stay informed through official channels", "Prepare an emergency kit"],
    resources: [
      { name: "National Disaster Response Force", url: "https://ndrf.gov.in" },
      { name: "National Disaster Management Authority", url: "https://ndma.gov.in" }
    ]
  };
}