import { useState, useRef, useEffect } from 'react';

const PRIZES = [
  { id: 'coins_10', label: '10 COINS', type: 'coins', amount: 10, icon: '🪙', color: '#38bdf8', bg: '#0284c7' },
  { id: 'cake', label: 'KELP CAKE', type: 'treat', treat: 'cupcake', icon: '🧁', color: '#facc15', bg: '#ca8a04' },
  { id: 'coins_25', label: '25 COINS!', type: 'coins', amount: 25, icon: '💰', color: '#34d399', bg: '#059669' },
  { id: 'donut', label: 'CORAL DONUT', type: 'treat', treat: 'donut', icon: '🍩', color: '#f472b6', bg: '#db2777' },
  { id: 'coins_5', label: '5 COINS', type: 'coins', amount: 5, icon: '🪙', color: '#a78bfa', bg: '#7c3aed' },
  { id: 'egg', label: 'MYSTERY EGG', type: 'egg', icon: '🔮', color: '#fb923c', bg: '#ea580c' },
  { id: 'jackpot_50', label: 'JACKPOT 50!', type: 'coins', amount: 50, icon: '⭐', color: '#fde047', bg: '#eab308' },
  { id: 'costume', label: 'PARTY HAT', type: 'costume', costumeId: 'tophat', icon: '🎩', color: '#ec4899', bg: '#be185d' }
];

const CONFETTI_PARTICLES = [
  { id: 1, left: '20%', top: '20%', dx: -35, dy: -40, char: '⭐' },
  { id: 2, left: '35%', top: '15%', dx: 45, dy: -30, char: '✨' },
  { id: 3, left: '50%', top: '25%', dx: -20, dy: 50, char: '🎉' },
  { id: 4, left: '65%', top: '18%', dx: 30, dy: 40, char: '💖' },
  { id: 5, left: '80%', top: '22%', dx: -45, dy: -20, char: '🪙' },
  { id: 6, left: '25%', top: '45%', dx: 25, dy: -50, char: '⭐' },
  { id: 7, left: '40%', top: '50%', dx: -30, dy: 30, char: '✨' },
  { id: 8, left: '60%', top: '45%', dx: 40, dy: -10, char: '🎉' },
  { id: 9, left: '75%', top: '55%', dx: -15, dy: -35, char: '💖' },
  { id: 10, left: '30%', top: '70%', dx: 35, dy: 25, char: '🪙' },
  { id: 11, left: '50%', top: '75%', dx: -40, dy: 45, char: '⭐' },
  { id: 12, left: '70%', top: '70%', dx: 20, dy: -40, char: '✨' }
];

