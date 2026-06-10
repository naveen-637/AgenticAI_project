import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import { getProjectById, getTeamById, getTeamMembers } from '../data/dataset.js';

export default function TeamDetails() {
  const { teamId } = useParams();
  const team = getTeamById(teamId);
  const project = getProjectById(teamId);
  const teamMembers = getTeamMembers(teamId);

  if (!team || !project) {
    return <EmptyState title="Team not found" description="Please return to the Teams page and select a valid team." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">{team.name}</h1>
          <p className="mt-1 text-sm text-slate-500">Team overview, project ownership, status, domain, tech stack, and member list.</p>
        </div>
        <Link to="/teams" className="focus-ring inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Back to Teams
        </Link>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Team Details</p>
            <h2 className="mt-3 text-xl font-bold text-ink">{team.name}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Detail label="Project Name" value={project.name} />
            <Detail label="Status" value={project.status} />
            <Detail label="Domain" value={team.domain} />
            <Detail label="Project Tech" value={project.techStack.join(', ')} />
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-700">Project</h3>
            <p className="mt-1 text-sm text-slate-500">{project.name}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-ink">Members ({teamMembers.length})</h3>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{team.status}</span>
          </div>
          <div className="mt-4 space-y-3">
            {teamMembers.map((member) => (
              <Link key={member.id} to={`/members/${member.id}`} className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50">
                <p className="font-semibold text-slate-900">{member.name}</p>
                <p className="text-sm text-slate-500">{member.role}</p>
              </Link>
            ))}
          </div>
        </div>
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
