import { FiActivity, FiClock, FiDatabase, FiSearch, FiShield, FiTrendingUp } from 'react-icons/fi';
import StatCard from '../components/StatCard.jsx';
import { analytics } from '../data/dataset.js';

const icons = [FiDatabase, FiSearch, FiClock, FiTrendingUp, FiActivity, FiShield];
const accents = [
  'bg-brand-50 text-brand-600',
  'bg-emerald-50 text-emerald-600',
  'bg-amber-50 text-amber-600',
  'bg-indigo-50 text-indigo-600',
  'bg-rose-50 text-rose-600',
  'bg-cyan-50 text-cyan-600',
];

export default function Analytics() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-ink">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Statistics derived from the uploaded team-project CSV dataset.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {analytics.map((item, index) => (
          <StatCard key={item.label} icon={icons[index]} label={item.label} value={item.value} detail={item.detail} accent={accents[index]} />
        ))}
      </div>
    </div>
  );
}
