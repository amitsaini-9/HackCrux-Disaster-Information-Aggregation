/**
 * This file defines types for the data collection system
 */

// Data source types
export enum DataSourceType {
  TWITTER = "twitter",
  NEWS = "news",
  WEATHER = "weather",
  GOVERNMENT = "government",
  SENSOR = "sensor",
}

// Raw data item from a source
export interface RawDataItem {
  id?: string;
  sourceType: DataSourceType;
  content: string;
  url?: string;
  author?: string;
  timestamp: Date;
  location?: {
    name?: string;
    latitude?: number;
    longitude?: number;
    country?: string;
    region?: string;
  };
  metadata?: Record<string, any>;
  credibility?: number;
}

// Processed event ready for database storage
export interface ProcessedEvent {
  title: string;
  description: string;
  disasterType: string;
  severity: string;
  status: string;
  timestamp: Date;
  location: {
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    region?: string;
    city?: string;
  };
  sources: Array<{
    sourceType: string;
    url?: string;
    content?: string;
    author?: string;
    timestamp: Date;
    credibility?: number;
  }>;
}

// Collection result for tracking metrics
export interface CollectionResult {
  source: DataSourceType;
  itemsCollected: number;
  itemsProcessed: number;
  eventsCreated: number;
  eventsUpdated: number;
  errors?: any[];
}

// Disaster types
export enum DisasterType {
  EARTHQUAKE = "earthquake",
  FLOOD = "flood",
  FIRE = "fire",
  HURRICANE = "hurricane",
  TORNADO = "tornado",
  TSUNAMI = "tsunami",
  VOLCANO = "volcano",
  LANDSLIDE = "landslide",
  OTHER = "other",
}

// Severity levels
export enum SeverityLevel {
  LOW = "low",
  MODERATE = "moderate",
  HIGH = "high",
  SEVERE = "severe",
}

// Event status
export enum EventStatus {
  ACTIVE = "active",
  MONITORING = "monitoring",
  RECOVERY = "recovery",
  RESOLVED = "resolved",
}