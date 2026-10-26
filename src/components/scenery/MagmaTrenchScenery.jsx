export default function MagmaTrenchScenery({ tempoSpeed = 1.0, isNight }) {
  const steamSpeed = `${2.4 / tempoSpeed}s`;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 5
    }}>
      {/* 1. Volcanic Hydrothermal Vents Left & Right */}
      {/* Left Vent Chimney */}
      <div style={{
        position: 'absolute',
        bottom: '38px',
        left: '2%',
        width: '120px',
        height: '240px',
        opacity: isNight ? 0.9 : 0.8
      }}>
        <svg width="120" height="240" viewBox="0 0 120 240">
          {/* Base rock */}
          <path d="M 10 240 L 30 80 Q 60 70 90 80 L 110 240 Z" fill="#1c0707" stroke="#3d0f0f" strokeWidth="3" />
          {/* Glowing lava fissures */}
          <path d="M 35 180 Q 55 160 45 130 Q 65 110 60 85" stroke="#f97316" strokeWidth="3" fill="none" filter="drop-shadow(0 0 6px #ea580c)" />
          <path d="M 85 210 Q 70 170 80 140 Q 68 115 75 90" stroke="#ef4444" strokeWidth="2.5" fill="none" filter="drop-shadow(0 0 6px #dc2626)" />
          {/* Vent opening */}
          <ellipse cx="60" cy="80" rx="30" ry="8" fill="#450a0a" stroke="#7f1d1d" strokeWidth="2" />
          <ellipse cx="60" cy="80" rx="20" ry="5" fill="#f97316" filter="drop-shadow(0 0 10px #f97316)" />
        </svg>

        {/* Rising steam plume */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '42px',
          width: '36px',
          height: '80px',
          background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.4) 0%, rgba(239, 68, 68, 0.15) 50%, transparent 80%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
          animation: `trenchSteamPlume ${steamSpeed} ease-in-out infinite alternate`
        }} />
      </div>

      {/* Right Vent Chimney */}
      <div style={{
        position: 'absolute',
        bottom: '38px',
        right: '3%',
        width: '110px',
        height: '220px',
        opacity: isNight ? 0.9 : 0.8
      }}>
        <svg width="110" height="220" viewBox="0 0 110 220">
          <path d="M 15 220 L 35 70 Q 55 60 75 70 L 95 220 Z" fill="#1c0707" stroke="#3d0f0f" strokeWidth="3" />
          <path d="M 40 160 Q 60 140 50 110 Q 62 85 58 75" stroke="#f97316" strokeWidth="2.5" fill="none" filter="drop-shadow(0 0 6px #ea580c)" />
          <ellipse cx="55" cy="70" rx="22" ry="7" fill="#450a0a" stroke="#7f1d1d" strokeWidth="2" />
          <ellipse cx="55" cy="70" rx="14" ry="4" fill="#fb923c" filter="drop-shadow(0 0 8px #f97316)" />
        </svg>

        <div style={{
          position: 'absolute',
          top: '15px',
          left: '38px',
          width: '34px',
          height: '75px',
          background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.35) 0%, rgba(239, 68, 68, 0.12) 50%, transparent 80%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
          animation: `trenchSteamPlume ${steamSpeed} ease-in-out infinite alternate`,
          animationDelay: '0.6s'
        }} />
      </div>

      {/* 2. Floating Magma Embers & Hydrothermal Bubbles */}
      <div className="ambient-bubble" style={{ left: '15%', width: '10px', height: '10px', background: 'radial-gradient(circle, #fb923c, #ef4444)', animationDuration: '7s', animationDelay: '0.2s', filter: 'drop-shadow(0 0 6px #f97316)' }} />
      <div className="ambient-bubble" style={{ left: '32%', width: '14px', height: '14px', background: 'radial-gradient(circle, #fde047, #f97316)', animationDuration: '9s', animationDelay: '2.5s', filter: 'drop-shadow(0 0 8px #f97316)' }} />
      <div className="ambient-bubble" style={{ left: '68%', width: '12px', height: '12px', background: 'radial-gradient(circle, #fb923c, #dc2626)', animationDuration: '6s', animationDelay: '1.2s', filter: 'drop-shadow(0 0 6px #ea580c)' }} />
      <div className="ambient-bubble" style={{ left: '85%', width: '16px', height: '16px', background: 'radial-gradient(circle, #fde047, #ea580c)', animationDuration: '8s', animationDelay: '4.0s', filter: 'drop-shadow(0 0 8px #f97316)' }} />
    </div>
  );
}
