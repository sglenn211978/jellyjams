export default function GameTitleScreen({ onStart, isLoading }) {
  return (
    <div style={{
      position: 'relative',
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      maxWidth: '680px',
      width: '92vw',
      animation: 'fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }}>
      {/* Cartoon Floating Title Card */}
      <div className="title-logo-animated" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        {/* Playful Floating Music Notes & Stars */}
        <div style={{
          display: 'flex',
          gap: '20px',
          fontSize: '32px',
          marginBottom: '-8px',
          filter: 'drop-shadow(0 4px 10px rgba(250, 204, 21, 0.7))'
        }}>
          <span>✨</span>
          <span>🎵</span>
          <span>⭐</span>
          <span>🎶</span>
          <span>✨</span>
        </div>

        {/* 3D Bubble Cartoon Logo */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{
            fontFamily: "'Lilita One', 'Fredoka', cursive, sans-serif",
            fontSize: 'clamp(52px, 9vw, 84px)',
            lineHeight: '1.05',
            letterSpacing: '3px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, #fef08a 0%, #facc15 45%, #f59e0b 80%, #d97706 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 6px 0 #78350f) drop-shadow(0 12px 24px rgba(0,0,0,0.7))',
            margin: 0,
            padding: '0 10px'
          }}>
            JELLY JAMS
          </h1>
        </div>

        {/* Subtitle Game Banner */}
        <div style={{
          marginTop: '6px',
          background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
          color: '#ffffff',
          padding: '6px 20px',
          borderRadius: '9999px',
          border: '2.5px solid #ffffff',
          fontFamily: "'Lilita One', sans-serif",
          fontSize: 'clamp(12px, 2.5vw, 15px)',
          letterSpacing: '1px',
          boxShadow: '0 4px 0 #0369a1, 0 8px 18px rgba(0,0,0,0.4)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap'
        }}>
          🪼 The Musical Monster Reef 🪼
        </div>
      </div>

      {/* Mascot Preview Podiums */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 'clamp(12px, 3vw, 28px)',
        marginBottom: '26px'
      }}>
        {/* Mascot 1: Floaty Diva */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="dancing-diva" style={{ filter: 'drop-shadow(0 6px 14px rgba(244, 114, 182, 0.6))' }}>
            <svg width="70" height="90" viewBox="0 0 160 200">
              <defs>
                <linearGradient id="titleDiva" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <text x="16" y="42" fill="#facc15" fontSize="22" fontWeight="900">♪<animate attributeName="y" values="42;28;42" dur="0.8s" repeatCount="indefinite" /></text>
              <ellipse cx="80" cy="90" rx="58" ry="46" fill="url(#titleDiva)" stroke="#0f172a" strokeWidth="4" />
              <circle cx="62" cy="82" r="9" fill="#831843" />
              <circle cx="65" cy="80" r="4" fill="#ffffff" />
              <circle cx="98" cy="82" r="9" fill="#831843" />
              <circle cx="101" cy="80" r="4" fill="#ffffff" />
              <path d="M 65 96 Q 80 130 95 96 Z" fill="#881337" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
                <animate attributeName="d" values="M 65 96 Q 80 130 95 96 Z; M 69 98 Q 80 104 91 98 Z; M 65 96 Q 80 130 95 96 Z" dur="0.46s" repeatCount="indefinite" />
              </path>
              <ellipse cx="80" cy="108" rx="7" ry="4" fill="#fb7185">
                <animate attributeName="ry" values="4;1;4" dur="0.46s" repeatCount="indefinite" />
              </ellipse>
              <path d="M 45 130 Q 35 165 48 190" stroke="#f472b6" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 68 134 Q 65 170 70 195" stroke="#ec4899" strokeWidth="7" strokeLinecap="round" fill="none" />
              <path d="M 92 134 Q 95 170 90 195" stroke="#ec4899" strokeWidth="7" strokeLinecap="round" fill="none" />
              <path d="M 115 130 Q 125 165 112 190" stroke="#f472b6" strokeWidth="6" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <div style={{
            width: '65px',
            height: '18px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, #ec4899 0%, #831843 100%)',
            border: '2px solid #ffffff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
            marginTop: '-6px'
          }} />
        </div>

        {/* Mascot 2: Boombox Bob */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="dancing-bob" style={{ filter: 'drop-shadow(0 6px 14px rgba(251, 146, 60, 0.6))' }}>
            <svg width="90" height="105" viewBox="0 0 160 200">
              <ellipse cx="80" cy="100" rx="52" ry="46" fill="#fb923c" stroke="#0f172a" strokeWidth="4" />
              <rect x="42" y="75" width="76" height="20" rx="6" fill="#1e293b" stroke="#ffffff" strokeWidth="2.5" />
              <path d="M 62 104 Q 80 140 98 104 Z" fill="#7c2d12" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
                <animate attributeName="d" values="M 62 104 Q 80 140 98 104 Z; M 66 106 Q 80 112 94 106 Z; M 62 104 Q 80 140 98 104 Z" dur="0.42s" repeatCount="indefinite" />
              </path>
              <ellipse cx="80" cy="117" rx="8" ry="5" fill="#fb7185">
                <animate attributeName="ry" values="5;1;5" dur="0.42s" repeatCount="indefinite" />
              </ellipse>
              <rect x="30" y="38" width="100" height="24" rx="6" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
              <circle cx="48" cy="50" r="8" fill="#38bdf8" />
              <circle cx="112" cy="50" r="8" fill="#38bdf8" />
            </svg>
          </div>
          <div style={{
            width: '80px',
            height: '22px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, #f59e0b 0%, #78350f 100%)',
            border: '2px solid #ffffff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
            marginTop: '-6px'
          }} />
        </div>

        {/* Mascot 3: Zap Jelly */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="dancing-zap" style={{ filter: 'drop-shadow(0 6px 14px rgba(250, 204, 21, 0.6))' }}>
            <svg width="70" height="90" viewBox="0 0 160 200">
              <text x="122" y="42" fill="#38bdf8" fontSize="22" fontWeight="900">♫<animate attributeName="y" values="42;28;42" dur="0.75s" repeatCount="indefinite" /></text>
              <ellipse cx="80" cy="90" rx="55" ry="45" fill="#facc15" stroke="#0f172a" strokeWidth="4" />
              <circle cx="62" cy="82" r="8" fill="#713f12" />
              <circle cx="65" cy="80" r="3.5" fill="#ffffff" />
              <circle cx="98" cy="82" r="8" fill="#713f12" />
              <circle cx="101" cy="80" r="3.5" fill="#ffffff" />
              <path d="M 65 96 Q 80 128 95 96 Z" fill="#881337" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
                <animate attributeName="d" values="M 65 96 Q 80 128 95 96 Z; M 69 98 Q 80 104 91 98 Z; M 65 96 Q 80 128 95 96 Z" dur="0.38s" repeatCount="indefinite" />
              </path>
              <ellipse cx="80" cy="107" rx="7" ry="4" fill="#fb7185">
                <animate attributeName="ry" values="4;1;4" dur="0.38s" repeatCount="indefinite" />
              </ellipse>
              <path d="M 50 130 L 42 160 L 52 166 L 45 195" stroke="#eab308" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M 75 134 L 70 162 L 80 168 L 74 195" stroke="#facc15" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M 105 130 L 115 160 L 105 166 L 115 195" stroke="#eab308" strokeWidth="5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <div style={{
            width: '65px',
            height: '18px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, #38bdf8 0%, #0369a1 100%)',
            border: '2px solid #ffffff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
            marginTop: '-6px'
          }} />
        </div>
      </div>

      {/* Chunky 3D Arcade PLAY Button */}
      <button
        onClick={onStart}
        disabled={isLoading}
        className="game-btn game-btn-green"
        style={{
          padding: '18px 52px',
          fontSize: 'clamp(20px, 4vw, 26px)',
          borderRadius: '26px',
          border: '4.5px solid #090d16',
          boxShadow: 'inset 0 4px 0 rgba(255, 255, 255, 0.85), inset 0 -5px 0 rgba(21, 128, 61, 0.7), 0 9px 0 #090d16, 0 16px 28px rgba(0, 0, 0, 0.55)',
          animation: !isLoading ? 'bankPulse 1.4s infinite' : 'none',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        <span style={{ fontSize: '28px' }}>{isLoading ? '⏳' : '▶'}</span>
        <span>{isLoading ? 'TUNING JELLY CHORUS...' : 'START CONCERT!'}</span>
      </button>

      {/* Feature Badges Row */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '22px'
      }}>
        <div style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          border: '3px solid #090d16',
          borderRadius: '18px',
          padding: '6px 16px',
          color: '#38bdf8',
          fontFamily: "'Lilita One', sans-serif",
          fontSize: '13.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.25), 0 4px 0 #090d16, 0 8px 16px rgba(0,0,0,0.4)',
          textShadow: '0 1.5px 0 #0369a1'
        }}>
          <span style={{ fontSize: '18px' }}>🏝️</span>
          <span>3 ISLANDS</span>
        </div>

        <div style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          border: '3px solid #090d16',
          borderRadius: '18px',
          padding: '6px 16px',
          color: '#fde047',
          fontFamily: "'Lilita One', sans-serif",
          fontSize: '13.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.25), 0 4px 0 #090d16, 0 8px 16px rgba(0,0,0,0.4)',
          textShadow: '0 1.5px 0 #854d0e'
        }}>
          <span style={{ fontSize: '18px' }}>🧬</span>
          <span>17 MONSTERS</span>
        </div>

        <div style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          border: '3px solid #090d16',
          borderRadius: '18px',
          padding: '6px 16px',
          color: '#c084fc',
          fontFamily: "'Lilita One', sans-serif",
          fontSize: '13.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.25), 0 4px 0 #090d16, 0 8px 16px rgba(0,0,0,0.4)',
          textShadow: '0 1.5px 0 #6b21a8'
        }}>
          <span style={{ fontSize: '18px' }}>🎛️</span>
          <span>LIVE DJ SYNTHS</span>
        </div>
      </div>

      {/* Sound Recommended Footer Pill */}
      <div style={{
        marginTop: '16px',
        color: '#bae6fd',
        fontSize: '13px',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        textShadow: '0 2px 4px rgba(0,0,0,0.6)'
      }}>
        <span>🎧</span>
        <span>Turn up your volume or wear headphones for spatial audio!</span>
      </div>
    </div>
  );
}
