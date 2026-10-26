export default function SeafloorDecorations({ ownedDecorations = [], isNight }) {
  if (!ownedDecorations || ownedDecorations.length === 0) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: '36px',
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      padding: '0 8vw',
      pointerEvents: 'none',
      zIndex: 15
    }}>
      {/* 1. Disco Coral Lamp */}
      {ownedDecorations.includes('disco_coral') && (
        <div style={{ filter: isNight ? 'drop-shadow(0 0 12px #ec4899)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
          <svg width="60" height="75" viewBox="0 0 60 75">
            {/* Rock base */}
            <path d="M 10 70 Q 30 55 50 70 Z" fill="#334155" stroke="#1e293b" strokeWidth="2" />
            {/* Glowing Coral branches */}
            <path d="M 30 60 Q 22 40 14 30 Q 8 20 18 18 Q 24 28 28 42" stroke={isNight ? '#ec4899' : '#f43f5e'} strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 30 60 Q 34 35 44 24 Q 52 14 42 12 Q 36 22 32 40" stroke={isNight ? '#38bdf8' : '#0284c7'} strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="18" cy="18" r="5" fill="#fde047" />
            <circle cx="42" cy="12" r="5" fill="#f472b6" />
          </svg>
        </div>
      )}

      {/* 2. Sunken Toy Submarine */}
      {ownedDecorations.includes('sunken_sub') && (
        <div style={{ filter: isNight ? 'drop-shadow(0 0 10px #facc15)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
          <svg width="75" height="50" viewBox="0 0 75 50">
            {/* Sub body */}
            <ellipse cx="38" cy="30" rx="30" ry="16" fill="#facc15" stroke="#b45309" strokeWidth="2.5" />
            {/* Conning tower */}
            <rect x="30" y="8" width="14" height="14" rx="4" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <rect x="34" y="2" width="4" height="8" rx="2" fill="#ef4444" />
            {/* Porthole */}
            <circle cx="28" cy="28" r="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <circle cx="48" cy="28" r="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            {/* Propeller */}
            <polygon points="68,26 74,20 74,38" fill="#1e293b" />
          </svg>
        </div>
      )}

      {/* 3. Bioluminescent Anemone */}
      {ownedDecorations.includes('neon_anemone') && (
        <div style={{ filter: isNight ? 'drop-shadow(0 0 14px #22c55e)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
          <svg width="65" height="60" viewBox="0 0 65 60">
            <ellipse cx="32" cy="50" rx="24" ry="8" fill="#1e293b" />
            <path d="M 18 50 Q 12 30 10 18" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 25 50 Q 22 25 24 12" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 32 50 Q 32 22 34 10" stroke="#86efac" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 40 50 Q 44 26 46 14" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 48 50 Q 54 32 56 20" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="10" cy="18" r="3" fill="#fef08a" />
            <circle cx="24" cy="12" r="3" fill="#fef08a" />
            <circle cx="34" cy="10" r="3.5" fill="#fef08a" />
            <circle cx="46" cy="14" r="3" fill="#fef08a" />
            <circle cx="56" cy="20" r="3" fill="#fef08a" />
          </svg>
        </div>
      )}

      {/* 4. Sea Crystal Obelisk */}
      {ownedDecorations.includes('crystal_obelisk') && (
        <div style={{ filter: isNight ? 'drop-shadow(0 0 16px #a855f7)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
          <svg width="55" height="85" viewBox="0 0 55 85">
            {/* Pedestal */}
            <path d="M 8 80 L 47 80 L 40 68 L 15 68 Z" fill="#334155" stroke="#1e293b" strokeWidth="2" />
            {/* Crystal spire */}
            <polygon points="27,6 12,68 42,68" fill="#a855f7" stroke="#7e22ce" strokeWidth="2" />
            <polygon points="27,6 27,68 42,68" fill="#c084fc" opacity="0.6" />
            <polygon points="27,6 18,36 27,68" fill="#e9d5ff" opacity="0.5" />
          </svg>
        </div>
      )}
    </div>
  );
}
