export default function AnimatedOceanLife({ islandId = 'lagoon', isNight = false, isAnySinging = true }) {
  const isLagoon = islandId === 'lagoon';
  const isTrench = islandId === 'trench';
  const isCavern = islandId === 'cavern';

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 4,
      userSelect: 'none'
    }}>
      {/* 1. Shimmering Caustic Light Layer */}
      <div 
        className="caustic-light-layer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '65vh',
          background: isNight
            ? 'radial-gradient(ellipse at 50% 0%, rgba(56, 189, 248, 0.18) 0%, rgba(236, 72, 153, 0.1) 40%, transparent 75%)'
            : isTrench
              ? 'radial-gradient(ellipse at 50% 0%, rgba(249, 115, 22, 0.2) 0%, rgba(239, 68, 68, 0.08) 50%, transparent 75%)'
              : isCavern
                ? 'radial-gradient(ellipse at 50% 0%, rgba(45, 212, 191, 0.22) 0%, rgba(168, 85, 247, 0.12) 50%, transparent 75%)'
                : 'radial-gradient(ellipse at 50% 0%, rgba(254, 240, 138, 0.28) 0%, rgba(56, 189, 248, 0.18) 45%, transparent 75%)'
        }}
      />

      {/* 2. Distant Whimsical Background Silhouettes */}
      {isLagoon && (
        <div style={{
          position: 'absolute',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90vw',
          height: '240px',
          opacity: isNight ? 0.25 : 0.45,
          zIndex: 1
        }}>
          {/* Sunken Galleon & Distant Coral Castle Spire */}
          <svg width="100%" height="240" viewBox="0 0 1000 240" preserveAspectRatio="none">
            {/* Distant Rolling Coral Hills */}
            <path d="M 0 240 Q 150 140 320 200 T 680 160 T 1000 190 L 1000 240 Z" fill="#082f49" />
            {/* Distant Sunken Ship Mast with Crow's Nest */}
            <path d="M 180 200 L 180 80 M 165 110 L 195 110 M 172 100 L 188 100" stroke="#0c4a6e" strokeWidth="4" strokeLinecap="round" />
            <circle cx="180" cy="95" r="9" fill="none" stroke="#0c4a6e" strokeWidth="3" />
            {/* Distant Whimsical Coral Spire with Windows */}
            <path d="M 780 220 C 770 120 810 90 820 40 C 830 90 870 120 860 220 Z" fill="#075985" />
            <ellipse cx="820" cy="110" rx="6" ry="10" fill="#38bdf8" opacity="0.6" />
            <ellipse cx="820" cy="145" rx="8" ry="12" fill="#38bdf8" opacity="0.6" />
          </svg>
        </div>
      )}

      {isTrench && (
        <div style={{
          position: 'absolute',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90vw',
          height: '260px',
          opacity: 0.5,
          zIndex: 1
        }}>
          <svg width="100%" height="260" viewBox="0 0 1000 260" preserveAspectRatio="none">
            {/* Towering jagged volcanic ridges */}
            <path d="M 0 260 L 140 100 L 220 180 L 380 60 L 520 200 L 720 70 L 880 170 L 1000 110 L 1000 260 Z" fill="#180404" />
            {/* Glowing distant lava crevice */}
            <path d="M 380 75 Q 400 140 430 260" stroke="#f97316" strokeWidth="4" fill="none" opacity="0.7" filter="drop-shadow(0 0 8px #ea580c)" />
            <path d="M 720 85 Q 700 160 740 260" stroke="#ef4444" strokeWidth="3" fill="none" opacity="0.7" filter="drop-shadow(0 0 8px #dc2626)" />
          </svg>
        </div>
      )}

      {isCavern && (
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.45,
          zIndex: 1
        }}>
          <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="none">
            {/* Distant cathedral crystal stalactites & pillars */}
            <polygon points="120,0 150,0 135,240" fill="#064e3b" />
            <polygon points="460,0 500,0 480,310" fill="#042f2e" />
            <polygon points="780,0 820,0 800,260" fill="#064e3b" />
            {/* Distant subterranean waterfall ribbon */}
            <path d="M 480 310 Q 475 420 480 600" stroke="#2dd4bf" strokeWidth="6" fill="none" opacity="0.5" strokeDasharray="8 4" />
          </svg>
        </div>
      )}

      {/* 3. Swimming Tropical Cartoon Fish (Schools crossing back and forth) */}
      {/* Fish 1: Cute Orange Clownfish (Left to Right, mid-depth) */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: 0,
          animation: 'fishSwimLeftToRight 16s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
          animationDelay: '1s'
        }}
      >
        <svg width="48" height="32" viewBox="0 0 48 32">
          {/* Tail Fin with wiggle */}
          <g className="fish-tail-wag">
            <polygon points="8,16 0,8 2,16 0,24" fill="#ea580c" stroke="#9a3412" strokeWidth="1.5" />
          </g>
          {/* Fish Body */}
          <ellipse cx="26" cy="16" rx="16" ry="12" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
          {/* White Stripes */}
          <path d="M 22 5 Q 26 16 22 27" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 31 7 Q 34 16 31 25" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Cute Big Cartoon Eye */}
          <circle cx="35" cy="13" r="4.5" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
          <circle cx="36" cy="13" r="2.2" fill="#0f172a" />
          <circle cx="37" cy="12" r="1" fill="#ffffff" />
          {/* Smiling Mouth */}
          <path d="M 40 18 Q 38 21 35 19" stroke="#7c2d12" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Pectoral Fin */}
          <ellipse cx="24" cy="18" rx="5" ry="3" fill="#ea580c" transform="rotate(-15 24 18)" />
        </svg>
      </div>

      {/* Fish 2: Yellow Boxfish / Tang (Right to Left, higher up) */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: 0,
          animation: 'fishSwimRightToLeft 20s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
          animationDelay: '4s'
        }}
      >
        <svg width="44" height="30" viewBox="0 0 44 30">
          <g className="fish-tail-wag">
            <polygon points="6,15 0,7 2,15 0,23" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
          </g>
          <ellipse cx="24" cy="15" rx="15" ry="11" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
          {/* Blue Accent Fin */}
          <path d="M 12 7 Q 24 4 32 8" stroke="#0284c7" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="32" cy="12" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
          <circle cx="33" cy="12" r="2" fill="#0f172a" />
          <circle cx="34" cy="11" r="0.8" fill="#ffffff" />
          <path d="M 37 16 Q 35 18 33 17" stroke="#713f12" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Fish 3: Tiny Neon Blue Guppies (Left to Right, deep midground) */}
      <div
        style={{
          position: 'absolute',
          top: '42%',
          left: 0,
          animation: 'fishSwimLeftToRight 14s linear infinite',
          animationDelay: '8s'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <svg width="24" height="14" viewBox="0 0 24 14">
            <ellipse cx="14" cy="7" rx="8" ry="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
            <polygon points="6,7 1,2 3,7 1,12" fill="#ec4899" />
            <circle cx="18" cy="6" r="1.5" fill="#ffffff" />
            <circle cx="18.5" cy="6" r="0.8" fill="#000000" />
          </svg>
          <svg width="20" height="12" viewBox="0 0 24 14" style={{ marginTop: '6px' }}>
            <ellipse cx="14" cy="7" rx="8" ry="5" fill="#34d399" stroke="#059669" strokeWidth="1" />
            <polygon points="6,7 1,2 3,7 1,12" fill="#facc15" />
            <circle cx="18" cy="6" r="1.5" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* 4. Gentle Giant Cartoon Sea Turtle (Slow graceful upper drift) */}
      <div
        className="turtle-swim-anim"
        style={{
          position: 'absolute',
          top: '12%',
          left: 0,
          opacity: 0.85
        }}
      >
        <svg width="88" height="52" viewBox="0 0 88 52">
          {/* Turtle Shell */}
          <ellipse cx="44" cy="26" rx="26" ry="17" fill="#15803d" stroke="#14532d" strokeWidth="3" />
          {/* Shell Hexagon Pattern */}
          <ellipse cx="44" cy="26" rx="18" ry="11" fill="#16a34a" stroke="#86efac" strokeWidth="1.5" strokeDasharray="6 3" />
          {/* Head with cute eye */}
          <ellipse cx="72" cy="24" rx="9" ry="7" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
          <circle cx="74" cy="22" r="2.8" fill="#ffffff" />
          <circle cx="75" cy="22" r="1.4" fill="#0f172a" />
          {/* Flippers */}
          <path d="M 52 14 C 64 2 72 4 60 18" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
          <path d="M 52 38 C 64 50 72 48 60 34" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
          <path d="M 26 18 C 18 10 14 12 22 22" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />
          <path d="M 26 34 C 18 42 14 40 22 30" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 5. Floating Cartoon Musical Note Streamers (Visible Music across the reef) */}
      {isAnySinging && (
        <>
          <div className="floating-music-note" style={{ left: '22%', bottom: '260px', color: '#f472b6', animationDelay: '0s', fontSize: '24px' }}>
            ♪
          </div>
          <div className="floating-music-note" style={{ left: '36%', bottom: '280px', color: '#38bdf8', animationDelay: '1.2s', fontSize: '28px' }}>
            ♫
          </div>
          <div className="floating-music-note" style={{ left: '52%', bottom: '250px', color: '#facc15', animationDelay: '2.4s', fontSize: '22px' }}>
            ⭐
          </div>
          <div className="floating-music-note" style={{ left: '68%', bottom: '270px', color: '#a855f7', animationDelay: '0.7s', fontSize: '26px' }}>
            ♬
          </div>
          <div className="floating-music-note" style={{ left: '80%', bottom: '290px', color: '#34d399', animationDelay: '1.9s', fontSize: '20px' }}>
            ♪
          </div>
        </>
      )}

      {/* 6. Glowing Bioluminescent Plankton Motes */}
      <div className="ambient-bubble" style={{ left: '14%', width: '8px', height: '8px', background: '#38bdf8', boxShadow: '0 0 10px #38bdf8', animationDuration: '9s', animationDelay: '0s' }} />
      <div className="ambient-bubble" style={{ left: '32%', width: '10px', height: '10px', background: '#facc15', boxShadow: '0 0 12px #facc15', animationDuration: '14s', animationDelay: '2s' }} />
      <div className="ambient-bubble" style={{ left: '62%', width: '9px', height: '9px', background: '#f472b6', boxShadow: '0 0 10px #f472b6', animationDuration: '11s', animationDelay: '4s' }} />
      <div className="ambient-bubble" style={{ left: '78%', width: '7px', height: '7px', background: '#4ade80', boxShadow: '0 0 8px #4ade80', animationDuration: '13s', animationDelay: '1s' }} />
    </div>
  );
}
