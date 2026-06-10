import { useMemo, useState } from 'react';
import { FiSend, FiTrash2 } from 'react-icons/fi';
import ChatMessage from './ChatMessage.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import { projects, suggestedQueries, teams, members } from '../data/dataset.js';

const starterMessages = [
  {
    id: 1,
    role: 'assistant',
    text: 'Hi, I can search team, project, member, role, and status information from the CSV knowledge base.',
  },
];

function buildResponse(query) {
  const normalized = query.toLowerCase();

  if (normalized.includes('team')) {
    return {
      text: `Found ${teams.length} teams. ${teams[0].name} owns ${teams[0].projectCount} projects with ${teams[0].memberCount} members.`,
      agent: 'Team Agent',
      sources: teams.slice(0, 4).map((t) => t.name),
    };
  }

  if (normalized.includes('project')) {
    const ongoing = projects.filter((p) => p.status === 'Ongoing');
    return {
      text: `There are ${projects.length} projects. Ongoing work includes ${ongoing.map((p) => p.name).join(', ')}.`,
      agent: 'Project Agent',
      sources: ongoing.slice(0, 4).map((p) => p.name),
    };
  }

  if (normalized.includes('member')) {
    return {
      text: `The knowledge base has ${members.length} members. Example: ${members[0].name} is a ${members[0].role} on ${members[0].projectName}.`,
      agent: 'Member Agent',
      sources: members.slice(0, 4).map((m) => m.name),
    };
  }

  if (normalized.includes('role')) {
    return {
      text: `Roles include ${[...new Set(members.map((m) => m.role))].slice(0, 5).join(', ')}.`,
      agent: 'Member Agent',
      sources: [...new Set(members.map((m) => m.role))].slice(0, 4),
    };
  }

  if (normalized.includes('status')) {
    const statusSummary = projects.reduce((summary, project) => {
      summary[project.status] = (summary[project.status] ?? 0) + 1;
      return summary;
    }, {});
    return {
      text: `Project statuses currently include ${Object.entries(statusSummary).map(([s, c]) => `${s} (${c})`).join(', ')}.`,
      agent: 'Project Agent',
      sources: projects.slice(0, 4).map((p) => p.name),
    };
  }

  return {
    text: 'I searched the CSV dataset and found related knowledge across teams, members, and projects. Try asking for a team, member, role, project, or status.',
    agent: 'RAG Agent',
    sources: [...teams.slice(0, 2).map((t) => t.name), ...projects.slice(0, 2).map((p) => p.name)],
  };
}

export default function ChatWindow() {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const history = useMemo(() => messages.filter((message) => message.role === 'user'), [messages]);

  const submitMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMessage = { id: Date.now(), role: 'user', text: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      const response = buildResponse(trimmed);
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: 'assistant', text: response.text, agent: response.agent, sources: response.sources },
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="grid min-h-[680px] gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Chat History</h2>
          <button
            type="button"
            onClick={() => setMessages(starterMessages)}
            className="focus-ring rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-rose-600"
            title="Clear chat"
          >
            <FiTrash2 />
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {history.length ? (
            history.map((message) => (
              <button
                key={message.id}
                type="button"
                onClick={() => submitMessage(message.text)}
                className="w-full rounded-xl bg-slate-50 px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {message.text}
              </button>
            ))
          ) : (
            <p className="rounded-xl bg-slate-50 px-3 py-4 text-sm text-slate-500">No previous questions yet.</p>
          )}
        </div>
      </aside>

      <section className="flex min-h-[680px] flex-col rounded-2xl border border-slate-100 bg-slate-50 shadow-soft">
        <div className="border-b border-slate-200 bg-white px-5 py-4">
          <h1 className="text-xl font-bold text-ink">Ask AI</h1>
          <p className="mt-1 text-sm text-slate-500">RAG assistant for team knowledge retrieval from the CSV dataset.</p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping ? (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <LoadingSpinner />
              Assistant is searching the knowledge base
            </div>
          ) : null}
        </div>

        <div className="border-t border-slate-200 bg-white p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestedQueries.map((query) => (
              <button
                key={query}
                type="button"
                onClick={() => submitMessage(query)}
                className="focus-ring rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
              >
                {query}
              </button>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitMessage(input);
            }}
            className="flex gap-3"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about a team, project, member, role, or status"
              className="focus-ring h-12 min-w-0 flex-1 rounded-xl border border-slate-200 px-4 text-sm shadow-sm"
            />
            <button
              type="submit"
              className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700"
              title="Send message"
            >
              <FiSend />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
