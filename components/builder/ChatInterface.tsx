'use client';
import { useState } from 'react';
import { Send, Download, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  projectId: string;
  projectName: string;
  history: any[];
  currentCode: string;
  onCodeUpdate: (code: string) => void;
};

export default function ChatInterface({ projectId, projectName, history, currentCode, onCodeUpdate }: Props) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(history);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);

    // 1. Chat
    const chatRes = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ projectId, message, history: messages })
    });
    const chatData = await chatRes.json();

    // 2. Generate code
    const genRes = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ projectId, prompt: message, history: messages })
    });
    const genData = await genRes.json();

    const assistantMsg = {
      id: (Date.now() + 1).toString(),
      role: 'assistant' as const,
      content: chatData.content || genData.message,
      timestamp: new Date().toISOString(),
      changes: chatData.changes
    };

    setMessages(prev => [...prev, assistantMsg]);
    onCodeUpdate(genData.html);
    setMessage('');
    setIsLoading(false);
  };

  const exportProject = () => {
    const blob = new Blob([currentCode || '<h1>No code yet</h1>'], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
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
              <p>{msg.content}</p>
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
            placeholder="What should we build or change? (e.g. Add a booking calendar)"
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none"
          />
          <button onClick={sendMessage} disabled={isLoading} className="bg-emerald-600 px-6 rounded-2xl">
            <Send size={20} />
          </button>
          <button onClick={exportProject} className="border border-zinc-700 px-6 rounded-2xl hover:bg-zinc-800">
            <Download size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
