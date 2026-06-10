import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import { getProjectById, getProjectMembers, getTeamById } from '../data/dataset.js';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const project = getProjectById(projectId);
  const team = project ? getTeamById(projectId) : null;
  const projectMembers = project ? getProjectMembers(projectId) : [];

  if (!project) {
    return <EmptyState title="Project not found" description="Please return to the Projects page and select a valid project." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">{project.name}</h1>
          <p className="mt-1 text-sm text-slate-500">Problem statement, solution, tech stack, team ownership, and members.</p>
        </div>
        <Link to="/projects" className="focus-ring inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Back to Projects
        </Link>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="space-y-4">
            <Detail label="Problem Statement" value={project.problemStatement} />
            <Detail label="Solution" value={project.solution} />
            <Detail label="Tech Stack" value={project.techStack.join(', ')} />
            <Detail label="Status" value={project.status} />
            <Detail label="Team" value={team?.name ?? 'Unknown'} />
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Members ({projectMembers.length})</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{project.status}</span>
          </div>
          <div className="mt-4 space-y-3">
            {projectMembers.map((member) => (
              <Link
                key={member.id}
                to={`/members/${member.id}`}
                className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50"
              >
                <p className="font-semibold text-slate-900">{member.name}</p>
                <p className="text-sm text-slate-500">{member.role}</p>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
