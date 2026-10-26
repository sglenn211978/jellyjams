import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const FlyingCoinOverlay = forwardRef(function FlyingCoinOverlay(
  { targetRef, onCoinArrived }, 
  ref
) {
  const [activeCoins, setActiveCoins] = useState([]);
  const [bankSparkles, setBankSparkles] = useState([]);
  const animFrameRef = useRef(null);
  const activeCoinsRef = useRef([]);

  // Keep ref synchronized with state to avoid closure stalls
  activeCoinsRef.current = activeCoins;

  useImperativeHandle(ref, () => ({
    spawnCoins({ count = 1, startX, startY, totalAmount = 1 }) {
      // Find destination coordinates (Bank coin badge)
      let endX = window.innerWidth - 75;
      let endY = 40;

      if (targetRef?.current) {
        const rect = targetRef.current.getBoundingClientRect();
        endX = rect.left + rect.width / 2;
        endY = rect.top + rect.height / 2;
      }

      const originX = typeof startX === 'number' && !isNaN(startX) ? startX : window.innerWidth / 2;
      const originY = typeof startY === 'number' && !isNaN(startY) ? startY : window.innerHeight / 2;

      // Distribute coin values across the flying count
      const numCoins = Math.min(Math.max(1, count), 8);
      const valPerCoin = Math.max(1, Math.floor(totalAmount / numCoins));
      const remainder = totalAmount - (valPerCoin * numCoins);

      const now = performance.now();
      const newCoins = [];

      for (let i = 0; i < numCoins; i++) {
        // Staggered launch delay
        const delay = i * 85; 
        const duration = 650 + Math.random() * 150;

        // Random fountain burst outward before curving into the bank magnet
        const burstRadius = 40 + Math.random() * 60;
        const burstAngle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6; // upward arc cone
        const burstX = originX + Math.cos(burstAngle) * burstRadius;
        const burstY = originY + Math.sin(burstAngle) * burstRadius;

        // Control point for parabolic apex
        const controlX = (burstX + endX) / 2 + (Math.random() - 0.5) * 80;
        const controlY = Math.min(burstY, endY) - (90 + Math.random() * 90);

        newCoins.push({
          id: `${now}-${i}-${Math.random()}`,
          startX: burstX,
          startY: burstY,
          controlX,
          controlY,
          endX,
          endY,
          startTime: now + delay,
          duration,
          progress: 0,
          value: i === numCoins - 1 ? valPerCoin + remainder : valPerCoin,
          step: i
        });
      }

      setActiveCoins((prev) => [...prev, ...newCoins]);
    }
  }));

  // Buttery-smooth 60fps requestAnimationFrame loop
  useEffect(() => {
    if (activeCoins.length === 0) return;

    let isRunning = true;

    const tick = (now) => {
      if (!isRunning) return;

      const currentCoins = activeCoinsRef.current;
      if (currentCoins.length === 0) return;

      const surviving = [];
      const arrived = [];

      for (const coin of currentCoins) {
        if (now < coin.startTime) {
          // Waiting for launch delay
          surviving.push(coin);
          continue;
        }

        const elapsed = now - coin.startTime;
        const t = Math.min(1, elapsed / coin.duration);

        if (t >= 1) {
          arrived.push(coin);
        } else {
          surviving.push({
            ...coin,
            progress: t
          });
        }
      }

      // Handle newly arrived coins
      if (arrived.length > 0) {
        for (const c of arrived) {
          onCoinArrived?.(c.value, c.step);

          // Spawn burst sparkles at destination
          const newSparkles = Array.from({ length: 4 }).map((_, idx) => ({
            id: `${now}-${idx}-${Math.random()}`,
            x: c.endX,
            y: c.endY,
            dx: (Math.random() - 0.5) * 48,
            dy: (Math.random() - 0.5) * 48,
            char: idx % 2 === 0 ? '✨' : '⭐'
          }));

          setBankSparkles((prev) => [...prev.slice(-12), ...newSparkles]);
        }

        // Clean up sparkles after animation
        setTimeout(() => {
          setBankSparkles((prev) => prev.slice(4));
        }, 450);
      }

      setActiveCoins(surviving);

      if (surviving.length > 0) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [activeCoins.length, onCoinArrived]);

  return (
    <div 
      className="flying-coin-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* 1. Animated Flying Coins */}
      {activeCoins.map((coin) => {
        if (coin.progress <= 0) return null;

        const t = coin.progress;
        // Quadratic Bézier curve position: B(t) = (1-t)^2 * P0 + 2*(1-t)*t * P1 + t^2 * P2
        const invT = 1 - t;
        const curX = invT * invT * coin.startX + 2 * invT * t * coin.controlX + t * t * coin.endX;
        const curY = invT * invT * coin.startY + 2 * invT * t * coin.controlY + t * t * coin.endY;

        // Dynamic cartoon squash, stretch and spin
        const scale = 0.65 + 0.8 * Math.sin(t * Math.PI); // swells in mid-flight then shrinks into bank
        const rot = t * 720; // 2 complete 3D spins

        return (
          <div
            key={coin.id}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translate3d(${curX - 18}px, ${curY - 18}px, 0) scale(${scale}) rotate(${rot}deg)`,
              willChange: 'transform',
              filter: 'drop-shadow(0 4px 10px rgba(234, 179, 8, 0.75))'
            }}
          >
            {/* Gleaming Cartoon 3D Gold Coin */}
            <svg width="36" height="36" viewBox="0 0 36 36">
              <defs>
                <radialGradient id="coinGoldGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="40%" stopColor="#facc15" />
                  <stop offset="85%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#a16207" />
                </radialGradient>
              </defs>
              <circle cx="18" cy="18" r="16" fill="url(#coinGoldGrad)" stroke="#78350f" strokeWidth="2.5" />
              <circle cx="18" cy="18" r="11" fill="none" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 2" />
              <text x="18" y="23" textAnchor="middle" fill="#78350f" fontSize="14" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ★
              </text>
            </svg>
          </div>
        );
      })}

      {/* 2. Destination Bank Impact Sparkles */}
      {bankSparkles.map((sp) => (
        <span
          key={sp.id}
          className="coin-sparkle-mote"
          style={{
            left: `${sp.x - 7}px`,
            top: `${sp.y - 7}px`,
            '--spark-x': `${sp.dx}px`,
            '--spark-y': `${sp.dy}px`
          }}
        >
          {sp.char}
        </span>
      ))}
    </div>
  );
});

export default FlyingCoinOverlay;
