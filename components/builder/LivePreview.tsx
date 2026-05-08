'use client';

type Props = {
  code: string;
  projectName: string;
};

export default function LivePreview({ code, projectName }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden h-full flex flex-col">
      <div className="border-b border-zinc-800 px-6 py-3 flex items-center justify-between bg-zinc-950">
        <div>Live Preview — {projectName}</div>
        <div className="text-xs text-emerald-400">● LIVE</div>
      </div>
      <div className="flex-1 bg-white relative">
        {code ? (
          <iframe
            srcDoc={code}
            className="w-full h-full border-0"
            sandbox="allow-scripts"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
            Your preview will appear here
          </div>
        )}
      </div>
    </div>
  );
}
