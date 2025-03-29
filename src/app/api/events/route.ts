import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { eventService } from "@/lib/services/event-service";
import { isAuthenticated } from "@/lib/auth/api-auth";

// Schema for input validation
const createEventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().optional(),
  disasterType: z.string().min(2, "Disaster type is required"),
  severity: z.string().min(2, "Severity is required"),
  status: z.string().optional(),
  timestamp: z.string().transform(val => new Date(val)), // Convert string to Date
  location: z.object({
    name: z.string().min(2, "Location name is required"),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    country: z.string().optional(),
    region: z.string().optional(),
    city: z.string().optional(),
  }),
  sources: z.array(
    z.object({
      sourceType: z.string().min(2, "Source type is required"),
      url: z.string().url().optional(),
      content: z.string().optional(),
      author: z.string().optional(),
      timestamp: z.string().transform(val => new Date(val)),
      credibility: z.number().min(0).max(1).optional(),
    })
  ).optional(),
});

// GET handler for retrieving disaster events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const filters = {
      disasterType: searchParams.get("type") || undefined,
      severity: searchParams.get("severity") || undefined,
      status: searchParams.get("status") || undefined,
      search: searchParams.get("search") || undefined,
      startDate: searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined,
      endDate: searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined,
      page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1,
      limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 10,
    };

    const result = await eventService.getEvents(filters);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events", details: error.message },
      { status: 500 }
    );
  }
}

// POST handler for creating a new disaster event
export async function POST(request: NextRequest) {
  const session = await isAuthenticated(request);
  if (session instanceof NextResponse) {
    return session;
  }
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = createEventSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.format()
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const event = await eventService.createEvent(data);

    return NextResponse.json(event, { status: 201 });
  } catch (error: any) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create disaster event", details: error.message },
      { status: 500 }
    );
  }
}