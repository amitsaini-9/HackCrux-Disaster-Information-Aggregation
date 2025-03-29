
import { faker } from '@faker-js/faker';

interface MockDisasterEvent {
  id: string;
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
    country: string;
    region: string;
    city?: string;
  };
  sources: Array<{
    sourceType: string;
    url?: string;
    content: string;
    author: string;
    timestamp: Date;
    credibility: number;
  }>;
  affectedAreas: string[];
  casualties?: {
    dead: number;
    injured: number;
    missing: number;
  };
  infrastructure?: {
    damaged: number;
    destroyed: number;
    type: string[];
  };
}

const disasterTypes = [
  'earthquake',
  'flood',
  'fire',
  'hurricane',
  'tornado',
  'tsunami',
  'volcano',
  'landslide'
] as const;

const severityLevels = ['low', 'moderate', 'high', 'severe'] as const;
const statusTypes = ['active', 'monitoring', 'resolved', 'archived'] as const;
const sourceTypes = ['twitter', 'news', 'government', 'sensor', 'satellite'] as const;

export class MockDataGenerator {
  private regions: { [key: string]: { lat: number; lon: number; cities: string[] } } = {
    'North America': { lat: 40, lon: -100, cities: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Toronto'] },
    'South America': { lat: -15, lon: -60, cities: ['São Paulo', 'Buenos Aires', 'Lima', 'Bogotá', 'Santiago'] },
    'Europe': { lat: 50, lon: 10, cities: ['London', 'Paris', 'Berlin', 'Rome', 'Madrid'] },
    'Asia': { lat: 30, lon: 100, cities: ['Tokyo', 'Shanghai', 'Mumbai', 'Bangkok', 'Seoul'] },
    'Australia': { lat: -25, lon: 135, cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'] },
    'Africa': { lat: 0, lon: 20, cities: ['Cairo', 'Lagos', 'Nairobi', 'Cape Town', 'Addis Ababa'] }
  };

  private generateLocation() {
    const region = faker.helpers.arrayElement(Object.keys(this.regions));
    const baseLocation = this.regions[region];

    return {
      name: faker.helpers.arrayElement(baseLocation.cities),
      latitude: baseLocation.lat + faker.number.float({ min: -10, max: 10, precision: 0.001 }),
      longitude: baseLocation.lon + faker.number.float({ min: -10, max: 10, precision: 0.001 }),
      country: faker.location.country(),
      region: region,
      city: faker.helpers.arrayElement(baseLocation.cities)
    };
  }

  private generateSource() {
    const sourceType = faker.helpers.arrayElement(sourceTypes);
    const timestamp = faker.date.recent({ days: 7 });

    return {
      sourceType,
      url: sourceType === 'twitter' ? `https://twitter.com/${faker.internet.userName()}/status/${faker.string.numeric(19)}` :
        sourceType === 'news' ? `https://news.example.com/${faker.string.alphanumeric(10)}` :
          undefined,
      content: faker.lorem.paragraph(),
      author: faker.person.fullName(),
      timestamp,
      credibility: faker.number.float({ min: 0.5, max: 1, precision: 0.01 })
    };
  }

  private generateDisasterEvent(): MockDisasterEvent {
    const disasterType = faker.helpers.arrayElement(disasterTypes);
    const severity = faker.helpers.arrayElement(severityLevels);
    const location = this.generateLocation();

    const title = `${severity.charAt(0).toUpperCase() + severity.slice(1)} ${disasterType.charAt(0).toUpperCase() + disasterType.slice(1)
      } in ${location.city}`;

    return {
      id: faker.string.uuid(),
      title,
      description: faker.lorem.paragraph(),
      disasterType,
      severity,
      status: faker.helpers.arrayElement(statusTypes),
      timestamp: faker.date.recent({ days: 30 }),
      location,
      sources: Array.from({ length: faker.number.int({ min: 1, max: 5 }) },
        () => this.generateSource()),
      affectedAreas: Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        () => faker.location.city()
      ),
      casualties: {
        dead: faker.number.int({ min: 0, max: 1000 }),
        injured: faker.number.int({ min: 0, max: 5000 }),
        missing: faker.number.int({ min: 0, max: 500 })
      },
      infrastructure: {
        damaged: faker.number.int({ min: 0, max: 1000 }),
        destroyed: faker.number.int({ min: 0, max: 500 }),
        type: faker.helpers.arrayElements(
          ['residential', 'commercial', 'industrial', 'roads', 'bridges', 'schools', 'hospitals'],
          faker.number.int({ min: 1, max: 4 })
        )
      }
    };
  }

  generateEvents(count: number): MockDisasterEvent[] {
    return Array.from({ length: count }, () => this.generateDisasterEvent());
  }

  generateResponder() {
    const specializations = [
      'Emergency Medicine',
      'Search & Rescue',
      'Firefighting',
      'Water Rescue',
      'Urban Search & Rescue',
      'Hazmat Response',
      'Medical Evacuation'
    ];

    return {
      id: faker.string.uuid(),
      name: `${faker.helpers.arrayElement([
        'Team', 'Unit', 'Squad', 'Force'
      ])} ${faker.string.alpha(1).toUpperCase()}${faker.number.int(99)}`,
      type: faker.helpers.arrayElement([
        'Medical', 'Search & Rescue', 'Firefighting', 'Logistics',
        'Technical Rescue', 'Water Rescue'
      ]),
      members: faker.number.int({ min: 5, max: 20 }),
      location: this.generateLocation(),
      status: faker.helpers.arrayElement([
        'available', 'deployed', 'standby', 'maintenance'
      ]),
      lastDeployed: faker.date.recent({ days: 30 }).toISOString(),
      specialization: faker.helpers.arrayElement(specializations),
      contact: faker.person.fullName(),
      phone: faker.phone.number(),
      readiness: faker.number.int({ min: 70, max: 100 }),
      equipmentStatus: faker.helpers.arrayElement([
        'complete', 'partial', 'undergoing maintenance'
      ])
    };
  }

  generateAlerts() {
    return Array.from({ length: faker.number.int({ min: 5, max: 10 }) }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      type: faker.helpers.arrayElement(disasterTypes),
      severity: faker.helpers.arrayElement(severityLevels),
      location: this.generateLocation(),
      timestamp: faker.date.recent({ days: 7 }),
      status: faker.helpers.arrayElement(['active', 'resolved', 'pending']),
      description: faker.lorem.paragraph(),
      sourceType: faker.helpers.arrayElement(sourceTypes),
      notification: {
        email: faker.helpers.arrayElement([true, false]),
        sms: faker.helpers.arrayElement([true, false]),
        push: faker.helpers.arrayElement([true, false])
      }
    }));
  }

  generateAnalytics() {
    const generateTimeSeries = (days: number) => {
      return Array.from({ length: days }, (_, i) => ({
        date: faker.date.recent({ days: days - i }),
        earthquake: faker.number.int({ min: 0, max: 20 }),
        flood: faker.number.int({ min: 0, max: 15 }),
        fire: faker.number.int({ min: 0, max: 25 }),
        hurricane: faker.number.int({ min: 0, max: 10 }),
        tornado: faker.number.int({ min: 0, max: 12 })
      }));
    };

    return {
      totalEvents: faker.number.int({ min: 200, max: 500 }),
      activeEvents: faker.number.int({ min: 20, max: 50 }),
      regionsAffected: faker.number.int({ min: 10, max: 30 }),
      averageResponseTime: faker.number.float({ min: 1, max: 3, precision: 0.1 }),
      trends: generateTimeSeries(30),
      distribution: Object.keys(this.regions).map(region => ({
        region,
        events: faker.number.int({ min: 10, max: 100 }),
        severity: {
          low: faker.number.int({ min: 5, max: 20 }),
          moderate: faker.number.int({ min: 5, max: 20 }),
          high: faker.number.int({ min: 2, max: 10 }),
          severe: faker.number.int({ min: 0, max: 5 })
        }
      }))
    };
  }
}

// Usage example:
export const mockDataGenerator = new MockDataGenerator();