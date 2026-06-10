import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiCheckCircle, FiLayers, FiUsers, FiUserCheck, FiMessageCircle, FiStar, FiClock } from 'react-icons/fi';
import SearchBar from '../components/SearchBar.jsx';
import StatCard from '../components/StatCard.jsx';
import FeedbackCard from '../components/FeedbackCard.jsx';
import { activities, members, projects, teams } from '../data/dataset.js';
import { useFeedback } from '../context/FeedbackContext.jsx';

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const { feedbackList } = useFeedback();

  const completed = projects.filter((p) => p.status === 'Completed').length;
  const ongoing = projects.filter((p) => p.status === 'Ongoing').length;
  const avgRating = feedbackList.length
    ? (feedbackList.reduce((s, f) => s + f.rating, 0) / feedbackList.length).toFixed(1)
    : '0.0';
  const openRequests = feedbackList.filter((f) => f.category === 'Feature Request' || f.category === 'Bug Report').length;

  const q = query.toLowerCase().trim();
  const searchResults = useMemo(() => {
    if (!q) return null;
    return {
      teams: teams.filter((t) => [t.name, t.id, t.domain].join(' ').toLowerCase().includes(q)),
      members: members.filter((m) => [m.name, m.id, m.role, m.teamName, m.projectName].join(' ').toLowerCase().includes(q)),
      projects: projects.filter((p) => [p.name, p.teamName, p.status, p.domain, ...p.techStack].join(' ').toLowerCase().includes(q)),
    };
  }, [q]);

  const hasResults = searchResults && (searchResults.teams.length + searchResults.members.length + searchResults.projects.length) > 0;

  return (
    <div className="space-y-5">
      <div className="max-w-2xl">
        <SearchBar value={query} onChange={setQuery} placeholder="Quick search across teams, members, and projects" />
      </div>

      {/* Search results */}
      {searchResults && (
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
          <p className="mb-4 text-sm font-semibold text-slate-500">
            Search results for <span className="text-ink">"{query}"</span>
          </p>
          {!hasResults ? (
            <p className="text-sm text-slate-400">No matches found.</p>
          ) : (
            <div className="space-y-4">
              {searchResults.teams.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-600">Teams</p>
                  <div className="divide-y divide-slate-100">
                    {searchResults.teams.map((t) => (
                      <Link key={t.id} to={`/teams/${t.id}`} className="flex items-center justify-between py-2.5 text-sm hover:text-brand-700">
                        <span className="font-medium text-slate-800">{t.name}</span>
                        <span className="text-xs text-slate-400">{t.domain}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {searchResults.members.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-600">Members</p>
                  <div className="divide-y divide-slate-100">
                    {searchResults.members.map((m) => (
                      <Link key={m.id} to={`/members/${m.id}`} className="flex items-center justify-between py-2.5 text-sm hover:text-brand-700">
                        <span className="font-medium text-slate-800">{m.name}</span>
                        <span className="text-xs text-slate-400">{m.role}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {searchResults.projects.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-600">Projects</p>
                  <div className="divide-y divide-slate-100">
                    {searchResults.projects.map((p) => (
                      <Link key={p.id} to={`/projects/${p.id}`} className="flex items-center justify-between py-2.5 text-sm hover:text-brand-700">
                        <span className="font-medium text-slate-800">{p.name}</span>
                        <span className="text-xs text-slate-400">{p.status}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={FiUsers} label="Total Teams" value={teams.length} detail="Across all departments" />
        <StatCard icon={FiUserCheck} label="Total Members" value={members.length} detail="Active contributors" accent="bg-emerald-50 text-emerald-600" />
        <StatCard icon={FiBriefcase} label="Total Projects" value={projects.length} detail="Tracked initiatives" accent="bg-amber-50 text-amber-600" />
        <StatCard icon={FiCheckCircle} label="Completed" value={completed} detail="Delivered successfully" accent="bg-teal-50 text-teal-600" />
        <StatCard icon={FiLayers} label="Ongoing" value={ongoing} detail="Currently in progress" accent="bg-indigo-50 text-indigo-600" />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FiMessageCircle} label="Total Feedback" value={feedbackList.length} detail="All submissions" accent="bg-purple-50 text-purple-600" />
        <StatCard icon={FiStar} label="Avg Rating" value={avgRating} detail="Out of 5 stars" accent="bg-amber-50 text-amber-600" />
        <StatCard icon={FiClock} label="Open Requests" value={openRequests} detail="Bugs & feature requests" accent="bg-rose-50 text-rose-600" />
        <StatCard icon={FiCheckCircle} label="Resolved" value={feedbackList.filter((f) => f.rating >= 4).length} detail="Rated 4 stars or above" accent="bg-emerald-50 text-emerald-600" />
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
            {feedbackList.slice(0, 3).map((f) => (
              <FeedbackCard key={f.id} feedback={f} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
}
