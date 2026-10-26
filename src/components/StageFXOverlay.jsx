export default function StageFXOverlay({
  fameRank = 1,
  activeFX = [], // array of active FX objects: { id, type, x, y }
  onPopBubble
}) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 18,
      overflow: 'hidden'
    }}>
      {/* 1. Stage Spotlights (Unlocked at Fame Rank 2: Coral Beach Club) */}
      {fameRank >= 2 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {/* Left Spotlight Beam */}
          <div className="stage-spotlight-left" style={{
            position: 'absolute',
            top: '-20px',
            left: '12%',
            width: '160px',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.35) 0%, rgba(56, 189, 248, 0) 80%)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            transformOrigin: 'top center',
            animation: 'spotlightSweepLeft 6s ease-in-out infinite'
          }} />

          {/* Right Spotlight Beam */}
          <div className="stage-spotlight-right" style={{
            position: 'absolute',
            top: '-20px',
            right: '12%',
            width: '160px',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.35) 0%, rgba(236, 72, 153, 0) 80%)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            transformOrigin: 'top center',
            animation: 'spotlightSweepRight 6s ease-in-out infinite'
          }} />
        </div>
      )}

      {/* 2. Disco Lasers (Unlocked at Fame Rank 4: Ocean Headliners) */}
      {fameRank >= 4 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div className="disco-laser laser-1" />
          <div className="disco-laser laser-2" />
          <div className="disco-laser laser-3" />
        </div>
      )}

      {/* 3. Dynamic Interactive Live FX Bursts (Confetti, Bubbles, Sparks) */}
      {activeFX.map(fx => {
        if (fx.type === 'confetti') {
          return (
            <div key={fx.id} style={{ position: 'absolute', left: `${fx.x}%`, top: '15%', pointerEvents: 'none' }}>
              {Array.from({ length: 24 }).map((_, i) => {
                const colors = ['#f472b6', '#38bdf8', '#facc15', '#4ade80', '#c084fc', '#fb923c'];
                const color = colors[i % colors.length];
                const dx = (Math.random() - 0.5) * 360;
                const dy = 200 + Math.random() * 260;
                const rot = Math.random() * 720;
                const delay = Math.random() * 0.2;

                return (
                  <div
                    key={i}
                    className="confetti-particle"
                    style={{
                      position: 'absolute',
                      width: `${8 + Math.random() * 6}px`,
                      height: `${12 + Math.random() * 8}px`,
                      backgroundColor: color,
                      borderRadius: '3px',
                      transform: `rotate(${rot}deg)`,
                      animation: `confettiFloat 2.4s ease-out ${delay}s forwards`,
                      '--dx': `${dx}px`,
                      '--dy': `${dy}px`
                    }}
                  />
                );
              })}
            </div>
          );
        }

        if (fx.type === 'bubbles') {
          return (
            <div key={fx.id} style={{ position: 'absolute', left: `${fx.x}%`, bottom: '20px', pointerEvents: 'auto' }}>
              {Array.from({ length: 14 }).map((_, i) => {
                const size = 24 + Math.random() * 24;
                const dx = (Math.random() - 0.5) * 160;
                const delay = Math.random() * 0.35;
                const speed = 2.2 + Math.random() * 0.8;

                return (
                  <div
                    key={i}
                    onClick={() => onPopBubble?.(fx.id, i)}
                    className="stage-bubble-particle"
                    style={{
                      position: 'absolute',
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9) 0%, rgba(56, 189, 248, 0.4) 60%, rgba(14, 165, 233, 0.8) 100%)',
                      border: '2px solid rgba(255, 255, 255, 0.7)',
                      boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)',
                      cursor: 'pointer',
                      animation: `bubbleFloatUp ${speed}s ease-in ${delay}s forwards`,
                      '--dx': `${dx}px`
                    }}
                  />
                );
              })}
            </div>
          );
        }

        if (fx.type === 'sparks') {
          return (
            <div key={fx.id} style={{ position: 'absolute', left: `${fx.x}%`, bottom: '40px', pointerEvents: 'none' }}>
              {Array.from({ length: 20 }).map((_, i) => {
                const dx = (Math.random() - 0.5) * 180;
                const dy = -(120 + Math.random() * 180);
                const delay = Math.random() * 0.15;

                return (
                  <div
                    key={i}
                    className="stage-spark-particle"
                    style={{
                      position: 'absolute',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#fde047',
                      boxShadow: '0 0 12px #f59e0b, 0 0 4px #ffffff',
                      animation: `sparkFountain 1.2s ease-out ${delay}s forwards`,
                      '--dx': `${dx}px`,
                      '--dy': `${dy}px`
                    }}
                  />
                );
              })}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
