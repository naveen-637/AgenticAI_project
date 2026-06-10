import { useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import SearchBar from '../components/SearchBar.jsx';
import TeamCard from '../components/TeamCard.jsx';
import { teamStatuses, teams } from '../data/dataset.js';

export default function Teams() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchesQuery = [team.name, team.id, team.domain].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'All' || team.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div className="space-y-5">
      <PageHeader title="Teams" description="Browse teams, team IDs, project counts, and member counts." />
      <div className="grid gap-3 md:grid-cols-[1fr_220px]">
        <SearchBar value={query} onChange={setQuery} placeholder="Search teams by name, ID, or domain" />
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="focus-ring h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm">
          {teamStatuses.map((teamStatus) => (
            <option key={teamStatus}>{teamStatus}</option>
          ))}
        </select>
      </div>
      {filteredTeams.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <EmptyState title="No teams found" />
      )}
    </div>
  );
}

function PageHeader({ title, description }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">{title}</h1>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}
