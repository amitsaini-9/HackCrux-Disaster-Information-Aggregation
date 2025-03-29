import { DataSourceType, RawDataItem } from '../types';

/**
 * This is a mock implementation of a News API client
 * In a real application, you would use a proper news API service like NewsAPI.org
 */
export async function collectNewsData(): Promise<RawDataItem[]> {
  console.log('Collecting data from News API...');

  // In a real implementation, we would:
  // 1. Authenticate with the News API
  // 2. Search for articles containing disaster-related keywords
  // 3. Process and return the results

  // For now, we'll return mock data
  return [
    {
      id: "news1",
      sourceType: DataSourceType.NEWS,
      content: "A powerful magnitude 6.2 earthquake struck off the eastern coast of Japan today, prompting tsunami warnings for several coastal prefectures. The Japan Meteorological Agency issued advisories for waves up to 1 meter high. No major damage has been reported so far.",
      author: "Japan Times",
      url: "https://example.com/japan-earthquake-news",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      location: {
        name: "Miyagi Prefecture, Japan",
        latitude: 38.30,
        longitude: 142.40,
        country: "Japan",
        region: "Tohoku",
      },
      metadata: {
        source: "Japan Times",
        category: "Natural Disaster",
      },
      credibility: 0.95,
    },
    {
      id: "news2",
      sourceType: DataSourceType.NEWS,
      content: "Thailand's eastern provinces face worst flooding in 5 years as monsoon intensifies. Over 5,000 homes have been affected, and authorities have established emergency shelters in local schools and community centers. The Thai Meteorological Department forecasts continued heavy rainfall over the next 48 hours.",
      author: "Bangkok Post",
      url: "https://example.com/thailand-floods-news",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      location: {
        name: "Chanthaburi, Thailand",
        latitude: 12.61,
        longitude: 102.10,
        country: "Thailand",
        region: "Eastern Thailand",
      },
      metadata: {
        source: "Bangkok Post",
        category: "Natural Disaster",
      },
      credibility: 0.92,
    },
    {
      id: "news3",
      sourceType: DataSourceType.NEWS,
      content: "California wildfire expands to 10,000 acres in just 24 hours, threatening communities in the Sierra Nevada foothills. Cal Fire reports the blaze is only 5% contained as strong winds continue to fuel its rapid expansion. Evacuation orders have been issued for several communities.",
      author: "California News Network",
      url: "https://example.com/california-wildfire-news",
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
      location: {
        name: "Sierra Nevada, California",
        latitude: 39.76,
        longitude: -121.62,
        country: "USA",
        region: "California",
      },
      metadata: {
        source: "California News Network",
        category: "Wildfire",
      },
      credibility: 0.88,
    },
  ];
}