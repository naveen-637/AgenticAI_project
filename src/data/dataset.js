import csvText from './Rag_Project_Dataset.csv?raw';

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (char === '"' && quoted && nextChar === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(cell);
      cell = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && nextChar === '\n') index += 1;
      row.push(cell);
      if (row.some((value) => value.trim() !== '')) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const [headers, ...records] = rows;
  return records.map((record) =>
    headers.reduce((entry, header, index) => {
      entry[header] = record[index]?.trim() ?? '';
      return entry;
    }, {})
  );
}

const rows = parseCsv(csvText);

const byId = (items, getId) => {
  const map = new Map();
  items.forEach((item) => {
    if (!map.has(getId(item))) map.set(getId(item), item);
  });
  return [...map.values()];
};

const statusRank = {
  Ongoing: 1,
  Planning: 2,
  Completed: 3,
};

export const members = rows.map((row) => ({
  id: row.MemberID,
  name: row.MemberName,
  teamId: row.TeamID,
  teamName: row.TeamName,
  role: row.Role,
  projectName: row.ProjectName,
  responsibilities: row.Responsibilities,
}));

export const projects = byId(
  rows.map((row) => ({
    id: row.TeamID,
    name: row.ProjectName,
    teamName: row.TeamName,
    status: row.ProjectStatus,
    domain: row.ProjectDomain,
    problemStatement: row.ProblemStatement,
    solution: row.Solution,
    techStack: row.TechStack.split(',').map((tech) => tech.trim()).filter(Boolean),
  })),
  (project) => project.id
).sort((a, b) => a.id.localeCompare(b.id));

export const teams = byId(
  rows.map((row) => {
    const teamProjects = rows.filter((item) => item.TeamID === row.TeamID);
    const statuses = new Set(teamProjects.map((item) => item.ProjectStatus));

    return {
      id: row.TeamID,
      name: row.TeamName,
      domain: row.ProjectDomain,
      projectCount: new Set(teamProjects.map((item) => item.ProjectName)).size,
      memberCount: new Set(teamProjects.map((item) => item.MemberID)).size,
      status: statuses.has('Ongoing') ? 'Active' : 'Completed',
    };
  }),
  (team) => team.id
).sort((a, b) => a.id.localeCompare(b.id));

const statusCounts = projects.reduce((counts, project) => {
  counts[project.status] = (counts[project.status] ?? 0) + 1;
  return counts;
}, {});

const domainCounts = projects.reduce((counts, project) => {
  counts[project.domain] = (counts[project.domain] ?? 0) + 1;
  return counts;
}, {});

const roleCounts = members.reduce((counts, member) => {
  counts[member.role] = (counts[member.role] ?? 0) + 1;
  return counts;
}, {});

const topDomain = Object.entries(domainCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
const topRole = Object.entries(roleCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
const completedCount = statusCounts.Completed ?? 0;
const completionRate = projects.length ? Math.round((completedCount / projects.length) * 100) : 0;

export const activities = projects
  .slice()
  .sort((a, b) => (statusRank[a.status] ?? 99) - (statusRank[b.status] ?? 99) || a.id.localeCompare(b.id))
  .slice(0, 4)
  .map((project, index) => ({
    id: project.id,
    title: `${project.name} is ${project.status.toLowerCase()}`,
    time: index === 0 ? 'Latest dataset entry' : `Dataset item ${index + 1}`,
    type: `${project.teamName} - ${project.domain}`,
  }));

export const analytics = [
  { label: 'Dataset Rows', value: rows.length.toLocaleString(), detail: 'Member project records' },
  { label: 'Projects', value: projects.length.toLocaleString(), detail: `${completedCount} completed` },
  { label: 'Members', value: members.length.toLocaleString(), detail: `${new Set(members.map((member) => member.role)).size} roles represented` },
  { label: 'Top Domain', value: topDomain?.[0] ?? 'N/A', detail: `${topDomain?.[1] ?? 0} projects` },
  { label: 'Most Common Role', value: topRole?.[0] ?? 'N/A', detail: `${topRole?.[1] ?? 0} members` },
  { label: 'Completion Rate', value: `${completionRate}%`, detail: 'Projects marked completed' },
];

export const projectStatuses = ['All', ...Object.keys(statusCounts).sort()];
export const teamStatuses = ['All', ...new Set(teams.map((team) => team.status))];
export const allRoles = ['All', ...Object.keys(roleCounts).sort()];
export const allDomains = ['All', ...Object.keys(domainCounts).sort()];
export const allTechStacks = ['All', ...[...new Set(projects.flatMap((p) => p.techStack))].sort()];

export const suggestedQueries = [
  'Show Team Details',
  'Find Project Information',
  'Search Member',
  'Search by Role',
  'Search by Status',
];
