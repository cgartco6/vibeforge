'use client';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) router.push('/dashboard');
    else alert(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Sign In</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 bg-zinc-800 rounded-lg" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-6 bg-zinc-800 rounded-lg" />
        <button onClick={handleLogin} className="w-full bg-white text-black py-3 rounded-lg font-medium">Sign In</button>
        <p className="text-center mt-4 text-sm text-zinc-500">Demo: Use Supabase magic link or add signup</p>
      </div>
    </div>
  );
}
