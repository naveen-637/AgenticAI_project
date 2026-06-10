import { FiBriefcase, FiCheckCircle, FiLayers, FiUsers, FiUserCheck } from 'react-icons/fi';
import SearchBar from '../components/SearchBar.jsx';
import StatCard from '../components/StatCard.jsx';
import { activities, members, projects, teams } from '../data/dataset.js';
import { useState } from 'react';

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const completed = projects.filter((project) => project.status === 'Completed').length;
  const ongoing = projects.filter((project) => project.status === 'Ongoing').length;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl bg-ink p-6 text-white shadow-soft sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-blue-200">Team Knowledge Assistant</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, Naveen.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Search team knowledge, inspect active projects, and ask the RAG assistant for fast answers from the dataset.
          </p>
        </div>
      </section>

      <div className="max-w-2xl">
        <SearchBar value={query} onChange={setQuery} placeholder="Quick search across teams, members, and projects" />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={FiUsers} label="Total Teams" value={teams.length} detail="Across all departments" />
        <StatCard icon={FiUserCheck} label="Total Members" value={members.length} detail="Active contributors" accent="bg-emerald-50 text-emerald-600" />
        <StatCard icon={FiBriefcase} label="Total Projects" value={projects.length} detail="Tracked initiatives" accent="bg-amber-50 text-amber-600" />
        <StatCard icon={FiCheckCircle} label="Completed Projects" value={completed} detail="Delivered successfully" accent="bg-teal-50 text-teal-600" />
        <StatCard icon={FiLayers} label="Ongoing Projects" value={ongoing} detail="Currently in progress" accent="bg-indigo-50 text-indigo-600" />
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-ink">Recent Activity</h2>
            <p className="text-sm text-slate-500">Latest project highlights from the CSV dataset.</p>
          </div>
        </div>
        <div className="mt-5 divide-y divide-slate-100">
          {activities.map((activity) => (
            <div key={activity.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-slate-800">{activity.title}</p>
                <p className="text-sm text-slate-500">{activity.type}</p>
              </div>
              <span className="text-sm text-slate-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
