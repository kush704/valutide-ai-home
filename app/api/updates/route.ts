import { NextResponse } from 'next/server';

export async function GET() {
  console.log('[API] /api/updates called');

  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    console.error('[API] Missing NEWS_API_KEY');
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
  }

  const query = 'commerce OR taxation OR business OR gst OR economics OR india OR startup';
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=12&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.articles || !Array.isArray(data.articles)) {
      console.error('[API] Invalid response from News API:', data);
      return NextResponse.json({ error: 'Invalid news data' }, { status: 502 });
    }

    console.log('[API] News fetched successfully. Articles:', data.articles.length);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API] Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
