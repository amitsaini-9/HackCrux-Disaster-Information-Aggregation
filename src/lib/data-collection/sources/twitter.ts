import { DataSourceType, RawDataItem } from '../types';

/**
 * This is a mock implementation of a Twitter/X API client
 * In a real application, you would use the Twitter API client library
 */
export async function collectTwitterData(): Promise<RawDataItem[]> {
  console.log('Collecting data from Twitter/X...');

  // In a real implementation, we would:
  // 1. Authenticate with the Twitter API
  // 2. Search for tweets containing disaster-related keywords
  // 3. Process and return the results

  // For now, we'll return mock data
  return [
    {
      id: "tw1",
      sourceType: DataSourceType.TWITTER,
      content: "Breaking: Magnitude 6.2 earthquake reported off the coast of Japan. Tsunami warning issued for coastal areas. #earthquake #japan",
      author: "DisasterAlert",
      url: "https://twitter.com/DisasterAlert/status/1234567890",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      location: {
        name: "Japan",
        latitude: 38.32,
        longitude: 142.37,
        country: "Japan",
      },
      metadata: {
        retweetCount: 1245,
        likeCount: 827,
        verified: true,
      },
      credibility: 0.85,
    },
    {
      id: "tw2",
      sourceType: DataSourceType.TWITTER,
      content: "Massive flooding in Thailand has displaced thousands. Relief efforts underway. #ThailandFloods #disaster",
      author: "WeatherUpdates",
      url: "https://twitter.com/WeatherUpdates/status/1234567891",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      location: {
        name: "Thailand",
        latitude: 12.61,
        longitude: 102.10,
        country: "Thailand",
        region: "Eastern Thailand",
      },
      metadata: {
        retweetCount: 892,
        likeCount: 541,
        verified: true,
      },
      credibility: 0.82,
    },
    {
      id: "tw3",
      sourceType: DataSourceType.TWITTER,
      content: "Wildfire in Northern California spreading rapidly. Mandatory evacuations in place for several areas. Stay safe! #CaliforniaFires",
      author: "CAFireUpdates",
      url: "https://twitter.com/CAFireUpdates/status/1234567892",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      location: {
        name: "Northern California",
        latitude: 39.76,
        longitude: -121.62,
        country: "USA",
        region: "California",
      },
      metadata: {
        retweetCount: 1823,
        likeCount: 1102,
        verified: false,
      },
      credibility: 0.75,
    },
  ];
}