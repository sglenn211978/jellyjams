export default function ReefFanClub({ activeCount, isNight, onFanTap }) {
  const isSleeping = activeCount === 0;

  return (
    <div
      onClick={onFanTap}
      className="seafloor-fan-container"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none'
      }}
      title="Tap the Fan Club for cheering & surprise coins!"
    >
      <div style={{
        background: isSleeping ? '#334155' : isNight ? '#ec4899' : '#facc15',
        color: isSleeping ? '#94a3b8' : isNight ? '#ffffff' : '#78350f',
        padding: '4px 14px',
        borderRadius: '14px',
        fontWeight: '900',
        fontSize: '12px',
        letterSpacing: '0.5px',
        boxShadow: '0 4px 0 #0f172a, 0 8px 14px rgba(0,0,0,0.4)',
        transform: 'rotate(-3deg)',
        marginBottom: '6px',
        border: '3px solid #0f172a',
        fontFamily: "'Lilita One', sans-serif"
      }}>
        {isSleeping ? '😴 Shhh... Band Sleeping' : isNight ? '🔥 NIGHT RAVE MOSH!' : '🎉 TAP US FOR COINS!'}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
        <div className={!isSleeping ? 'fan-grooving' : ''} style={{ animationDelay: '0.1s' }}>
          <svg width="58" height="58" viewBox="0 0 58 58">
            <circle cx="29" cy="32" r="18" fill="#fbbf24" stroke="#0f172a" strokeWidth="3.5" />
            <polygon points="10,32 3,29 10,26" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="48,32 55,29 48,26" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="23" cy="28" r="3.5" fill="#0f172a" />
            <circle cx="22" cy="26.5" r="1.2" fill="#ffffff" />
            <circle cx="35" cy="28" r="3.5" fill="#0f172a" />
            <circle cx="34" cy="26.5" r="1.2" fill="#ffffff" />
            <ellipse cx="29" cy="38" rx="4.5" ry="5.5" fill="#881337" stroke="#0f172a" strokeWidth="2" />
          </svg>
        </div>

        <div className={!isSleeping ? 'fan-grooving' : ''} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="fan-foam-claw" style={{ marginBottom: '-8px' }}>
            <svg width="36" height="44" viewBox="0 0 36 44">
              <path d="M 12 4 L 20 4 L 20 20 L 26 20 L 26 38 L 8 38 L 8 20 L 12 20 Z" fill={isNight ? '#c084fc' : '#38bdf8'} stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />
              <text x="17" y="32" textAnchor="middle" fill="#ffffff" stroke="#0f172a" strokeWidth="0.8" fontSize="13" fontWeight="900" fontFamily="'Lilita One', sans-serif">#1</text>
            </svg>
          </div>
          <svg width="68" height="50" viewBox="0 0 68 50">
            <ellipse cx="34" cy="28" rx="22" ry="15" fill="#ef4444" stroke="#0f172a" strokeWidth="3.5" />
            <circle cx="25" cy="18" r="4.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="25" cy="18" r="2.5" fill="#0f172a" />
            <circle cx="24" cy="17" r="1" fill="#ffffff" />
            <circle cx="43" cy="18" r="4.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="43" cy="18" r="2.5" fill="#0f172a" />
            <circle cx="42" cy="17" r="1" fill="#ffffff" />
            <path d="M 12 28 Q 2 18 10 8" stroke="#0f172a" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 12 28 Q 2 18 10 8" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 56 28 Q 66 18 58 8" stroke="#0f172a" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 56 28 Q 66 18 58 8" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <div className={!isSleeping ? 'fan-grooving' : ''} style={{ animationDelay: '0.25s' }}>
          <svg width="34" height="70" viewBox="0 0 34 70">
            <path d="M 16 68 Q 24 38 16 20 Q 12 10 18 4" stroke="#0f172a" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 16 68 Q 24 38 16 20 Q 12 10 18 4" stroke="#06b6d4" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="18" cy="6" r="2.5" fill="#0f172a" />
          </svg>
        </div>
      </div>
    </div>
  );
}
