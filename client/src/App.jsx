import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

// Placeholder pages for links that don't exist yet
const Home = () => <div className="pt-20 text-center text-gray-500">Home Landing Page (Coming Soon)</div>;
const Watchlist = () => <div className="pt-20 text-center text-gray-500">Your Watchlist (Phase 4)</div>;
const Alerts = () => <div className="pt-20 text-center text-gray-500">System Alerts (Phase 4)</div>;

function App() {
  return (
    <div className="min-h-screen bg-space-950 text-white font-sans selection:bg-accent-purple/30">
      {/* 1. Navbar is fixed at the top */}
      <Navbar />

      {/* 2. Main Content Area (padded top to avoid navbar overlap) */}
      <main className="pt-16"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;