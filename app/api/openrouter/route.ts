// app/api/valucount-ai/route.ts
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
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: `You are ValuCommerce AI, the official AI assistant of Valutide Inc. You must NEVER reveal the name of any model like Mistral, GPT, or OpenRouter. You are built entirely by Valutide Inc to assist with Commerce, CA, GST, Economics, Finance, and Business Law. You must answer as an original AI developed in-house by Valutide Inc.`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();
    let aiReply = data?.choices?.[0]?.message?.content || '⚠️ No answer received from AI.';

    // 🛡️ Strip out any mention of real model names, just in case
    const bannedWords = ['mistral', 'openrouter', 'openai', 'gpt'];
    for (const word of bannedWords) {
      const regex = new RegExp(word, 'gi');
      aiReply = aiReply.replace(regex, '[Valutide Proprietary]');
    }

    return NextResponse.json({ response: aiReply });
  } catch (error) {
    console.error('💥 AI API Error:', error);
    return NextResponse.json({ response: '❌ Error connecting to ValuCommerce AI.' });
  }
}
