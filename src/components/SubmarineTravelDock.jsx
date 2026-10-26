export default function SubmarineTravelDock({ onOpenMap, currentIslandName }) {
  return (
    <div
      onClick={onOpenMap}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'transform 0.15s ease',
        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))'
      }}
      title="Board the Explorer Submarine to travel to other islands!"
    >
      {/* Travel Badge */}
      <div className="game-btn game-btn-cyan" style={{
        padding: '7px 18px',
        fontSize: '14.5px',
        borderRadius: '18px',
        marginBottom: '-6px',
        zIndex: 2,
        whiteSpace: 'nowrap'
      }}>
        <span style={{ fontSize: '18px' }}>🗺️</span>
        <span>ISLANDS</span>
      </div>

      {/* Animated Yellow Submarine SVG with Cel-Shaded Artwork */}
      <svg width="110" height="70" viewBox="0 0 110 70">
        {/* Periscope with dark ink */}
        <path d="M 46 22 L 46 6 L 56 6" stroke="#0f172a" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 46 22 L 46 6 L 56 6" stroke="#eab308" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="58" cy="6" r="4.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
        <circle cx="57" cy="5" r="1.5" fill="#ffffff" />

        {/* Conning tower */}
        <rect x="36" y="14" width="26" height="14" rx="5" fill="#f59e0b" stroke="#0f172a" strokeWidth="3" />
        <rect x="38" y="16" width="12" height="10" rx="3" fill="#fbbf24" />

        {/* Submarine Main Hull with Bold Comic Ink Contour */}
        <ellipse cx="50" cy="40" rx="42" ry="20" fill="#facc15" stroke="#0f172a" strokeWidth="4" />
        {/* Hard Cel-Shadow Partition */}
        <path d="M 14 43 Q 50 56 86 43 Q 50 60 14 43 Z" fill="#ca8a04" />

        {/* Specular Gloss Arc on Upper Hull */}
        <path d="M 22 28 Q 50 22 78 28" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />

        {/* Comic Portholes */}
        <circle cx="34" cy="38" r="6.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2.5" />
        <circle cx="32" cy="36" r="2" fill="#ffffff" />

        <circle cx="50" cy="38" r="6.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2.5" />
        <circle cx="48" cy="36" r="2" fill="#ffffff" />

        <circle cx="66" cy="38" r="6.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2.5" />
        <circle cx="64" cy="36" r="2" fill="#ffffff" />

        {/* Rotating Tail Propeller with Ink Outline */}
        <polygon points="90,33 102,26 100,50 90,45" fill="#94a3b8" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />

        {/* Bubble wake */}
        <circle cx="104" cy="37" r="3.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1" opacity="0.8" />
        <circle cx="108" cy="33" r="2.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1" opacity="0.6" />
      </svg>

      <div style={{
        fontFamily: "'Lilita One', sans-serif",
        fontSize: '12px',
        fontWeight: '900',
        color: '#fef08a',
        letterSpacing: '0.5px',
        textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 1px 0 #78350f'
      }}>
        {currentIslandName}
      </div>
    </div>
  );
}
