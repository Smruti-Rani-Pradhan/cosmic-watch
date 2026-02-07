
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsteroidCard from '../components/AsteroidCard';
import { Radar } from 'lucide-react';

const Dashboard = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure this matches your server port!
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center gap-4">
        <div className="p-3 bg-purple-600 rounded-lg">
          <Radar size={32} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Cosmic Watch</h1>
          <p className="text-gray-400">Real-time Near-Earth Object Tracking</p>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 animate-pulse">Scanning Deep Space...</div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {asteroids.map((ast) => (
            <AsteroidCard key={ast._id} data={ast} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;