export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  const renderMessage = () => {
    if (isUser) return <div>{message.text}</div>;

    const lines = message.text
      .split(/\r?\n/)
      .flatMap((line) => line.split(';'))
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length > 1) {
      return (
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
          {lines.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      );
    }

    return <div>{message.text}</div>;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
          isUser ? 'bg-brand-600 text-white' : 'border border-slate-100 bg-white text-slate-700'
        }`}
      >
        {renderMessage()}
        {!isUser && (message.agentUsed || message.sources) ? (
          <div className="mt-3 space-y-1 text-xs text-slate-500">
            {message.agentUsed ? (
              <p>
                <span className="font-semibold text-slate-700">Agent Used:</span> {message.agentUsed}
              </p>
            ) : null}
            {message.sources ? (
              <p>
                <span className="font-semibold text-slate-700">Sources:</span> {message.sources.join(', ')}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
