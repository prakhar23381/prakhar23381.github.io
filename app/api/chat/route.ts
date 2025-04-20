import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  // Only send user messages to OpenAI
  const userMessages = messages
    .filter((msg: any) => msg.role === 'user')
    .map((msg: any) => ({ role: 'user', content: msg.content }));

  const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...userMessages,
      ],
      max_tokens: 256,
    }),
  });

  const data = await apiRes.json();
  const aiReply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

  return NextResponse.json({
    id: Date.now().toString(),
    role: 'assistant',
    content: aiReply,
  });
}
