import Coin from './Coin';
import SelectionBadge from './SelectionBadge';
import CostumeOverlay from './CostumeOverlay';
import AudioReactiveMouth from './AudioReactiveMouth';

export default function StarlightJelly({ 
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
  const animDuration = isSupercharged ? '0.38s' : `${1.5 / tempoSpeed}s`;
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

      {isSupercharged && !isSleeping && (
        <div style={{
          position: 'absolute',
          top: '-38px',
          background: 'linear-gradient(90deg, #ff007f, #ffdd00, #00ffcc)',
          padding: '3px 12px',
          borderRadius: '99px',
          fontSize: '0.8rem',
          fontWeight: '900',
          color: '#0f172a',
          boxShadow: '0 0 15px #ffdd00',
          animation: 'floatNote 0.6s infinite alternate',
          whiteSpace: 'nowrap',
          zIndex: 10
        }}>
          ⚡ SUGAR RUSH! ⚡
        </div>
      )}

      <div className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-starlight' : ''} style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 180 215">
          <defs>
            <clipPath id="starlightClip">
              <path d="M 38 88 C 38 22, 142 22, 142 88 C 122 99, 106 91, 90 94 C 74 91, 58 99, 38 88 Z" />
            </clipPath>
          </defs>

          {/* Floating Singing Notes & Stars */}
          {!isSleeping && (
            <g transform="translate(90, 42)">
              <text x="-58" y="-8" fill="#facc15" stroke="#0f172a" strokeWidth="1.5" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-6;-18;-6" dur="0.85s" repeatCount="indefinite" />
              </text>
              <text x="42" y="-12" fill="#e879f9" stroke="#0f172a" strokeWidth="1.5" fontSize="23" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♫
                <animate attributeName="y" values="-10;-24;-10" dur="0.95s" repeatCount="indefinite" />
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

          {/* Golden Star Tiara */}
          {!isSleeping && (
            <g transform="translate(68, 14)">
              <polygon points="22,18 22,4 26,12 34,12 28,18 30,26 22,21 14,26 16,18 10,12 18,12" fill="#fde047" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
              <circle cx="22" cy="15" r="3.5" fill="#ffffff" />
            </g>
          )}

          {/* Main Bell Body */}
          <path
            d="M 38 88 C 38 22, 142 22, 142 88 C 122 99, 106 91, 90 94 C 74 91, 58 99, 38 88 Z"
            fill="#c084fc"
            stroke="#0f172a"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* Hard Cel-Shadow Partition */}
          <g clipPath="url(#starlightClip)">
            <path
              d="M 94 24 C 126 24, 144 52, 144 88 C 122 99, 106 91, 90 94 C 78 92, 68 95, 60 97 C 100 84, 126 70, 116 46 C 108 30, 99 26, 94 24 Z"
              fill="#7e22ce"
            />
            {/* Dark Skirt Shadow */}
            <path
              d="M 38 88 C 58 99, 74 91, 90 94 C 106 91, 122 99, 142 88 C 142 94, 122 104, 90 100 C 58 104, 38 94, 38 88 Z"
              fill="#0f172a"
              opacity="0.25"
            />
          </g>

          {/* Specular Gloss Arc on Upper-Left */}
          <path
            d="M 52 38 C 66 26, 88 25, 98 28 C 86 31, 68 35, 58 46 C 54 51, 51 57, 50 62 C 49 54, 50 44, 52 38 Z"
            fill="#ffffff"
            opacity="0.8"
          />
          <circle cx="106" cy="31" r="3.5" fill="#ffffff" opacity="0.85" />

          {/* FACE & STAR SPARKLE EYES */}
          {isSleeping ? (
            <g>
              <path d="M 60 67 Q 70 77 80 67" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 100 67 Q 110 77 120 67" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 84 78 Q 90 83 96 78" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {/* Star-Sparkle Cartoon Eyes */}
              {isSupercharged ? (
                <>
                  <circle cx="68" cy="63" r="11" fill="#fef08a" stroke="#0f172a" strokeWidth="3" />
                  <text x="68" y="68" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">★</text>
                  <circle cx="112" cy="63" r="11" fill="#fef08a" stroke="#0f172a" strokeWidth="3" />
                  <text x="112" y="68" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">★</text>
                </>
              ) : (
                <>
                  <ellipse cx="68" cy="62" rx="9.5" ry="13" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                  <ellipse cx="70" cy="63" rx="6.5" ry="8.5" fill="#3b0764" />
                  <text x="70" y="67" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="900">★</text>
                  <circle cx="67" cy="57" r="2.5" fill="#ffffff" />

                  <ellipse cx="112" cy="62" rx="9.5" ry="13" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                  <ellipse cx="110" cy="63" rx="6.5" ry="8.5" fill="#3b0764" />
                  <text x="110" y="67" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="900">★</text>
                  <circle cx="107" cy="57" r="2.5" fill="#ffffff" />
                </>
              )}

              {/* Blushing Star Cheeks */}
              <ellipse cx="52" cy="72" rx="7" ry="4" fill="#f472b6" opacity="0.85" />
              <ellipse cx="128" cy="72" rx="7" ry="4" fill="#f472b6" opacity="0.85" />

              {/* Audio-Reactive Starlight Singing Mouth */}
              <AudioReactiveMouth
                monsterId="starlight"
                audioEngine={audioEngine}
                isSleeping={isSleeping}
                restingD="M 76 75 Q 90 83 104 75"
                centerX={90}
                centerY={72}
                mouthWidth={28}
                mouthHeight={26}
                lipColor="#881337"
                tongueColor="#fb7185"
                strokeColor="#0f172a"
                strokeWidth={3}
                hasTeeth={true}
                toothCount={1}
              />
            </g>
          )}

          {/* CEL-SHADED COSMIC TENTACLES */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''} style={{ animationDuration: animDuration }}>
            <path d="M 58 92 Q 48 135 60 182" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
            <path d="M 58 92 Q 48 135 60 182" stroke="#fef08a" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            <path d="M 78 95 Q 90 135 76 186" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 78 95 Q 90 135 76 186" stroke="#e879f9" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 102 95 Q 90 135 104 186" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 102 95 Q 90 135 104 186" stroke="#e879f9" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 122 92 Q 132 135 120 182" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
            <path d="M 122 92 Q 132 135 120 182" stroke="#fef08a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}
