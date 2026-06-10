import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import Analytics from '../pages/Analytics.jsx';
import AskAI from '../pages/AskAI.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Members from '../pages/Members.jsx';
import Projects from '../pages/Projects.jsx';
import Settings from '../pages/Settings.jsx';
import Teams from '../pages/Teams.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ask-ai" element={<AskAI />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/members" element={<Members />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
