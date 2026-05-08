'use client';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const router = useRouter();
  const supabase = createClient();

  const handleEmailLogin = async () => {
    setIsLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else router.push('/dashboard');
    setIsLoading(false);
  };

  const handleMagicLink = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` }
    });
    if (error) setMessage(error.message);
    else setMessage('Check your email for the magic link!');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md border border-zinc-800">
        <h1 className="text-4xl font-bold text-center mb-8">VibeForge</h1>
        <h2 className="text-2xl font-semibold mb-8 text-center">Sign In</h2>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 mb-4 focus:outline-none focus:border-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 mb-6 focus:outline-none focus:border-white"
        />

        <button
          onClick={handleEmailLogin}
          disabled={isLoading}
          className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-zinc-200 transition disabled:opacity-70 mb-4"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        <button
          onClick={handleMagicLink}
          disabled={isLoading}
          className="w-full border border-zinc-700 py-4 rounded-2xl hover:bg-zinc-800 transition"
        >
          Send Magic Link
        </button>

        {message && <p className="text-center mt-4 text-sm text-emerald-400">{message}</p>}

        <div className="text-center mt-8 text-sm text-zinc-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-white hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
