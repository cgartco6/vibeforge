'use client';
import { useEffect, useState } from 'react';
import ChatInterface from '@/components/builder/ChatInterface';
import ChangePreview from '@/components/builder/ChangePreview';

export default function BuilderPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [pendingChanges, setPendingChanges] = useState<any[]>([]);

  useEffect(() => {
    // Fetch project (add real fetch here)
    setProject({ id: params.id, name: "My First App", prompt_history: [] });
  }, [params.id]);

  const handleNewChanges = (changes: any[]) => {
    setPendingChanges(changes);
  };

  return (
    <div className="flex h-full gap-6">
      {/* Left: Chat */}
      <div className="flex-1 flex flex-col border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="border-b border-zinc-800 p-4 font-medium">Builder • {project?.name}</div>
        <ChatInterface 
          projectId={params.id} 
          history={project?.prompt_history || []} 
          onNewChanges={handleNewChanges} 
        />
      </div>

      {/* Right: Preview + Changes */}
      <div className="w-96 flex flex-col gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 h-1/2">
          <h3 className="font-semibold mb-4">Live Preview</h3>
          <div className="bg-black h-full rounded-2xl flex items-center justify-center text-zinc-500">
            Preview iframe will go here
          </div>
        </div>

        <ChangePreview 
          changes={pendingChanges} 
          onApply={() => { alert('Changes applied (mock)'); setPendingChanges([]); }}
          onReject={() => setPendingChanges([])}
        />
      </div>
    </div>
  );
}
