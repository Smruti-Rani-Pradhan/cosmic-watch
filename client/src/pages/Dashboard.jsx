import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import AsteroidCard from '../components/AsteroidCard';
import StatCard from '../components/StatCard';
import FeaturedAsteroidCard from '../components/FeaturedAsteroidCard';
import DashboardControls from '../components/DashboardControls';
import { Activity, AlertTriangle, ShieldCheck, Telescope, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [sortBy, setSortBy] = useState('risk-desc');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/asteroids');
        setAsteroids(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const filteredAndSortedAsteroids = useMemo(() => {
    let filtered = [...asteroids];
    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterRisk !== 'all') {
      if (filterRisk === 'critical') {
        filtered = filtered.filter(a => a.riskScore > 75);
      } else if (filterRisk === 'warning') {
        filtered = filtered.filter(a => a.riskScore > 50 && a.riskScore <= 75);
      } else if (filterRisk === 'safe') {
        filtered = filtered.filter(a => a.riskScore <= 50);
      } else if (filterRisk === 'hazardous') {
        filtered = filtered.filter(a => a.isHazardous);
      }
    }


    if (sortBy === 'risk-desc') {
      filtered.sort((a, b) => (b.riskScore ?? 0) - (a.riskScore ?? 0));
    } else if (sortBy === 'risk-asc') {
      filtered.sort((a, b) => (a.riskScore ?? 0) - (b.riskScore ?? 0));
    } else if (sortBy === 'date-asc') {
      filtered.sort((a, b) => new Date(a.approachDate) - new Date(b.approachDate));
    } else if (sortBy === 'date-desc') {
      filtered.sort((a, b) => new Date(b.approachDate) - new Date(a.approachDate));
    } else if (sortBy === 'distance-asc') {
      filtered.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'size-desc') {
      filtered.sort((a, b) => b.diameter - a.diameter);
    }

    return filtered;
  }, [asteroids, searchQuery, filterRisk, sortBy]);

  const stats = useMemo(() => {
    const total = asteroids.length;
    const hazardous = asteroids.filter(a => a.isHazardous || a.riskScore > 75).length;
    const safe = total - hazardous;
    
    const closest = asteroids.reduce((prev, curr) => 
      (!prev.distance || curr.distance < prev.distance) ? curr : prev, asteroids[0] || {}
    );
    const highestRisk = asteroids.reduce((prev, curr) =>
      ((curr.riskScore ?? 0) > (prev.riskScore ?? 0)) ? curr : prev, asteroids[0] || null
    );

    return { total, hazardous, safe, closest, highestRisk };
  }, [asteroids]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
       
        <div className="flex items-center justify-between">
          <div className="h-10 w-56 rounded-lg bg-white/5 animate-pulse" />
          <div className="h-9 w-40 rounded-lg bg-white/5 animate-pulse" />
        </div>

        
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-white/10 glass-card p-6 animate-pulse">
              <div className="flex justify-between mb-4">
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-20 rounded bg-white/10" />
                  <div className="h-10 w-16 rounded bg-white/10" />
                  <div className="h-3 w-24 rounded bg-white/5" />
                </div>
                <div className="h-14 w-14 rounded-xl bg-white/10" />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">
          <div className="flex justify-between mb-6">
            <div className="h-7 w-40 rounded bg-white/5 animate-pulse" />
            <div className="h-7 w-20 rounded bg-white/5 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="rounded-2xl border border-white/10 glass-card p-5 animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="h-5 w-32 rounded bg-white/10" />
                  <div className="h-6 w-16 rounded-full bg-white/10" />
                </div>
                <div className="h-2 rounded-full bg-white/5 mb-4" />
                <div className="h-16 rounded-xl bg-white/5 mb-3" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-14 rounded-xl bg-white/5" />
                  <div className="h-14 rounded-xl bg-white/5" />
                  <div className="h-14 rounded-xl bg-white/5 col-span-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <Sparkles className="h-12 w-12 animate-pulse text-accent-purple mb-3" />
          <p className="text-sm font-medium">Initializing Deep Space Network...</p>
          <p className="text-xs mt-1">Fetching asteroid data from NASA</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-accent-purple" />
            Live Monitor
          </h2>
          <p className="text-sm text-gray-500 mt-1">Real-time NEO tracking powered by NASA</p>
        </div>
        <span className="text-xs sm:text-sm text-gray-500 font-mono tabular-nums bg-white/[0.04] border border-white/10 px-2.5 sm:px-3 py-1.5 rounded-lg truncate max-w-[180px] sm:max-w-none">
          Last updated {new Date().toLocaleTimeString()}
        </span>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Objects"
          value={stats.total}
          subtitle="Tracked in last 24h"
          icon={Telescope}
          variant="blue"
        />
        <StatCard
          title="Threat Level"
          value={stats.hazardous}
          subtitle="Potentially hazardous"
          icon={AlertTriangle}
          variant={stats.hazardous > 0 ? 'red' : 'neutral'}
          pulse={stats.hazardous > 0}
        />
        <StatCard
          title="Safe Objects"
          value={stats.safe}
          subtitle="Low risk trajectory"
          icon={ShieldCheck}
          variant="green"
        />
        <StatCard
          title="Closest Pass"
          value={`${(stats.closest?.distance / 1000000).toFixed(1)}M`}
          subtitle={stats.closest?.name?.replace(/[()]/g, '') || 'N/A'}
          icon={Activity}
          variant="amber"
        />
      </div>

      {stats.highestRisk && stats.highestRisk.riskScore > 75 && (
        <FeaturedAsteroidCard data={stats.highestRisk} />
      )}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-white">Near-Earth Objects</h3>
            <span className="text-xs text-gray-500 font-mono">
              {filteredAndSortedAsteroids.length} of {asteroids.length}
            </span>
          </div>
          <DashboardControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterRisk={filterRisk}
            onFilterChange={setFilterRisk}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {filteredAndSortedAsteroids.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm font-medium">No asteroids match your filters</p>
            <p className="text-xs mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredAndSortedAsteroids.map((ast) => (
              <AsteroidCard key={ast._id || ast.nasaId} data={ast} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;