'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  projectId: string;
  history: any[];
  onNewChanges: (changes: any[]) => void;
};

export default function ChatInterface({ projectId, history, onNewChanges }: Props) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(history);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    const userMsg = { id: Date.now().toString(), role: 'user' as const, content: message, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, message, history: messages })
    });

    const data = await res.json();
    setMessages(prev => [...prev, { ...data, role: 'assistant', timestamp: new Date().toISOString() }]);
    onNewChanges(data.changes || []);
    setMessage('');
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6 space-y-6 bg-zinc-950">
        {messages.map((msg: any) => (
          <div key={msg.id} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn(
              "max-w-[80%] rounded-2xl px-5 py-4",
              msg.role === 'user' ? 'bg-emerald-600' : 'bg-zinc-900 border border-zinc-800'
            )}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.changes && msg.changes.length > 0 && (
                <div className="mt-4 text-xs opacity-75">
                  {msg.changes.map((c: any, i: number) => (
                    <div key={i}>• {c.type} → {c.file}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900">
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Describe changes... (e.g. Add user authentication with Google)"
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-500 px-8 rounded-xl disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-zinc-500 mt-2 text-center">
          Changes are previewed before applying • Full history kept
        </p>
      </div>
    </div>
  );
}
