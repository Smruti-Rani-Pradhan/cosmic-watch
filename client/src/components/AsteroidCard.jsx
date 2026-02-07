
import { Rocket, Ruler, Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const AsteroidCard = ({ data }) => {
  const getRiskVariant = (score) => {
    if (score > 75) return "destructive";
    if (score > 50) return "warning";
    return "success";
  };

  const getRiskLabel = (score) => {
    if (score > 75) return "CRITICAL";
    if (score > 50) return "WARNING";
    return "SAFE";
  };

  return (
    <Card className="group backdrop-blur-sm bg-opacity-80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold truncate pr-4">
          {data.name.replace(/[()]/g, '')}
        </CardTitle>
        <Badge variant={getRiskVariant(data.riskScore)}>
          {getRiskLabel(data.riskScore)}
        </Badge>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-4 py-4">
          {/* Main Stat: Approach Date */}
          <div className="flex items-center space-x-4 rounded-md border border-white/5 p-3 bg-white/5">
            <AlertTriangle className="h-5 w-5 text-accent-purple" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none text-gray-400">Approach Date</p>
              <p className="text-sm font-bold">{data.approachDate}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 flex items-center gap-1">
                <Ruler className="h-3 w-3" /> Diameter
              </span>
              <span className="font-mono">{Math.round(data.diameter)}m</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 flex items-center gap-1">
                <Rocket className="h-3 w-3" /> Velocity
              </span>
              <span className="font-mono">{Math.round(data.velocity / 1000)}k km/h</span>
            </div>
            
            <div className="flex flex-col gap-1 col-span-2">
              <span className="text-gray-500 flex items-center gap-1">
                <Zap className="h-3 w-3" /> Miss Distance
              </span>
              <span className="font-mono text-accent-purple">
                {(data.distance / 1000000).toFixed(2)} million km
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AsteroidCard;