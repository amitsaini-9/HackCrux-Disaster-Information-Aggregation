import { NextResponse } from 'next/server';
import { fetchDisasterNews } from '@/services/news-service';

export async function GET(req: Request) {
  try {
    // Get query parameter if any
    const url = new URL(req.url);
    const query = url.searchParams.get('query') || 'natural disaster India';

    const news = await fetchDisasterNews(query);

    return NextResponse.json({ news }, { status: 200 });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}