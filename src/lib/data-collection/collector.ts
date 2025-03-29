import { DataSourceType, RawDataItem, ProcessedEvent, CollectionResult } from './types';
import { collectTwitterData } from './sources/twitter';
import { collectNewsData } from './sources/news';
import { collectWeatherData } from './sources/weather';
import { classifyDisasterType, assessSeverity } from './processors/classifier';
import { extractLocation } from './processors/location-extractor';
import { generateTitle, generateDescription } from './processors/content-generator';
import { eventService } from '../services/event-service';

// Main function to collect data from all sources
export async function collectAllData(): Promise<CollectionResult[]> {
  console.log('Starting data collection from all sources...');

  const results: CollectionResult[] = [];

  try {
    // Collect data from Twitter
    const twitterResult = await collectFromSource(
      DataSourceType.TWITTER,
      collectTwitterData
    );
    results.push(twitterResult);

    // Collect data from News API
    const newsResult = await collectFromSource(
      DataSourceType.NEWS,
      collectNewsData
    );
    results.push(newsResult);

    // Collect data from Weather Services
    const weatherResult = await collectFromSource(
      DataSourceType.WEATHER,
      collectWeatherData
    );
    results.push(weatherResult);

    return results;
  } catch (error) {
    console.error('Error in data collection:', error);
    throw error;
  }
}

// Collect data from a specific source
async function collectFromSource(
  sourceType: DataSourceType,
  collectFunction: () => Promise<RawDataItem[]>
): Promise<CollectionResult> {
  console.log(`Collecting data from ${sourceType}...`);

  const result: CollectionResult = {
    source: sourceType,
    itemsCollected: 0,
    itemsProcessed: 0,
    eventsCreated: 0,
    eventsUpdated: 0,
    errors: [],
  };

  try {
    // Collect raw data
    const rawData = await collectFunction();
    result.itemsCollected = rawData.length;

    console.log(`Collected ${rawData.length} items from ${sourceType}`);

    // Process the collected data
    const processedEvents = processRawData(rawData);
    result.itemsProcessed = processedEvents.length;

    // Save or update events in the database
    for (const event of processedEvents) {
      try {
        // Check if similar event already exists
        const existingEvents = await findSimilarEvents(event);

        if (existingEvents.length > 0) {
          // Update existing event with new source
          const existingEvent = existingEvents[0];

          // Add new sources to the existing event
          for (const source of event.sources) {
            await eventService.addSource(existingEvent.id, source);
          }

          result.eventsUpdated++;
        } else {
          // Create new event
          await eventService.createEvent(event);
          result.eventsCreated++;
        }
      } catch (error) {
        console.error('Error processing event:', error);
        result.errors?.push(error);
      }
    }

    return result;
  } catch (error) {
    console.error(`Error collecting from ${sourceType}:`, error);
    result.errors?.push(error);
    return result;
  }
}

// Process raw data into structured events
function processRawData(rawData: RawDataItem[]): ProcessedEvent[] {
  console.log(`Processing ${rawData.length} raw data items...`);

  // Group items that might be referring to the same event
  const groupedItems = groupRelatedItems(rawData);

  console.log(`Grouped into ${groupedItems.length} potential events`);

  // Process each group into an event
  return groupedItems.map(group => {
    // Sort by credibility, highest first
    group.sort((a, b) => (b.credibility || 0) - (a.credibility || 0));

    // Use the most credible item as the primary source
    const primaryItem = group[0];

    // Extract disaster type from the content
    const disasterType = classifyDisasterType(primaryItem.content);

    // Extract or use provided location
    const location = extractLocation(primaryItem.content, primaryItem.location);

    // Assess severity
    const severity = assessSeverity(primaryItem.content, primaryItem.metadata);

    // Generate title and description
    const title = generateTitle(disasterType, location, severity);
    const description = generateDescription(group, disasterType, severity);

    // Create the processed event
    return {
      title,
      description,
      disasterType,
      severity,
      status: 'active',
      timestamp: primaryItem.timestamp,
      location,
      sources: group.map(item => ({
        sourceType: item.sourceType,
        url: item.url,
        content: item.content,
        author: item.author,
        timestamp: item.timestamp,
        credibility: item.credibility,
      })),
    };
  });
}

// Group related items that might be referring to the same event
function groupRelatedItems(items: RawDataItem[]): RawDataItem[][] {
  // This is a simplified grouping algorithm

  const groups: RawDataItem[][] = [];

  for (const item of items) {
    // Try to find an existing group that this item might belong to
    let foundGroup = false;

    for (const group of groups) {
      const primaryItem = group[0];

      // Check if this item is related to the group
      if (areItemsRelated(primaryItem, item)) {
        group.push(item);
        foundGroup = true;
        break;
      }
    }

    // If no matching group found, create a new one
    if (!foundGroup) {
      groups.push([item]);
    }
  }

  return groups;
}

// Check if two items are likely related (same event)
function areItemsRelated(item1: RawDataItem, item2: RawDataItem): boolean {
  // This is a simplified relationship check

  // Check if items are from the same time period (within 24 hours)
  const timeDiff = Math.abs(
    item1.timestamp.getTime() - item2.timestamp.getTime()
  );
  const isTimeRelated = timeDiff < 24 * 60 * 60 * 1000;

  // Check if items mention the same location
  let isLocationRelated = false;

  if (item1.location && item2.location) {
    // If both have coordinates, check if they're close
    if (
      item1.location.latitude !== undefined &&
      item1.location.longitude !== undefined &&
      item2.location.latitude !== undefined &&
      item2.location.longitude !== undefined
    ) {
      const distance = calculateDistance(
        item1.location.latitude,
        item1.location.longitude,
        item2.location.latitude,
        item2.location.longitude
      );

      // Consider locations within 100km as related
      isLocationRelated = distance < 100;
    } else if (
      item1.location.name &&
      item2.location.name &&
      item1.location.name.toLowerCase() === item2.location.name.toLowerCase()
    ) {
      // If names match, consider related
      isLocationRelated = true;
    }
  }

  // Check if content is similar (simplified)
  const words1 = item1.content.toLowerCase().split(/\s+/);
  const words2 = item2.content.toLowerCase().split(/\s+/);
  const commonWords = words1.filter(word => words2.includes(word));
  const contentSimilarity = commonWords.length / Math.min(words1.length, words2.length);
  const isContentRelated = contentSimilarity > 0.3; // 30% overlap

  // Items are related if time and (location or content) are related
  return isTimeRelated && (isLocationRelated || isContentRelated);
}

// Calculate distance between two coordinates using the Haversine formula
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

// Find similar events in the database
async function findSimilarEvents(event: ProcessedEvent) {
  try {
    // Search for similar events based on:
    // 1. Same disaster type
    // 2. Close geographical proximity
    // 3. Recent timeframe (within 24 hours)

    const startDate = new Date(event.timestamp);
    startDate.setHours(startDate.getHours() - 24);

    const endDate = new Date(event.timestamp);
    endDate.setHours(endDate.getHours() + 24);

    const result = await eventService.getEvents({
      disasterType: event.disasterType,
      startDate,
      endDate,
    });

    // Filter by geographic proximity
    const similarEvents = result.events.filter(dbEvent => {
      const distance = calculateDistance(
        event.location.latitude,
        event.location.longitude,
        dbEvent.location.latitude,
        dbEvent.location.longitude
      );

      // Consider events within 100km as similar
      return distance < 100;
    });

    return similarEvents;
  } catch (error) {
    console.error('Error finding similar events:', error);
    return [];
  }
}