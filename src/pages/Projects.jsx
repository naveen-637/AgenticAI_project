import { useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { projects } from '../data/mockData.js';

export default function Projects() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const content = [project.name, project.teamName, project.status, project.domain, ...project.techStack].join(' ').toLowerCase();
      const matchesQuery = content.includes(query.toLowerCase());
      const matchesStatus = status === 'All' || project.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-ink">Projects</h1>
        <p className="mt-1 text-sm text-slate-500">Inspect project status, domain, team ownership, and technology stack.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_220px]">
        <SearchBar value={query} onChange={setQuery} placeholder="Search projects" />
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="focus-ring h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm">
          <option>All</option>
          <option>Ongoing</option>
          <option>Completed</option>
          <option>Planning</option>
        </select>
      </div>
      {filteredProjects.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState title="No projects found" />
      )}
    </div>
  );
}
