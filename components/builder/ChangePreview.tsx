'use client';
import { Check, X } from 'lucide-react';

type Props = {
  changes: any[];
  onApply: () => void;
  onReject: () => void;
};

export default function ChangePreview({ changes, onApply, onReject }: Props) {
  if (changes.length === 0) return null;

  return (
    <div className="border border-amber-500/30 bg-amber-950/50 rounded-2xl p-6">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <span className="text-amber-400">Preview Changes</span>
      </h4>
      <ul className="space-y-3 text-sm">
        {changes.map((change: any, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-emerald-400 font-mono">{change.type}</span>
            <div>
              <div className="font-medium">{change.file}</div>
              <div className="text-zinc-400">{change.description}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex gap-3 mt-6">
        <button onClick={onApply} className="flex-1 bg-emerald-600 py-3 rounded-xl font-medium">Apply All Changes</button>
        <button onClick={onReject} className="flex-1 border border-zinc-700 py-3 rounded-xl">Cancel</button>
      </div>
    </div>
  );
}
