import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateAppCode } from '@/lib/ai';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { projectId, message, history = [], provider = 'grok' } = await req.json();

  try {
    const aiResponse = await generateAppCode(message, history, provider);

    const changes = extractChanges(aiResponse); // Simple parser (expand as needed)

    // Save history
    await supabase
      .from('projects')
      .update({
        prompt_history: [
          ...(history || []),
          { role: 'user', content: message, timestamp: new Date().toISOString() },
          { role: 'assistant', content: aiResponse, changes, timestamp: new Date().toISOString() }
        ],
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId);

    return NextResponse.json({
      content: aiResponse,
      changes
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function extractChanges(text: string) {
  // Basic extraction - improve with regex or structured JSON output later
  return [{ type: 'edit', file: 'app/page.tsx', description: 'Updated based on prompt' }];
}
