import { createClient } from '@/lib/supabase/server';
import ProjectCard from '@/components/dashboard/ProjectCard';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user?.id)
    .order('updated_at', { ascending: false });

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Your Projects</h1>
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p: any) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-500">
          No projects yet. Create one from the sidebar.
        </div>
      )}
    </div>
  );
}
