import AgentMetaCard from './AgentMetaCard.jsx';
import AgentTimeline from './AgentTimeline.jsx';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[82%] space-y-1 rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
        isUser ? 'bg-brand-600 text-white' : 'border border-slate-100 bg-white text-slate-700'
      }`}>
        <p>{message.text}</p>

        {!isUser && (message.agent || message.sources?.length > 0) && (
          <AgentMetaCard
            agent={message.agent}
            sources={message.sources ?? []}
            retrieval_count={message.retrieval_count}
            confidence={message.confidence}
            coordinator_reasoning={message.coordinator_reasoning}
          />
        )}

        {!isUser && message.workflow?.length > 0 && (
          <AgentTimeline steps={message.workflow} />
        )}
      </div>
    </div>
  );
}
