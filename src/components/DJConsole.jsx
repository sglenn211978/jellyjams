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
    { label: 'SLOW', icon: '🐢', speed: 0.75, color: 'game-btn-green', desc: '0.75x Slow Chill Groove' },
    { label: 'NORMAL', icon: '🪼', speed: 1.0, color: 'game-btn-cyan', desc: '1.0x Normal Groove' },
    { label: 'FAST', icon: '⚡', speed: 1.35, color: 'game-btn-pink', desc: '1.35x Fast Party Beat' }
  ];

  return (
    <div className="kid-toy-boombox-dock" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
      {/* Left Speaker Grille */}
      <div className="kid-boombox-speaker">
        <div className="kid-boombox-dot" />
        <div className="kid-boombox-dot" />
        <div className="kid-boombox-dot" />
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '5px 10px',
        background: '#78350f',
        borderRadius: '16px',
        color: '#fef08a',
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: '900',
        fontSize: '12px',
        letterSpacing: '0.5px',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
      }}>
        <span style={{ fontSize: '16px' }}>🎧</span>
        <span>TEMPO</span>
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        {speeds.map((item) => {
          const isActive = currentSpeed === item.speed;
          return (
            <button
              key={item.speed}
              onClick={() => onSpeedChange(item.speed)}
              className={`game-btn ${isActive ? item.color : 'game-btn-stone'}`}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                borderRadius: '18px',
                gap: '6px',
                transform: isActive ? 'scale(1.06)' : 'none'
              }}
              title={item.desc}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ width: '3px', height: '30px', background: '#78350f', borderRadius: '4px', margin: '0 2px', opacity: 0.5 }} />

      <button
        onClick={onOpenMixer}
        className="game-btn game-btn-purple"
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          borderRadius: '18px',
          gap: '6px'
        }}
        title="Open Monster Volume Controls & Mixing Console"
      >
        <span style={{ fontSize: '18px' }}>🔊</span>
        <span>VOLUME</span>
      </button>

      <button
        onClick={onOpenDJBooth}
        className="game-btn game-btn-yellow"
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          borderRadius: '18px',
          gap: '6px'
        }}
        title="Open Live DJ Booth & Scratch Turntable!"
      >
        <span style={{ fontSize: '18px' }}>🎧</span>
        <span>DJ BOOTH</span>
      </button>

      <div style={{ width: '3px', height: '30px', background: '#78350f', borderRadius: '4px', margin: '0 2px', opacity: 0.5 }} />

      {/* Interactive Live Stage FX Trigger Toys */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <button
          onClick={onTriggerConfetti}
          className="game-btn game-btn-pink"
          style={{
            padding: '7px 12px',
            fontSize: '13px',
            borderRadius: '16px',
            gap: '5px'
          }}
          title="Blast colorful confetti across the stage!"
        >
          <span style={{ fontSize: '17px' }}>🎊</span>
          <span>CONFETTI</span>
        </button>

        <button
          onClick={onTriggerBubbles}
          className="game-btn game-btn-cyan"
          style={{
            padding: '7px 12px',
            fontSize: '13px',
            borderRadius: '16px',
            gap: '5px'
          }}
          title="Fire floating bubbles from the stage floor!"
        >
          <span style={{ fontSize: '17px' }}>🫧</span>
          <span>BUBBLES</span>
        </button>

        <button
          onClick={onTriggerSparks}
          className="game-btn game-btn-yellow"
          style={{
            padding: '7px 12px',
            fontSize: '13px',
            borderRadius: '16px',
            gap: '5px'
          }}
          title="Shoot sparkling golden fountain fireworks!"
        >
          <span style={{ fontSize: '17px' }}>🎆</span>
          <span>SPARKS</span>
        </button>
      </div>

      {/* Right Speaker Grille */}
      <div className="kid-boombox-speaker">
        <div className="kid-boombox-dot" />
        <div className="kid-boombox-dot" />
        <div className="kid-boombox-dot" />
      </div>
    </div>
  );
}
