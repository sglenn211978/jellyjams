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
      gap: '8px',
      background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      padding: '5px 10px',
      borderRadius: '26px',
      border: '3.5px solid #090d16',
      boxShadow: '0 5px 0 #090d16, 0 10px 20px rgba(0,0,0,0.5)',
      userSelect: 'none',
      minHeight: '48px'
    }}>
      {/* Tempo Switcher Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#090d16',
        padding: '3px',
        borderRadius: '18px',
        gap: '3px'
      }}>
        {speeds.map((item) => {
          const isActive = currentSpeed === item.speed;
          return (
            <button
              key={item.speed}
              type="button"
              onClick={() => onSpeedChange(item.speed)}
              className={`game-btn ${isActive ? item.color : 'game-btn-stone'}`}
              style={{
                padding: '6px 12px',
                fontSize: '12.5px',
                borderRadius: '14px',
                gap: '5px',
                border: 'none',
                minHeight: '36px',
                boxShadow: isActive ? 'inset 0 2px 0 rgba(255,255,255,0.6), 0 2px 0 #090d16' : 'none'
              }}
              title={item.desc}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ width: '2.5px', height: '26px', background: '#334155', borderRadius: '2px' }} />

      {/* DJ Scratch Booth Button */}
      <button
        type="button"
        onClick={onOpenDJBooth}
        className="game-btn game-btn-yellow"
        style={{
          padding: '8px 14px',
          fontSize: '13px',
          borderRadius: '18px',
          minHeight: '40px',
          gap: '6px'
        }}
        title="Open Live DJ Booth & Scratch Turntable!"
      >
        <span style={{ fontSize: '18px' }}>🎧</span>
        <span>DJ BOOTH</span>
      </button>

      {/* Volume & Mixer Button */}
      <button
        type="button"
        onClick={onOpenMixer}
        className="game-btn game-btn-purple"
        style={{
          padding: '8px 14px',
          fontSize: '13px',
          borderRadius: '18px',
          minHeight: '40px',
          gap: '6px'
        }}
        title="Open Monster Volume Controls & Mixing Console"
      >
        <span style={{ fontSize: '18px' }}>🔊</span>
        <span>MIXER</span>
      </button>

      <div style={{ width: '2.5px', height: '26px', background: '#334155', borderRadius: '2px' }} />

      {/* Interactive FX Trigger Buttons */}
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <button
          type="button"
          onClick={onTriggerConfetti}
          className="game-btn game-btn-pink"
          style={{
            width: '40px',
            height: '40px',
            padding: 0,
            fontSize: '18px',
            borderRadius: '14px'
          }}
          title="Blast confetti across the stage!"
        >
          <span>🎊</span>
        </button>

        <button
          type="button"
          onClick={onTriggerBubbles}
          className="game-btn game-btn-cyan"
          style={{
            width: '40px',
            height: '40px',
            padding: 0,
            fontSize: '18px',
            borderRadius: '14px'
          }}
          title="Fire floating bubbles!"
        >
          <span>🫧</span>
        </button>

        <button
          type="button"
          onClick={onTriggerSparks}
          className="game-btn game-btn-yellow"
          style={{
            width: '40px',
            height: '40px',
            padding: 0,
            fontSize: '18px',
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
