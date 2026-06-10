import { useMemo, useState } from 'react';
import { FiActivity, FiClock, FiDatabase, FiSearch, FiShield, FiTrendingUp, FiUsers, FiUserCheck, FiBriefcase } from 'react-icons/fi';
import StatCard from '../components/StatCard.jsx';
import { analytics, allDomains, allRoles, allTechStacks, members, projects, projectStatuses, teams } from '../data/dataset.js';

const icons = [FiDatabase, FiSearch, FiClock, FiTrendingUp, FiActivity, FiShield];
const accents = [
  'bg-brand-50 text-brand-600',
  'bg-emerald-50 text-emerald-600',
  'bg-amber-50 text-amber-600',
  'bg-indigo-50 text-indigo-600',
  'bg-rose-50 text-rose-600',
  'bg-cyan-50 text-cyan-600',
];

const selectCls = 'focus-ring h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm';

export default function Analytics() {
  const [status, setStatus] = useState('All');
  const [role, setRole] = useState('All');
  const [domain, setDomain] = useState('All');
  const [tech, setTech] = useState('All');

  const filteredProjects = useMemo(() =>
    projects.filter((p) =>
      (status === 'All' || p.status === status) &&
      (domain === 'All' || p.domain === domain) &&
      (tech === 'All' || p.techStack.includes(tech))
    ), [status, domain, tech]);

  const filteredMembers = useMemo(() =>
    members.filter((m) => role === 'All' || m.role === role),
    [role]);

  const filteredTeams = useMemo(() => {
    const teamIds = new Set(filteredProjects.map((p) => p.id));
    return teams.filter((t) => teamIds.has(t.id));
  }, [filteredProjects]);

  const isFiltered = status !== 'All' || role !== 'All' || domain !== 'All' || tech !== 'All';

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-ink">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Statistics derived from the uploaded team-project CSV dataset.</p>
      </div>

      {/* Dataset Summary */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
        <h2 className="mb-4 text-base font-bold text-ink">Dataset Summary</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <FiUsers className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-slate-500">Teams</p>
              <p className="text-2xl font-bold text-ink">{teams.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <FiUserCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-slate-500">Members</p>
              <p className="text-2xl font-bold text-ink">{members.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600">
              <FiBriefcase className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-slate-500">Projects</p>
              <p className="text-2xl font-bold text-ink">{projects.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls}>
          {projectStatuses.map((s) => <option key={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
        </select>
        <select value={role} onChange={(e) => setRole(e.target.value)} className={selectCls}>
          {allRoles.map((r) => <option key={r}>{r === 'All' ? 'All Roles' : r}</option>)}
        </select>
        <select value={domain} onChange={(e) => setDomain(e.target.value)} className={selectCls}>
          {allDomains.map((d) => <option key={d}>{d === 'All' ? 'All Domains' : d}</option>)}
        </select>
        <select value={tech} onChange={(e) => setTech(e.target.value)} className={selectCls}>
          {allTechStacks.map((t) => <option key={t}>{t === 'All' ? 'All Tech Stacks' : t}</option>)}
        </select>
        {isFiltered && (
          <button
            onClick={() => { setStatus('All'); setRole('All'); setDomain('All'); setTech('All'); }}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-500 transition hover:bg-slate-50 hover:text-rose-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filtered counts */}
      {isFiltered && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-soft">
            <p className="text-xs text-slate-500">Filtered Teams</p>
            <p className="mt-1 text-2xl font-bold text-ink">{filteredTeams.length}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-soft">
            <p className="text-xs text-slate-500">Filtered Members</p>
            <p className="mt-1 text-2xl font-bold text-ink">{filteredMembers.length}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-soft">
            <p className="text-xs text-slate-500">Filtered Projects</p>
            <p className="mt-1 text-2xl font-bold text-ink">{filteredProjects.length}</p>
          </div>
        </div>
      )}

      {/* Original analytics stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {analytics.map((item, index) => (
          <StatCard key={item.label} icon={icons[index]} label={item.label} value={item.value} detail={item.detail} accent={accents[index]} />
        ))}
      </div>
    </div>
  );
}
