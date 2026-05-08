'use client';

type Props = {
  changes: any[];
  onApply: () => void;
  onReject: () => void;
};

export default function ChangePreview({ changes, onApply, onReject }: Props) {
  if (changes.length === 0) return null;

  return (
    <div className="bg-amber-950 border border-amber-500/30 rounded-3xl p-6">
      <h4 className="font-semibold mb-4 text-amber-400">Preview Changes</h4>
      <ul className="space-y-2 text-sm">
        {changes.map((c: any, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-emerald-400 font-mono uppercase">{c.type}</span>
            <div>{c.file} — {c.description}</div>
          </li>
        ))}
      </ul>
      <div className="flex gap-3 mt-6">
        <button onClick={onApply} className="flex-1 bg-emerald-600 py-3 rounded-2xl">Apply Changes</button>
        <button onClick={onReject} className="flex-1 border border-zinc-700 py-3 rounded-2xl">Cancel</button>
      </div>
    </div>
  );
}
