import { prisma } from "@/lib/database/client";
import { Prisma } from "@prisma/client";

export type EventCreateInput = {
  title: string;
  description?: string;
  disasterType: string;
  severity: string;
  status?: string;
  timestamp: Date;
  location: {
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    region?: string;
    city?: string;
  };
  sources?: Array<{
    sourceType: string;
    url?: string;
    content?: string;
    author?: string;
    timestamp: Date;
    credibility?: number;
  }>;
};

export type EventUpdateInput = {
  title?: string;
  description?: string;
  disasterType?: string;
  severity?: string;
  status?: string;
  timestamp?: Date;
  location?: {
    name?: string;
    latitude?: number;
    longitude?: number;
    country?: string;
    region?: string;
    city?: string;
  };
};

export type EventFilterParams = {
  disasterType?: string;
  severity?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  search?: string;
  page?: number;
  limit?: number;
};

export const eventService = {
  // Create a new disaster event
  async createEvent(data: EventCreateInput) {
    try {
      // Create the location first
      const location = await prisma.location.create({
        data: {
          name: data.location.name,
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          country: data.location.country,
          region: data.location.region,
          city: data.location.city,
        },
      });

      // Create the event with the location
      const event = await prisma.disasterEvent.create({
        data: {
          title: data.title,
          description: data.description || "",
          disasterType: data.disasterType,
          severity: data.severity,
          status: data.status || "active",
          timestamp: data.timestamp,
          locationId: location.id,
          sources: {
            create: data.sources?.map((source) => ({
              sourceType: source.sourceType,
              url: source.url,
              content: source.content,
              author: source.author,
              timestamp: source.timestamp,
              credibility: source.credibility || 0.5,
            })) || [],
          },
        },
        include: {
          location: true,
          sources: true,
        },
      });

      return event;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  },

  // Get all events with filtering
  async getEvents(filters: EventFilterParams = {}) {
    try {
      const {
        disasterType,
        severity,
        status,
        startDate,
        endDate,
        search,
        page = 1,
        limit = 10,
      } = filters;

      const skip = (page - 1) * limit;

      // Build the where clause
      const where: Prisma.DisasterEventWhereInput = {};

      // Apply filters
      if (disasterType) where.disasterType = disasterType;
      if (severity) where.severity = severity;
      if (status) where.status = status;

      // Date range filter
      if (startDate || endDate) {
        where.timestamp = {};
        if (startDate) where.timestamp.gte = startDate;
        if (endDate) where.timestamp.lte = endDate;
      }

      // Search by title or description
      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          {
            location: {
              name: { contains: search, mode: 'insensitive' }
            }
          },
        ];
      }

      // Count total records for pagination
      const total = await prisma.disasterEvent.count({ where });

      // Fetch the records
      const events = await prisma.disasterEvent.findMany({
        where,
        include: {
          location: true,
          sources: {
            take: 3, // Limit the number of sources to reduce payload size
          },
        },
        orderBy: {
          timestamp: "desc",
        },
        skip,
        take: limit,
      });

      return {
        events,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  // Get a single event by ID
  async getEventById(id: string) {
    try {
      const event = await prisma.disasterEvent.findUnique({
        where: { id },
        include: {
          location: true,
          sources: true,
        },
      });

      return event;
    } catch (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      throw error;
    }
  },

  // Update an event
  async updateEvent(id: string, data: EventUpdateInput) {
    try {
      // Check if event exists
      const existingEvent = await prisma.disasterEvent.findUnique({
        where: { id },
        include: { location: true },
      });

      if (!existingEvent) {
        throw new Error("Event not found");
      }

      // Update location if provided
      if (data.location) {
        await prisma.location.update({
          where: { id: existingEvent.locationId },
          data: {
            name: data.location.name ?? existingEvent.location.name,
            latitude: data.location.latitude ?? existingEvent.location.latitude,
            longitude: data.location.longitude ?? existingEvent.location.longitude,
            country: data.location.country ?? existingEvent.location.country,
            region: data.location.region ?? existingEvent.location.region,
            city: data.location.city ?? existingEvent.location.city,
          },
        });
      }

      // Update event
      const updatedEvent = await prisma.disasterEvent.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          disasterType: data.disasterType,
          severity: data.severity,
          status: data.status,
          timestamp: data.timestamp,
        },
        include: {
          location: true,
          sources: true,
        },
      });

      return updatedEvent;
    } catch (error) {
      console.error(`Error updating event with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete an event
  async deleteEvent(id: string) {
    try {
      // Check if event exists
      const existingEvent = await prisma.disasterEvent.findUnique({
        where: { id },
      });

      if (!existingEvent) {
        throw new Error("Event not found");
      }

      // Delete event (cascade delete will handle sources)
      await prisma.disasterEvent.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      console.error(`Error deleting event with ID ${id}:`, error);
      throw error;
    }
  },

  // Add a source to an event
  async addSource(eventId: string, sourceData: {
    sourceType: string;
    url?: string;
    content?: string;
    author?: string;
    timestamp: Date;
    credibility?: number;
  }) {
    try {
      const source = await prisma.source.create({
        data: {
          ...sourceData,
          eventId,
        },
      });

      return source;
    } catch (error) {
      console.error(`Error adding source to event ${eventId}:`, error);
      throw error;
    }
  },
};