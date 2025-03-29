export const dashboardRecentEvents = [
  {
    title: "Flooding in Eastern Thailand",
    type: "Flood",
    time: "2 hours ago",
    location: "Chanthaburi, Thailand",
    severity: "Moderate",
  },
  {
    title: "Wildfire in California",
    type: "Fire",
    time: "5 hours ago",
    location: "Northern California, USA",
    severity: "Severe",
  },
  {
    title: "Earthquake off the coast of Japan",
    type: "Earthquake",
    time: "12 hours ago",
    location: "Miyagi Prefecture, Japan",
    severity: "Moderate",
  },
  {
    title: "Hurricane approaching Florida",
    type: "Hurricane",
    time: "1 day ago",
    location: "Gulf of Mexico",
    severity: "High",
  },
]

export const dashboardRecentAlerts = [
  {
    title: "Mumbai Monsoon Flooding",
    type: "Flood",
    location: "Mumbai, India",
    severity: "Severe",
    time: "6 hours ago",
  },
  {
    title: "Kerala Landslides",
    type: "Landslide",
    location: "Kerala, India",
    severity: "High",
    time: "12 hours ago",
  },
  {
    title: "Cyclone Warning for Eastern Coast",
    type: "Cyclone",
    location: "Odisha, India",
    severity: "High",
    time: "3 hours ago",
  },
  {
    title: "Himalayan Avalanche",
    type: "Avalanche",
    location: "Himachal Pradesh, India",
    severity: "Severe",
    time: "1 day ago",
  },
  {
    title: "Heatwave in Northern India",
    type: "Heatwave",
    location: "Delhi, India",
    severity: "Moderate",
    time: "8 hours ago",
  },
  {
    title: "Earthquakes in Japan",
    type: "Earthquake",
    location: "Japan",
    severity: "Moderate",
    time: "2 hours ago",
  },
  {
    title: "California Wildfires",
    type: "Fire",
    location: "California, USA",
    severity: "Severe",
    time: "5 hours ago",
  },
  {
    title: "Southeast Asia Flooding",
    type: "Flood",
    location: "Southeast Asia",
    severity: "Moderate",
    time: "1 day ago",
  },
  {
    title: "Nepal Earthquake Aftershocks",
    type: "Earthquake",
    location: "Nepal",
    severity: "Moderate",
    time: "4 hours ago",
  },
  {
    title: "Bangladesh River Flooding",
    type: "Flood",
    location: "Bangladesh",
    severity: "High",
    time: "10 hours ago",
  },
  {
    title: "Sri Lanka Coastal Flooding",
    type: "Flood",
    location: "Sri Lanka",
    severity: "Moderate",
    time: "1 day ago",
  },
  {
    title: "Pakistan Flash Floods",
    type: "Flood",
    location: "Pakistan",
    severity: "Severe",
    time: "7 hours ago",
  }
]
export const allDisasterEvents = [
  {
    title: "Mumbai Monsoon Flooding",
    type: "Flood",
    location: "Mumbai, India",
    severity: "Severe",
    time: "6 hours ago",
    trending: true,
    affectedPopulation: 2300000,
    casualties: 12,
  },
  {
    title: "Kerala Landslides",
    type: "Landslide",
    location: "Kerala, India",
    severity: "High",
    time: "12 hours ago",
    trending: true,
    affectedPopulation: 75000,
    casualties: 23,
  },
  {
    title: "Cyclone Warning for Eastern Coast",
    type: "Cyclone",
    location: "Odisha, India",
    severity: "High",
    time: "3 hours ago",
    trending: true,
    affectedPopulation: 1500000,
    casualties: 0, // Warning phase
  },
  {
    title: "Himalayan Avalanche",
    type: "Avalanche",
    location: "Himachal Pradesh, India",
    severity: "Severe",
    time: "1 day ago",
    trending: false,
    affectedPopulation: 8500,
    casualties: 7,
  },
  {
    title: "Heatwave in Northern India",
    type: "Heatwave",
    location: "Delhi, India",
    severity: "Moderate",
    time: "8 hours ago",
    trending: false,
    affectedPopulation: 3200000,
    casualties: 15,
  },
  {
    title: "Earthquakes in Japan",
    type: "Earthquake",
    location: "Japan",
    severity: "Moderate",
    time: "2 hours ago",
    trending: true,
    affectedPopulation: 120000,
    casualties: 3,
  },
  {
    title: "California Wildfires",
    type: "Fire",
    location: "California, USA",
    severity: "Severe",
    time: "5 hours ago",
    trending: true,
    affectedPopulation: 85000,
    casualties: 2,
  },
  {
    title: "Southeast Asia Flooding",
    type: "Flood",
    location: "Southeast Asia",
    severity: "Moderate",
    time: "1 day ago",
    trending: false,
    affectedPopulation: 450000,
    casualties: 8,
  },
  {
    title: "Nepal Earthquake Aftershocks",
    type: "Earthquake",
    location: "Nepal",
    severity: "Moderate",
    time: "4 hours ago",
    trending: true,
    affectedPopulation: 65000,
    casualties: 5,
  },
  {
    title: "Bangladesh River Flooding",
    type: "Flood",
    location: "Bangladesh",
    severity: "High",
    time: "10 hours ago",
    trending: false,
    affectedPopulation: 780000,
    casualties: 18,
  },
  {
    title: "Sri Lanka Coastal Flooding",
    type: "Flood",
    location: "Sri Lanka",
    severity: "Moderate",
    time: "1 day ago",
    trending: false,
    affectedPopulation: 35000,
    casualties: 2,
  },
  {
    title: "Pakistan Flash Floods",
    type: "Flood",
    location: "Pakistan",
    severity: "Severe",
    time: "7 hours ago",
    trending: true,
    affectedPopulation: 520000,
    casualties: 27,
  }
];
export const severeEventsList = allDisasterEvents.filter(event =>
  event.severity === "Severe" || event.casualties >= 20
).sort((a, b) => b.casualties - a.casualties);

export const trendingEventsList = allDisasterEvents.filter(event =>
  event.trending === true
).sort((a, b) => {
  // Sort by recency (this is a simple approximation assuming the time format)
  const aHours = parseInt(a.time.split(' ')[0]);
  const bHours = parseInt(b.time.split(' ')[0]);

  if (a.time.includes('hour') && b.time.includes('hour')) {
    return aHours - bHours; // More recent hours first
  } else if (a.time.includes('hour')) {
    return -1; // Hours before days
  } else if (b.time.includes('hour')) {
    return 1;  // Hours before days
  } else {
    return aHours - bHours; // Compare days
  }
});