import { prisma } from "@/lib/database/client";
import { mockDataGenerator } from "@/lib/utils/mock-data-generator";

async function seedDatabase() {
  try {
    // Generate mock data
    const events = mockDataGenerator.generateEvents(50);
    const responders = Array.from({ length: 20 }, () => mockDataGenerator.generateResponder());
    const analytics = mockDataGenerator.generateAnalytics();

    // Clear existing data
    await prisma.source.deleteMany({});
    await prisma.disasterEvent.deleteMany({});
    await prisma.location.deleteMany({});

    // Insert events and related data
    for (const event of events) {
      await prisma.disasterEvent.create({
        data: {
          title: event.title,
          description: event.description,
          disasterType: event.disasterType,
          severity: event.severity,
          status: event.status,
          timestamp: event.timestamp,
          location: {
            create: event.location
          },
          sources: {
            create: event.sources
          }
        }
      });
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();