import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ title = 'No results found', message = 'Try adjusting your search or filter.' }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <FiInbox className="mx-auto h-9 w-9 text-slate-400" />
      <h3 className="mt-3 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{message}</p>
    </div>
  );
}
