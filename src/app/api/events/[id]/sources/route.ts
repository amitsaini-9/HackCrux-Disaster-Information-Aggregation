import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { eventService } from "@/lib/services/event-service";

// Schema for source validation
const sourceSchema = z.object({
  sourceType: z.string().min(2, "Source type is required"),
  url: z.string().url().optional(),
  content: z.string().optional(),
  author: z.string().optional(),
  timestamp: z.string().transform(val => new Date(val)),
  credibility: z.number().min(0).max(1).optional(),
});

// POST a new source to an event
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = sourceSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.format()
        },
        { status: 400 }
      );
    }

    // Verify the event exists
    const event = await eventService.getEventById(params.id);

    if (!event) {
      return NextResponse.json(
        { error: "Disaster event not found" },
        { status: 404 }
      );
    }

    const data = validationResult.data;
    const source = await eventService.addSource(params.id, data);

    return NextResponse.json(source, { status: 201 });
  } catch (error: any) {
    console.error("Error adding source:", error);
    return NextResponse.json(
      { error: "Failed to add source to event", details: error.message },
      { status: 500 }
    );
  }
}