import Coin from './Coin';
import SelectionBadge from './SelectionBadge';
import CostumeOverlay from './CostumeOverlay';
import AudioReactiveMouth from './AudioReactiveMouth';

export default function DJSparkPuff({ 
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
  const animDuration = isSupercharged ? '0.38s' : `${1 / tempoSpeed}s`;
  const mouthDur = isSupercharged ? '0.26s' : `${0.42 / tempoSpeed}s`;
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

      <div className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-sparkpuff' : ''} style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 200 215">
          <defs>
            <clipPath id="sparkBodyClip">
              <ellipse cx="100" cy="102" rx="55" ry="50" />
            </clipPath>
            <clipPath id="sparkBellyClip">
              <ellipse cx="100" cy="116" rx="38" ry="30" />
            </clipPath>
          </defs>

          {/* Floating Electro-Funk Notes */}
          {!isSleeping && (
            <g transform="translate(100, 42)">
              <text x="-74" y="4" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.2" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="6;-4;6" dur={mouthDur} repeatCount="indefinite" />
              </text>
              <text x="58" y="0" fill="#fde047" stroke="#0f172a" strokeWidth="1.2" fontSize="24" fontWeight="900" fontFamily="'Lilita One', sans-serif">
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

          {/* Cel-Shaded DJ Spark Antenna & Big Headphones */}
          {!isSleeping && (
            <g>
              {/* Lightning Spark Antenna */}
              <polygon points="100,24 93,6 105,6 99,-6 112,10 103,10" fill="#fef08a" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />
              <circle cx="100" cy="-7" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />

              {/* Headphone Band */}
              <path d="M 40 85 C 40 32, 160 32, 160 85" stroke="#0f172a" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M 40 85 C 40 32, 160 32, 160 85" stroke="#334155" strokeWidth="4" fill="none" strokeLinecap="round" />

              {/* Left Earcup */}
              <rect x="30" y="68" width="16" height="30" rx="8" fill="#0284c7" stroke="#0f172a" strokeWidth="3" />
              <rect x="33" y="72" width="4" height="22" rx="2" fill="#67e8f9" />

              {/* Right Earcup */}
              <rect x="154" y="68" width="16" height="30" rx="8" fill="#0284c7" stroke="#0f172a" strokeWidth="3" />
              <rect x="163" y="72" width="4" height="22" rx="2" fill="#67e8f9" />
            </g>
          )}

          {/* Main Puffy Body Contour */}
          <ellipse cx="100" cy="102" rx="55" ry="50" fill="#38bdf8" stroke="#0f172a" strokeWidth="4.5" />

          {/* Hard Cel-Shadow Partition */}
          <g clipPath="url(#sparkBodyClip)">
            <path
              d="M 100 52 C 130 52, 155 74, 155 102 C 155 130, 130 152, 100 152 C 86 152, 76 149, 66 144 C 114 136, 142 116, 135 82 C 130 63, 116 54, 100 52 Z"
              fill="#0284c7"
            />
          </g>

          {/* Specular Highlight Gloss Arc on Upper-Left */}
          <path
            d="M 64 68 C 74 58, 92 56, 102 59 C 90 62, 78 68, 70 78 C 66 84, 63 92, 62 98 C 61 88, 62 76, 64 68 Z"
            fill="#ffffff"
            opacity="0.8"
          />
          <circle cx="110" cy="62" r="3.5" fill="#ffffff" opacity="0.85" />

          {/* Belly Patch with Ink Border and Cel Shadow */}
          <ellipse cx="100" cy="116" rx="38" ry="30" fill="#e0f2fe" stroke="#0f172a" strokeWidth="3" />
          <g clipPath="url(#sparkBellyClip)">
            <path
              d="M 100 86 C 120 86, 138 99, 138 116 C 138 133, 120 146, 100 146 C 90 146, 82 144, 76 140 C 108 134, 126 120, 122 100 C 117 90, 108 87, 100 86 Z"
              fill="#bae6fd"
            />
          </g>

          {/* EXPRESSIVE CARTOON FACE */}
          {isSleeping ? (
            <g>
              <path d="M 72 88 Q 80 98 88 88" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 112 88 Q 120 98 128 88" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {isSupercharged ? (
                <>
                  <circle cx="80" cy="85" r="11" fill="#fef08a" stroke="#0f172a" strokeWidth="3" />
                  <text x="80" y="90" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">★</text>
                  <circle cx="120" cy="85" r="11" fill="#fef08a" stroke="#0f172a" strokeWidth="3" />
                  <text x="120" y="90" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="900">★</text>
                </>
              ) : (
                <>
                  {/* Round Cartoon Spark Eyes */}
                  <ellipse cx="80" cy="85" rx="9.5" ry="12.5" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                  <ellipse cx="82" cy="86" rx="6" ry="8" fill="#0f172a" />
                  <circle cx="79" cy="81" r="3.5" fill="#ffffff" />
                  <circle cx="85" cy="88" r="1.5" fill="#ffffff" />

                  <ellipse cx="120" cy="85" rx="9.5" ry="12.5" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                  <ellipse cx="118" cy="86" rx="6" ry="8" fill="#0f172a" />
                  <circle cx="115" cy="81" r="3.5" fill="#ffffff" />
                  <circle cx="121" cy="88" r="1.5" fill="#ffffff" />
                </>
              )}

              {/* Cheeks */}
              <ellipse cx="66" cy="94" rx="6.5" ry="4" fill="#fb7185" opacity="0.8" />
              <ellipse cx="134" cy="94" rx="6.5" ry="4" fill="#fb7185" opacity="0.8" />

              {/* Audio-Reactive DJ Spark-Puff Mouth */}
              <AudioReactiveMouth
                monsterId="sparkpuff"
                audioEngine={audioEngine}
                isSleeping={isSleeping}
                restingD="M 85 104 Q 100 112 115 104"
                centerX={100}
                centerY={100}
                mouthWidth={34}
                mouthHeight={30}
                lipColor="#881337"
                tongueColor="#fb7185"
                strokeColor="#0f172a"
                strokeWidth={3}
                hasTeeth={true}
                toothCount={1}
              />
            </g>
          )}

          {/* Cel-Shaded Tentacles (Heavy Ink + Cyan Core) */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''}>
            <path d="M 68 142 L 60 170 L 72 195" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 68 142 L 60 170 L 72 195" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            <path d="M 88 148 L 86 180 L 80 196" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 88 148 L 86 180 L 80 196" stroke="#0284c7" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            <path d="M 112 148 L 114 180 L 120 196" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 112 148 L 114 180 L 120 196" stroke="#0284c7" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            <path d="M 132 142 L 140 170 L 128 195" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 132 142 L 140 170 L 128 195" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}
