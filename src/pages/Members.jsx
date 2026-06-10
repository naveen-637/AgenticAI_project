import { useEffect, useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import MemberCard from '../components/MemberCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { MemberCardSkeleton } from '../components/Skeleton.jsx';
import { members } from '../data/dataset.js';

const ROLES = ['All', 'Frontend Developer', 'Backend Developer', 'Data Analyst', 'Project Manager'];

export default function Members() {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesQuery = [member.name, member.id, member.teamName, member.role, member.projectName].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesRole = role === 'All' || member.role === role;
      return matchesQuery && matchesRole;
    });
  }, [query, role]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-ink">Members</h1>
        <p className="mt-1 text-sm text-slate-500">Find people by name, member ID, team, role, or project.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_220px]">
        <SearchBar value={query} onChange={setQuery} placeholder="Search members" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="focus-ring h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm">
          {ROLES.map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => <MemberCardSkeleton key={i} />)}
        </div>
      ) : filteredMembers.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMembers.map((member) => <MemberCard key={member.id} member={member} />)}
        </div>
      ) : (
        <EmptyState title="No members found" />
      )}
    </div>
  );
}
