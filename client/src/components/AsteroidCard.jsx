// client/src/components/AsteroidCard.jsx
import { Rocket, Ruler, Zap } from 'lucide-react';
import RiskBadge from './RiskBadge';

const AsteroidCard = ({ data }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{data.name}</h3>
          <p className="text-gray-400 text-sm">Approaching: {data.approachDate}</p>
        </div>
        <RiskBadge score={data.riskScore} />
      </div>

      <div className="space-y-2 text-gray-300 text-sm">
        <div className="flex items-center gap-2">
          <Ruler size={16} className="text-blue-400" />
          <span>Diameter: <strong>{data.diameter?.toFixed(2)} m</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Rocket size={16} className="text-orange-400" />
          <span>Velocity: <strong>{parseFloat(data.velocity).toLocaleString()} km/h</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-yellow-400" />
          <span>Distance: <strong>{parseFloat(data.distance).toLocaleString()} km</strong></span>
        </div>
      </div>
    </div>
  );
};

export default AsteroidCard;