export default function LuckyStarfishWheelModal({
  isOpen,
  onClose,
  coins = 0,
  engineRef,
  onAwardCoins,
  onAwardTreat,
  onAwardEgg,
  onAwardCostume,
  onTriggerToast
}) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningPrize, setWinningPrize] = useState(null);
  const [freeSpinsLeft, setFreeSpinsLeft] = useState(1);
  const [pointerFlicking, setPointerFlicking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const animRef = useRef(null);
  const lastPegIndexRef = useRef(-1);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const numSlices = PRIZES.length;
  const sliceAngle = 360 / numSlices;

  const spinCost = freeSpinsLeft > 0 ? 0 : 5;
  const canSpin = !isSpinning && (freeSpinsLeft > 0 || coins >= spinCost);

  const handleStartSpin = () => {
    if (!canSpin) return;

    if (freeSpinsLeft > 0) {
      setFreeSpinsLeft((f) => f - 1);
    } else {
      onAwardCoins?.(-spinCost);
    }

    setIsSpinning(true);
    setWinningPrize(null);
    setShowConfetti(false);

    // Pick target prize with weighted or uniform probability
    const targetIndex = Math.floor(Math.random() * numSlices);
    
    // Extra full spins (5-8 full rotations) for dramatic tension
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    
    // Angle math: pointer is at top (270 degrees or 0 in SVG polar)
    // Slices are ordered clockwise. To land slice at top pointer:
    const targetSliceAngle = (numSlices - targetIndex) * sliceAngle - (sliceAngle / 2);
    const targetRotation = rotation + (fullSpins * 360) + (targetSliceAngle - (rotation % 360)) + (Math.random() - 0.5) * (sliceAngle * 0.6);

    const startRot = rotation;
    const totalDistance = targetRotation - startRot;
    const startTime = performance.now();
    const duration = 4200; // 4.2 seconds smooth spin deceleration

    const animateSpin = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Quartic ease-out for realistic wheel friction
      const ease = 1 - Math.pow(1 - progress, 4);
      const currentRot = startRot + totalDistance * ease;

      setRotation(currentRot);

      // Peg ticking sound calculation
      const normalizedAngle = (currentRot % 360 + 360) % 360;
      const currentPeg = Math.floor(normalizedAngle / sliceAngle);

      if (currentPeg !== lastPegIndexRef.current) {
        lastPegIndexRef.current = currentPeg;
        // Pitch ramps slightly as wheel slows down
        engineRef?.current?.playWheelTick(520 + Math.random() * 80);
        setPointerFlicking(true);
        setTimeout(() => setPointerFlicking(false), 50);
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animateSpin);
      } else {
        // Spin finished!
        setIsSpinning(false);
        const winning = PRIZES[targetIndex];
        setWinningPrize(winning);
        setShowConfetti(true);

        // Play fanfare celebration sound
        engineRef?.current?.playSuccessFanfare();

        // Deliver prize
        if (winning.type === 'coins') {
          onAwardCoins?.(winning.amount);
          onTriggerToast?.(`🎉 WHEEL PRIZE: +${winning.amount} 🪙!`);
        } else if (winning.type === 'treat') {
          onAwardTreat?.(winning.treat);
          onTriggerToast?.(`🎉 WON A SWEET ${winning.label}!`);
        } else if (winning.type === 'egg') {
          onAwardEgg?.();
          onTriggerToast?.('🔮 WON A MYSTERY REMIX EGG!');
        } else if (winning.type === 'costume') {
          onAwardCostume?.(winning.costumeId);
          onTriggerToast?.('🎩 UNLOCKED EXCLUSIVE PARTY HAT!');
        }
      }
    };

    animRef.current = requestAnimationFrame(animateSpin);
  };

  return (
    <div 
      className="modal-backdrop-blur"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(2, 6, 23, 0.78)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        padding: '16px'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          border: '4px solid #facc15',
          borderRadius: '32px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(250, 204, 21, 0.4)',
          width: 'min(480px, 94vw)',
          padding: '24px 20px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Confetti Explosion on Big Win */}
        {showConfetti && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
            {CONFETTI_PARTICLES.map((p) => (
              <span
                key={p.id}
                className="coin-sparkle-mote"
                style={{
                  left: p.left,
                  top: p.top,
                  fontSize: '22px',
                  '--spark-x': `${p.dx}px`,
                  '--spark-y': `${p.dy}px`
                }}
              >
                {p.char}
              </span>
            ))}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="game-btn game-btn-red"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            padding: 0,
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30
          }}
        >
          ✕
        </button>

        {/* Mascot Header: Barnaby the Carnival Starfish */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          {/* Animated Starfish with Top Hat */}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            <svg width="56" height="56" viewBox="0 0 56 56">
              {/* Starfish Body */}
              <polygon 
                points="28,4 35,20 52,22 39,34 43,51 28,41 13,51 17,34 4,22 21,20" 
                fill="#f97316" 
                stroke="#c2410c" 
                strokeWidth="3" 
              />
              {/* Big Cute Eyes */}
              <circle cx="23" cy="24" r="3.2" fill="#ffffff" />
              <circle cx="24" cy="24" r="1.6" fill="#000000" />
              <circle cx="33" cy="24" r="3.2" fill="#ffffff" />
              <circle cx="34" cy="24" r="1.6" fill="#000000" />
              {/* Happy Smile */}
              <path d="M 24 31 Q 28 35 32 31" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Mini Black Top Hat */}
              <g transform="translate(18, 0)">
                <ellipse cx="10" cy="14" rx="10" ry="3" fill="#0f172a" stroke="#facc15" strokeWidth="1" />
                <rect x="3" y="2" width="14" height="11" rx="2" fill="#0f172a" />
                <rect x="3" y="9" width="14" height="3" fill="#e11d48" />
              </g>
            </svg>
          </div>

          <div>
            <h2 style={{
              margin: 0,
              fontFamily: "'Lilita One', cursive, sans-serif",
              fontSize: '24px',
              color: '#fef08a',
              textShadow: '0 3px 0 #78350f, 0 4px 10px rgba(0,0,0,0.5)',
              letterSpacing: '1px',
              lineHeight: 1.1
            }}>
              LUCKY STARFISH WHEEL
            </h2>
            <div style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: '13px',
              color: '#94a3b8',
              fontWeight: '600'
            }}>
              Step right up! Spin to win awesome reef prizes!
            </div>
          </div>
        </div>

        {/* 🎡 THE CARNIVAL PRIZE WHEEL CONTAINER */}
        <div style={{ position: 'relative', width: '310px', height: '310px', margin: '8px 0' }}>
          {/* Top Ticker Pointer Peg */}
          <div 
            style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: `translateX(-50%) ${pointerFlicking ? 'rotate(-18deg)' : 'rotate(0deg)'}`,
              transition: 'transform 0.05s ease',
              zIndex: 25,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
            }}
          >
            <svg width="34" height="42" viewBox="0 0 34 42">
              <polygon points="17,40 5,6 29,6" fill="#e11d48" stroke="#ffffff" strokeWidth="2.5" />
              <circle cx="17" cy="10" r="5" fill="#facc15" />
            </svg>
          </div>

          {/* Outer Marquee Ring with Lights */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '10px solid #78350f',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.5)',
              zIndex: 10,
              pointerEvents: 'none'
            }}
          />

          {/* The Spinning Wheel Slices SVG */}
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: `rotate(${rotation}deg)`,
              willChange: 'transform'
            }}
          >
            <svg width="310" height="310" viewBox="0 0 310 310">
              <defs>
                <clipPath id="wheelClip">
                  <circle cx="155" cy="155" r="145" />
                </clipPath>
              </defs>

              <g clipPath="url(#wheelClip)">
                {PRIZES.map((prize, idx) => {
                  const startAngle = idx * sliceAngle;
                  const endAngle = startAngle + sliceAngle;
                  const midAngle = startAngle + sliceAngle / 2;

                  // Polar coordinates to cartesian SVG arc
                  const rad1 = (startAngle - 90) * (Math.PI / 180);
                  const rad2 = (endAngle - 90) * (Math.PI / 180);
                  const x1 = 155 + 150 * Math.cos(rad1);
                  const y1 = 155 + 150 * Math.sin(rad1);
                  const x2 = 155 + 150 * Math.cos(rad2);
                  const y2 = 155 + 150 * Math.sin(rad2);

                  // Label positioning along mid radius
                  const textRad = (midAngle - 90) * (Math.PI / 180);
                  const textX = 155 + 98 * Math.cos(textRad);
                  const textY = 155 + 98 * Math.sin(textRad);

                  return (
                    <g key={prize.id}>
                      {/* Segment Wedge */}
                      <path
                        d={`M 155 155 L ${x1} ${y1} A 150 150 0 0 1 ${x2} ${y2} Z`}
                        fill={idx % 2 === 0 ? prize.color : prize.bg}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                      />

                      {/* Prize Icon & Label */}
                      <g transform={`translate(${textX}, ${textY}) rotate(${midAngle + 90})`}>
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#ffffff"
                          fontSize="18"
                          fontWeight="bold"
                          filter="drop-shadow(0 1px 3px rgba(0,0,0,0.6))"
                        >
                          {prize.icon}
                        </text>
                        <text
                          y="15"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#ffffff"
                          fontFamily="'Lilita One', sans-serif"
                          fontSize="10"
                          letterSpacing="0.5px"
                          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))"
                        >
                          {prize.label}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>

              {/* Center Hub & Gold Peg */}
              <circle cx="155" cy="155" r="28" fill="#facc15" stroke="#78350f" strokeWidth="4" />
              <circle cx="155" cy="155" r="16" fill="#fef08a" />
              <text x="155" y="160" textAnchor="middle" fill="#78350f" fontSize="16" fontWeight="bold">
                ⭐
              </text>
            </svg>
          </div>
        </div>

        {/* WINNING NOTIFICATION BANNER */}
        {winningPrize && (
          <div 
            className="bonus-toast-anim"
            style={{
              position: 'relative',
              top: 0,
              left: 0,
              transform: 'none',
              margin: '8px 0',
              padding: '8px 24px',
              fontSize: '16px',
              border: '2.5px solid #ffffff'
            }}
          >
            🎉 YOU WON: {winningPrize.label} {winningPrize.icon}!
          </div>
        )}

        {/* 🔘 ACTION BUTTON & STATUS */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
          <button
            onClick={handleStartSpin}
            disabled={!canSpin}
            className={`game-btn ${canSpin ? 'game-btn-green' : 'game-btn-stone'}`}
            style={{
              padding: '14px 40px',
              fontSize: '18px',
              borderRadius: '24px',
              transform: canSpin && !isSpinning ? 'scale(1.04)' : 'none',
              animation: canSpin && !isSpinning ? 'wiggle 3s ease-in-out infinite' : 'none'
            }}
          >
            <span>{isSpinning ? 'SPINNING...' : '🎡 SPIN THE WHEEL!'}</span>
          </button>

          <div style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '14px',
            color: '#e2e8f0',
            fontWeight: '800'
          }}>
            {freeSpinsLeft > 0 ? (
              <span style={{ color: '#4ade80' }}>✨ 1 Free Daily Spin Available!</span>
            ) : (
              <span>Cost: 5 🪙 (You have {coins} 🪙)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
