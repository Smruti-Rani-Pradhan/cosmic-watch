import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import AsteroidCard from '../components/AsteroidCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Activity, AlertTriangle, ShieldCheck, Telescope } from 'lucide-react';

const Dashboard = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data
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

  // 2. Calculate Stats (Memoized for performance)
  const stats = useMemo(() => {
    const total = asteroids.length;
    const hazardous = asteroids.filter(a => a.isHazardous || a.riskScore > 75).length;
    const safe = total - hazardous;
    
    // Find closest asteroid
    const closest = asteroids.reduce((prev, curr) => 
      (prev.distance < curr.distance ? prev : curr), asteroids[0] || {}
    );

    return { total, hazardous, safe, closest };
  }, [asteroids]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-space-400">
        <Activity className="h-12 w-12 animate-pulse mb-4 text-accent-purple" />
        <p className="text-lg font-mono">Initializing Deep Space Network...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* 3. Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Live Monitor</h2>
        <span className="text-sm text-gray-400 font-mono">
          Last Updated: {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* 4. The "Command Center" Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1: Total Objects */}
        <Card className="bg-space-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Objects</CardTitle>
            <Telescope className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <p className="text-xs text-gray-500">Tracked in last 24h</p>
          </CardContent>
        </Card>

        {/* Card 2: Hazardous */}
        <Card className="bg-space-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Threat Level</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${stats.hazardous > 0 ? 'text-red-500 animate-pulse' : 'text-gray-500'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.hazardous > 0 ? 'text-red-400' : 'text-white'}`}>
              {stats.hazardous} Detected
            </div>
            <p className="text-xs text-gray-500">Potentially Hazardous</p>
          </CardContent>
        </Card>

        {/* Card 3: Safe Objects */}
        <Card className="bg-space-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Safe Objects</CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{stats.safe}</div>
            <p className="text-xs text-gray-500">Low risk trajectory</p>
          </CardContent>
        </Card>

        {/* Card 4: Closest Approach */}
        <Card className="bg-space-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Closest Pass</CardTitle>
            <Activity className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {(stats.closest?.distance / 1000000).toFixed(1)}M <span className="text-sm font-normal text-gray-500">km</span>
            </div>
            <p className="text-xs text-gray-500">
              {stats.closest?.name?.replace(/[()]/g, '') || 'N/A'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 5. Main Asteroid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
        {asteroids.map((ast) => (
          <AsteroidCard key={ast._id || ast.nasaId} data={ast} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;