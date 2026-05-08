import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { projectId, prompt, history } = await req.json();

  // TODO: Replace with real AI call (see next message if you want Grok/Claude/OpenAI)
  const generatedHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${prompt}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-zinc-950 text-white">
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4">🎉 ${prompt}</h1>
      <p class="text-xl text-zinc-400">This is a live preview generated from your prompt.</p>
      <div class="mt-10 text-sm text-zinc-500">VibeForge • Full code ownership</div>
    </div>
  </div>
</body>
</html>`;

  // Save snapshot
  await supabase
    .from('projects')
    .update({
      code_snapshot: generatedHTML,
      updated_at: new Date().toISOString()
    })
    .eq('id', projectId);

  return NextResponse.json({
    success: true,
    html: generatedHTML,
    message: "Code generated successfully"
  });
}
