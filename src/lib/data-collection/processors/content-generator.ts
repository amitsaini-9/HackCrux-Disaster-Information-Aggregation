/**
 * This module contains functions to generate structured content from raw data
 */

// Generate a title for a disaster event
export function generateTitle(
  disasterType: string,
  location: { name: string; country?: string; region?: string; },
  severity: string
): string {
  // Capitalize disaster type
  const capitalizedType =
    disasterType.charAt(0).toUpperCase() + disasterType.slice(1);

  // Location string
  const locationStr = location.name;

  // Modifier based on severity
  let modifier = "";
  if (severity === "severe") modifier = "Major ";
  else if (severity === "high") modifier = "Significant ";

  // Generate the title
  return `${modifier}${capitalizedType} in ${locationStr}`;
}

// Generate a description for a disaster event from multiple sources
export function generateDescription(
  sources: Array<{ content: string; }>,
  disasterType: string,
  severity: string
): string {
  // If we have multiple sources, try to combine information
  if (sources.length > 1) {
    // Take the longest content as the base description
    const mainSource = sources.reduce((prev, current) =>
      prev.content.length > current.content.length ? prev : current
    );

    return mainSource.content;
  } else if (sources.length === 1) {
    // Just use the single source
    return sources[0].content;
  } else {
    // Generate a generic description if no sources available
    const capitalizedType =
      disasterType.charAt(0).toUpperCase() + disasterType.slice(1);

    let severityText = "";
    switch (severity) {
      case "severe":
        severityText = "severe";
        break;
      case "high":
        severityText = "significant";
        break;
      case "moderate":
        severityText = "moderate";
        break;
      default:
        severityText = "minor";
    }

    return `A ${severityText} ${disasterType} has been reported. Monitoring is ongoing and more information will be provided as it becomes available.`;
  }
}