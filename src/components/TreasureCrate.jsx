export default function TreasureCrate({ position, onCollect }) {
  return (
    <div
      onClick={onCollect}
      className="crate-drop-anim"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 55,
        filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45))'
      }}
      title="Tap to open the Hype Crate!"
    >
      <svg width="60" height="52" viewBox="0 0 60 52">
        <rect x="4" y="10" width="52" height="38" rx="6" fill="#b45309" stroke="#78350f" strokeWidth="3" />
        <rect x="2" y="6" width="56" height="12" rx="4" fill="#d97706" stroke="#78350f" strokeWidth="2" />
        <rect x="26" y="16" width="8" height="14" rx="2" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
        <circle cx="30" cy="22" r="2" fill="#78350f" />
        <line x1="8" y1="24" x2="52" y2="24" stroke="#92400e" strokeWidth="2" strokeDasharray="4 2" />
      </svg>
      <div style={{
        position: 'absolute',
        top: '-18px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#22c55e',
        color: '#ffffff',
        fontSize: '11px',
        fontWeight: '900',
        padding: '1px 6px',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        +5 🪙
      </div>
    </div>
  );
}
