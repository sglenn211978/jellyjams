import { useState } from 'react';

export default function InteractiveReefCritters({ 
  engineRef, 
  onAddCoin,
  onTriggerToast 
}) {
  const [crabSpinning, setCrabSpinning] = useState(false);
  const [eelStates, setEelStates] = useState([false, false, false]); // hidden state for 3 eels
  const [pufferPuffed, setPufferPuffed] = useState(false);

  // 1. DJ Crab Click
  const handleCrabClick = (e) => {
    e.stopPropagation();
    if (crabSpinning) return;
    setCrabSpinning(true);
    engineRef.current?.playCrabSnip();
    onAddCoin?.(1, e);
    onTriggerToast?.('🦀 SNAPPY DANCES! +1 🪙');
    setTimeout(() => setCrabSpinning(false), 800);
  };

  // 2. Garden Eel Click
  const handleEelClick = (index, e) => {
    e.stopPropagation();
    if (eelStates[index]) return;

    setEelStates((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });

    engineRef.current?.playEelBloop();
    onAddCoin?.(1, e);
    onTriggerToast?.('🫧 BLOOP! Wiggle Eel +1 🪙');

    // Pop back up after a short hide
    setTimeout(() => {
      setEelStates((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }, 1200);
  };

  // 3. Pufferfish Click
  const handlePufferClick = (e) => {
    e.stopPropagation();
    if (pufferPuffed) return;
    setPufferPuffed(true);
    engineRef.current?.playPufferPuff();
    onAddCoin?.(1, e);
    onTriggerToast?.('🐡 PUFF! Balloon Spike +1 🪙');
    setTimeout(() => setPufferPuffed(false), 1400);
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 22,
      userSelect: 'none'
    }}>
      {/* 🦀 DJ CRAB ("SNAPPY") - Sitting on a coral rock shelf (Left-Midground) */}
      <div
        onClick={handleCrabClick}
        title="Tap Snappy the DJ Crab! +1 🪙"
        style={{
          position: 'absolute',
          bottom: '125px',
          left: '4%',
          cursor: 'pointer',
          pointerEvents: 'auto',
          transform: crabSpinning ? 'rotate(360deg) scale(1.18)' : 'none',
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <div className={!crabSpinning ? 'crab-groove-anim' : ''} style={{ position: 'relative' }}>
          <svg width="68" height="54" viewBox="0 0 68 54">
            {/* Rock Base */}
            <path d="M 4 48 Q 34 38 64 48 L 60 54 L 8 54 Z" fill="#334155" stroke="#1e293b" strokeWidth="2" />
            
            {/* Left Walking Legs */}
            <path d="M 18 36 Q 8 38 6 48" stroke="#dc2626" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 22 38 Q 14 44 14 50" stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Right Walking Legs */}
            <path d="M 50 36 Q 60 38 62 48" stroke="#dc2626" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 46 38 Q 54 44 54 50" stroke="#dc2626" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Crab Body */}
            <ellipse cx="34" cy="34" rx="16" ry="11" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />

            {/* Left Big Snapping Claw */}
            <g transform={crabSpinning ? 'rotate(-30 18 20)' : 'rotate(-10 18 20)'}>
              <path d="M 24 30 Q 14 26 14 18" stroke="#ef4444" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 14 18 C 6 12 10 4 16 10 C 20 4 24 12 16 18 Z" fill="#f87171" stroke="#b91c1c" strokeWidth="2" />
            </g>

            {/* Right Big Snapping Claw */}
            <g transform={crabSpinning ? 'rotate(30 50 20)' : 'rotate(10 50 20)'}>
              <path d="M 44 30 Q 54 26 54 18" stroke="#ef4444" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 54 18 C 62 12 58 4 52 10 C 48 4 44 12 52 18 Z" fill="#f87171" stroke="#b91c1c" strokeWidth="2" />
            </g>

            {/* Eye Stalks */}
            <line x1="28" y1="26" x2="26" y2="18" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
            <line x1="40" y1="26" x2="42" y2="18" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
            {/* Big Googly Cartoon Eyes */}
            <circle cx="26" cy="16" r="4.5" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
            <circle cx="27" cy="16" r="2.2" fill="#0f172a" />
            <circle cx="28" cy="15" r="0.9" fill="#ffffff" />
            <circle cx="42" cy="16" r="4.5" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
            <circle cx="43" cy="16" r="2.2" fill="#0f172a" />
            <circle cx="44" cy="15" r="0.9" fill="#ffffff" />

            {/* Cool Tiny Backwards DJ Cap */}
            <ellipse cx="34" cy="22" rx="9" ry="3.5" fill="#38bdf8" />
            <path d="M 28 22 Q 34 16 40 22" fill="#0284c7" />
            <rect x="23" y="21" width="6" height="2" rx="1" fill="#facc15" />

            {/* Rosy Cheeks & Smile */}
            <ellipse cx="28" cy="36" rx="2.5" ry="1.5" fill="#fca5a5" />
            <ellipse cx="40" cy="36" rx="2.5" ry="1.5" fill="#fca5a5" />
            <path d="M 31 36 Q 34 40 37 36" stroke="#991b1b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 🌿 THE WIGGLE EELS (3 Cartoon Garden Eels in Sand Dunes, Right Seafloor) */}
      <div style={{
        position: 'absolute',
        bottom: '36px',
        right: '18%',
        display: 'flex',
        gap: '18px',
        alignItems: 'flex-end',
        pointerEvents: 'auto'
      }}>
        {[0, 1, 2].map((idx) => {
          const isHiding = eelStates[idx];
          const delay = `${idx * 0.4}s`;
          const eelColors = ['#fde047', '#38bdf8', '#a78bfa'];
          const spotColors = ['#ca8a04', '#0284c7', '#7c3aed'];

          return (
            <div
              key={idx}
              onClick={(e) => handleEelClick(idx, e)}
              title="Tap the Garden Eel! +1 🪙"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: isHiding ? 'translateY(42px)' : 'translateY(0)',
                transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div 
                className={!isHiding ? 'eel-bob-anim' : ''}
                style={{ animationDelay: delay }}
              >
                <svg width="24" height="52" viewBox="0 0 24 52">
                  {/* Eel Body */}
                  <path
                    d="M 12 52 Q 6 34 14 18 Q 16 10 12 4 Q 8 10 10 18 Q 14 34 12 52 Z"
                    fill={eelColors[idx]}
                    stroke={spotColors[idx]}
                    strokeWidth="1.5"
                  />
                  {/* Spots */}
                  <circle cx="12" cy="18" r="1.5" fill={spotColors[idx]} />
                  <circle cx="11" cy="28" r="1.8" fill={spotColors[idx]} />
                  <circle cx="13" cy="38" r="1.5" fill={spotColors[idx]} />
                  {/* Head & Big Cartoon Eyes */}
                  <circle cx="12" cy="6" r="5" fill={eelColors[idx]} />
                  <circle cx="10" cy="5" r="2.2" fill="#ffffff" stroke="#1e293b" strokeWidth="0.8" />
                  <circle cx="10" cy="5" r="1.1" fill="#000000" />
                  <circle cx="14" cy="5" r="2.2" fill="#ffffff" stroke="#1e293b" strokeWidth="0.8" />
                  <circle cx="14" cy="5" r="1.1" fill="#000000" />
                  <path d="M 11 8 Q 12 9 13 8" stroke="#713f12" strokeWidth="0.8" fill="none" />
                </svg>
              </div>

              {/* Sand Hole Mound */}
              <div style={{
                width: '26px',
                height: '8px',
                borderRadius: '50%',
                background: '#78350f',
                border: '2px solid #ca8a04',
                marginTop: '-4px'
              }} />
            </div>
          );
        })}
      </div>

      {/* 🐡 PUFFERFISH ("PUFFY") - Lazy Floater (Right Upper Reef) */}
      <div
        onClick={handlePufferClick}
        title="Tap Puffy to inflate! +1 🪙"
        style={{
          position: 'absolute',
          top: '22%',
          right: '8%',
          cursor: 'pointer',
          pointerEvents: 'auto',
          transform: pufferPuffed ? 'scale(1.5) rotate(15deg)' : 'scale(1)',
          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <svg width="48" height="42" viewBox="0 0 48 42">
          {/* Spikes when puffed */}
          {pufferPuffed && (
            <g stroke="#eab308" strokeWidth="2.5" strokeLinecap="round">
              <line x1="24" y1="4" x2="24" y2="0" />
              <line x1="12" y1="8" x2="8" y2="4" />
              <line x1="36" y1="8" x2="40" y2="4" />
              <line x1="6" y1="20" x2="1" y2="20" />
              <line x1="42" y1="20" x2="47" y2="20" />
              <line x1="12" y1="34" x2="8" y2="38" />
              <line x1="36" y1="34" x2="40" y2="38" />
            </g>
          )}

          {/* Round Balloon Body */}
          <circle cx="24" cy="22" r={pufferPuffed ? '18' : '14'} fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
          <ellipse cx="24" cy="27" rx={pufferPuffed ? '14' : '10'} ry={pufferPuffed ? '8' : '6'} fill="#fef08a" />

          {/* Tail Fin */}
          <polygon points="10,22 2,16 4,22 2,28" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />

          {/* Big Surprised Googly Eyes */}
          <circle cx="31" cy="18" r="4.5" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
          <circle cx="32" cy="18" r="2" fill="#000000" />
          <circle cx="33" cy="17" r="0.8" fill="#ffffff" />

          {/* Round Pursed Mouth (O-shaped when puffed) */}
          {pufferPuffed ? (
            <circle cx="38" cy="23" r="2.5" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
          ) : (
            <path d="M 37 23 Q 39 24 37 25" stroke="#991b1b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          )}

          {/* Tiny Fanning Pectoral Fin */}
          <ellipse cx="22" cy="24" rx="4" ry="3" fill="#eab308" transform="rotate(-15 22 24)" />
        </svg>
      </div>
    </div>
  );
}
