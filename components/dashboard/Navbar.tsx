'use client';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function Navbar({ userEmail }: { userEmail?: string }) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-950 px-8 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">VibeForge Builder</h1>
      <div className="flex items-center gap-6">
        <span className="text-sm text-zinc-400">{userEmail}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </header>
  );
}
