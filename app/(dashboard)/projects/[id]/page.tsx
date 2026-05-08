import Link from 'next/link';

export default function ProjectDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Project: {params.id}</h1>
      <Link href={`/dashboard/builder/${params.id}`} className="bg-white text-black px-6 py-3 rounded-xl inline-block">
        Open in Builder →
      </Link>
    </div>
  );
}
