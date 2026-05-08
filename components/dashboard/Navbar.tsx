export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950 px-8 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Projects</h1>
      <div className="flex items-center gap-4">
        <button className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-xl text-sm font-medium">New Project</button>
      </div>
    </header>
  );
}
