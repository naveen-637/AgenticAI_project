import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import Analytics from '../pages/Analytics.jsx';
import AskAI from '../pages/AskAI.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Members from '../pages/Members.jsx';
import MemberDetails from '../pages/MemberDetails.jsx';
import Projects from '../pages/Projects.jsx';
import ProjectDetails from '../pages/ProjectDetails.jsx';
import Teams from '../pages/Teams.jsx';
import TeamDetails from '../pages/TeamDetails.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ask-ai" element={<AskAI />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamId" element={<TeamDetails />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/:memberId" element={<MemberDetails />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
