interface RegionRisk {
  region: string;
  state: string;
  floodRisk: number; // 0-100
  earthquakeRisk: number; // 0-100
  cycloneRisk: number; // 0-100
  wildfireRisk: number; // 0-100
  landslideRisk: number; // 0-100
  heatwaveRisk: number; // 0-100
  overallRisk: number; // 0-100
  mainThreats: string[];
}

export function getRegionRiskAssessment(): RegionRisk[] {
  // This could be pulled from an actual ML model in a real app
  return [
    {
      region: "Coastal Kerala",
      state: "Kerala",
      floodRisk: 85,
      earthquakeRisk: 20,
      cycloneRisk: 65,
      wildfireRisk: 15,
      landslideRisk: 55,
      heatwaveRisk: 30,
      overallRisk: 72,
      mainThreats: ["Flooding", "Cyclones", "Landslides"]
    },
    {
      region: "Mumbai Metropolitan",
      state: "Maharashtra",
      floodRisk: 80,
      earthquakeRisk: 45,
      cycloneRisk: 70,
      wildfireRisk: 10,
      landslideRisk: 15,
      heatwaveRisk: 50,
      overallRisk: 68,
      mainThreats: ["Flooding", "Cyclones", "Urban Flooding"]
    },
    {
      region: "Himalayan Uttarakhand",
      state: "Uttarakhand",
      floodRisk: 60,
      earthquakeRisk: 85,
      cycloneRisk: 10,
      wildfireRisk: 65,
      landslideRisk: 90,
      heatwaveRisk: 20,
      overallRisk: 75,
      mainThreats: ["Landslides", "Earthquakes", "Wildfires"]
    },
    {
      region: "Coastal Odisha",
      state: "Odisha",
      floodRisk: 75,
      earthquakeRisk: 30,
      cycloneRisk: 90,
      wildfireRisk: 25,
      landslideRisk: 35,
      heatwaveRisk: 65,
      overallRisk: 78,
      mainThreats: ["Cyclones", "Flooding", "Heatwaves"]
    },
    {
      region: "Delhi-NCR",
      state: "Delhi",
      floodRisk: 55,
      earthquakeRisk: 60,
      cycloneRisk: 15,
      wildfireRisk: 30,
      landslideRisk: 5,
      heatwaveRisk: 85,
      overallRisk: 63,
      mainThreats: ["Heatwaves", "Urban Flooding", "Earthquakes"]
    },
    {
      region: "Gujarat Coast",
      state: "Gujarat",
      floodRisk: 60,
      earthquakeRisk: 70,
      cycloneRisk: 80,
      wildfireRisk: 35,
      landslideRisk: 15,
      heatwaveRisk: 75,
      overallRisk: 70,
      mainThreats: ["Cyclones", "Earthquakes", "Heatwaves"]
    },
    {
      region: "Central India",
      state: "Madhya Pradesh",
      floodRisk: 50,
      earthquakeRisk: 40,
      cycloneRisk: 25,
      wildfireRisk: 60,
      landslideRisk: 30,
      heatwaveRisk: 80,
      overallRisk: 58,
      mainThreats: ["Heatwaves", "Wildfires", "Flooding"]
    },
    {
      region: "Coastal Tamil Nadu",
      state: "Tamil Nadu",
      floodRisk: 70,
      earthquakeRisk: 30,
      cycloneRisk: 75,
      wildfireRisk: 20,
      landslideRisk: 25,
      heatwaveRisk: 60,
      overallRisk: 65,
      mainThreats: ["Cyclones", "Flooding", "Heatwaves"]
    }
  ];
}

export function predictDisastersByRegion(region: string): {
  upcomingRisks: Array<{
    disasterType: string;
    probability: number;
    timeframe: string;
    factors: string[];
  }>;
} {
  // Simulate predicting upcoming disaster risks for a region
  const disasterTypes = ["Flood", "Earthquake", "Cyclone", "Wildfire", "Landslide", "Heatwave"];
  const upcomingRisks = [];

  // Generate 1-3 random predicted disasters
  const numPredictions = Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < numPredictions; i++) {
    const disasterType = disasterTypes[Math.floor(Math.random() * disasterTypes.length)];
    const probability = Math.floor(Math.random() * 70) + 30; // 30-100%
    const timeframes = ["Next 7 days", "Next 30 days", "Next 3 months"];
    const timeframe = timeframes[Math.floor(Math.random() * timeframes.length)];

    // Generate factors
    const factorsByType = {
      "Flood": ["Heavy rainfall predicted", "High water levels in reservoirs", "Soil saturation from previous rains"],
      "Earthquake": ["Recent seismic activity", "Historical fault line activity", "Stress accumulation in tectonic plates"],
      "Cyclone": ["Rising sea temperatures", "Favorable atmospheric conditions", "Weather patterns from Bay of Bengal"],
      "Wildfire": ["Dry vegetation conditions", "Predicted high temperatures", "Low humidity levels"],
      "Landslide": ["Soil erosion from previous rainfall", "Steep terrain vulnerability", "Deforestation impact"],
      "Heatwave": ["Predicted temperature anomalies", "Historical summer patterns", "Climate trend analysis"]
    };

    const factors = factorsByType[disasterType as keyof typeof factorsByType] || [];

    upcomingRisks.push({
      disasterType,
      probability,
      timeframe,
      factors: factors.slice(0, 2) // Use 2 random factors
    });
  }

  return { upcomingRisks };
}