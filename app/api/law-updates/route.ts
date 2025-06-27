import { NextResponse } from 'next/server';

export async function GET() {
  console.log('[API] /api/law-updates called');

  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    console.error('[API] Missing NEWS_API_KEY');
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
  }

  const query = encodeURIComponent(
    'GST OR Companies Act OR Income Tax Act OR Finance Bill OR SEBI OR RBI OR CA Institute OR ICAI OR law amendment'
  );

  const url = `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=15&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.articles || !Array.isArray(data.articles)) {
      console.error('[API] Invalid response from News API:', data);
      return NextResponse.json({ error: 'Invalid news data' }, { status: 502 });
    }

    console.log('[API] Law updates fetched. Articles:', data.articles.length);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API] Error fetching law updates:', error);
    return NextResponse.json({ error: 'Failed to fetch law updates' }, { status: 500 });
  }
}
