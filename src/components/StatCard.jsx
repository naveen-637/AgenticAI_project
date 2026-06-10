export default function StatCard({ icon: Icon, label, value, detail, accent = 'bg-brand-50 text-brand-600' }) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
        </div>
        {Icon ? (
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${accent}`}>
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
      </div>
      {detail ? <p className="mt-4 text-sm text-slate-500">{detail}</p> : null}
    </article>
  );
}
