import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

// Configure AI Provider (Defaults to Groq for free tier, falls back to OpenAI if key exists)
const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
const baseURL = process.env.GROQ_API_KEY ? 'https://api.groq.com/openai/v1' : undefined;
const model = process.env.GROQ_API_KEY ? 'llama3-70b-8192' : 'gpt-4-turbo-preview';

const openai = new OpenAI({
    apiKey: apiKey || 'dummy-key', // Prevent crash if no key, will fail gracefully later
    baseURL: baseURL,
});

const SYSTEM_PROMPT = `You are FinSaarthi, your friendly and wise financial companion for Bharat 🇮🇳. 
Think of yourself as a smart elder sibling or a knowledgeable friend who wants to see the user succeed financially.

### 🌟 Your Personality:
- **Warm & Desi**: You don't just give advice; you care. Use natural Indian English (Hinglish) flavor where appropriate (e.g., "Paisa", "Bachat", "Kharcha", "Fayda").
- **Relatable Analogies**: Explain complex finance terms using daily Indian life examples. 
  - *Example*: "SIP is like your morning chai habit – small daily cost, big long-term impact!"
  - *Example*: "Emergency fund is like an umbrella ☔ – you hope you don't need it, but you're glad to have it when it rains."
- **Encouraging**: Money can be stressful. Be the calm voice that says, "Don't worry, we'll fix this together."
- **No Jargon**: Never say "Asset Allocation" without explaining it. Say "Don't put all your eggs in one basket."

### 🎯 Your Mission:
- Help users become "Atmanirbhar" (Self-reliant) financially.
- Guide them on Government Schemes (PM-Kisan, Ayushman Bharat, etc.).
- Promote safe, long-term wealth creation (SIPs, PPF, Gold Bonds) over get-rich-quick schemes.

### 🗣️ Response Style:
- **Keep it Short**: 2-3 short paragraphs max. People skim.
- **Use Emojis**: Use them to make the chat feel alive (💰, 🚀, 🌱, 🏡).
- **Structure**: 
  1. Acknowledge the user's feeling/question warmly.
  2. Give the direct answer/advice.
  3. End with a motivating closing or a follow-up question.

### ⛔ Strict Rules:
- **Never** recommend crypto or high-risk trading as "safe".
- **Never** be rude or condescending.
- If you don't know a specific scheme detail, say "I'll check the latest official update on that" instead of guessing.

IMPORTANT: You are a financial guide, not a registered investment advisor. Always add a small disclaimer for high-risk advice.`;

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { message, language = 'en' } = body;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Check if API key is configured
        if (!apiKey || apiKey === 'sk-optional') {
            throw new Error('AI_KEY_MISSING');
        }

        // Get user context (goals, recent expenses, preferences)
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                goals: { take: 5 },
                expenses: { take: 10, orderBy: { date: 'desc' } },
                preferences: true,
            },
        });

        // Get chat history (last 10 messages)
        const chatHistory = await prisma.chatMessage.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' },
            take: 6, // Reduced context for speed
        });

        // Build context string
        const userContext = user ? `
User Context:
- Name: ${user.name}
- Active Goals: ${user.goals.map((g: any) => `${g.name} (₹${g.savedAmount}/${g.targetAmount})`).join(', ') || 'None'}
- Recent Expenses (Last 5): ${user.expenses.slice(0, 5).map((e: any) => `${e.category}: ₹${e.amount}`).join(', ') || 'None'}
- Total Monthly Spend: ₹${user.expenses.reduce((sum: number, e: any) => sum + e.amount, 0)}
` : '';

        // Prepare messages for AI
        const messages: any[] = [
            { role: 'system', content: SYSTEM_PROMPT + userContext },
            ...chatHistory.reverse().map((msg: any) => ({
                role: msg.role,
                content: msg.content,
            })),
            { role: 'user', content: message },
        ];

        // Call AI
        const completion = await openai.chat.completions.create({
            model: model,
            messages,
            max_tokens: 800,
            temperature: 0.7,
        });

        const aiResponse = completion.choices[0].message.content || 'Sorry, I could not generate a response.';

        // Save messages to database
        await prisma.chatMessage.createMany({
            data: [
                {
                    userId: session.user.id,
                    role: 'user',
                    content: message,
                    type: 'text',
                },
                {
                    userId: session.user.id,
                    role: 'assistant',
                    content: aiResponse,
                    type: 'text',
                },
            ],
        });

        return NextResponse.json({
            response: aiResponse,
            suggestions: generateQuickReplies(aiResponse),
        });

    } catch (error: any) {
        console.error('Chat error:', error);

        // Handle missing key specifically
        if (error.message === 'AI_KEY_MISSING' || error.code === 'invalid_api_key') {
            return NextResponse.json({
                response: "I'm ready to help, but my AI brain isn't connected yet! 🧠\n\nPlease add a **GROQ_API_KEY** (Free) or **OPENAI_API_KEY** to the .env file to activate me.",
                isError: true
            });
        }

        // Fallback responses for other errors
        return NextResponse.json({
            response: "I'm having trouble connecting to the server right now. Please try again in a moment! 🙏",
            isError: true
        });
    }
}

function generateQuickReplies(response: string): string[] {
    const lower = response.toLowerCase();
    const suggestions: string[] = [];

    if (lower.includes('sip') || lower.includes('invest')) {
        suggestions.push('Start SIP', 'Best Mutual Funds');
    } else if (lower.includes('scheme') || lower.includes('government')) {
        suggestions.push('Check Eligibility', 'Required Documents');
    } else if (lower.includes('tax')) {
        suggestions.push('Save Tax', 'Old vs New Regime');
    } else if (lower.includes('budget') || lower.includes('spend')) {
        suggestions.push('Analyze my spend', 'Set Budget');
    } else {
        suggestions.push('Tell me more', 'Give an example');
    }

    return suggestions.slice(0, 3);
}
