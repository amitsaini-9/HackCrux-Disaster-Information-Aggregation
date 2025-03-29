export enum DataSourceType {
  TWITTER = "twitter",
  NEWS = "news",
  WEATHER = "weather",
  GOVERNMENT = "government",
  SENSOR = "sensor",
}

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

export interface CollectionResult {
  source: DataSourceType;
  itemsCollected: number;
  itemsProcessed: number;
  eventsCreated: number;
  eventsUpdated: number;
  errors?: any[];
}