export default function KelpForestWings({ tempoSpeed, isNight }) {
  const duration = `${3 / tempoSpeed}s`;
  const kelpColor = isNight ? '#059669' : '#10b981';
  const coralColor = isNight ? '#ec4899' : '#f43f5e';

  return (
    <>
      <div style={{ position: 'absolute', bottom: '20px', left: '-15px', zIndex: 18, pointerEvents: 'none' }}>
        <svg width="110" height="280" viewBox="0 0 110 280">
          <g className="kelp-left-stalk" style={{ animationDuration: duration }}>
            <path d="M 35 280 Q 5 180 45 100 Q 15 40 35 0" stroke={kelpColor} strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="20" cy="180" rx="18" ry="8" fill={kelpColor} transform="rotate(-25 20 180)" />
            <ellipse cx="48" cy="110" rx="20" ry="9" fill={kelpColor} transform="rotate(25 48 110)" />
          </g>
          <path d="M 0 280 Q 25 240 40 280 Z" fill={coralColor} opacity="0.85" />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: '20px', right: '-15px', zIndex: 18, pointerEvents: 'none' }}>
        <svg width="110" height="280" viewBox="0 0 110 280">
          <g className="kelp-right-stalk" style={{ animationDuration: duration }}>
            <path d="M 75 280 Q 105 180 65 100 Q 95 40 75 0" stroke={kelpColor} strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="90" cy="180" rx="18" ry="8" fill={kelpColor} transform="rotate(25 90 180)" />
            <ellipse cx="62" cy="110" rx="20" ry="9" fill={kelpColor} transform="rotate(-25 62 110)" />
          </g>
          <path d="M 70 280 Q 95 240 110 280 Z" fill={coralColor} opacity="0.85" />
        </svg>
      </div>
    </>
  );
}
