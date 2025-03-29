import { DataSourceType, RawDataItem } from '../types';

/**
 * This is a mock implementation of a Weather Service API client
 * In a real application, you would use a proper weather API service
 */
export async function collectWeatherData(): Promise<RawDataItem[]> {
  console.log('Collecting data from Weather Services...');

  // In a real implementation, we would:
  // 1. Authenticate with the Weather API
  // 2. Fetch severe weather alerts and warnings
  // 3. Process and return the results

  // For now, we'll return mock data
  return [
    {
      id: "weather1",
      sourceType: DataSourceType.WEATHER,
      content: "Hurricane warning issued for the Gulf of Mexico. Category 3 hurricane with wind speeds up to 125 mph moving towards the Florida coast. Expected landfall within 48 hours.",
      author: "National Hurricane Center",
      url: "https://example.com/hurricane-warning",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      location: {
        name: "Gulf of Mexico",
        latitude: 25.83,
        longitude: -85.17,
        country: "USA",
        region: "Gulf Coast",
      },
      metadata: {
        hurricaneCategory: 3,
        windSpeed: "125 mph",
        pressure: "952 mb",
      },
      credibility: 0.98,
    },
    {
      id: "weather2",
      sourceType: DataSourceType.WEATHER,
      content: "Severe flood warning issued for the Chao Phraya River basin. Heavy monsoon rains expected to continue for the next 72 hours, increasing flood risk in low-lying areas.",
      author: "Thai Meteorological Department",
      url: "https://example.com/flood-warning-thailand",
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
      location: {
        name: "Chao Phraya River Basin",
        latitude: 14.05,
        longitude: 100.48,
        country: "Thailand",
        region: "Central Thailand",
      },
      metadata: {
        rainfallAmount: "342mm",
        floodStage: "Rising",
        riverLevel: "4.2m",
      },
      credibility: 0.97,
    },
    {
      id: "weather3",
      sourceType: DataSourceType.WEATHER,
      content: "Red flag warning issued for Northern California due to high winds and dry conditions. Extreme fire danger present.",
      author: "National Weather Service",
      url: "https://example.com/fire-warning-california",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      location: {
        name: "Northern California",
        latitude: 39.76,
        longitude: -121.62,
        country: "USA",
        region: "California",
      },
      metadata: {
        windSpeed: "35 mph",
        humidity: "15%",
        temperature: "95°F",
      },
      credibility: 0.96,
    },
  ];
}