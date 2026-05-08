import { Home, FolderOpen, Settings, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 border-r border-zinc-800 bg-zinc-950 p-6">
      <div className="font-bold text-2xl mb-10">VibeForge</div>
      <nav className="space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 text-zinc-400 hover:text-white">
          <Home size={20} /> Dashboard
        </Link>
        <Link href="/dashboard/projects" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 text-zinc-400 hover:text-white">
          <FolderOpen size={20} /> Projects
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 text-zinc-400 hover:text-white">
          <Plus size={20} /> New Project
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 text-zinc-400 hover:text-white">
          <Settings size={20} /> Settings
        </Link>
      </nav>
    </div>
  );
}
