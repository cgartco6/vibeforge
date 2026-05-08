import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText, streamText } from 'ai';

const grok = createOpenAI({
  apiKey: process.env.GROK_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export type AIProvider = 'grok' | 'openai' | 'claude';

const getModel = (provider: AIProvider = 'grok') => {
  if (provider === 'grok') return grok('grok-4.3');           // or grok-4.1-fast
  if (provider === 'claude') return anthropic('claude-3-5-sonnet-20240620'); // or latest
  return openai('gpt-4o'); // fallback
};

export async function generateAppCode(prompt: string, history: any[], provider: AIProvider = 'grok') {
  const systemPrompt = `
You are VibeForge Architect — an expert full-stack developer that builds reliable, production-ready web apps.

Rules:
- Always output clean, modern code (Next.js 15 + Tailwind when possible).
- Structure response with clear sections: Summary, File Changes, Full Code.
- Never delete previous work without explicit user request.
- Provide a single self-contained HTML preview when asked for quick demos.
- Think step-by-step before coding.

Current Project Context: ${JSON.stringify(history.slice(-5))}
`;

  const { text } = await generateText({
    model: getModel(provider),
    system: systemPrompt,
    prompt: `User request: ${prompt}\n\nGenerate the next iteration of the app.`,
  });

  return text;
}
