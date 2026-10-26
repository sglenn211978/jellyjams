import { useState } from 'react';

export default function PearlClam({ onPearlCollect, isNight }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClamClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    onPearlCollect();
    setTimeout(() => setIsOpen(false), 2400);
  };

  return (
    <div
      onClick={handleClamClick}
      className={`seafloor-clam-container ${!isOpen ? 'clam-breathe-anim' : ''}`}
      style={{
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        marginBottom: '6px'
      }}
      title="Tap the Giant Pearl Clam for shiny loot!"
    >
      {isOpen && (
        <div className="pearl-reward-anim" style={{
          position: 'absolute',
          top: '-20px',
          left: '32px',
          fontSize: '24px',
          zIndex: 50
        }}>
          ✨+3🪙
        </div>
      )}

      <svg width="105" height="72" viewBox="0 0 105 72">
        {isOpen && (
          <g style={{ filter: isNight ? 'drop-shadow(0 0 10px #38bdf8)' : 'none' }}>
            <circle cx="52" cy="40" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
            <path d="M 46 32 Q 52 28 60 30" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="48" cy="36" r="2.5" fill="#ffffff" />
          </g>
        )}

        {/* Lower Clam Shell with Bold Ink Contour */}
        <path d="M 16 50 Q 52 74 88 50 Q 82 40 52 42 Q 22 40 16 50 Z" fill="#7e22ce" stroke="#0f172a" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 22 48 Q 52 64 82 48 Q 52 56 22 48 Z" fill="#581c87" />
        
        {/* Upper Clam Shell (Mouth Lid) */}
        <g transform={isOpen ? 'translate(0, -22) rotate(-22 52 35)' : ''} style={{ transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <path d="M 16 48 Q 52 10 88 48 Q 52 42 16 48 Z" fill="#c084fc" stroke="#0f172a" strokeWidth="4" strokeLinejoin="round" />
          {/* Shell Ridges with Dark Ink */}
          <path d="M 32 44 Q 52 18 72 44" stroke="#0f172a" strokeWidth="2.5" fill="none" />
          <path d="M 44 42 Q 52 14 60 42" stroke="#0f172a" strokeWidth="2.5" fill="none" />
          {/* Specular Shine Arc */}
          <path d="M 24 38 Q 42 16 64 16" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
