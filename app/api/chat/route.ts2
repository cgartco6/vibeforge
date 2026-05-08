import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { projectId, message, history } = await req.json();

  // TODO: Replace with your preferred AI (Grok, Claude, OpenAI)
  // For now: Structured mock response (replace with real call)
  const structuredResponse = {
    content: `Understood. I'll implement: ${message}`,
    changes: [
      { type: 'add', file: 'app/page.tsx', description: 'New booking calendar component', codeSnippet: '// Example code...' },
      { type: 'edit', file: 'components/Calendar.tsx', description: 'Add Supabase sync', codeSnippet: '...' }
    ]
  };

  // Save to project history
  await supabase
    .from('projects')
    .update({
      prompt_history: [...(history || []), {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      }, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: structuredResponse.content,
        changes: structuredResponse.changes,
        timestamp: new Date().toISOString()
      }],
      updated_at: new Date().toISOString()
    })
    .eq('id', projectId);

  return NextResponse.json(structuredResponse);
}
