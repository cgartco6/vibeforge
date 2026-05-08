import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default function ProjectCard({ project }: { project: any }) {
  return (
    <Link href={`/dashboard/projects/${project.id}`} className="block bg-zinc-900 rounded-2xl p-6 hover:bg-zinc-800 transition border border-zinc-800">
      <h3 className="font-semibold text-xl mb-2">{project.name}</h3>
      <p className="text-zinc-400 line-clamp-2 mb-4">{project.description}</p>
      <div className="flex items-center text-xs text-zinc-500">
        <Calendar size={14} className="mr-1" />
        Updated {new Date(project.updated_at).toLocaleDateString()}
      </div>
    </Link>
  );
}
