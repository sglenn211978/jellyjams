import { useState } from 'react';

export default function CoralRemixPod({ 
  coins, 
  egg, 
  isSelecting, 
  onStartSelect, 
  onCancelSelect, 
  onCrackEgg, 
  isNight 
}) {
  const [wobble, setWobble] = useState(false);

  const handleEggClick = () => {
    setWobble(true);
    onCrackEgg();
    setTimeout(() => setWobble(false), 260);
  };

  return (
    <div className="seafloor-pod-container" style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      userSelect: 'none'
    }}>
      {!egg ? (
        <button
          onClick={isSelecting ? onCancelSelect : onStartSelect}
          disabled={!isSelecting && coins < 10}
          className={`game-btn ${isSelecting ? 'game-btn-red' : coins >= 10 ? 'game-btn-purple' : 'game-btn-stone'}`}
          style={{
            padding: '11px 24px',
            fontSize: '15.5px',
            marginBottom: '8px'
          }}
          title="Breed two performers in the Remix Pod (10 Coins)"
        >
          {isSelecting ? '❌ CANCEL REMIX' : '🧬 REMIX POD (10 🪙)'}
        </button>
      ) : (
        <button 
          onClick={handleEggClick}
          className="game-btn game-btn-yellow"
          style={{
            padding: '11px 24px',
            fontSize: '15.5px',
            marginBottom: '8px',
            animation: 'bankPulse 1.1s infinite'
          }}
          title="Click to tap and crack open the egg!"
        >
          🐣 TAP TO CRACK! ({egg.tapsRemaining}/3)
        </button>
      )}

      <div 
        onClick={egg ? handleEggClick : undefined}
        style={{ position: 'relative', width: '120px', height: '80px', cursor: egg ? 'pointer' : 'default' }}
      >
        <svg width="120" height="80" viewBox="0 0 120 80">
          <ellipse cx="60" cy="62" rx="50" ry="16" fill="#1e1b4b" stroke="#0f172a" strokeWidth="4" />
          <g className="pod-swirl-ring">
            <ellipse cx="60" cy="62" rx="40" ry="10" fill="none" stroke="#a855f7" strokeWidth="3.5" strokeDasharray="14 10" opacity="0.9" />
          </g>
          {/* Coral Pillars with Comic Inking */}
          <path d="M 16 62 Q 10 36 24 26 Q 30 42 28 62" fill="#ec4899" stroke="#0f172a" strokeWidth="2.5" />
          <path d="M 104 62 Q 110 36 96 26 Q 90 42 92 62" fill="#38bdf8" stroke="#0f172a" strokeWidth="2.5" />
        </svg>

        {egg && (
          <div
            onClick={handleEggClick}
            className={`egg-pulse ${wobble ? 'egg-wobble-tap' : ''}`}
            style={{
              position: 'absolute',
              top: '-20px',
              left: '31px',
              zIndex: 48,
              filter: isNight ? 'drop-shadow(0 0 12px #a855f7)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.35))'
            }}
          >
            <svg width="58" height="74" viewBox="0 0 58 74">
              <defs>
                <clipPath id="eggCelClip">
                  <ellipse cx="29" cy="38" rx="24" ry="32" />
                </clipPath>
                <linearGradient id="eggGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="50%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>

              {/* Cel-Shaded Egg with Bold Ink Outline */}
              <ellipse cx="29" cy="38" rx="24" ry="32" fill="url(#eggGrad)" stroke="#0f172a" strokeWidth="4" />

              {/* Hard Cel Shadow Crescent on Underside */}
              <g clipPath="url(#eggCelClip)">
                <path d="M 29 10 C 42 10, 53 22, 53 38 C 53 54, 42 70, 29 70 Q 42 52 40 38 Q 38 24 29 10 Z" fill="#0f172a" opacity="0.3" />
              </g>

              {/* Specular Highlight Gloss Arc on Upper Left */}
              <path d="M 14 26 Q 22 14 36 16" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
              <circle cx="41" cy="18" r="2" fill="#ffffff" opacity="0.85" />

              {/* Comic Cracks */}
              {egg.tapsRemaining <= 2 && (
                <path d="M 29 16 L 22 28 L 34 38" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              )}
              {egg.tapsRemaining <= 1 && (
                <path d="M 34 38 L 24 50 L 38 60" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
