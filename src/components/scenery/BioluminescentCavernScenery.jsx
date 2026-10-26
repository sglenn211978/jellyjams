export default function BioluminescentCavernScenery({ tempoSpeed = 1.0, isNight }) {
  const glowSpeed = `${3.2 / tempoSpeed}s`;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 5
    }}>
      {/* 1. Hanging Glowing Stalactites & Crystal Shards from Ceiling */}
      {/* Top Left Stalactite cluster */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '4%',
        width: '130px',
        height: '140px',
        opacity: isNight ? 0.95 : 0.85
      }}>
        <svg width="130" height="140" viewBox="0 0 130 140">
          {/* Stone base */}
          <path d="M 0 0 L 130 0 L 110 30 Q 80 40 50 30 Z" fill="#042f2e" stroke="#134e4a" strokeWidth="2" />
          {/* Main glowing crystal shard */}
          <polygon points="35,0 55,0 45,110" fill="#2dd4bf" stroke="#99f6e4" strokeWidth="2" filter="drop-shadow(0 0 10px #14b8a6)" />
          <polygon points="65,0 80,0 72,75" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1.5" filter="drop-shadow(0 0 8px #0284c7)" />
          <polygon points="15,0 30,0 22,60" fill="#a78bfa" stroke="#e9d5ff" strokeWidth="1.5" filter="drop-shadow(0 0 8px #8b5cf6)" />
        </svg>
      </div>

      {/* Top Right Stalactite cluster */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: '5%',
        width: '140px',
        height: '150px',
        opacity: isNight ? 0.95 : 0.85
      }}>
        <svg width="140" height="150" viewBox="0 0 140 150">
          <path d="M 0 0 L 140 0 L 120 35 Q 90 45 30 30 Z" fill="#042f2e" stroke="#134e4a" strokeWidth="2" />
          <polygon points="85,0 110,0 98,125" fill="#34d399" stroke="#a7f3d0" strokeWidth="2" filter="drop-shadow(0 0 12px #10b981)" />
          <polygon points="50,0 70,0 60,85" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1.5" filter="drop-shadow(0 0 8px #38bdf8)" />
          <polygon points="20,0 40,0 30,55" fill="#c084fc" stroke="#f3e8ff" strokeWidth="1.5" filter="drop-shadow(0 0 8px #a855f7)" />
        </svg>
      </div>

      {/* 2. Floating Bioluminescent Crystal Spores */}
      <div className="ambient-bubble" style={{ left: '18%', width: '12px', height: '12px', background: 'radial-gradient(circle, #a7f3d0, #10b981)', animationDuration: '10s', animationDelay: '0.5s', filter: 'drop-shadow(0 0 8px #2dd4bf)' }} />
      <div className="ambient-bubble" style={{ left: '38%', width: '16px', height: '16px', background: 'radial-gradient(circle, #bae6fd, #0284c7)', animationDuration: '13s', animationDelay: '3s', filter: 'drop-shadow(0 0 10px #38bdf8)' }} />
      <div className="ambient-bubble" style={{ left: '64%', width: '14px', height: '14px', background: 'radial-gradient(circle, #f5d0fe, #c084fc)', animationDuration: '11s', animationDelay: '1.8s', filter: 'drop-shadow(0 0 8px #a855f7)' }} />
      <div className="ambient-bubble" style={{ left: '82%', width: '10px', height: '10px', background: 'radial-gradient(circle, #99f6e4, #0d9488)', animationDuration: '12s', animationDelay: '4.5s', filter: 'drop-shadow(0 0 6px #14b8a6)' }} />

      {/* Ambient cave light prism beam */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '28%',
        width: '180px',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(45, 212, 191, 0.12) 0%, rgba(56, 189, 248, 0.05) 60%, transparent 100%)',
        transform: 'rotate(12deg)',
        filter: 'blur(16px)',
        animation: `sunbeamDrift ${glowSpeed} ease-in-out infinite alternate`
      }} />
    </div>
  );
}
