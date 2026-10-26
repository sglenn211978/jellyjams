import Coin from './Coin';
import SelectionBadge from './SelectionBadge';
import CostumeOverlay from './CostumeOverlay';
import AudioReactiveMouth from './AudioReactiveMouth';

export default function BoomboxBob({ 
  isSleeping, 
  isSupercharged, 
  hasCoin, 
  coinAmount = 1,
  level = 1,
  costumeId = null,
  tempoSpeed, 
  isNight, 
  isSelecting, 
  selectionIndex, 
  onCoinCollect, 
  onClick,
  audioEngine = null
}) {
  let animationClass = '';
  if (isSupercharged) {
    animationClass = 'supercharged-jelly';
  } else if (!isSleeping) {
    animationClass = 'dancing-bob';
  }

  const animDuration = isSupercharged ? '0.38s' : `${1 / tempoSpeed}s`;
  const mouthDur = isSupercharged ? '0.26s' : `${0.44 / tempoSpeed}s`;
  const scaleFactor = 1 + (level - 1) * 0.04;

  return (
    <div
      onClick={onClick}
      className={isNight && !isSleeping ? 'bioluminescent-glow' : ''}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        transition: 'transform 0.4s ease, filter 0.4s ease',
        transform: isSleeping ? 'translateY(40px) scale(0.85)' : `scale(${scaleFactor})`,
        filter: isSleeping ? 'grayscale(45%) opacity(0.75)' : 'none'
      }}
    >
      {selectionIndex > 0 && <SelectionBadge index={selectionIndex} />}

      {isSelecting && selectionIndex === 0 && !isSleeping && (
        <div style={{
          position: 'absolute',
          top: '-15px',
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          border: '3px dashed #a855f7',
          animation: 'podSwirlSpin 4s linear infinite',
          pointerEvents: 'none'
        }} />
      )}

      {!isSleeping && hasCoin && (
        <Coin onCollect={onCoinCollect} isSupercharged={isSupercharged} amount={coinAmount} />
      )}

      {isSupercharged && (
        <div style={{
          position: 'absolute',
          top: '-26px',
          zIndex: 20,
          background: '#ec4899',
          color: '#ffffff',
          padding: '3px 12px',
          borderRadius: '14px',
          fontWeight: '900',
          fontSize: '11px',
          letterSpacing: '1px',
          boxShadow: '0 4px 10px rgba(236, 72, 153, 0.5)',
          whiteSpace: 'nowrap'
        }}>
          ⚡ SUGAR RUSH! 3x COINS!
        </div>
      )}

      <div className={animationClass} style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 200 215">
          <defs>
            <clipPath id="bobBodyClip">
              <ellipse cx="100" cy="102" rx="58" ry="52" />
            </clipPath>
            <clipPath id="bobBellyClip">
              <ellipse cx="100" cy="116" rx="42" ry="32" />
            </clipPath>
          </defs>

          {/* Floating Beatbox Notes */}
          {!isSleeping && (
            <g transform="translate(100, 42)">
              <text x="-74" y="4" fill="#fb923c" stroke="#0f172a" strokeWidth="1.2" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="6;-4;6" dur={mouthDur} repeatCount="indefinite" />
              </text>
              <text x="58" y="0" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.2" fontSize="24" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♫
                <animate attributeName="y" values="-4;6;-4" dur={mouthDur} repeatCount="indefinite" />
              </text>
            </g>
          )}

          {/* Sleeping Zzz */}
          {isSleeping && (
            <g transform="translate(85, 12) rotate(-15)">
              <path d="M 0 30 Q 30 -10 55 20 Z" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="55" cy="20" r="8" fill="#86efac" stroke="#0f172a" strokeWidth="2" />
              <text x="65" y="0" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" fontSize="19" fontWeight="900" fontFamily="'Lilita One', sans-serif">Zzz</text>
            </g>
          )}

          {/* Bob's Cool Cel-Shaded Snapback Cap */}
          {!isSleeping && (
            <g transform="translate(68, 22)">
              {/* Cap dome */}
              <path d="M 4 28 C 4 2, 60 2, 60 28 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="3.5" strokeLinejoin="round" />
              {/* Cap shadow half */}
              <path d="M 32 3 C 48 3, 60 12, 60 28 L 32 28 Z" fill="#b91c1c" />
              {/* Cap visor / bill with cyan trim */}
              <rect x="-16" y="24" width="34" height="9" rx="4" fill="#06b6d4" stroke="#0f172a" strokeWidth="3" />
              <line x1="-10" y1="26" x2="10" y2="26" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              {/* Top button */}
              <circle cx="32" cy="3" r="4.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            </g>
          )}

          {/* Cel-Shaded Body Spikes with Ink Outlines */}
          <g stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
            {/* Left spikes */}
            <polygon points="40,96 22,90 40,84" fill="#f59e0b" />
            <polygon points="44,68 28,58 48,60" fill="#f59e0b" />
            <polygon points="68,44 62,28 78,38" fill="#f59e0b" />
            {/* Right spikes */}
            <polygon points="156,96 174,90 156,84" fill="#d97706" />
            <polygon points="152,68 168,58 148,60" fill="#d97706" />
            <polygon points="132,44 138,28 122,38" fill="#d97706" />
          </g>

          {/* Main Spherical Body Contour */}
          <ellipse cx="100" cy="102" rx="58" ry="52" fill="#fbbf24" stroke="#0f172a" strokeWidth="4.5" />

          {/* Hard Cel-Shadow Partition */}
          <g clipPath="url(#bobBodyClip)">
            <path
              d="M 100 50 C 132 50, 158 72, 158 102 C 158 132, 132 154, 100 154 C 85 154, 75 151, 65 146 C 115 138, 145 118, 138 82 C 132 62, 118 52, 100 50 Z"
              fill="#d97706"
            />
          </g>

          {/* Specular Highlight Gloss Arc on Upper-Left */}
          <path
            d="M 62 68 C 72 58, 92 56, 102 59 C 90 62, 76 68, 68 80 C 64 86, 61 94, 60 100 C 59 90, 60 76, 62 68 Z"
            fill="#ffffff"
            opacity="0.8"
          />
          <circle cx="112" cy="62" r="3.5" fill="#ffffff" opacity="0.85" />

          {/* Belly Patch with Ink Border and Cel Shadow */}
          <ellipse cx="100" cy="116" rx="42" ry="32" fill="#fef08a" stroke="#0f172a" strokeWidth="3" />
          <g clipPath="url(#bobBellyClip)">
            <path
              d="M 100 84 C 122 84, 142 98, 142 116 C 142 134, 122 148, 100 148 C 90 148, 80 146, 75 142 C 110 135, 130 120, 126 98 C 120 88, 110 85, 100 84 Z"
              fill="#fde047"
            />
          </g>

          {/* EXPRESSIVE CARTOON FACE */}
          {isSleeping ? (
            <g>
              <path d="M 70 88 Q 80 98 90 88" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 110 88 Q 120 98 130 88" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 96 100 Q 100 104 104 100" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {isSupercharged ? (
                <>
                  <circle cx="78" cy="85" r="11" fill="#fef08a" stroke="#0f172a" strokeWidth="3" />
                  <text x="78" y="90" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">★</text>
                  <circle cx="122" cy="85" r="11" fill="#fef08a" stroke="#0f172a" strokeWidth="3" />
                  <text x="122" y="90" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">★</text>
                </>
              ) : (
                <>
                  {/* Big Round Cartoon Eyes */}
                  <ellipse cx="78" cy="85" rx="10" ry="13" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                  <ellipse cx="80" cy="86" rx="6.5" ry="8.5" fill="#0f172a" />
                  <circle cx="77" cy="81" r="3.5" fill="#ffffff" />
                  <circle cx="83" cy="89" r="1.6" fill="#ffffff" />

                  <ellipse cx="122" cy="85" rx="10" ry="13" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                  <ellipse cx="120" cy="86" rx="6.5" ry="8.5" fill="#0f172a" />
                  <circle cx="117" cy="81" r="3.5" fill="#ffffff" />
                  <circle cx="123" cy="89" r="1.6" fill="#ffffff" />
                </>
              )}

              {/* Cheeks */}
              <ellipse cx="64" cy="95" rx="6.5" ry="4" fill="#fb7185" opacity="0.75" />
              <ellipse cx="136" cy="95" rx="6.5" ry="4" fill="#fb7185" opacity="0.75" />

              {/* Audio-Reactive Bob Beatboxing Mouth */}
              <AudioReactiveMouth
                monsterId="bob"
                audioEngine={audioEngine}
                isSleeping={isSleeping}
                restingD="M 86 104 Q 100 114 114 104"
                centerX={100}
                centerY={100}
                mouthWidth={36}
                mouthHeight={32}
                lipColor="#881337"
                tongueColor="#fb7185"
                strokeColor="#0f172a"
                strokeWidth={3}
                hasTeeth={true}
                toothCount={2}
              />
            </g>
          )}

          {/* Cel-Shaded Tentacles (Heavy Ink + Vibrant Core) */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''}>
            <path d="M 66 142 Q 58 175 68 194" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 66 142 Q 58 175 68 194" stroke="#ea580c" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            <path d="M 88 148 Q 85 180 82 198" stroke="#0f172a" strokeWidth="8.5" strokeLinecap="round" fill="none" />
            <path d="M 88 148 Q 85 180 82 198" stroke="#ea580c" strokeWidth="5" strokeLinecap="round" fill="none" />

            <path d="M 112 148 Q 115 180 118 198" stroke="#0f172a" strokeWidth="8.5" strokeLinecap="round" fill="none" />
            <path d="M 112 148 Q 115 180 118 198" stroke="#ea580c" strokeWidth="5" strokeLinecap="round" fill="none" />

            <path d="M 134 142 Q 142 175 132 194" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 134 142 Q 142 175 132 194" stroke="#ea580c" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </g>

          {/* CEL-SHADED RETRO BOOMBOX */}
          {!isSleeping && (
            <g transform="translate(132, 108) rotate(-10)">
              {/* Handle */}
              <path d="M 10 9 L 10 0 L 38 0 L 38 9" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 10 9 L 10 0 L 38 0 L 38 9" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Main Body */}
              <rect x="0" y="8" width="48" height="32" rx="5" fill="#334155" stroke="#0f172a" strokeWidth="3.5" />
              {/* Gloss highlight on top edge */}
              <line x1="3" y1="10" x2="45" y2="10" stroke="#64748b" strokeWidth="1.5" />

              {/* Left Speaker Cone */}
              <circle cx="12" cy="24" r="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="2">
                <animate attributeName="r" values="8;9.2;8" dur={mouthDur} repeatCount="indefinite" />
              </circle>
              <circle cx="12" cy="24" r="3.5" fill="#38bdf8" />
              <circle cx="10" cy="22" r="1.2" fill="#ffffff" />

              {/* Right Speaker Cone */}
              <circle cx="36" cy="24" r="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="2">
                <animate attributeName="r" values="8;9.2;8" dur={mouthDur} repeatCount="indefinite" />
              </circle>
              <circle cx="36" cy="24" r="3.5" fill="#38bdf8" />
              <circle cx="34" cy="22" r="1.2" fill="#ffffff" />

              {/* Center Cassette Deck */}
              <rect x="21" y="16" width="7" height="15" rx="1.5" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
              <circle cx="23" cy="22" r="1" fill="#facc15" />
              <circle cx="26" cy="22" r="1" fill="#facc15" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
