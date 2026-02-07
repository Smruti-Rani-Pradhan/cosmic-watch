
const UniverseEarthAsteroid = () => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      aria-hidden
    >
      <svg
        className="w-full h-full max-w-[1400px] max-h-[900px] opacity-40"
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="earth-fill" cx="40%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#0ea5e9" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#1e40af" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="earth-glow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.25" />
          </radialGradient>
          <radialGradient id="asteroid-fill" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>
          <filter id="orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse
          cx="250"
          cy="200"
          rx="180"
          ry="100"
          stroke="rgba(139, 92, 246, 0.25)"
          strokeWidth="0.8"
          strokeDasharray="6 4"
          fill="none"
          className="hero-orbit-ellipse"
        />
        <ellipse
          cx="250"
          cy="200"
          rx="220"
          ry="120"
          stroke="rgba(34, 211, 238, 0.15)"
          strokeWidth="0.6"
          strokeDasharray="4 6"
          fill="none"
          className="hero-orbit-ellipse hero-orbit-ellipse-slow"
        />

        <g className="hero-earth-group">
          <circle
            cx="250"
            cy="200"
            r="52"
            fill="url(#earth-glow)"
          />
          <circle
            cx="250"
            cy="200"
            r="42"
            fill="url(#earth-fill)"
          />
          <ellipse cx="245" cy="195" rx="25" ry="18" fill="rgba(34, 197, 94, 0.3)" />
          <ellipse cx="260" cy="208" rx="15" ry="12" fill="rgba(255, 255, 255, 0.15)" />
        </g>

        <g className="hero-asteroid-group">
          <circle
            cx="430"
            cy="200"
            r="8"
            fill="url(#asteroid-fill)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />
          <circle cx="430" cy="200" r="4" fill="rgba(148, 163, 184, 0.6)" />
        </g>

        <g className="hero-asteroid-group hero-asteroid-2">
          <ellipse
            cx="250"
            cy="75"
            rx="6"
            ry="5"
            fill="url(#asteroid-fill)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.4"
          />
        </g>

        <g className="hero-asteroid-group hero-asteroid-3">
          <circle
            cx="355"
            cy="265"
            r="4"
            fill="rgba(148, 163, 184, 0.8)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.3"
          />
        </g>

        <circle cx="80" cy="60" r="0.8" fill="white" fillOpacity="0.6" />
        <circle cx="420" cy="80" r="0.6" fill="white" fillOpacity="0.5" />
        <circle cx="120" cy="320" r="0.7" fill="white" fillOpacity="0.4" />
        <circle cx="380" cy="340" r="0.5" fill="white" fillOpacity="0.5" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center hero-orbit-rotate">
        <svg
          className="w-full h-full max-w-[1400px] max-h-[900px] opacity-30 absolute"
          viewBox="0 0 500 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="250"
            cy="200"
            rx="160"
            ry="88"
            stroke="rgba(139, 92, 246, 0.2)"
            strokeWidth="0.5"
            strokeDasharray="3 5"
            fill="none"
          />
          <circle
            cx="410"
            cy="200"
            r="5"
            fill="rgba(148, 163, 184, 0.9)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.3"
          />
        </svg>
      </div>
    </div>
  );
};

export default UniverseEarthAsteroid;
