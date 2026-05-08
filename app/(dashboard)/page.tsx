import { createClient } from '@/lib/supabase/server';
import ProjectCard from '@/components/dashboard/ProjectCard';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user?.id)
    .order('updated_at', { ascending: false });

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Your Projects</h2>
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-500">
          No projects yet. Create your first one!
        </div>
      )}
    </div>
  );
}
