'use client';
import { useState } from 'react';
import ChatInterface from '@/components/builder/ChatInterface';
import LivePreview from '@/components/builder/LivePreview';
import ChangePreview from '@/components/builder/ChangePreview';
import ExportPanel from '@/components/builder/ExportPanel';
import DeployPanel from '@/components/builder/DeployPanel';
import SnakeGameComponent from '@/components/games/SnakeGame';

export default function BuilderPage({ params }: { params: { id: string } }) {
  const [project] = useState({ id: params.id, name: "My VibeForge Project" });
  const [currentCode, setCurrentCode] = useState('');
  const [files, setFiles] = useState<Record<string, string>>({});
  const [pendingChanges, setPendingChanges] = useState<any[]>([]);

  const handleCodeUpdate = (code: string) => {
    setCurrentCode(code);
    setFiles(prev => ({ ...prev, 'preview.html': code }));
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-6 p-6">
      <div className="flex-1 flex flex-col border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="p-5 border-b border-zinc-800 font-semibold">Builder — {project.name}</div>
        <ChatInterface
          projectId={params.id}
          projectName={project.name}
          history={[]}
          currentCode={currentCode}
          onCodeUpdate={handleCodeUpdate}
          onNewChanges={setPendingChanges}
        />
      </div>

      <div className="w-[480px] flex flex-col gap-6">
        <LivePreview code={currentCode} projectName={project.name} />
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <h3 className="font-semibold mb-4">Games Test</h3>
          <SnakeGameComponent />
        </div>
        <ChangePreview changes={pendingChanges} onApply={() => setPendingChanges([])} onReject={() => setPendingChanges([])} />
        <ExportPanel projectName={project.name} files={files} />
        <DeployPanel projectName={project.name} files={files} />
      </div>
    </div>
  );
}
