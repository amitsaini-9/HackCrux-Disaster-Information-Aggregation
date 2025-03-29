/**
 * This module contains functions to classify disaster types and assess severity
 */

// Map of disaster-related keywords to disaster types
const DISASTER_TYPE_KEYWORDS = {
  earthquake: ["earthquake", "quake", "seismic", "richter", "magnitude", "tremor"],
  flood: ["flood", "flooding", "submerged", "inundation", "water level", "overflow"],
  fire: ["fire", "wildfire", "burning", "flames", "smoke", "blaze"],
  hurricane: ["hurricane", "cyclone", "typhoon", "storm surge", "tropical storm"],
  tornado: ["tornado", "twister", "funnel cloud", "wind damage"],
  tsunami: ["tsunami", "tidal wave"],
  volcano: ["volcano", "volcanic", "eruption", "lava", "ash cloud"],
  landslide: ["landslide", "mudslide", "rockslide"],
};

// Classify disaster type based on text content
export function classifyDisasterType(text: string): string {
  const lowerText = text.toLowerCase();

  // Count matches for each disaster type
  const scores = Object.entries(DISASTER_TYPE_KEYWORDS).map(([type, keywords]) => {
    const score = keywords.reduce((count, keyword) => {
      return count + (lowerText.includes(keyword) ? 1 : 0);
    }, 0);

    return { type, score };
  });

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  // Return highest scoring type, or "other" if no matches
  return scores[0].score > 0 ? scores[0].type : "other";
}

// Simple severity assessment function
export function assessSeverity(
  text: string,
  metadata: Record<string, any> = {}
): string {
  const lowerText = text.toLowerCase();

  // Check for severe disaster indicators
  const severeIndicators = [
    "catastrophic", "devastating", "mass casualties", "major disaster",
    "emergency", "evacuate", "evacuation ordered", "destroyed",
  ];

  // Check for high severity indicators
  const highIndicators = [
    "severe", "significant", "extensive damage", "widespread",
    "dangerous", "hazardous", "warning", "multiple", "injured",
  ];

  // Check for moderate severity indicators
  const moderateIndicators = [
    "moderate", "affected", "alert", "caution", "advisory",
    "minor damage", "localized", "monitoring",
  ];

  // Count indicators for each severity level
  const severeScore = severeIndicators.reduce((count, term) =>
    count + (lowerText.includes(term) ? 1 : 0), 0);

  const highScore = highIndicators.reduce((count, term) =>
    count + (lowerText.includes(term) ? 1 : 0), 0);

  const moderateScore = moderateIndicators.reduce((count, term) =>
    count + (lowerText.includes(term) ? 1 : 0), 0);

  // Check metadata for additional severity indicators
  // For example, earthquake magnitude, hurricane category, etc.
  let metadataScore = 0;

  if (metadata.hurricaneCategory && metadata.hurricaneCategory >= 3) {
    metadataScore += 3;
  } else if (metadata.hurricaneCategory && metadata.hurricaneCategory >= 1) {
    metadataScore += 2;
  }

  if (metadata.magnitude && metadata.magnitude >= 7.0) {
    metadataScore += 3;
  } else if (metadata.magnitude && metadata.magnitude >= 5.0) {
    metadataScore += 2;
  } else if (metadata.magnitude && metadata.magnitude >= 3.0) {
    metadataScore += 1;
  }

  // Determine severity based on scores
  const totalScore = (severeScore * 3) + (highScore * 2) + moderateScore + metadataScore;

  if (totalScore >= 5) return "severe";
  if (totalScore >= 3) return "high";
  if (totalScore >= 1) return "moderate";
  return "low";
}