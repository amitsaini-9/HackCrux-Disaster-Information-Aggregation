import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Disaster from '@/models/disaster';

export async function GET(req: Request) {
  try {
    // Get query parameters
    const url = new URL(req.url);
    const type = url.searchParams.get('type');
    const severity = url.searchParams.get('severity');
    const status = url.searchParams.get('status');

    // Build filter query
    const query: any = {};

    if (type && type !== 'all') {
      query.type = type;
    }

    if (severity && severity !== 'all') {
      query.severity = severity;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    // Connect to database
    await connectToDatabase();

    // Get disasters with filtering
    const disasters = await Disaster.find(query).sort({ reportedAt: -1 });

    return NextResponse.json({ disasters }, { status: 200 });
  } catch (error) {
    console.error('Error fetching disasters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch disasters' },
      { status: 500 }
    );
  }
}