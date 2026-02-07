const RiskBadge = ({ score }) => {
  let colorClass = "bg-green-500/20 text-green-400 border-green-500/50";
  let label = "SAFE";

  if (score > 75) {
    colorClass = "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse";
    label = "CRITICAL";
  } else if (score > 50) {
    colorClass = "bg-orange-500/20 text-orange-400 border-orange-500/50";
    label = "WARNING";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colorClass}`}>
      {label} ({score})
    </span>
  );
};

export default RiskBadge;