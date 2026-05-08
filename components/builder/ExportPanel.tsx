'use client';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { generateProjectZIP } from '@/lib/export';

type Props = { projectName: string; files: Record<string, string> };

export default function ExportPanel({ projectName, files }: Props) {
  const [isExporting, setIsExporting] = useState(false);

  const download = async () => {
    setIsExporting(true);
    const blob = await generateProjectZIP(projectName, files);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '-')}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    setIsExporting(false);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <button
        onClick={download}
        disabled={isExporting}
        className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-medium hover:bg-zinc-200"
      >
        <Download size={20} />
        {isExporting ? 'Creating ZIP...' : 'Download Full Project ZIP'}
      </button>
    </div>
  );
}
