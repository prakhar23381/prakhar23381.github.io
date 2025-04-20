import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  // Only send user messages to OpenAI
  const userMessages = messages
    .filter((msg: any) => msg.role === 'user')
    .map((msg: any) => ({ role: 'user', content: msg.content }));

  // Use Hugging Face Inference API for DialoGPT-medium (free, public)
  const lastUserMessage = userMessages.length > 0 ? userMessages[userMessages.length - 1].content : '';

  // Rule-based "AI model" with predecided answers
  const faqs: { pattern: RegExp; answer: string }[] = [
    { pattern: /hobbies?|what do you do.*free time|what do you like to do/i, answer: 'My hobbies are reading, coding, and playing chess.' },
    { pattern: /favourite color|favorite color/i, answer: 'My favorite color is blue.' },
    { pattern: /name|who are you/i, answer: 'I am Prakhar Saxena.' },
    { pattern: /where.*from|hometown/i, answer: 'I am from India.' },
    { pattern: /age|how old/i, answer: 'I am 20 years old.' },
    { pattern: /college|university/i, answer: 'I study at IIIT Delhi.' },
    { pattern: /branch|major|field/i, answer: 'My branch is Computer Science and Design.' },
    { pattern: /favourite food|favorite food/i, answer: 'My favorite food is pizza.' },
    { pattern: /favourite sport|favorite sport/i, answer: 'My favorite sport is football.' },
    { pattern: /favourite movie|favorite movie/i, answer: 'My favorite movie is Inception.' },
    { pattern: /favourite book|favorite book/i, answer: 'My favorite book is "Atomic Habits".' },
    { pattern: /contact|email/i, answer: 'You can contact me at prakhar23381@gmail.com.' },
    { pattern: /github/i, answer: 'My GitHub is https://github.com/prakhar23381' },
    { pattern: /linkedin/i, answer: 'My LinkedIn is https://linkedin.com/in/prakhar23381' },
    { pattern: /birthday|born/i, answer: 'My birthday is 18th August 2004.' },
    { pattern: /favourite programming language|favorite programming language/i, answer: 'My favorite programming language is Python.' },
    { pattern: /favourite subject|favorite subject/i, answer: 'My favorite subject is Artificial Intelligence.' },
    { pattern: /pet|animal/i, answer: 'I love dogs.' },
    { pattern: /relationship|single|girlfriend|boyfriend/i, answer: 'That is a secret!' },
    { pattern: /height/i, answer: 'I am 5 feet 10 inches tall.' },
    { pattern: /weight/i, answer: 'I weigh 68 kg.' },
    { pattern: /dream|goal/i, answer: 'My dream is to build impactful technology and travel the world.' },
    { pattern: /language.*speak/i, answer: 'I speak English and Hindi.' },
    { pattern: /favourite place|favorite place/i, answer: 'My favorite place is the mountains.' },
    { pattern: /favourite tv|favorite tv/i, answer: 'My favorite TV show is "Breaking Bad".' },
    { pattern: /favourite game|favorite game/i, answer: 'My favorite game is chess.' },
    { pattern: /favourite artist|favorite artist/i, answer: 'My favorite artist is The Weeknd.' },
    { pattern: /favourite song|favorite song/i, answer: 'My favorite song is "Blinding Lights".' },
    { pattern: /favourite car|favorite car/i, answer: 'My favorite car is Tesla Model S.' },
    { pattern: /favourite city|favorite city/i, answer: 'My favorite city is Delhi.' },
    { pattern: /favourite drink|favorite drink/i, answer: 'My favorite drink is coffee.' },
    { pattern: /favourite season|favorite season/i, answer: 'My favorite season is winter.' },
    { pattern: /favourite app|favorite app/i, answer: 'My favorite app is Spotify.' },
    { pattern: /favourite website|favorite website/i, answer: 'My favorite website is Stack Overflow.' },
    { pattern: /favourite teacher|favorite teacher/i, answer: 'My favorite teacher is Dr. Smith.' },
    { pattern: /favourite festival|favorite festival/i, answer: 'My favorite festival is Diwali.' },
    { pattern: /favourite actor|favorite actor/i, answer: 'My favorite actor is Leonardo DiCaprio.' },
    { pattern: /favourite actress|favorite actress/i, answer: 'My favorite actress is Emma Watson.' },
    { pattern: /favourite fruit|favorite fruit/i, answer: 'My favorite fruit is mango.' },
    { pattern: /favourite vegetable|favorite vegetable/i, answer: 'My favorite vegetable is potato.' },
    { pattern: /favourite dessert|favorite dessert/i, answer: 'My favorite dessert is chocolate cake.' },
    { pattern: /favourite ice cream|favorite ice cream/i, answer: 'My favorite ice cream flavor is chocolate.' },
    { pattern: /favourite holiday|favorite holiday/i, answer: 'My favorite holiday destination is Manali.' },
    { pattern: /favourite subject|favorite subject/i, answer: 'My favorite subject is Artificial Intelligence.' },
    { pattern: /favourite teacher|favorite teacher/i, answer: 'My favorite teacher is Dr. Smith.' },
    { pattern: /favourite animal|favorite animal/i, answer: 'My favorite animal is dog.' },
    { pattern: /favourite flower|favorite flower/i, answer: 'My favorite flower is rose.' },
    { pattern: /favourite festival|favorite festival/i, answer: 'My favorite festival is Diwali.' },
  ];

  let aiReply = 'Sorry, I do not know the answer to that. Try asking about my hobbies, favorites, or background!';
  if (lastUserMessage) {
    for (const faq of faqs) {
      if (faq.pattern.test(lastUserMessage)) {
        aiReply = faq.answer;
        break;
      }
    }
  }

  return NextResponse.json({
    id: Date.now().toString(),
    role: 'assistant',
    content: aiReply,
  });
}
