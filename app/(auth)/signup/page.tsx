'use client';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` }
    });
    if (error) setMessage(error.message);
    else setMessage('Check your email to confirm your account!');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md border border-zinc-800">
        <h1 className="text-4xl font-bold text-center mb-8">VibeForge</h1>
        <h2 className="text-2xl font-semibold mb-8 text-center">Create Account</h2>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 mb-4" />
        <input type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 mb-6" />

        <button onClick={handleSignup} disabled={isLoading} className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-zinc-200">
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>

        {message && <p className="text-center mt-4 text-sm text-emerald-400">{message}</p>}

        <div className="text-center mt-8 text-sm text-zinc-500">
          Already have an account? <Link href="/login" className="text-white hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
