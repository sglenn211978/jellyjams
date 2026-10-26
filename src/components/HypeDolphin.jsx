export default function HypeDolphin({ isFlipping, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`dolphin-swimming ${isFlipping ? 'dolphin-flip' : ''}`}
      title="Tap the Hype Dolphin for a surprise drop!"
    >
      <svg width="220" height="120" viewBox="0 0 220 120">
        <path
          d="M 180 60 C 150 25, 80 18, 30 50 C 15 58, 2 64, 0 68 C 12 70, 24 67, 34 64 C 60 76, 120 85, 170 66 Z"
          fill="#38bdf8"
          stroke="#0284c7"
          strokeWidth="3.5"
          style={{ filter: 'drop-shadow(0 6px 14px rgba(2, 132, 199, 0.5))' }}
        />
        <path d="M 40 62 C 75 75, 125 74, 165 65 C 130 80, 80 77, 40 62 Z" fill="#e0f2fe" />
        <path d="M 105 24 Q 96 2 82 4 Q 88 18 95 24 Z" fill="#0284c7" />
        <path d="M 125 65 Q 115 88 102 90 Q 112 76 128 65 Z" fill="#0284c7" />
        <path d="M 6 68 Q -16 48 -18 42 Q -8 58 4 67 Q -8 76 -18 92 Q -16 86 6 68 Z" fill="#0284c7" />
        <g transform="translate(142, 38)">
          <polygon points="0,6 26,0 32,14 6,18" fill="#0f172a" />
          <polygon points="26,0 38,0 36,12 28,12" fill="#0f172a" />
          <line x1="4" y1="9" x2="28" y2="4" stroke="#f43f5e" strokeWidth="2.5" />
        </g>
        <path d="M 132 58 Q 140 68 148 64" stroke="#facc15" strokeWidth="3" fill="none" />
        <circle cx="150" cy="65" r="4" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
      </svg>
      <div style={{
        position: 'absolute',
        top: '-14px',
        right: '25px',
        background: '#fef08a',
        color: '#854d0e',
        fontSize: '11px',
        fontWeight: '900',
        padding: '2px 8px',
        borderRadius: '10px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        whiteSpace: 'nowrap'
      }}>
        🐬 TAP ME!
      </div>
    </div>
  );
}
