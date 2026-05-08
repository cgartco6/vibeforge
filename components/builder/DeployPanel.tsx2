'use client';
import { useState } from 'react';
import { ExternalLink, Upload } from 'lucide-react';
import { generateProjectZIP } from '@/lib/export';

type Props = {
  projectName: string;
  files: Record<string, string>;
};

export default function DeployPanel({ projectName, files }: Props) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployUrl, setDeployUrl] = useState('');
  const [githubRepo, setGithubRepo] = useState('');

  const deployToVercel = async () => {
    setIsDeploying(true);
    
    try {
      // 1. Generate ZIP
      const zipBlob = await generateProjectZIP(projectName, files);
      
      // 2. In real production: Upload to Vercel Blob or use their API
      // For demo: Show Vercel import flow
      const repoName = projectName.toLowerCase().replace(/\s+/g, '-');
      
      // Simulate deployment
      setTimeout(() => {
        const fakeDeployUrl = `https://${repoName}-vibeforge.vercel.app`;
        setDeployUrl(fakeDeployUrl);
        setGithubRepo(repoName);
        
        alert(`✅ Deployment started!\n\nProject: ${projectName}\nRepo: ${repoName}\n\nIn a real version this would call Vercel API directly.`);
      }, 1200);
    } catch (error) {
      alert('Deployment failed. Please check console.');
    }
    
    setIsDeploying(false);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Upload size={20} /> Deploy to Vercel
      </h3>

      <button
        onClick={deployToVercel}
        disabled={isDeploying}
        className="w-full bg-[#000000] hover:bg-black text-white border border-white/20 py-4 rounded-2xl font-medium flex items-center justify-center gap-3 transition disabled:opacity-70"
      >
        {isDeploying ? (
          <>Deploying to Vercel...</>
        ) : (
          <>🚀 Deploy Now to Vercel</>
        )}
      </button>

      {deployUrl && (
        <div className="bg-emerald-950 border border-emerald-900 rounded-2xl p-5 space-y-3">
          <div className="text-emerald-400 font-medium">Deployment Successful!</div>
          <a 
            href={deployUrl} 
            target="_blank" 
            className="text-white hover:underline flex items-center gap-2"
          >
            {deployUrl} <ExternalLink size={16} />
          </a>
          <p className="text-xs text-zinc-400">GitHub repo: {githubRepo}</p>
        </div>
      )}

      <div className="text-xs text-zinc-500 space-y-1 border-t border-zinc-800 pt-4">
        <p>• Generates production-ready Next.js project</p>
        <p>• Auto configures Tailwind + TypeScript</p>
        <p>• One-click from VibeForge</p>
      </div>
    </div>
  );
}
