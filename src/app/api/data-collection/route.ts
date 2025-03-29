import { NextRequest, NextResponse } from "next/server";
import { collectAllData } from "@/lib/data-collection/collector";
import { isAdmin } from "@/lib/auth/api-auth";

// POST handler to trigger data collection
export async function POST(request: NextRequest) {
  // Check if user is authorized (admin only)
  const session = await isAdmin(request);
  if (session instanceof NextResponse) {
    return session; // Return unauthorized response
  }

  try {
    // Trigger the data collection process
    const results = await collectAllData();

    // Return the results
    return NextResponse.json({
      success: true,
      message: "Data collection completed successfully",
      results
    });
  } catch (error: any) {
    console.error("Error in data collection:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Data collection failed",
        details: error.message
      },
      { status: 500 }
    );
  }
}

// GET handler to get collection status/history
export async function GET(request: NextRequest) {
  // Check if user is authorized
  const session = await isAdmin(request);
  if (session instanceof NextResponse) {
    return session; // Return unauthorized response
  }


  return NextResponse.json({
    success: true,
    lastCollection: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    status: "idle",
    history: [
      {
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        itemsCollected: 32,
        eventsCreated: 5,
        eventsUpdated: 3,
      },
      {
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        itemsCollected: 28,
        eventsCreated: 4,
        eventsUpdated: 2,
      }
    ]
  });
}