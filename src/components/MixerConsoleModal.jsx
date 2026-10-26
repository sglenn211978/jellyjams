import { JELLY_SPECIES } from '../constants/jellies';

export default function MixerConsoleModal({
  isOpen,
  onClose,
  performers,
  volumes,
  onVolumeChange,
  onToggleMute,
  soloedPerformer,
  onToggleSolo,
  isNight,
  onToggleNight,
  tempoSpeed,
  onSpeedChange
}) {
  if (!isOpen) return null;

  const speciesList = Object.values(JELLY_SPECIES).filter(s => performers[s.id] !== undefined);

  const handleSetAllVolumes = (targetVol) => {
    speciesList.forEach((spec) => {
      if (performers[spec.id]?.unlocked) {
        onVolumeChange(spec.id, targetVol);
      }
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 220,
        background: 'rgba(2, 6, 23, 0.82)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        userSelect: 'none',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="game-modal-frame"
        style={{
          background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)',
          maxWidth: '940px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          color: '#ffffff',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cartoon Red Pop Close Button */}
        <button onClick={onClose} className="game-close-btn" title="Close Volume & Mixing Console">
          ✕
        </button>

        {/* Top Header */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '2px solid rgba(168, 85, 247, 0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'rgba(15, 23, 42, 0.85)',
          borderRadius: '28px 28px 0 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '34px' }}>🔊</span>
            <div>
              <h2 style={{
                fontFamily: "'Fredoka', 'Lilita One', cursive, sans-serif",
                fontSize: '24px',
                fontWeight: '900',
                letterSpacing: '0.5px',
                color: '#fef08a',
                paintOrder: 'stroke fill',
                WebkitTextStroke: '3px #090d16',
                textShadow: '0 3px 0 #090d16'
              }}>
                MONSTER VOLUME & SOUNDBOARD
              </h2>
              <div style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '800' }}>
                Boost any quiet monster up to 200% or tap ⭐ SOLO to hear one singer at a time!
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => handleSetAllVolumes(1.5)}
              className="game-btn game-btn-yellow"
              style={{ padding: '8px 16px', fontSize: '13.5px', borderRadius: '16px' }}
              title="Boost all unlocked monsters on this island to 150% volume!"
            >
              🔥 BOOST ALL (150%)
            </button>
            <button
              onClick={() => handleSetAllVolumes(1.0)}
              className="game-btn game-btn-cyan"
              style={{ padding: '8px 16px', fontSize: '13.5px', borderRadius: '16px' }}
              title="Reset all monsters to 100% normal volume"
            >
              🔄 NORMAL (100%)
            </button>
          </div>
        </div>

        {/* Global Master Quick Controls Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 24px',
          background: 'rgba(2, 6, 23, 0.6)',
          borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: '900', color: '#cbd5e1' }}>STAGE MODE:</span>
            <button
              onClick={onToggleNight}
              className={`game-btn ${isNight ? 'game-btn-purple' : 'game-btn-yellow'}`}
              style={{
                padding: '8px 18px',
                fontSize: '13.5px'
              }}
            >
              {isNight ? '🌙 Midnight Rave (Echo + Bass)' : '☀️ Sunlit Reef (Crisp & Clear)'}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: '900', color: '#cbd5e1' }}>SPEED:</span>
            {[
              { label: '🐢 SLOW', speed: 0.75 },
              { label: '🪼 NORMAL', speed: 1.0 },
              { label: '⚡ FAST', speed: 1.35 }
            ].map(item => (
              <button
                key={item.speed}
                onClick={() => onSpeedChange(item.speed)}
                className={`game-btn ${tempoSpeed === item.speed ? 'game-btn-cyan' : 'game-btn-stone'}`}
                style={{
                  padding: '8px 16px',
                  fontSize: '13.5px',
                  borderRadius: '16px'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mixer Channel Strips */}
        <div style={{
          padding: '20px',
          overflowX: 'auto',
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          alignItems: 'stretch',
          flex: 1
        }}>
          {speciesList.map((spec) => {
            const isUnlocked = performers[spec.id]?.unlocked;
            const isSleeping = performers[spec.id]?.isSleeping;
            const isSoloed = soloedPerformer === spec.id;
            const vol = volumes[spec.id] ?? 1.0;
            const volPct = Math.round(vol * 100);

            return (
              <div
                key={spec.id}
                style={{
                  background: isUnlocked ? 'rgba(15, 23, 42, 0.9)' : 'rgba(15, 23, 42, 0.4)',
                  border: isSoloed
                    ? '3px solid #facc15'
                    : isUnlocked
                      ? '2px solid rgba(148, 163, 184, 0.45)'
                      : '2px dashed rgba(51, 65, 85, 0.5)',
                  borderRadius: '22px',
                  padding: '14px 10px',
                  width: '122px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isSoloed ? '0 0 22px rgba(250, 204, 21, 0.45)' : '0 6px 14px rgba(0,0,0,0.35)',
                  opacity: isUnlocked ? 1 : 0.45
                }}
              >
                {/* Channel Label */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '30px', marginBottom: '2px' }}>{spec.icon}</div>
                  <div style={{
                    fontSize: '13.5px',
                    fontWeight: '900',
                    fontFamily: "'Fredoka', 'Lilita One', sans-serif",
                    color: isUnlocked ? '#ffffff' : '#64748b',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '104px',
                    letterSpacing: '0.3px'
                  }}>
                    {spec.name.replace('Jelly', '').replace('Floaty', '')}
                  </div>
                </div>

                {/* Big Volume Percentage Pill */}
                <div style={{
                  background: isSleeping
                    ? '#334155'
                    : volPct >= 150
                    ? 'linear-gradient(180deg, #fb923c 0%, #ea580c 100%)'
                    : 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
                  color: '#ffffff',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  border: '2px solid #090d16',
                  fontFamily: "'Fredoka', 'Lilita One', sans-serif",
                  fontSize: '14px',
                  fontWeight: '900',
                  paintOrder: 'stroke fill',
                  WebkitTextStroke: '2px #090d16'
                }}>
                  {isSleeping ? '💤 SLEEP' : `${volPct}%`}
                </div>

                {/* Kid-Friendly + / - Volume Step Buttons */}
                <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
                  <button
                    disabled={!isUnlocked || isSleeping}
                    onClick={() => onVolumeChange(spec.id, Math.max(0.2, Number((vol - 0.25).toFixed(2))))}
                    className="game-btn game-btn-cyan"
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      fontSize: '15px',
                      borderRadius: '12px'
                    }}
                    title="Turn volume down (-25%)"
                  >
                    ➖
                  </button>
                  <button
                    disabled={!isUnlocked || isSleeping}
                    onClick={() => onVolumeChange(spec.id, Math.min(2.0, Number((vol + 0.25).toFixed(2))))}
                    className="game-btn game-btn-yellow"
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      fontSize: '15px',
                      borderRadius: '12px'
                    }}
                    title="Boost volume up (+25%, up to 200%!)"
                  >
                    ➕
                  </button>
                </div>

                {/* Vertical Slider (0% to 200% Boost!) */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'center',
                  padding: '4px 0'
                }}>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="10"
                    value={volPct}
                    disabled={!isUnlocked || isSleeping}
                    onChange={(e) => onVolumeChange(spec.id, Number(e.target.value) / 100)}
                    style={{
                      writingMode: 'vertical-lr',
                      direction: 'rtl',
                      width: '14px',
                      height: '95px',
                      cursor: isUnlocked && !isSleeping ? 'pointer' : 'not-allowed',
                      accentColor: volPct > 100 ? '#facc15' : '#38bdf8'
                    }}
                    title={`Volume: ${volPct}% (up to 200% boost)`}
                  />
                </div>

                {/* Quick 200% Boost + Solo + Sleep Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                  <button
                    disabled={!isUnlocked || isSleeping}
                    onClick={() => onVolumeChange(spec.id, volPct >= 190 ? 1.0 : 2.0)}
                    className={`game-btn ${volPct >= 190 ? 'game-btn-orange' : 'game-btn-yellow'}`}
                    style={{
                      borderRadius: '12px',
                      padding: '4px 6px',
                      fontSize: '11.5px',
                      width: '100%',
                      height: '28px'
                    }}
                    title="Boost this monster to 200% MAX volume!"
                  >
                    {volPct >= 190 ? '🔥 200% ON' : '🔥 200% MAX'}
                  </button>

                  <button
                    disabled={!isUnlocked}
                    onClick={() => onToggleSolo(spec.id)}
                    className={`game-btn ${isSoloed ? 'game-btn-green' : 'game-btn-stone'}`}
                    style={{
                      borderRadius: '12px',
                      padding: '4px 6px',
                      fontSize: '11.5px',
                      width: '100%',
                      height: '28px'
                    }}
                    title="Solo this monster (hear only this singer!)"
                  >
                    ⭐ {isSoloed ? 'SOLOING!' : 'SOLO'}
                  </button>

                  <button
                    disabled={!isUnlocked}
                    onClick={() => onToggleMute(spec.id)}
                    className={`game-btn ${isSleeping ? 'game-btn-red' : 'game-btn-stone'}`}
                    style={{
                      borderRadius: '12px',
                      padding: '4px 6px',
                      fontSize: '11.5px',
                      width: '100%',
                      height: '28px'
                    }}
                    title="Wake or put this monster to sleep"
                  >
                    {isSleeping ? '💤 WAKE UP' : '🔊 MUTE'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
