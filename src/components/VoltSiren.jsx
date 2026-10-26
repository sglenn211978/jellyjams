import Coin from './Coin';
import SelectionBadge from './SelectionBadge';
import CostumeOverlay from './CostumeOverlay';
import AudioReactiveMouth from './AudioReactiveMouth';

export default function VoltSiren({ 
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
  const animDuration = isSupercharged ? '0.38s' : `${1.4 / tempoSpeed}s`;
  const mouthDur = isSupercharged ? '0.26s' : `${0.46 / tempoSpeed}s`;
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
        transform: isSleeping ? 'translateY(40px) scale(0.9)' : `scale(${scaleFactor})`,
        filter: isSleeping ? 'grayscale(45%) opacity(0.75)' : 'none'
      }}
    >
      {selectionIndex > 0 && <SelectionBadge index={selectionIndex} />}

      {isSelecting && selectionIndex === 0 && !isSleeping && (
        <div style={{
          position: 'absolute',
          top: '-15px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '3px dashed #a855f7',
          animation: 'podSwirlSpin 4s linear infinite',
          pointerEvents: 'none'
        }} />
      )}

      {!isSleeping && hasCoin && <Coin onCollect={onCoinCollect} isSupercharged={isSupercharged} amount={coinAmount} />}

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

      <div className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-siren' : ''} style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 180 215">
          <defs>
            <clipPath id="voltSirenClip">
              <path d="M 38 88 C 38 22, 142 22, 142 88 C 122 99, 106 91, 90 94 C 74 91, 58 99, 38 88 Z" />
            </clipPath>
            <linearGradient id="voltSirenBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Floating Singing Notes */}
          {!isSleeping && (
            <g transform="translate(90, 42)">
              <text x="-54" y="-8" fill="#38bdf8" stroke="#0f172a" strokeWidth="1" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-6;-14;-6" dur={mouthDur} repeatCount="indefinite" />
              </text>
              <text x="40" y="-12" fill="#f472b6" stroke="#0f172a" strokeWidth="1" fontSize="24" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♫
                <animate attributeName="y" values="-14;-6;-14" dur={mouthDur} repeatCount="indefinite" />
              </text>
            </g>
          )}

          {/* Sleeping Zzz */}
          {isSleeping && (
            <g transform="translate(68, 16) rotate(-12)">
              <path d="M 0 28 Q 28 -8 52 18 Z" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="52" cy="18" r="7" fill="#86efac" stroke="#0f172a" strokeWidth="2" />
              <text x="62" y="-2" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" fontSize="19" fontWeight="900" fontFamily="'Lilita One', sans-serif">Zzz</text>
            </g>
          )}

          {/* Cel-Shaded Electric Tiara */}
          {!isSleeping && (
            <g transform="translate(60, 14)">
              <polygon points="10,24 20,2 28,16 38,2 46,16 54,2 62,24" fill="#facc15" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />
              <polygon points="34,16 46,16 40,24" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="20" cy="4" r="3.5" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="54" cy="4" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="37" cy="4" r="4" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" />
            </g>
          )}

          {/* Main Bell Body */}
          <path
            d="M 38 88 C 38 22, 142 22, 142 88 C 122 99, 106 91, 90 94 C 74 91, 58 99, 38 88 Z"
            fill="url(#voltSirenBaseGrad)"
            stroke="#0f172a"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* Hard Cel-Shadow Partition */}
          <g clipPath="url(#voltSirenClip)">
            <path
              d="M 94 24 C 126 24, 144 52, 144 88 C 122 99, 106 91, 90 94 C 78 92, 68 95, 60 97 C 100 84, 126 70, 116 46 C 108 30, 99 26, 94 24 Z"
              fill="#0369a1"
            />
            {/* Dark Skirt Shadow */}
            <path
              d="M 38 88 C 58 99, 74 91, 90 94 C 106 91, 122 99, 142 88 C 142 94, 122 104, 90 100 C 58 104, 38 94, 38 88 Z"
              fill="#0f172a"
              opacity="0.3"
            />
          </g>

          {/* Specular Gloss Arc on Upper-Left */}
          <path
            d="M 52 38 C 66 26, 88 25, 98 28 C 86 31, 68 35, 58 46 C 54 51, 51 57, 50 62 C 49 54, 50 44, 52 38 Z"
            fill="#ffffff"
            opacity="0.8"
          />
          <circle cx="106" cy="31" r="3.5" fill="#ffffff" opacity="0.85" />

          {/* FACE & VISOR */}
          {isSleeping ? (
            <g>
              <path d="M 60 67 Q 70 77 80 67" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 100 67 Q 110 77 120 67" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {/* Cel-Shaded Cyberpunk Visor */}
              <g transform="translate(56, 48)">
                <rect x="0" y="0" width="68" height="20" rx="7" fill="#0f172a" stroke="#0f172a" strokeWidth="3" />
                <rect x="3" y="3" width="62" height="14" rx="5" fill="#1e1b4b" />
                {/* Glowing Dual Neon Equalizer Beams */}
                <line x1="8" y1="10" x2="60" y2="10" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="16" y1="6" x2="48" y2="6" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
                <circle cx="58" cy="10" r="2.2" fill="#ffffff" />
              </g>
              {/* Cheeks */}
              <ellipse cx="52" cy="74" rx="6.5" ry="3.8" fill="#f472b6" opacity="0.8" />
              <ellipse cx="128" cy="74" rx="6.5" ry="3.8" fill="#f472b6" opacity="0.8" />
              {/* Audio-Reactive Volt Siren Mouth */}
              <AudioReactiveMouth
                monsterId="siren"
                audioEngine={audioEngine}
                isSleeping={isSleeping}
                restingD="M 76 76 Q 90 84 104 76"
                centerX={90}
                centerY={73}
                mouthWidth={30}
                mouthHeight={26}
                lipColor="#881337"
                tongueColor="#fb7185"
                strokeColor="#0f172a"
                strokeWidth={2.8}
                hasTeeth={true}
                toothCount={1}
              />
            </g>
          )}

          {/* CEL-SHADED DUAL-TONE TENTACLES */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''}>
            <path d="M 58 92 L 50 125 L 62 152 L 52 184" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 58 92 L 50 125 L 62 152 L 52 184" stroke="#facc15" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            <path d="M 78 95 Q 90 135 78 188" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 78 95 Q 90 135 78 188" stroke="#f472b6" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 102 95 Q 90 135 102 188" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 102 95 Q 90 135 102 188" stroke="#38bdf8" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 122 92 L 130 125 L 118 152 L 128 184" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 122 92 L 130 125 L 118 152 L 128 184" stroke="#facc15" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}
