// Shared pulse shimmer base
const S = 'animate-pulse rounded-xl bg-slate-200';

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 flex-1">
          <div className={`${S} h-3 w-16`} />
          <div className={`${S} h-5 w-40`} />
          <div className={`${S} h-3 w-28`} />
        </div>
        <div className={`${S} h-10 w-10 shrink-0`} />
      </div>
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className={`${S} h-14`} />
        <div className={`${S} h-14`} />
      </div>
    </div>
  );
}

export function MemberCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft space-y-4">
      <div className="flex gap-4">
        <div className={`${S} h-12 w-12 shrink-0 rounded-2xl`} />
        <div className="space-y-2 flex-1">
          <div className={`${S} h-3 w-16`} />
          <div className={`${S} h-5 w-36`} />
          <div className={`${S} h-3 w-24`} />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className={`${S} h-3 w-10`} />
          <div className={`${S} h-3 w-28`} />
        </div>
        <div className="flex justify-between">
          <div className={`${S} h-3 w-14`} />
          <div className={`${S} h-3 w-32`} />
        </div>
      </div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className={`${S} h-3 w-24`} />
          <div className={`${S} h-8 w-16`} />
        </div>
        <div className={`${S} h-11 w-11 shrink-0`} />
      </div>
      <div className={`${S} mt-4 h-3 w-32`} />
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="space-y-4 p-5">
      <div className="flex justify-end">
        <div className={`${S} h-10 w-48 rounded-2xl`} />
      </div>
      <div className="flex justify-start">
        <div className="space-y-2 w-72">
          <div className={`${S} h-3 w-20`} />
          <div className={`${S} h-16 w-full rounded-2xl`} />
          <div className={`${S} h-3 w-32`} />
        </div>
      </div>
    </div>
  );
}

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
        <div className={`${S} mb-4 h-4 w-36`} />
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`${S} h-20 rounded-xl`} />
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => <StatSkeleton key={i} />)}
      </div>
    </div>
  );
}
