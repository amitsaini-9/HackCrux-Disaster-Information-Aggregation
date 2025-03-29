import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { eventService } from "@/lib/services/event-service";

// Schema for update validation
const updateEventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").optional(),
  description: z.string().optional(),
  disasterType: z.string().min(2, "Disaster type must be at least 2 characters").optional(),
  severity: z.string().min(2, "Severity must be at least 2 characters").optional(),
  status: z.string().optional(),
  timestamp: z.string().transform(val => new Date(val)).optional(),
  location: z.object({
    name: z.string().min(2, "Location name must be at least 2 characters").optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    country: z.string().optional(),
    region: z.string().optional(),
    city: z.string().optional(),
  }).optional(),
});

// GET a specific disaster event by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await eventService.getEventById(params.id);

    if (!event) {
      return NextResponse.json(
        { error: "Disaster event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error: any) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch disaster event", details: error.message },
      { status: 500 }
    );
  }
}

// PUT to update a disaster event
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = updateEventSchema.safeParse(body);

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

    try {
      const updatedEvent = await eventService.updateEvent(params.id, data);
      return NextResponse.json(updatedEvent);
    } catch (error: any) {
      if (error.message === "Event not found") {
        return NextResponse.json(
          { error: "Disaster event not found" },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error: any) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update disaster event", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE a disaster event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    try {
      await eventService.deleteEvent(params.id);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      if (error.message === "Event not found") {
        return NextResponse.json(
          { error: "Disaster event not found" },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error: any) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete disaster event", details: error.message },
      { status: 500 }
    );
  }
}