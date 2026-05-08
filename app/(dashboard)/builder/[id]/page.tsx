'use client';
import { useEffect, useState } from 'react';
import ChatInterface from '@/components/builder/ChatInterface';
import LivePreview from '@/components/builder/LivePreview';
import ChangePreview from '@/components/builder/ChangePreview';

export default function BuilderPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [currentCode, setCurrentCode] = useState('');
  const [pendingChanges, setPendingChanges] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading project
    setProject({
      id: params.id,
      name: "Awesome App",
      prompt_history: []
    });
  }, [params.id]);

  const handleCodeUpdate = (code: string) => {
    setCurrentCode(code);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-6">
      {/* Chat */}
      <div className="flex-1 flex flex-col border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="border-b border-zinc-800 p-4 font-medium flex items-center justify-between">
          <span>Builder • {project?.name}</span>
          <span className="text-xs text-emerald-500">Changes are versioned automatically</span>
        </div>
        <ChatInterface
          projectId={params.id}
          projectName={project?.name || "Project"}
          history={project?.prompt_history || []}
          currentCode={currentCode}
          onCodeUpdate={handleCodeUpdate}
        />
      </div>

      {/* Preview Panel */}
      <div className="w-[480px] flex flex-col gap-6">
        <LivePreview code={currentCode} projectName={project?.name || ""} />

        <ChangePreview
          changes={pendingChanges}
          onApply={() => setPendingChanges([])}
          onReject={() => setPendingChanges([])}
        />
      </div>
    </div>
  );
}
