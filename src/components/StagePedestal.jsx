export default function StagePedestal({ 
  islandId = 'lagoon', 
  isSleeping = false, 
  level = 1,
  tempoSpeed = 1.0,
  name,
  isSupercharged = false,
  volume = 1.0,
  isSoloed = false,
  onClick,
  onToggleSleep,
  onCycleVolume,
  onToggleSolo
}) {
  const isSinging = !isSleeping;
  const volPct = Math.round((volume ?? 1.0) * 100);

  // Island themed colors
  const theme = {
    lagoon: {
      padGrad: 'radial-gradient(ellipse at center, #38bdf8 0%, #0284c7 50%, #0369a1 100%)',
      border: '#bae6fd',
      glow: 'rgba(56, 189, 248, 0.4)',
      accent: '#0284c7',
      notes: ['#f472b6', '#38bdf8', '#facc15', '#a855f7']
    },
    trench: {
      padGrad: 'radial-gradient(ellipse at center, #ea580c 0%, #9a3412 50%, #450a0a 100%)',
      border: '#fdba74',
      glow: 'rgba(234, 88, 12, 0.5)',
      accent: '#ea580c',
      notes: ['#fb923c', '#ef4444', '#facc15', '#c084fc']
    },
    cavern: {
      padGrad: 'radial-gradient(ellipse at center, #10b981 0%, #047857 50%, #064e3b 100%)',
      border: '#a7f3d0',
      glow: 'rgba(16, 185, 129, 0.4)',
      accent: '#10b981',
      notes: ['#34d399', '#67e8f9', '#f472b6', '#a78bfa']
    }
  }[islandId] || {
    padGrad: 'radial-gradient(ellipse at center, #38bdf8 0%, #0284c7 100%)',
    border: '#ffffff',
    glow: 'rgba(56, 189, 248, 0.4)',
    accent: '#0284c7',
    notes: ['#38bdf8', '#facc15']
  };

  const animDuration = `${1.4 / tempoSpeed}s`;

  return (
    <div 
      onClick={onClick}
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '-16px',
        zIndex: 10,
        userSelect: 'none',
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {/* Floating Animated Musical Notes when actively singing */}
      {isSinging && (
        <>
          <span 
            className="music-note-particle"
            style={{
              left: '12%',
              bottom: '40px',
              color: theme.notes[0],
              animationDelay: '0s',
              animationDuration: animDuration,
              filter: `drop-shadow(0 0 6px ${theme.notes[0]})`
            }}
          >
            ♪
          </span>
          <span 
            className="music-note-particle"
            style={{
              right: '15%',
              bottom: '48px',
              color: theme.notes[1],
              animationDelay: '0.6s',
              animationDuration: animDuration,
              filter: `drop-shadow(0 0 6px ${theme.notes[1]})`
            }}
          >
            ♫
          </span>
          <span 
            className="music-note-particle"
            style={{
              left: '42%',
              bottom: '55px',
              color: theme.notes[2] || theme.notes[0],
              animationDelay: '1.1s',
              animationDuration: animDuration,
              filter: `drop-shadow(0 0 6px ${theme.notes[2] || theme.notes[0]})`
            }}
          >
            ♬
          </span>
        </>
      )}

      {/* 3D Cartoon Cel-Shaded Stage Pedestal Pad */}
      <div style={{
        position: 'relative',
        width: '144px',
        height: '36px',
        borderRadius: '50%',
        background: theme.padGrad,
        border: isSoloed ? '3.5px solid #fde047' : '3.5px solid #0f172a',
        boxShadow: isSoloed
          ? '0 0 20px #facc15, 0 8px 0 #0f172a, inset 0 3.5px 0 rgba(255,255,255,0.75)'
          : `0 8px 0 #0f172a, 0 14px 24px rgba(0, 0, 0, 0.5), inset 0 3.5px 0 rgba(255,255,255,0.55)`,
        filter: isSleeping ? 'grayscale(60%) opacity(0.6)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        {/* Subtle stage rim pearls */}
        <div style={{
          position: 'absolute',
          inset: '2px',
          borderRadius: '50%',
          border: '1.5px dashed rgba(255,255,255,0.4)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Mounted 3D Arcade Character Plaque */}
      {name && (
        <div style={{
          marginTop: '-10px',
          padding: '4px 10px',
          borderRadius: '16px',
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          border: isSoloed ? '2.5px solid #facc15' : '2.5px solid #0f172a',
          boxShadow: '0 4px 0 #0f172a, 0 8px 16px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          zIndex: 5,
          whiteSpace: 'nowrap'
        }}>
          {/* Top Row: Level + Monster Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              background: level >= 5 ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : 'linear-gradient(135deg, #38bdf8, #0284c7)',
              color: '#ffffff',
              padding: '1px 6px',
              borderRadius: '8px',
              border: '1.5px solid #0f172a',
              fontSize: '10px',
              fontWeight: '900',
              letterSpacing: '0.5px'
            }}>
              {level >= 5 ? `⭐ Lv.${level}` : `Lv.${level}`}
            </span>

            <span style={{
              fontFamily: "'Fredoka', 'Lilita One', sans-serif",
              fontSize: '13px',
              fontWeight: '900',
              color: '#ffffff',
              letterSpacing: '0.5px'
            }}>
              {name}
            </span>
          </div>

          {/* Bottom Row: SING/WAKE + Quick Volume Boost + SOLO */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleSleep) {
                  onToggleSleep(e);
                }
              }}
              title={isSleeping ? `Wake up ${name} to sing!` : `Put ${name} to sleep (mute)`}
              style={{
                background: isSleeping
                  ? 'linear-gradient(180deg, #64748b 0%, #334155 100%)'
                  : isSupercharged
                  ? 'linear-gradient(180deg, #fde047 0%, #eab308 100%)'
                  : 'linear-gradient(180deg, #4ade80 0%, #16a34a 100%)',
                color: isSleeping ? '#e2e8f0' : '#052e16',
                border: '1.5px solid #0f172a',
                borderRadius: '10px',
                padding: '2px 7px',
                fontSize: '10.5px',
                fontWeight: '900',
                fontFamily: "'Fredoka', 'Lilita One', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                boxShadow: '0 2px 0 #0f172a'
              }}
            >
              <span>{isSleeping ? '💤' : isSupercharged ? '⚡' : '🎤'}</span>
              <span>{isSleeping ? 'WAKE' : 'SING'}</span>
            </button>

            {onCycleVolume && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCycleVolume(e);
                }}
                title={`Tap to boost ${name}'s volume! (Currently ${volPct}%)`}
                style={{
                  background: volPct >= 180
                    ? 'linear-gradient(180deg, #fb923c 0%, #ea580c 100%)'
                    : volPct >= 130
                    ? 'linear-gradient(180deg, #fde047 0%, #ca8a04 100%)'
                    : 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
                  color: '#ffffff',
                  border: '1.5px solid #0f172a',
                  borderRadius: '10px',
                  padding: '2px 7px',
                  fontSize: '10.5px',
                  fontWeight: '900',
                  fontFamily: "'Fredoka', 'Lilita One', sans-serif",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  boxShadow: '0 2px 0 #0f172a',
                  paintOrder: 'stroke fill',
                  WebkitTextStroke: '1.5px #090d16'
                }}
              >
                <span>{volPct >= 180 ? '🔥' : volPct <= 60 ? '🔉' : '🔊'}</span>
                <span>{volPct}%</span>
              </button>
            )}

            {onToggleSolo && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSolo(e);
                }}
                title={isSoloed ? `Un-solo ${name} (hear full band)` : `Solo ${name} (hear only this monster!)`}
                style={{
                  background: isSoloed
                    ? 'linear-gradient(180deg, #fde047 0%, #eab308 100%)'
                    : 'linear-gradient(180deg, #475569 0%, #1e293b 100%)',
                  color: isSoloed ? '#451a03' : '#e2e8f0',
                  border: '1.5px solid #0f172a',
                  borderRadius: '10px',
                  padding: '2px 6px',
                  fontSize: '10.5px',
                  fontWeight: '900',
                  fontFamily: "'Fredoka', 'Lilita One', sans-serif",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  boxShadow: '0 2px 0 #0f172a'
                }}
              >
                <span>⭐</span>
                <span>{isSoloed ? 'SOLO!' : 'SOLO'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
