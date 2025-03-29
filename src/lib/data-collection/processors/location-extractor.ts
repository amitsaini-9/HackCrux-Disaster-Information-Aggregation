/**
 * This module contains functions to extract and process location information
 */

interface LocationInfo {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  region?: string;
  city?: string;
}

// In a real implementation, we would use a geocoding service
// and more sophisticated NLP techniques for location extraction
export function extractLocation(
  text: string,
  providedLocation?: {
    name?: string;
    latitude?: number;
    longitude?: number;
    country?: string;
    region?: string;
  }
): LocationInfo {
  // If location data is already provided, use it
  if (
    providedLocation &&
    providedLocation.latitude !== undefined &&
    providedLocation.longitude !== undefined
  ) {
    return {
      name: providedLocation.name || "Unknown",
      latitude: providedLocation.latitude,
      longitude: providedLocation.longitude,
      country: providedLocation.country,
      region: providedLocation.region,
    };
  }

  // Simple location extraction from text 
  const lowerText = text.toLowerCase();

  // Check for common location names in the text
  const locations = [
    { name: "Japan", latitude: 36.2048, longitude: 138.2529, country: "Japan" },
    { name: "Tokyo", latitude: 35.6762, longitude: 139.6503, country: "Japan", region: "Kanto", city: "Tokyo" },
    { name: "Thailand", latitude: 15.8700, longitude: 100.9925, country: "Thailand" },
    { name: "Bangkok", latitude: 13.7563, longitude: 100.5018, country: "Thailand", region: "Central Thailand", city: "Bangkok" },
    { name: "California", latitude: 36.7783, longitude: -119.4179, country: "USA", region: "California" },
    { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437, country: "USA", region: "California", city: "Los Angeles" },
    { name: "Gulf of Mexico", latitude: 25.5000, longitude: -90.0000, country: "USA", region: "Gulf Coast" },
    { name: "Florida", latitude: 27.6648, longitude: -81.5158, country: "USA", region: "Florida" },
    { name: "Miami", latitude: 25.7617, longitude: -80.1918, country: "USA", region: "Florida", city: "Miami" },
  ];

  // Try to find location mentions in the text
  for (const location of locations) {
    if (lowerText.includes(location.name.toLowerCase())) {
      return location;
    }
  }

  // Default fallback
  return {
    name: "Unknown Location",
    latitude: 0,
    longitude: 0,
  };
}