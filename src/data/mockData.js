export const teams = [
  {
    id: 'TEAM-101',
    name: 'Platform Intelligence',
    domain: 'Internal Knowledge',
    projectCount: 4,
    memberCount: 9,
    status: 'Active',
  },
  {
    id: 'TEAM-204',
    name: 'Customer Success Ops',
    domain: 'Support Automation',
    projectCount: 3,
    memberCount: 7,
    status: 'Active',
  },
  {
    id: 'TEAM-318',
    name: 'Data Products',
    domain: 'Analytics',
    projectCount: 5,
    memberCount: 12,
    status: 'Active',
  },
  {
    id: 'TEAM-422',
    name: 'Security Enablement',
    domain: 'Compliance',
    projectCount: 2,
    memberCount: 6,
    status: 'Planning',
  },
  {
    id: 'TEAM-509',
    name: 'People Systems',
    domain: 'HR Technology',
    projectCount: 2,
    memberCount: 5,
    status: 'Paused',
  },
];

export const members = [
  { id: 'MEM-001', name: 'Aarav Mehta', teamName: 'Platform Intelligence', role: 'RAG Engineer', projectName: 'Knowledge Graph Sync' },
  { id: 'MEM-002', name: 'Maya Iyer', teamName: 'Platform Intelligence', role: 'Product Manager', projectName: 'Assistant Quality Loop' },
  { id: 'MEM-003', name: 'Dev Patel', teamName: 'Customer Success Ops', role: 'Automation Lead', projectName: 'Support Article Finder' },
  { id: 'MEM-004', name: 'Nina Thomas', teamName: 'Data Products', role: 'Data Analyst', projectName: 'Team Metrics Hub' },
  { id: 'MEM-005', name: 'Rohan Das', teamName: 'Security Enablement', role: 'Security Architect', projectName: 'Policy Retrieval' },
  { id: 'MEM-006', name: 'Sara Khan', teamName: 'People Systems', role: 'UX Researcher', projectName: 'Onboarding Assistant' },
  { id: 'MEM-007', name: 'Kabir Rao', teamName: 'Data Products', role: 'ML Engineer', projectName: 'Semantic Search Index' },
  { id: 'MEM-008', name: 'Leah Fernandes', teamName: 'Customer Success Ops', role: 'Knowledge Manager', projectName: 'Support Article Finder' },
];

export const projects = [
  {
    id: 'PROJ-8801',
    name: 'Knowledge Graph Sync',
    teamName: 'Platform Intelligence',
    status: 'Ongoing',
    domain: 'RAG Infrastructure',
    techStack: ['React', 'Vector DB', 'Node'],
  },
  {
    id: 'PROJ-8802',
    name: 'Assistant Quality Loop',
    teamName: 'Platform Intelligence',
    status: 'Completed',
    domain: 'Evaluation',
    techStack: ['Python', 'Dashboards', 'LLM Eval'],
  },
  {
    id: 'PROJ-8803',
    name: 'Support Article Finder',
    teamName: 'Customer Success Ops',
    status: 'Ongoing',
    domain: 'Support',
    techStack: ['React', 'Search API', 'CRM'],
  },
  {
    id: 'PROJ-8804',
    name: 'Team Metrics Hub',
    teamName: 'Data Products',
    status: 'Completed',
    domain: 'Analytics',
    techStack: ['SQL', 'dbt', 'BI'],
  },
  {
    id: 'PROJ-8805',
    name: 'Policy Retrieval',
    teamName: 'Security Enablement',
    status: 'Ongoing',
    domain: 'Compliance',
    techStack: ['Embeddings', 'S3', 'Access Control'],
  },
  {
    id: 'PROJ-8806',
    name: 'Onboarding Assistant',
    teamName: 'People Systems',
    status: 'Planning',
    domain: 'Employee Experience',
    techStack: ['React', 'Docs', 'Workflow'],
  },
];

export const activities = [
  { id: 1, title: 'Knowledge Graph Sync indexed 128 new documents', time: '12 min ago', type: 'Index update' },
  { id: 2, title: 'Maya reviewed 14 assistant answers', time: '42 min ago', type: 'Quality' },
  { id: 3, title: 'Support Article Finder moved to pilot', time: '2 hr ago', type: 'Project' },
  { id: 4, title: 'Security policy collection refreshed', time: 'Yesterday', type: 'Sync' },
];

export const analytics = [
  { label: 'Indexed Documents', value: '18,420', detail: '+11% this month' },
  { label: 'Resolved Questions', value: '6,284', detail: '92% answer confidence' },
  { label: 'Avg Response Time', value: '1.8s', detail: 'Mock retrieval latency' },
  { label: 'Top Domain', value: 'Support', detail: '1,920 searches' },
  { label: 'Active Teams', value: '4', detail: '1 paused workspace' },
  { label: 'Knowledge Freshness', value: '96%', detail: 'Updated within 30 days' },
];

export const suggestedQueries = [
  'Show Team Details',
  'Find Project Information',
  'Search Member',
  'Search by Role',
  'Search by Status',
];
