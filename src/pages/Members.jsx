import { useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import MemberCard from '../components/MemberCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { members } from '../data/dataset.js';

export default function Members() {
  const [query, setQuery] = useState('');

  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      [member.name, member.id, member.teamName, member.role, member.projectName].join(' ').toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-ink">Members</h1>
        <p className="mt-1 text-sm text-slate-500">Find people by name, member ID, team, role, or project.</p>
      </div>
      <SearchBar value={query} onChange={setQuery} placeholder="Search members" />
      {filteredMembers.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <EmptyState title="No members found" />
      )}
    </div>
  );
}
