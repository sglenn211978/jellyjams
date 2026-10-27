export default function StagePedestal({ 
  islandId = 'lagoon', 
  isSleeping = false, 
  tempoSpeed = 1.0,
  isSelected = false,
  isSoloed = false,
  onClick
}) {
  const isSinging = !isSleeping;

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
      className="stage-pedestal-root"
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

      {/* 3D Cartoon Cel-Shaded Stage Pedestal Pad - Clean, Organic Island Perch */}
      <div 
        style={{
          position: 'relative',
          width: '144px',
          height: '36px',
          borderRadius: '50%',
          background: theme.padGrad,
          border: isSelected 
            ? '4px solid #facc15' 
            : isSoloed 
            ? '3.5px solid #fde047' 
            : '3.5px solid #0f172a',
          boxShadow: isSelected
            ? '0 0 28px #facc15, 0 8px 0 #0f172a, inset 0 3.5px 0 rgba(255,255,255,0.85)'
            : isSoloed
            ? '0 0 20px #facc15, 0 8px 0 #0f172a, inset 0 3.5px 0 rgba(255,255,255,0.75)'
            : `0 8px 0 #0f172a, 0 14px 24px rgba(0, 0, 0, 0.5), inset 0 3.5px 0 rgba(255,255,255,0.55)`,
          filter: isSleeping ? 'grayscale(60%) opacity(0.6)' : 'none',
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isSelected ? 'scale(1.08)' : 'scale(1.0)'
        }}
      >
        {/* Subtle stage rim pearls */}
        <div style={{
          position: 'absolute',
          inset: '2px',
          borderRadius: '50%',
          border: isSelected ? '2px dashed #ffffff' : '1.5px dashed rgba(255,255,255,0.4)',
          pointerEvents: 'none'
        }} />

        {/* Selected Focus Spotlight Ring under creature */}
        {isSelected && (
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              right: '-10px',
              bottom: '-10px',
              borderRadius: '50%',
              border: '2px solid rgba(250, 204, 21, 0.6)',
              animation: 'spin 6s linear infinite',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>
    </div>
  );
}
