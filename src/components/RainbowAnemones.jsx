import { useState, useRef } from 'react';

const ANEMONE_KEYS = [
  { name: 'Do', color: '#ef4444', accent: '#fca5a5', shadow: '#b91c1c', symbol: '♪' },
  { name: 'Re', color: '#f97316', accent: '#fdba74', shadow: '#c2410c', symbol: '♫' },
  { name: 'Mi', color: '#eab308', accent: '#fef08a', shadow: '#a16207', symbol: '♬' },
  { name: 'Sol', color: '#10b981', accent: '#6ee7b7', shadow: '#047857', symbol: '⭐' },
  { name: 'La', color: '#06b6d4', accent: '#67e8f9', shadow: '#0e7490', symbol: '💖' }
];

export default function RainbowAnemones({ 
  islandId = 'lagoon', 
  engineRef, 
  onAddCoin,
  onTriggerToast 
}) {
  const [activeNote, setActiveNote] = useState(null);
  const [tapCounter, setTapCounter] = useState(0);
  const noteTapCountRef = useRef(0);

  const handleAnemoneTap = (index, e) => {
    e.stopPropagation();

    // 1. Play musical steel-pan / xylophone note tuned to current island
    engineRef?.current?.playXylophoneNote(islandId, index);

    // 2. Visual squish & floating note bubble
    noteTapCountRef.current += 1;
    setActiveNote({ index, id: noteTapCountRef.current });

    // 3. Play streak reward every 5 notes played
    const nextCount = tapCounter + 1;
    setTapCounter(nextCount);

    if (nextCount % 5 === 0) {
      onAddCoin?.(1, e);
      onTriggerToast?.('🎶 JAM MERIT! +1 🪙');
    }

    setTimeout(() => {
      setActiveNote((curr) => (curr?.index === index ? null : curr));
    }, 450);
  };

  return (
    <div 
      className="rainbow-anemones-bar"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '6px',
        background: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(6px)',
        padding: '6px 10px 4px 10px',
        borderRadius: '24px',
        border: '2px solid rgba(255, 255, 255, 0.35)',
        boxShadow: '0 6px 14px rgba(0, 0, 0, 0.3)',
        userSelect: 'none',
        pointerEvents: 'auto'
      }}
      title="Tap the Rainbow Anemones to play music along with the band!"
    >
      {ANEMONE_KEYS.map((key, idx) => {
        const isPushed = activeNote?.index === idx;

        return (
          <div
            key={key.name}
            onClick={(e) => handleAnemoneTap(idx, e)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
              transform: isPushed 
                ? 'scale(1.22, 0.8) translateY(3px)' 
                : 'scale(1, 1)',
              transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Floating Musical Note Bubble on Tap */}
            {isPushed && (
              <div 
                className="poke-reaction-bubble"
                style={{
                  top: '-24px',
                  fontSize: '18px',
                  color: key.color,
                  filter: `drop-shadow(0 2px 6px ${key.shadow})`
                }}
              >
                {key.symbol}
              </div>
            )}

            {/* Cartoon Anemone SVG */}
            <svg width="34" height="42" viewBox="0 0 34 42">
              {/* Rounded Sandy Mound Base */}
              <ellipse cx="17" cy="38" rx="14" ry="4" fill="#334155" opacity="0.6" />

              {/* Tentacles */}
              <g stroke={key.color} strokeWidth="3.5" strokeLinecap="round" fill="none">
                <path d="M 12 36 Q 6 22 8 14" />
                <path d="M 15 36 Q 12 18 14 8" />
                <path d="M 17 36 Q 17 16 18 6" />
                <path d="M 19 36 Q 22 18 20 8" />
                <path d="M 22 36 Q 28 22 26 14" />
              </g>

              {/* Glowing Bulbous Tentacle Tips */}
              <circle cx="8" cy="14" r="3" fill={key.accent} />
              <circle cx="14" cy="8" r="3.2" fill={key.accent} />
              <circle cx="18" cy="6" r="3.5" fill={key.accent} />
              <circle cx="20" cy="8" r="3.2" fill={key.accent} />
              <circle cx="26" cy="14" r="3" fill={key.accent} />

              {/* Central Anemone Body */}
              <ellipse cx="17" cy="31" rx="8" ry="6" fill={key.color} stroke={key.shadow} strokeWidth="1.5" />

              {/* Cute Googly Face */}
              <circle cx="14.5" cy="30" r="1.8" fill="#ffffff" />
              <circle cx="15" cy="30" r="0.9" fill="#000000" />
              <circle cx="19.5" cy="30" r="1.8" fill="#ffffff" />
              <circle cx="20" cy="30" r="0.9" fill="#000000" />
              <path d="M 15.5 33 Q 17 34.5 18.5 33" stroke="#000000" strokeWidth="1" fill="none" strokeLinecap="round" />
            </svg>

            {/* Note Label */}
            <span 
              style={{
                fontFamily: "'Lilita One', sans-serif",
                fontSize: '10px',
                color: isPushed ? '#ffffff' : key.accent,
                textShadow: `0 1px 2px ${key.shadow}`,
                marginTop: '-2px'
              }}
            >
              {key.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
