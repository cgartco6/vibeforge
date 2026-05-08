'use client';
import { Download, Github } from 'lucide-react';
import { useState } from 'react';
import JSZip from 'jszip';
import { generateProjectZIP } from '@/lib/export';

type Props = {
  projectName: string;
  files: Record<string, string>; // path -> content
};

export default function ExportPanel({ projectName, files }: Props) {
  const [isExporting, setIsExporting] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [repoName, setRepoName] = useState(projectName.toLowerCase().replace(/\s+/g, '-'));
  const [isPushing, setIsPushing] = useState(false);

  const downloadZIP = async () => {
    setIsExporting(true);
    try {
      const blob = await generateProjectZIP(projectName, files);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName.replace(/\s+/g, '-')}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Export failed');
    }
    setIsExporting(false);
  };

  const pushToGitHub = async () => {
    if (!githubToken) {
      alert("Please enter a GitHub Personal Access Token (classic, with repo scope)");
      return;
    }
    setIsPushing(true);

    try {
      const zipBlob = await generateProjectZIP(projectName, files);
      const arrayBuffer = await zipBlob.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);

      // This is a simplified version — full GitHub push needs more setup
      alert(`Project ready for GitHub!\n\nRepo name: ${repoName}\n\nToken saved temporarily.\n\nIn production we would create repo + push files.`);
      // Full implementation possible with Octokit + GitHub API
    } catch (e) {
      alert('GitHub push failed');
    }
    setIsPushing(false);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6">
      <h3 className="font-semibold text-lg">Export Project</h3>

      <button
        onClick={downloadZIP}
        disabled={isExporting}
        className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-medium hover:bg-zinc-200"
      >
        <Download size={20} />
        {isExporting ? 'Creating ZIP...' : 'Download Full Project ZIP'}
      </button>

      <div className="pt-4 border-t border-zinc-800">
        <h4 className="font-medium mb-4 flex items-center gap-2">
          <Github size={18} /> Push to GitHub
        </h4>
        <input
          type="text"
          placeholder="Repository name"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 mb-3"
        />
        <input
          type="password"
          placeholder="GitHub Personal Access Token"
          value={githubToken}
          onChange={(e) => setGithubToken(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 mb-4"
        />
        <button
          onClick={pushToGitHub}
          disabled={isPushing}
          className="w-full bg-emerald-600 py-4 rounded-2xl font-medium hover:bg-emerald-500 disabled:opacity-70"
        >
          {isPushing ? 'Pushing...' : 'Create Repo & Push'}
        </button>
        <p className="text-xs text-zinc-500 mt-3">
          Token needs <code>repo</code> scope. Never share it.
        </p>
      </div>
    </div>
  );
}
