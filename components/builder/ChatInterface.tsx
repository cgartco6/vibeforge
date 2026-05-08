'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatMessage, ChangePreview } from '@/types';

type Props = {
  projectId: string;
  projectName: string;
  history: ChatMessage[];
  currentCode: string;
  onCodeUpdate: (code: string, filePath?: string) => void;
  onNewChanges: (changes: ChangePreview[]) => void;
};

export default function ChatInterface({ projectId, projectName, history, currentCode, onCodeUpdate, onNewChanges }: Props) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(history);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: message, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, message, history: messages })
      });
      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content || "Code generated.",
        timestamp: new Date().toISOString(),
        changes: data.changes
      };

      setMessages(prev => [...prev, assistantMsg]);
      onNewChanges(data.changes || []);
      onCodeUpdate(data.content || currentCode);
    } catch (e) {
      console.error(e);
    }

    setMessage('');
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {messages.map(msg => (
          <div key={msg.id} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn("max-w-[80%] rounded-2xl px-5 py-4", msg.role === 'user' ? 'bg-emerald-600' : 'bg-zinc-900 border border-zinc-800')}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-zinc-800 bg-zinc-900">
        <div className="flex gap-3">
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Build a game, writing app, task manager..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4"
            disabled={isLoading}
          />
          <button onClick={sendMessage} disabled={isLoading} className="bg-emerald-600 px-6 rounded-2xl">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
