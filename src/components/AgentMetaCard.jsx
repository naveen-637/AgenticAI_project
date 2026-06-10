import { FiCpu, FiDatabase, FiZap } from 'react-icons/fi';

const agentColors = {
  'Coordinator Agent': 'bg-slate-100 text-slate-700',
  'Team Agent':        'bg-brand-50 text-brand-700',
  'Member Agent':      'bg-emerald-50 text-emerald-700',
  'Project Agent':     'bg-amber-50 text-amber-700',
  'RAG Agent':         'bg-purple-50 text-purple-700',
};

const confidenceCfg = {
  High:   { cls: 'bg-emerald-50 text-emerald-700', bar: 'bg-emerald-500', width: 'w-full' },
  Medium: { cls: 'bg-amber-50 text-amber-700',     bar: 'bg-amber-400',   width: 'w-2/3'  },
  Low:    { cls: 'bg-rose-50 text-rose-700',        bar: 'bg-rose-400',    width: 'w-1/3'  },
};

export default function AgentMetaCard({ agent, sources = [], retrieval_count, confidence, coordinator_reasoning }) {
  const conf = confidenceCfg[confidence] ?? confidenceCfg.Low;

  return (
    <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs space-y-3">

      {/* Agent used */}
      <div className="flex items-center gap-2">
        <FiCpu className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        <span className="font-semibold text-slate-500">Agent Used</span>
        <span className={`ml-auto rounded-full px-2.5 py-0.5 font-semibold ${agentColors[agent] ?? 'bg-slate-100 text-slate-600'}`}>
          {agent}
        </span>
      </div>

      {/* Coordinator reasoning */}
      {coordinator_reasoning && (
        <p className="text-slate-500 leading-5 border-l-2 border-slate-200 pl-2">
          {coordinator_reasoning}
        </p>
      )}

      {/* Confidence */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <FiZap className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="font-semibold text-slate-500">Confidence</span>
          <span className={`ml-auto rounded-full px-2.5 py-0.5 font-semibold ${conf.cls}`}>{confidence}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-200">
          <div className={`h-1.5 rounded-full transition-all ${conf.bar} ${conf.width}`} />
        </div>
      </div>

      {/* Sources */}
      {sources.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <FiDatabase className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="font-semibold text-slate-500">Sources</span>
            {retrieval_count != null && (
              <span className="ml-auto rounded-full bg-slate-200 px-2 py-0.5 text-slate-600">
                {retrieval_count} retrieved
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sources.map((src) => (
              <span key={src} className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 font-medium text-slate-600">
                {src}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
