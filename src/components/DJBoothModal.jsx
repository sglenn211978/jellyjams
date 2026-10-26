import { useState, useRef, useEffect, useCallback } from 'react';

const SAMPLE_PADS = [
  { id: 'airhorn', name: 'AIRHORN', icon: '📢', color: 'linear-gradient(135deg, #f59e0b, #d97706)', border: '#fde047', shadow: '#92400e', action: (e) => e?.triggerAirhorn() },
  { id: 'laser', name: 'LASER ZAP', icon: '⚡', color: 'linear-gradient(135deg, #06b6d4, #0891b2)', border: '#67e8f9', shadow: '#155e75', action: (e) => e?.triggerLaserZap() },
  { id: 'bassdrop', name: 'BASS DROP', icon: '🔊', color: 'linear-gradient(135deg, #ec4899, #db2777)', border: '#f472b6', shadow: '#9d174d', action: (e) => e?.triggerBassDrop() },
  { id: 'wubwub', name: 'WUB WUB!', icon: '🐸', color: 'linear-gradient(135deg, #22c55e, #16a34a)', border: '#86efac', shadow: '#14532d', action: (e) => e?.triggerVocalWub() },
  { id: 'yeah', name: 'YEAH!', icon: '🎉', color: 'linear-gradient(135deg, #eab308, #ca8a04)', border: '#fef08a', shadow: '#713f12', action: (e) => e?.triggerVocalYeah() },
  { id: 'letsjam', name: "LET'S JAM!", icon: '🎵', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', border: '#c4b5fd', shadow: '#581c87', action: (e) => e?.triggerVocalLetsJam() },
  { id: 'bubbles', name: 'BUBBLES', icon: '🫧', color: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: '#93c5fd', shadow: '#1e3a8a', action: (e) => e?.triggerBubbleBarrage() },
  { id: 'sonar', name: 'SONAR PING', icon: '📡', color: 'linear-gradient(135deg, #14b8a6, #0d9488)', border: '#5eead4', shadow: '#115e59', action: (e) => e?.triggerSonarPing() },
];

export default function DJBoothModal({
  isOpen,
  onClose,
  engineRef,
  onAddCoins,
  onTriggerComicPop
}) {
  const [hype, setHype] = useState(0);
  const [filterVal, setFilterVal] = useState(50);
  const [isDraggingRecord, setIsDraggingRecord] = useState(false);
  const [recordRotation, setRecordRotation] = useState(0);
  const [activePad, setActivePad] = useState(null);

  const turntableElRef = useRef(null);
  const turntableCenterRef = useRef({ cx: 0, cy: 0 });
  const lastAngleRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastScratchSoundTimeRef = useRef(0);
  const isDraggingRecordRef = useRef(false);

  // Slow natural decay of hype meter for continuous arcade action
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setHype((prev) => Math.max(0, prev - 1.5));
    }, 500);
    return () => clearInterval(interval);
  }, [isOpen]);

  const triggerJackpot = useCallback(() => {
    onTriggerComicPop?.('🔥 DJ FEVER!', 'gold', '🎧');
    onAddCoins?.(15);
    engineRef.current?.playSuccessFanfare();
  }, [onTriggerComicPop, onAddCoins, engineRef]);

  const boostHype = useCallback((amount) => {
    setHype((prev) => {
      const next = prev + amount;
      if (next >= 100) {
        triggerJackpot();
        return 0;
      }
      return next;
    });
  }, [triggerJackpot]);

  const handlePadPress = (pad) => {
    pad.action(engineRef.current);
    setActivePad(pad.id);
    setTimeout(() => setActivePad(null), 180);
    boostHype(9);
  };

  // --- Turntable Drag & Scratch Handlers ---
  const handlePointerDown = (e) => {
    if (!turntableElRef.current) return;
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {
      // Ignore if pointer capture unsupported
    }

    const rect = turntableElRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    turntableCenterRef.current = { cx, cy };
    lastAngleRef.current = Math.atan2(e.clientY - cy, e.clientX - cx);
    lastTimeRef.current = performance.now();
    lastScratchSoundTimeRef.current = 0;
    isDraggingRecordRef.current = true;
    setIsDraggingRecord(true);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRecordRef.current) return;
    e.preventDefault();

    const { cx, cy } = turntableCenterRef.current;
    const now = performance.now();
    const dt = (now - lastTimeRef.current) / 1000;
    const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx);
    let delta = currentAngle - lastAngleRef.current;

    // Handle angular boundary wrapping (-PI to +PI)
    if (delta > Math.PI) delta -= 2 * Math.PI;
    if (delta < -Math.PI) delta += 2 * Math.PI;

    if (dt > 0.012) {
      const velocity = delta / dt;
      lastTimeRef.current = now;
      lastAngleRef.current = currentAngle;

      const deltaDegrees = delta * (180 / Math.PI);
      setRecordRotation((r) => r + deltaDegrees);

      // Trigger scratch audio when threshold velocity reached
      if (Math.abs(velocity) > 0.6 && (now - lastScratchSoundTimeRef.current > 65)) {
        lastScratchSoundTimeRef.current = now;
        engineRef.current?.triggerVinylScratch(Math.abs(velocity) * 0.9, Math.sign(delta));
        boostHype(2.5);
      }
    }
  };

  const handlePointerUp = (e) => {
    if (isDraggingRecordRef.current) {
      isDraggingRecordRef.current = false;
      try {
        e.currentTarget.releasePointerCapture?.(e.pointerId);
      } catch {
        // Ignore
      }
      setIsDraggingRecord(false);
    }
  };

  // --- Filter Slider ---
  const handleFilterChange = (e) => {
    const val = Number(e.target.value);
    setFilterVal(val);
    engineRef.current?.setDJMasterFilter(val / 100);
  };

  const handleClose = () => {
    // Reset master filter back to neutral when leaving DJ Booth
    engineRef.current?.setDJMasterFilter(0.5);
    setFilterVal(50);
    isDraggingRecordRef.current = false;
    setIsDraggingRecord(false);
    onClose?.();
  };

  if (!isOpen) return null;

  const hypeColor = hype > 75 ? '#f43f5e' : hype > 40 ? '#f59e0b' : '#38bdf8';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 220,
        background: 'rgba(2, 6, 23, 0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        userSelect: 'none',
        padding: '16px'
      }}
      onClick={handleClose}
    >
      <div
        className="game-modal-frame"
        style={{
          background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 60%, #090d16 100%)',
          maxWidth: '740px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          color: '#ffffff',
          position: 'relative',
          padding: '24px 22px',
          border: '4px solid #38bdf8',
          boxShadow: '0 0 35px rgba(56, 189, 248, 0.4), 0 20px 40px rgba(0,0,0,0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red Pop Close Button */}
        <button onClick={handleClose} className="game-close-btn" title="Exit DJ Booth">
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '32px', marginBottom: '2px', animation: 'wiggle 1.5s infinite' }}>🎧 🎛️ ⚡</div>
          <h2 style={{
            fontFamily: "'Lilita One', cursive, sans-serif",
            fontSize: '28px',
            color: '#fef08a',
            letterSpacing: '1.5px',
            textShadow: '0 2px 0 #78350f, 0 4px 8px rgba(0,0,0,0.6)'
          }}>
            REEF DJ BOOTH & SCRATCH PAD
          </h2>
          <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '700' }}>
            Spin the vinyl to scratch & tap the sound pads over your band's beat!
          </div>
        </div>

        {/* Top DJ Hype Meter Bar */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '2px solid #334155',
          borderRadius: '16px',
          padding: '8px 16px',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <div style={{
            fontFamily: "'Lilita One', sans-serif",
            fontSize: '13px',
            color: '#fef08a',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>🔥</span>
            <span>HYPE METER:</span>
          </div>

          <div style={{
            flex: 1,
            height: '18px',
            background: '#090d16',
            borderRadius: '9999px',
            overflow: 'hidden',
            border: '2px solid #1e293b',
            position: 'relative'
          }}>
            <div
              style={{
                width: `${Math.min(100, Math.max(0, hype))}%`,
                height: '100%',
                background: `linear-gradient(90deg, #38bdf8 0%, #facc15 60%, ${hypeColor} 100%)`,
                transition: 'width 0.15s ease-out',
                boxShadow: `0 0 12px ${hypeColor}`
              }}
            />
          </div>

          <div style={{
            fontFamily: "'Lilita One', sans-serif",
            fontSize: '13px',
            color: hypeColor,
            fontWeight: '900',
            minWidth: '70px',
            textAlign: 'right'
          }}>
            {hype >= 85 ? '⚡ MAX HYPE!' : `${Math.round(hype)}%`}
          </div>
        </div>

        {/* Main Stage: Turntable Deck (Left) & 8x Sample Pads (Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 1fr) minmax(280px, 1.3fr)',
          gap: '20px',
          alignItems: 'center',
          marginBottom: '18px'
        }}>
          {/* --- LEFT: TURNTABLE VINYL DECK --- */}
          <div style={{
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '24px',
            padding: '18px 12px',
            border: '3px solid #38bdf8',
            boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            touchAction: 'none'
          }}>
            <div style={{
              fontFamily: "'Lilita One', sans-serif",
              fontSize: '12px',
              color: '#38bdf8',
              letterSpacing: '1px',
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              🪼 SCRATCH VINYL DECK 🪼
            </div>

            {/* Turntable Platter Frame with Tone Arm */}
            <div
              style={{
                width: '210px',
                height: '210px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'none'
              }}
            >
              {/* Metallic Platter Outer Rim */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, #475569, #94a3b8, #475569, #94a3b8, #475569)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.4)',
                  border: '3px solid #1e293b'
                }}
              />

              {/* Spinning Vinyl Record Disc */}
              <div
                ref={turntableElRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={!isDraggingRecord ? 'vinyl-record-spinning' : ''}
                style={{
                  width: '194px',
                  height: '194px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at center, #18181b 0%, #09090b 70%, #000000 100%)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isDraggingRecord ? 'grabbing' : 'grab',
                  transform: isDraggingRecord ? `rotate(${recordRotation}deg)` : undefined,
                  boxShadow: isDraggingRecord ? '0 0 20px #facc15' : 'none',
                  border: '2px solid #27272a',
                  touchAction: 'none'
                }}
              >
                {/* Vinyl Grooves (SVG) */}
                <svg
                  width="190"
                  height="190"
                  viewBox="0 0 190 190"
                  style={{ position: 'absolute', pointerEvents: 'none' }}
                >
                  <circle cx="95" cy="95" r="88" fill="none" stroke="#27272a" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="95" cy="95" r="76" fill="none" stroke="#3f3f46" strokeWidth="1.2" />
                  <circle cx="95" cy="95" r="64" fill="none" stroke="#27272a" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle cx="95" cy="95" r="52" fill="none" stroke="#3f3f46" strokeWidth="1" />
                  <circle cx="95" cy="95" r="40" fill="none" stroke="#27272a" strokeWidth="1.2" />
                </svg>

                {/* Center Neon Jellyfish Label */}
                <div style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #38bdf8 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #ffffff',
                  boxShadow: '0 0 10px rgba(0,0,0,0.6)',
                  pointerEvents: 'none'
                }}>
                  <span style={{ fontSize: '24px', lineHeight: 1 }}>🪼</span>
                  <span style={{
                    fontSize: '8px',
                    fontFamily: "'Lilita One', sans-serif",
                    color: '#ffffff',
                    letterSpacing: '0.5px',
                    marginTop: '2px'
                  }}>
                    JELLY JAMS
                  </span>
                </div>

                {/* Center Spindle Hole */}
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#e2e8f0',
                  border: '2px solid #64748b',
                  position: 'absolute',
                  pointerEvents: 'none'
                }} />
              </div>

              {/* Tone Arm Overlay */}
              <div style={{
                position: 'absolute',
                top: '-6px',
                right: '4px',
                width: '40px',
                height: '80px',
                pointerEvents: 'none',
                filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.7))'
              }}>
                <svg width="40" height="80" viewBox="0 0 40 80">
                  {/* Pivot base */}
                  <circle cx="28" cy="12" r="10" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
                  <circle cx="28" cy="12" r="5" fill="#facc15" />
                  {/* Tone arm metallic rod */}
                  <path d="M 28 12 Q 24 45 12 70" fill="none" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Cartridge & Needle head */}
                  <rect x="6" y="66" width="12" height="10" rx="2" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                </svg>
              </div>
            </div>

            <div style={{
              marginTop: '12px',
              fontSize: '11px',
              color: isDraggingRecord ? '#facc15' : '#94a3b8',
              fontWeight: '800',
              textAlign: 'center'
            }}>
              {isDraggingRecord ? '⚡ SCRATCHING LIVE!' : '👉 Drag record to scratch!'}
            </div>
          </div>

          {/* --- RIGHT: 8x RUBBER SAMPLE PADS --- */}
          <div>
            <div style={{
              fontFamily: "'Lilita One', sans-serif",
              fontSize: '12px',
              color: '#fef08a',
              letterSpacing: '1px',
              marginBottom: '10px',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}>
              🥁 ARCADE SAMPLE SOUND PADS 🥁
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px'
            }}>
              {SAMPLE_PADS.map((pad) => {
                const isPressed = activePad === pad.id;

                return (
                  <button
                    key={pad.id}
                    onClick={() => handlePadPress(pad)}
                    className={`dj-pad-btn ${isPressed ? 'pad-pressed' : ''}`}
                    style={{
                      background: pad.color,
                      padding: '12px 6px',
                      color: '#ffffff',
                      outline: 'none',
                      borderRadius: '16px'
                    }}
                    title={`Trigger ${pad.name}`}
                  >
                    <span style={{ fontSize: '28px', lineHeight: 1, marginBottom: '4px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                      {pad.icon}
                    </span>
                    <span style={{
                      fontFamily: "'Lilita One', sans-serif",
                      fontSize: '13px',
                      lineHeight: 1.15,
                      textAlign: 'center',
                      letterSpacing: '0.5px',
                      paintOrder: 'stroke fill',
                      WebkitTextStroke: '1.5px #090d16',
                      textShadow: '0 2px 0 #090d16'
                    }}>
                      {pad.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- BOTTOM: DJ FILTER CROSSFADER SLIDER --- */}
        <div style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '20px',
          padding: '14px 20px',
          border: '2px solid rgba(56, 189, 248, 0.4)',
          boxShadow: '0 6px 14px rgba(0,0,0,0.4)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            fontFamily: "'Lilita One', sans-serif",
            fontSize: '13px',
            color: '#cbd5e1',
            letterSpacing: '0.5px'
          }}>
            <span style={{ color: filterVal < 40 ? '#38bdf8' : '#94a3b8' }}>
              🌊 SUBMERGED REEF
            </span>
            <span style={{ color: filterVal >= 40 && filterVal <= 60 ? '#fef08a' : '#94a3b8' }}>
              🎛️ NORMAL BEAT (CENTER)
            </span>
            <span style={{ color: filterVal > 60 ? '#f43f5e' : '#94a3b8' }}>
              ⚡ CRISP SIZZLE
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={filterVal}
            onChange={handleFilterChange}
            className="dj-filter-slider"
            title="Slide to filter active band music"
          />
        </div>
      </div>
    </div>
  );
}
