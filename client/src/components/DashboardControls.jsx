import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function DashboardControls({ 
  searchQuery, 
  onSearchChange, 
  filterRisk, 
  onFilterChange, 
  sortBy, 
  onSortChange 
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search asteroids..."
          className="
            w-full pl-10 pr-4 py-2.5 rounded-xl
            bg-white/[0.06] border border-white/10
            text-white placeholder-gray-500 text-sm
            focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:border-accent-purple/30
            transition-all duration-200
          "
        />
      </div>

      <div className="relative">
        <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
        <select
          value={filterRisk}
          onChange={(e) => onFilterChange(e.target.value)}
          className="
            pl-10 pr-8 py-2.5 rounded-xl appearance-none cursor-pointer
            bg-white/[0.06] border border-white/10
            text-white text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:border-accent-purple/30
            transition-all duration-200
            min-w-[140px]
          "
        >
          <option value="all" className="bg-space-900">All Objects</option>
          <option value="critical" className="bg-space-900">Critical Only</option>
          <option value="warning" className="bg-space-900">Warning</option>
          <option value="safe" className="bg-space-900">Safe Only</option>
          <option value="hazardous" className="bg-space-900">Hazardous</option>
        </select>
      </div>

      <div className="relative">
        <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="
            pl-10 pr-8 py-2.5 rounded-xl appearance-none cursor-pointer
            bg-white/[0.06] border border-white/10
            text-white text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:border-accent-purple/30
            transition-all duration-200
            min-w-[160px]
          "
        >
          <option value="risk-desc" className="bg-space-900">Risk: High to Low</option>
          <option value="risk-asc" className="bg-space-900">Risk: Low to High</option>
          <option value="date-asc" className="bg-space-900">Date: Soonest</option>
          <option value="date-desc" className="bg-space-900">Date: Latest</option>
          <option value="distance-asc" className="bg-space-900">Distance: Closest</option>
          <option value="size-desc" className="bg-space-900">Size: Largest</option>
        </select>
      </div>
    </div>
  );
}
