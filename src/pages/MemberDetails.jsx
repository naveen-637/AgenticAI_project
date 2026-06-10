import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import { getMemberById, getProjectById } from '../data/dataset.js';

export default function MemberDetails() {
  const { memberId } = useParams();
  const member = getMemberById(memberId);
  const project = member ? getProjectById(member.teamId) : null;

  if (!member) {
    return <EmptyState title="Member not found" description="Please return to the Members page and select a valid profile." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">{member.name}</h1>
          <p className="mt-1 text-sm text-slate-500">Role, responsibilities, project details, and team context for this member.</p>
        </div>
        <Link to="/members" className="focus-ring inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Back to Members
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="space-y-4">
            <Detail label="Role" value={member.role} />
            <Detail label="Responsibilities" value={member.responsibilities} />
            <Detail label="Project" value={member.projectName} />
            <Detail label="Status" value={project?.status ?? 'Unknown'} />
            <Detail label="Tech Stack" value={project?.techStack.join(', ') ?? 'N/A'} />
          </div>
        </section>

        <aside className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-ink">Team</h2>
          <p className="mt-2 text-sm text-slate-500">{member.teamName}</p>
          <Link
            to={`/teams/${member.teamId}`}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            View Team Details
          </Link>
        </aside>
      </div>
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
