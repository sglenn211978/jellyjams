import React from 'react';

/**
 * DJConsole - Arcade Jukebox Soundbox Modal
 * Opens when the player taps the 🎧 DJ cartoon bubble.
 * Features huge, chunky, finger-friendly 54px buttons for:
 * - Tempo Speed (0.75x Chill, 1.0x Regular, 1.35x Fast Party)
 * - Live DJ Turntable Scratch Booth
 * - Studio Mixer Volume Console
 * - Live Interactive Party FX (Confetti, Bubbles, Fireworks)
 */
export default function DJConsole({ 
  isOpen = false,
  currentSpeed = 1.0, 
  onSpeedChange, 
  onOpenMixer, 
  onOpenDJBooth,
  onTriggerConfetti,
  onTriggerBubbles,
  onTriggerSparks,
  onClose
}) {
  if (!isOpen) return null;

  const speeds = [
    { label: 'SLOW', icon: '🐢', speed: 0.75, color: 'game-btn-green', desc: '0.75x Chill Island Groove' },
    { label: 'NORMAL', icon: '🪼', speed: 1.0, color: 'game-btn-cyan', desc: '1.0x Regular Groove' },
    { label: 'FAST', icon: '⚡', speed: 1.35, color: 'game-btn-pink', desc: '1.35x Fast Party Beat' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(2, 6, 23, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        userSelect: 'none'
      }}
      onClick={onClose}
    >
      <div
        className="game-modal-frame"
        style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '32px',
          border: '4.5px solid #090d16',
          boxShadow: '0 12px 0 #090d16, 0 20px 45px rgba(0,0,0,0.85), inset 0 3px 0 rgba(255,255,255,0.25)',
          padding: '24px 28px',
          width: 'min(94vw, 580px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          color: '#ffffff'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title & Big Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '3px solid rgba(255,255,255,0.1)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '34px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>🎧</span>
            <div>
              <div style={{
                fontFamily: "'Lilita One', 'Fredoka', cursive",
                fontSize: '24px',
                fontWeight: '900',
                color: '#fef08a',
                letterSpacing: '0.8px',
                paintOrder: 'stroke fill',
                WebkitTextStroke: '2.5px #78350f',
                textShadow: '0 2px 0 #451a03'
              }}>
                DJ SOUNDBOX & TEMPO
              </div>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8' }}>
                BEAT SPEED • TURNTABLE • PARTY FX
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="game-btn game-btn-round game-btn-red"
            style={{ width: '44px', height: '44px', fontSize: '20px' }}
            title="Close DJ Soundbox"
          >
            ✖
          </button>
        </div>

        {/* 1. Big Chunky Tempo Selector */}
        <div>
          <div style={{ fontSize: '14px', fontWeight: '900', color: '#bae6fd', marginBottom: '8px', letterSpacing: '0.5px' }}>
            🎵 SONG TEMPO & SPEED:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {speeds.map((item) => {
              const isActive = currentSpeed === item.speed;
              return (
                <button
                  key={item.speed}
                  type="button"
                  onClick={() => onSpeedChange(item.speed)}
                  className={`game-btn ${isActive ? item.color : 'game-btn-stone'}`}
                  style={{
                    minHeight: '52px',
                    fontSize: '14px',
                    borderRadius: '20px',
                    flexDirection: 'column',
                    gap: '4px',
                    opacity: isActive ? 1 : 0.65,
                    transform: isActive ? 'scale(1.04)' : 'scale(1.0)',
                    border: isActive ? '3.5px solid #ffffff' : '3.5px solid #090d16'
                  }}
                  title={item.desc}
                >
                  <span style={{ fontSize: '22px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. DJ Scratch Booth & Mixer Console */}
        <div>
          <div style={{ fontSize: '14px', fontWeight: '900', color: '#bae6fd', marginBottom: '8px', letterSpacing: '0.5px' }}>
            🎛️ STUDIO CONTROLS:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button
              type="button"
              onClick={() => {
                onOpenDJBooth();
                onClose();
              }}
              className="game-btn game-btn-yellow"
              style={{ minHeight: '54px', fontSize: '14px', borderRadius: '20px', gap: '8px' }}
              title="Open Live DJ Booth & Scratch Turntable!"
            >
              <span style={{ fontSize: '24px' }}>🎧</span>
              <span>DJ BOOTH</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenMixer();
                onClose();
              }}
              className="game-btn game-btn-purple"
              style={{ minHeight: '54px', fontSize: '14px', borderRadius: '20px', gap: '8px' }}
              title="Open Monster Volume Controls & Mixing Console"
            >
              <span style={{ fontSize: '24px' }}>🔊</span>
              <span>STUDIO MIXER</span>
            </button>
          </div>
        </div>

        {/* 3. Live Stage Party Cannons */}
        <div>
          <div style={{ fontSize: '14px', fontWeight: '900', color: '#bae6fd', marginBottom: '8px', letterSpacing: '0.5px' }}>
            🎉 LIVE PARTY CANNONS:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <button
              type="button"
              onClick={() => onTriggerConfetti?.()}
              className="game-btn game-btn-pink"
              style={{ minHeight: '50px', fontSize: '13px', borderRadius: '18px', gap: '6px' }}
              title="Blast Confetti across the stage!"
            >
              <span style={{ fontSize: '22px' }}>🎊</span>
              <span>CONFETTI</span>
            </button>

            <button
              type="button"
              onClick={() => onTriggerBubbles?.()}
              className="game-btn game-btn-cyan"
              style={{ minHeight: '50px', fontSize: '13px', borderRadius: '18px', gap: '6px' }}
              title="Shoot floating bubbles!"
            >
              <span style={{ fontSize: '22px' }}>🫧</span>
              <span>BUBBLES</span>
            </button>

            <button
              type="button"
              onClick={() => onTriggerSparks?.()}
              className="game-btn game-btn-yellow"
              style={{ minHeight: '50px', fontSize: '13px', borderRadius: '18px', gap: '6px' }}
              title="Fire sparkling fireworks!"
            >
              <span style={{ fontSize: '22px' }}>🎆</span>
              <span>FIREWORKS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
