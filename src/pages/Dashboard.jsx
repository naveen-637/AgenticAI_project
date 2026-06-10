import { FiBriefcase, FiCheckCircle, FiLayers, FiUsers, FiUserCheck, FiMessageCircle, FiStar, FiClock } from 'react-icons/fi';
import SearchBar from '../components/SearchBar.jsx';
import StatCard from '../components/StatCard.jsx';
import FeedbackCard from '../components/FeedbackCard.jsx';
import { activities, members, projects, teams } from '../data/dataset.js';
import { useState } from 'react';

const MOCK_FEEDBACK = [
  { id: 1, name: 'Arjun Sharma', category: 'UI/UX', rating: 5, message: 'The dashboard layout is clean and very intuitive. Loved the analytics section!', date: '12/07/2025' },
  { id: 2, name: 'Priya Nair', category: 'Feature Request', rating: 4, message: 'Would love to see export functionality for project reports.', date: '11/07/2025' },
  { id: 3, name: 'Karan Mehta', category: 'Bug Report', rating: 3, message: 'Search bar sometimes does not filter correctly on mobile devices.', date: '10/07/2025' },
];

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const completed = projects.filter((p) => p.status === 'Completed').length;
  const ongoing = projects.filter((p) => p.status === 'Ongoing').length;

  const avgRating = (MOCK_FEEDBACK.reduce((s, f) => s + f.rating, 0) / MOCK_FEEDBACK.length).toFixed(1);
  const openRequests = MOCK_FEEDBACK.filter((f) => f.category === 'Feature Request' || f.category === 'Bug Report').length;

  return (
    <div className="space-y-5">
      <div className="max-w-2xl">
        <SearchBar value={query} onChange={setQuery} placeholder="Quick search across teams, members, and projects" />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={FiUsers} label="Total Teams" value={teams.length} detail="Across all departments" />
        <StatCard icon={FiUserCheck} label="Total Members" value={members.length} detail="Active contributors" accent="bg-emerald-50 text-emerald-600" />
        <StatCard icon={FiBriefcase} label="Total Projects" value={projects.length} detail="Tracked initiatives" accent="bg-amber-50 text-amber-600" />
        <StatCard icon={FiCheckCircle} label="Completed" value={completed} detail="Delivered successfully" accent="bg-teal-50 text-teal-600" />
        <StatCard icon={FiLayers} label="Ongoing" value={ongoing} detail="Currently in progress" accent="bg-indigo-50 text-indigo-600" />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FiMessageCircle} label="Total Feedback" value={MOCK_FEEDBACK.length} detail="All submissions" accent="bg-purple-50 text-purple-600" />
        <StatCard icon={FiStar} label="Avg Rating" value={avgRating} detail="Out of 5 stars" accent="bg-amber-50 text-amber-600" />
        <StatCard icon={FiClock} label="Open Requests" value={openRequests} detail="Bugs & feature requests" accent="bg-rose-50 text-rose-600" />
        <StatCard icon={FiCheckCircle} label="Resolved" value={MOCK_FEEDBACK.filter((f) => f.rating >= 4).length} detail="Rated 4 stars or above" accent="bg-emerald-50 text-emerald-600" />
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
          <div className="mb-4">
            <h2 className="text-base font-bold text-ink">Recent Activity</h2>
            <p className="text-xs text-slate-500">Latest project highlights from the dataset.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {activities.map((activity) => (
              <div key={activity.id} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.type}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
          <div className="mb-4">
            <h2 className="text-base font-bold text-ink">Recent Feedback</h2>
            <p className="text-xs text-slate-500">Latest user submissions.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {MOCK_FEEDBACK.map((f) => (
              <FeedbackCard key={f.id} feedback={f} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
