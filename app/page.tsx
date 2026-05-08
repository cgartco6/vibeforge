export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white flex items-center justify-center">
      <div className="max-w-3xl text-center px-6">
        <h1 className="text-6xl font-bold mb-6">VibeForge</h1>
        <p className="text-2xl mb-8 text-zinc-400">
          Build reliable apps with natural language.<br />Full code ownership. No more lost work.
        </p>
        <a href="/login" className="bg-white text-black px-8 py-4 rounded-xl text-lg font-medium hover:bg-zinc-200 transition">
          Get Started Free
        </a>
      </div>
    </div>
  );
}
