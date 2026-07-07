import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Maintenance from './components/Maintenance';

// Flip this to false when the site is ready to go live again.
const MAINTENANCE_MODE = false;

// Decide whether to show the "Under Repair" screen.
// - Local dev (npm run dev) never shows it, so you can keep working.
//   Add ?maintenance to the URL to preview the screen locally.
// - On the live site, ?preview bypasses the gate and remembers you
//   (so you can browse normally); ?live re-enables it.
function showMaintenance() {
  if (!MAINTENANCE_MODE) return false;

  const params = new URLSearchParams(window.location.search);

  if (params.has('live')) localStorage.removeItem('skipMaintenance');
  if (params.has('preview')) localStorage.setItem('skipMaintenance', '1');
  if (localStorage.getItem('skipMaintenance') === '1') return false;

  if (params.has('maintenance')) return true;
  if (import.meta.env.DEV) return false;

  return true;
}

function App() {
  if (showMaintenance()) {
    return <Maintenance />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
