const agentColors = {
  'Team Agent':    'bg-brand-50 text-brand-700',
  'Member Agent':  'bg-emerald-50 text-emerald-700',
  'Project Agent': 'bg-amber-50 text-amber-700',
  'RAG Agent':     'bg-purple-50 text-purple-700',
};

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[82%] space-y-2 rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
        isUser ? 'bg-brand-600 text-white' : 'border border-slate-100 bg-white text-slate-700'
      }`}>
        {!isUser && message.agent && (
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${agentColors[message.agent] ?? 'bg-slate-100 text-slate-600'}`}>
            {message.agent}
          </span>
        )}

        <p>{message.text}</p>

        {!isUser && message.sources?.length > 0 && (
          <div className="pt-1">
            <p className="mb-1.5 text-xs font-semibold text-slate-400">Sources</p>
            <div className="flex flex-wrap gap-1.5">
              {message.sources.map((source) => (
                <span key={source} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {source}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
