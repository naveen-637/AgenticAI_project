// ─── API Service Layer ────────────────────────────────────────────────────────
// To connect the real backend:
//   1. Add VITE_API_URL=http://localhost:8000 to .env
//   2. Set USE_MOCK = false
// No other file needs to change.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
const USE_MOCK = true;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// ─── Mock responses ───────────────────────────────────────────────────────────

function mockAsk(question) {
  const q = question.toLowerCase();

  if (q.includes('team'))
    return {
      text: 'Found teams in the knowledge base. Alpha Innovators leads with 3 projects and 8 members.',
      agent: 'Team Agent',
      coordinator_reasoning: 'Query contains team-related keywords. Routing to Team Agent.',
      sources: ['Alpha Innovators', 'Beta Solutions', 'Gamma Tech', 'Delta Systems'],
      retrieval_count: 4,
      confidence: 'High',
      workflow: ['User Query', 'Coordinator Agent', 'Team Agent', 'Knowledge Retrieval', 'Response Generation'],
    };

  if (q.includes('member'))
    return {
      text: 'The knowledge base contains members across multiple teams with roles like Frontend Developer, Backend Developer, and Data Analyst.',
      agent: 'Member Agent',
      coordinator_reasoning: 'Query contains member-related keywords. Routing to Member Agent.',
      sources: ['Ravi Kumar', 'Sneha Patel', 'Arjun Mehta'],
      retrieval_count: 3,
      confidence: 'High',
      workflow: ['User Query', 'Coordinator Agent', 'Member Agent', 'Knowledge Retrieval', 'Response Generation'],
    };

  if (q.includes('project'))
    return {
      text: 'Multiple projects tracked across domains including Healthcare, Education, and Smart City.',
      agent: 'Project Agent',
      coordinator_reasoning: 'Query contains project-related keywords. Routing to Project Agent.',
      sources: ['Smart Waste Management', 'AI Health Monitor', 'EduTrack'],
      retrieval_count: 3,
      confidence: 'Medium',
      workflow: ['User Query', 'Coordinator Agent', 'Project Agent', 'Knowledge Retrieval', 'Response Generation'],
    };

  return {
    text: 'I searched the knowledge base using semantic retrieval and found related information across teams, members, and projects.',
    agent: 'RAG Agent',
    coordinator_reasoning: 'No specific entity detected. Falling back to semantic RAG search.',
    sources: ['Alpha Innovators', 'Smart Waste Management'],
    retrieval_count: 2,
    confidence: 'Low',
    workflow: ['User Query', 'Coordinator Agent', 'RAG Agent', 'Knowledge Retrieval', 'Response Generation'],
  };
}

// ─── Exported API functions ───────────────────────────────────────────────────

export async function askAI(question) {
  if (USE_MOCK) { await delay(800); return mockAsk(question); }
  const res = await fetch(`${BASE_URL}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);
  return res.json();
}

export async function getTeams() {
  if (USE_MOCK) { await delay(600); return []; } // pages use local dataset; hook ready for backend
  const res = await fetch(`${BASE_URL}/teams`);
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);
  return res.json();
}

export async function getMembers() {
  if (USE_MOCK) { await delay(600); return []; }
  const res = await fetch(`${BASE_URL}/members`);
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);
  return res.json();
}

export async function getProjects() {
  if (USE_MOCK) { await delay(600); return []; }
  const res = await fetch(`${BASE_URL}/projects`);
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);
  return res.json();
}

export async function getAnalytics() {
  if (USE_MOCK) { await delay(600); return null; }
  const res = await fetch(`${BASE_URL}/analytics`);
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);
  return res.json();
}

export async function checkBackendStatus() {
  if (USE_MOCK) { await delay(300); return 'offline'; }
  try {
    const res = await fetch(`${BASE_URL}/health`, {
      signal: AbortSignal.timeout(3000),
    });
    return res.ok ? 'connected' : 'offline';
  } catch {
    return 'offline';
  }
}
