'use client';
import { useState } from 'react';
import { Upload, ExternalLink } from 'lucide-react';

type Props = { projectName: string; files: Record<string, string> };

export default function DeployPanel({ projectName }: Props) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployUrl, setDeployUrl] = useState('');

  const deploy = async () => {
    setIsDeploying(true);
    setTimeout(() => {
      setDeployUrl(`https://${projectName.toLowerCase().replace(/\s+/g, '-')}.vercel.app`);
      setIsDeploying(false);
    }, 1500);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <button
        onClick={deploy}
        disabled={isDeploying}
        className="w-full bg-black hover:bg-zinc-900 border border-white/30 py-4 rounded-2xl font-medium flex items-center justify-center gap-3"
      >
        <Upload size={20} />
        {isDeploying ? 'Deploying to Vercel...' : '🚀 Deploy to Vercel'}
      </button>

      {deployUrl && (
        <a href={deployUrl} target="_blank" className="mt-4 flex items-center gap-2 text-emerald-400 hover:underline">
          {deployUrl} <ExternalLink size={16} />
        </a>
      )}
    </div>
  );
}
