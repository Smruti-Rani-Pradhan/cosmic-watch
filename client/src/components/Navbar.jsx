import { Link, useLocation } from 'react-router-dom';
import { Rocket, User, Bell, LayoutDashboard, Home, Telescope } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Watchlist', path: '/watchlist', icon: <Telescope size={18} /> },
    { name: 'Alerts', path: '/alerts', icon: <Bell size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-space-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-accent-purple/20 rounded-lg border border-accent-purple/30 group-hover:bg-accent-purple/40 transition-colors">
              <Rocket className="text-accent-purple h-5 w-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Cosmic<span className="text-accent-purple">Watch</span>
            </span>
          </Link>

          {/* MIDDLE: Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-accent-purple text-white shadow-lg shadow-purple-900/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* RIGHT: Profile */}
          <div className="flex items-center gap-4">
            {/* Notification Badge (Optional decoration for now) */}
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-black"></span>
            </button>

            {/* Profile Dropdown Trigger */}
            <button className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-space-900">
                SB
              </div>
              <span className="text-sm font-medium text-gray-300 hidden sm:block">
                Profile
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;