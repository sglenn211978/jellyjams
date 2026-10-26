export default function DJConsole({ 
  currentSpeed, 
  onSpeedChange, 
  onOpenMixer, 
  onOpenDJBooth,
  onTriggerConfetti,
  onTriggerBubbles,
  onTriggerSparks
}) {
  const speeds = [
    { label: 'SLOW', icon: '🐢', speed: 0.75, color: 'game-btn-green', desc: '0.75x Chill Groove' },
    { label: 'NORMAL', icon: '🪼', speed: 1.0, color: 'game-btn-cyan', desc: '1.0x Regular Groove' },
    { label: 'FAST', icon: '⚡', speed: 1.35, color: 'game-btn-pink', desc: '1.35x Fast Party Beat' }
  ];

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      padding: '4px 8px',
      borderRadius: '24px',
      border: '3px solid #090d16',
      boxShadow: '0 4px 0 #090d16, 0 8px 16px rgba(0,0,0,0.4)',
      userSelect: 'none'
    }}>
      {/* Tempo Switcher Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#090d16',
        padding: '2px',
        borderRadius: '16px',
        gap: '2px'
      }}>
        {speeds.map((item) => {
          const isActive = currentSpeed === item.speed;
          return (
            <button
              key={item.speed}
              onClick={() => onSpeedChange(item.speed)}
              className={`game-btn ${isActive ? item.color : 'game-btn-stone'}`}
              style={{
                padding: '5px 10px',
                fontSize: '12px',
                borderRadius: '14px',
                gap: '4px',
                border: 'none',
                boxShadow: isActive ? 'inset 0 2px 0 rgba(255,255,255,0.4)' : 'none'
              }}
              title={item.desc}
            >
              <span style={{ fontSize: '14px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ width: '2px', height: '22px', background: '#334155', borderRadius: '2px', margin: '0 2px' }} />

      {/* Volume & Mixer Button */}
      <button
        onClick={onOpenMixer}
        className="game-btn game-btn-purple"
        style={{
          padding: '6px 12px',
          fontSize: '12px',
          borderRadius: '16px',
          gap: '5px'
        }}
        title="Open Monster Volume Controls & Mixing Console"
      >
        <span style={{ fontSize: '15px' }}>🔊</span>
        <span>MIXER</span>
      </button>

      {/* DJ Scratch Booth Button */}
      <button
        onClick={onOpenDJBooth}
        className="game-btn game-btn-yellow"
        style={{
          padding: '6px 12px',
          fontSize: '12px',
          borderRadius: '16px',
          gap: '5px'
        }}
        title="Open Live DJ Booth & Scratch Turntable!"
      >
        <span style={{ fontSize: '15px' }}>🎧</span>
        <span>DJ BOOTH</span>
      </button>

      <div style={{ width: '2px', height: '22px', background: '#334155', borderRadius: '2px', margin: '0 2px' }} />

      {/* Compact Interactive FX Trigger Buttons */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <button
          onClick={onTriggerConfetti}
          className="game-btn game-btn-pink"
          style={{
            padding: '6px 8px',
            fontSize: '14px',
            borderRadius: '14px'
          }}
          title="Blast confetti across the stage!"
        >
          <span>🎊</span>
        </button>

        <button
          onClick={onTriggerBubbles}
          className="game-btn game-btn-cyan"
          style={{
            padding: '6px 8px',
            fontSize: '14px',
            borderRadius: '14px'
          }}
          title="Fire floating bubbles!"
        >
          <span>🫧</span>
        </button>

        <button
          onClick={onTriggerSparks}
          className="game-btn game-btn-yellow"
          style={{
            padding: '6px 8px',
            fontSize: '14px',
            borderRadius: '14px'
          }}
          title="Shoot sparkling fireworks!"
        >
          <span>🎆</span>
        </button>
      </div>
    </div>
  );
}
