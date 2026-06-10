const DEFAULT_STEPS = [
  'User Query',
  'Coordinator Agent',
  'Selected Agent',
  'Knowledge Retrieval',
  'Response Generation',
];

export default function AgentTimeline({ steps = DEFAULT_STEPS }) {
  return (
    <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
      <p className="mb-2.5 text-xs font-semibold text-slate-500">Agent Workflow</p>
      <ol className="space-y-0">
        {steps.map((step, i) => (
          <li key={step} className="flex items-start gap-2">
            <div className="flex flex-col items-center">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <span className="mt-0.5 h-4 w-px bg-slate-300" />
              )}
            </div>
            <span className={`pt-0.5 text-xs font-medium leading-5 ${
              i === 0 || i === steps.length - 1 ? 'text-slate-700' : 'text-brand-700'
            }`}>
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
