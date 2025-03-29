import { NextRequest, NextResponse } from "next/server";
import { collectAllData } from "@/lib/data-collection/collector";

// Secret for authorizing the cron job
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: NextRequest) {
  // Check authorization using a query parameter with a secret key
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (!CRON_SECRET || secret !== CRON_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    console.log("Starting scheduled data collection...");

    // Trigger the data collection process
    const results = await collectAllData();

    // Calculate totals
    const totals = results.reduce(
      (acc, result) => {
        acc.itemsCollected += result.itemsCollected;
        acc.itemsProcessed += result.itemsProcessed;
        acc.eventsCreated += result.eventsCreated;
        acc.eventsUpdated += result.eventsUpdated;
        return acc;
      },
      {
        itemsCollected: 0,
        itemsProcessed: 0,
        eventsCreated: 0,
        eventsUpdated: 0
      }
    );

    console.log("Scheduled data collection completed", totals);

    // Return the results
    return NextResponse.json({
      success: true,
      message: "Scheduled data collection completed successfully",
      timestamp: new Date().toISOString(),
      totals,
      results
    });
  } catch (error: any) {
    console.error("Error in scheduled data collection:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Scheduled data collection failed",
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}