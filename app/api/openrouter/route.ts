import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct', // ✅ Try this reliable model
        messages: [
          {
            role: 'system',
            content:
              'You are ValuCommerce AI, an expert in Commerce, Business Law, CA, GST, Economics, Tax, Finance, and accounting updates. Give clear, updated, and real-world based answers like a top CA.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      response: data?.choices?.[0]?.message?.content || '⚠️ No answer received from AI.',
    });
  } catch (error) {
    console.error('💥 AI API Error:', error);
    return NextResponse.json({ response: '❌ Error connecting to ValuCommerce AI.' });
  }
}
