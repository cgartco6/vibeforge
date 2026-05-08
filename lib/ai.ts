import { createOpenAI } from '@ai-sdk/openai';

const grok = createOpenAI({
  apiKey: process.env.GROK_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

export async function generateAppCode(prompt: string, history: any[]) {
  const systemPrompt = `You are VibeForge Architect. Build reliable, clean code. Support games, writing apps, task managers etc.`;

  // Mock for now - replace with real call when API key is set
  return `Generated code for: ${prompt}\n\n// Full implementation would go here`;
}
