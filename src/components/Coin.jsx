export default function Coin({ onCollect, isSupercharged, amount = 1 }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onCollect(e);
      }}
      className="floating-coin"
      style={{
        position: 'absolute',
        top: isSupercharged ? '-82px' : '-46px',
        zIndex: 35,
        filter: 'drop-shadow(0 4px 10px rgba(250, 204, 21, 0.7))',
        transition: 'top 0.25s ease'
      }}
      title={`Tap to collect +${amount} coin${amount > 1 ? 's' : ''}!`}
    >
      <svg width="48" height="48" viewBox="0 0 48 48">
        <defs>
          <clipPath id="coinRoundClip">
            <circle cx="24" cy="24" r="19" />
          </clipPath>
        </defs>

        {/* Main Base Gold Body */}
        <circle cx="24" cy="24" r="19" fill="#facc15" stroke="#0f172a" strokeWidth="3.5" />

        {/* Cel-Shaded Bottom-Right Shadow Crescent */}
        <g clipPath="url(#coinRoundClip)">
          <path d="M 24 5 A 19 19 0 0 1 43 24 A 19 19 0 0 1 24 43 Q 35 34 35 24 Q 35 14 24 5 Z" fill="#ca8a04" />
        </g>

        {/* Inner Coin Well */}
        <circle cx="24" cy="24" r="13.5" fill="#fef08a" stroke="#b45309" strokeWidth="2" />
        {/* Cel-shaded shadow in inner well */}
        <path d="M 24 10.5 A 13.5 13.5 0 0 1 37.5 24 A 13.5 13.5 0 0 1 24 37.5 Q 31 31 31 24 Q 31 17 24 10.5 Z" fill="#eab308" opacity="0.6" />

        {/* Gloss Specular Highlight Arc */}
        <path d="M 12 14 Q 18 8 28 9" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
        <circle cx="33" cy="11" r="1.5" fill="#ffffff" opacity="0.85" />

        {/* Center Star / Amount with Cartoon Ink Depth */}
        <text 
          x="24" 
          y={amount > 1 ? "29" : "30"} 
          textAnchor="middle" 
          fill="#78350f"
          stroke="#0f172a"
          strokeWidth="0.8"
          paintOrder="stroke fill"
          fontSize={amount >= 10 ? "13" : amount > 1 ? "15" : "19"} 
          fontWeight="900"
          fontFamily="'Lilita One', sans-serif"
        >
          {amount > 1 ? `+${amount}` : '★'}
        </text>
      </svg>
    </div>
  );
}
