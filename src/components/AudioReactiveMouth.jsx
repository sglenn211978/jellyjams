import { useRef, useEffect } from 'react';

/**
 * AudioReactiveMouth - Direct SVG DOM Lip-Sync Component
 *
 * Uses requestAnimationFrame to query WebAudio AnalyserNode amplitude directly.
 * Zero React re-renders, 60 FPS hardware-smooth lip sync.
 *
 * - When energy < 0.05: Closed resting smile (‿)
 * - When energy >= 0.05: Opens, stretches, and pulses to vocal waveform!
 */
export default function AudioReactiveMouth({
  monsterId,
  audioEngine,
  isSleeping = false,
  restingD = 'M 78 72 Q 90 80 102 72',
  centerX = 90,
  centerY = 74,
  mouthWidth = 28,
  mouthHeight = 26,
  lipColor = '#881337',
  tongueColor = '#f43f5e',
  strokeColor = '#0f172a',
  strokeWidth = 2.8,
  hasTeeth = true,
  toothCount = 1
}) {
  const restingRef = useRef(null);
  const singingGroupRef = useRef(null);
  const tongueRef = useRef(null);

  useEffect(() => {
    let animId;
    let smoothedEnergy = 0;

    const tick = () => {
      const restingEl = restingRef.current;
      const singingGroup = singingGroupRef.current;
      const tongueEl = tongueRef.current;

      if (!restingEl || !singingGroup) {
        animId = requestAnimationFrame(tick);
        return;
      }

      if (isSleeping) {
        restingEl.style.display = 'block';
        singingGroup.style.display = 'none';
        animId = requestAnimationFrame(tick);
        return;
      }

      const rawEnergy = audioEngine?.getVocalEnergy
        ? audioEngine.getVocalEnergy(monsterId)
        : 0;

      // Smooth attack / release envelope
      const target = rawEnergy > 0.06 ? rawEnergy : 0;
      smoothedEnergy += (target - smoothedEnergy) * 0.42;

      if (smoothedEnergy < 0.05) {
        restingEl.style.display = 'block';
        singingGroup.style.display = 'none';
      } else {
        restingEl.style.display = 'none';
        singingGroup.style.display = 'block';

        // Scale mouth vertically and slightly horizontally to vocal energy
        const scaleY = 0.45 + smoothedEnergy * 0.95;
        const scaleX = 0.85 + smoothedEnergy * 0.35;
        singingGroup.setAttribute(
          'transform',
          `translate(${centerX}, ${centerY}) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)}) translate(${-centerX}, ${-centerY})`
        );

        if (tongueEl) {
          const tongueRy = (3.5 * (0.6 + smoothedEnergy * 0.6)).toFixed(1);
          tongueEl.setAttribute('ry', tongueRy);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [audioEngine, monsterId, isSleeping, centerX, centerY]);

  const halfW = mouthWidth / 2;
  const mouthPath = `M ${centerX - halfW} ${centerY} Q ${centerX} ${centerY + mouthHeight} ${centerX + halfW} ${centerY} Z`;

  return (
    <g>
      {/* 1. Closed Resting Smile Curve (Shown when resting between phrases or asleep) */}
      <path
        ref={restingRef}
        d={restingD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* 2. Audio-Reactive Open Singing Mouth (Shown only when vocals hit) */}
      <g ref={singingGroupRef} style={{ display: 'none' }}>
        {/* Throat cavity */}
        <path
          d={mouthPath}
          fill={lipColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />

        {/* Bouncy Tongue */}
        <ellipse
          ref={tongueRef}
          cx={centerX}
          cy={centerY + mouthHeight * 0.55}
          rx={halfW * 0.55}
          ry={mouthHeight * 0.22}
          fill={tongueColor}
        />

        {/* Teeth */}
        {hasTeeth && (
          toothCount === 2 ? (
            <>
              <rect
                x={centerX - halfW * 0.5}
                y={centerY}
                width={halfW * 0.42}
                height={mouthHeight * 0.22}
                rx="1"
                fill="#ffffff"
                stroke={strokeColor}
                strokeWidth="1"
              />
              <rect
                x={centerX + halfW * 0.08}
                y={centerY}
                width={halfW * 0.42}
                height={mouthHeight * 0.22}
                rx="1"
                fill="#ffffff"
                stroke={strokeColor}
                strokeWidth="1"
              />
            </>
          ) : (
            <rect
              x={centerX - halfW * 0.45}
              y={centerY}
              width={halfW * 0.9}
              height={mouthHeight * 0.18}
              rx="1.5"
              fill="#ffffff"
            />
          )
        )}
      </g>
    </g>
  );
}
