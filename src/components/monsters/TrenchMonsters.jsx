import Coin from '../Coin';
import SelectionBadge from '../SelectionBadge';
import CostumeOverlay from '../CostumeOverlay';

// ---------------------------------------------------------------------------
// 1. ANGLER BASS (Saw Dubstep Bass with Glowing Lure Antenna)
// ---------------------------------------------------------------------------
export function AnglerBass({
  isSleeping,
  isSupercharged,
  hasCoin,
  coinAmount = 1,
  level = 1,
  costumeId = null,
  tempoSpeed = 1.0,
  isNight,
  isSelecting,
  selectionIndex,
  onCoinCollect,
  onClick
}) {
  const animDuration = isSupercharged ? '0.38s' : `${0.85 / tempoSpeed}s`;
  const mouthDur = isSupercharged ? '0.24s' : `${Math.max(0.32, 0.40 / tempoSpeed).toFixed(2)}s`;
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

      <div
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-angler' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 160 200">
          <defs>
            <clipPath id="anglerBodyClip">
              <ellipse cx="80" cy="102" rx="52" ry="46" />
            </clipPath>
          </defs>

          {/* Floating Singing Notes */}
          {!isSleeping && (
            <g transform="translate(80, 48)">
              <text x="-60" y="-4" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-2;-14;-2" dur="0.75s" repeatCount="indefinite" />
              </text>
              <text x="48" y="-8" fill="#fb923c" stroke="#0f172a" strokeWidth="1.5" fontSize="23" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♫
                <animate attributeName="y" values="-6;-20;-6" dur="0.85s" repeatCount="indefinite" />
              </text>
            </g>
          )}

          {/* Sleeping Zzz */}
          {isSleeping && (
            <g transform="translate(65, 16) rotate(-12)">
              <path d="M 0 28 Q 28 -8 52 18 Z" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="52" cy="18" r="7" fill="#86efac" stroke="#0f172a" strokeWidth="2" />
              <text x="62" y="-2" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" fontSize="18" fontWeight="900" fontFamily="'Lilita One', sans-serif">Zzz</text>
            </g>
          )}

          {/* Cel-Shaded Glowing Lure Antenna */}
          <path d="M 80 55 Q 80 12 112 16 Q 128 20 122 42" stroke="#0f172a" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 80 55 Q 80 12 112 16 Q 128 20 122 42" stroke="#facc15" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* Lure Bulb with Comic Ink */}
          <circle cx="122" cy="42" r="11" fill="#fde047" stroke="#0f172a" strokeWidth="3">
            {!isSleeping && <animate attributeName="r" values="10;12.5;10" dur={mouthDur} repeatCount="indefinite" />}
          </circle>
          <circle cx="120" cy="39" r="3.5" fill="#ffffff" />

          {/* Main Angler Jelly Body with Ink Contour */}
          <ellipse cx="80" cy="102" rx="52" ry="46" fill="#ca8a04" stroke="#0f172a" strokeWidth="4.5" />

          {/* Hard Cel-Shadow Partition */}
          <g clipPath="url(#anglerBodyClip)">
            <path d="M 80 56 C 108 56, 132 76, 132 102 C 132 128, 108 148, 80 148 C 68 148, 58 145, 50 140 C 92 132, 118 114, 112 84 C 106 67, 94 58, 80 56 Z" fill="#713f12" />
          </g>

          {/* Specular Highlight Gloss Arc on Upper-Left */}
          <path d="M 46 75 C 54 62, 70 58, 82 60" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <circle cx="92" cy="62" r="2.8" fill="#ffffff" opacity="0.85" />

          {/* Expressive Cartoon Face */}
          {isSleeping ? (
            <g>
              <path d="M 56 90 Q 66 98 76 90" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 86 90 Q 96 98 106 90" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 68 114 Q 80 119 92 114" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {isSupercharged ? (
                <>
                  <circle cx="66" cy="88" r="10.5" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="66" y="93" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                  <circle cx="96" cy="88" r="10.5" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="96" y="93" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                </>
              ) : (
                <>
                  <ellipse cx="66" cy="88" rx="9" ry="11" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <ellipse cx="68" cy="89" rx="5.5" ry="7.5" fill="#0f172a" />
                  <circle cx="65" cy="85" r="2.8" fill="#ffffff" />
                  <circle cx="70" cy="92" r="1.3" fill="#ffffff" />

                  <ellipse cx="96" cy="88" rx="9" ry="11" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <ellipse cx="94" cy="89" rx="5.5" ry="7.5" fill="#0f172a" />
                  <circle cx="92" cy="85" r="2.8" fill="#ffffff" />
                  <circle cx="97" cy="92" r="1.3" fill="#ffffff" />
                </>
              )}

              {/* Big Singing Bass Jaw (Unobstructed below teeth!) */}
              <path d="M 55 110 Q 80 156 105 110 Z" fill="#881337" stroke="#0f172a" strokeWidth="3.2" strokeLinejoin="round">
                <animate
                  attributeName="d"
                  values="M 55 110 Q 80 156 105 110 Z; M 60 112 Q 80 120 100 112 Z; M 54 109 Q 80 160 106 109 Z; M 58 112 Q 80 126 102 112 Z; M 55 110 Q 80 156 105 110 Z"
                  dur={mouthDur}
                  repeatCount="indefinite"
                />
              </path>
              {/* Animated Bass Tongue */}
              <ellipse cx="80" cy="126" rx="11" ry="6" fill="#fb7185">
                <animate attributeName="ry" values="6;1.2;6.8;2;6" dur={mouthDur} repeatCount="indefinite" />
                <animate attributeName="cy" values="126;115;128;117;126" dur={mouthDur} repeatCount="indefinite" />
              </ellipse>
              {/* Short Upper Teeth along top lip (y=110..117 so jaw movement down to y=135 is completely visible!) */}
              <polygon points="62,110.5 66,117.5 70,110.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1" strokeLinejoin="round" />
              <polygon points="75,110.5 80,118.5 85,110.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1" strokeLinejoin="round" />
              <polygon points="90,110.5 94,117.5 98,110.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1" strokeLinejoin="round" />
            </g>
          )}

          {/* Cel-Shaded Tentacles */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''} style={{ animationDuration: animDuration }}>
            <path d="M 48 144 Q 42 175 40 196" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
            <path d="M 48 144 Q 42 175 40 196" stroke="#eab308" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            <path d="M 68 148 Q 66 178 70 198" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 68 148 Q 66 178 70 198" stroke="#ca8a04" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 92 148 Q 94 178 90 198" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 92 148 Q 94 178 90 198" stroke="#ca8a04" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 112 144 Q 116 175 118 196" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
            <path d="M 112 144 Q 116 175 118 196" stroke="#eab308" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. MAGMA MEDUSA (Fiery Minor Thermal Vocal Lead)
// ---------------------------------------------------------------------------
export function MagmaMedusa({
  isSleeping,
  isSupercharged,
  hasCoin,
  coinAmount = 1,
  level = 1,
  costumeId = null,
  tempoSpeed = 1.0,
  isNight,
  isSelecting,
  selectionIndex,
  onCoinCollect,
  onClick
}) {
  const animDuration = isSupercharged ? '0.38s' : `${1.6 / tempoSpeed}s`;
  const mouthDur = isSupercharged ? '0.26s' : `${Math.max(0.35, 0.45 / tempoSpeed).toFixed(2)}s`;
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

      <div
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-magma' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 160 200">
          <defs>
            <clipPath id="magmaMedusaClip">
              <path d="M 28 112 Q 28 38 80 38 Q 132 38 132 112 Q 110 122 80 122 Q 50 122 28 112 Z" />
            </clipPath>
          </defs>

          {/* Floating Singing Notes */}
          {!isSleeping && (
            <g transform="translate(80, 44)">
              <text x="-58" y="-4" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-2;-14;-2" dur="0.82s" repeatCount="indefinite" />
              </text>
              <text x="44" y="-8" fill="#fb923c" stroke="#0f172a" strokeWidth="1.5" fontSize="23" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♫
                <animate attributeName="y" values="-6;-20;-6" dur="0.92s" repeatCount="indefinite" />
              </text>
            </g>
          )}

          {/* Sleeping Zzz */}
          {isSleeping && (
            <g transform="translate(65, 16) rotate(-12)">
              <path d="M 0 28 Q 28 -8 52 18 Z" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="52" cy="18" r="7" fill="#86efac" stroke="#0f172a" strokeWidth="2" />
              <text x="62" y="-2" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" fontSize="18" fontWeight="900" fontFamily="'Lilita One', sans-serif">Zzz</text>
            </g>
          )}

          {/* Dome Bell with Bold Ink Contour */}
          <path d="M 28 112 Q 28 38 80 38 Q 132 38 132 112 Q 110 122 80 122 Q 50 122 28 112 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="4.5" strokeLinejoin="round" />

          {/* Hard Cel-Shadow Partition */}
          <g clipPath="url(#magmaMedusaClip)">
            <path d="M 80 38 Q 132 38 132 112 L 68 118 Q 115 90 80 38 Z" fill="#991b1b" />
          </g>

          {/* Gloss Specular Arc */}
          <path d="M 44 68 Q 58 45 80 44" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <circle cx="92" cy="46" r="2.8" fill="#ffffff" opacity="0.85" />

          {/* Glowing Forehead Lava Crack (stopped at y=72 so it never crosses the face/mouth) */}
          <path d="M 80 44 Q 74 58 82 72" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 80 44 Q 74 58 82 72" stroke="#fde047" strokeWidth="2.8" strokeLinecap="round" fill="none" />

          {/* Cartoon Singing Diva Eyes & Mouth */}
          {isSleeping ? (
            <g>
              <path d="M 56 86 Q 66 94 76 86" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 86 86 Q 96 94 106 86" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 74 102 Q 81 107 88 102" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {isSupercharged ? (
                <>
                  <circle cx="65" cy="84" r="10" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="65" y="89" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                  <circle cx="97" cy="84" r="10" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="97" y="89" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                </>
              ) : (
                <>
                  <ellipse cx="65" cy="84" rx="8.5" ry="10.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2.8" />
                  <ellipse cx="67" cy="85" rx="5.2" ry="7" fill="#7f1d1d" />
                  <circle cx="64" cy="81" r="2.5" fill="#ffffff" />
                  <circle cx="69" cy="87" r="1.2" fill="#ffffff" />

                  <ellipse cx="97" cy="84" rx="8.5" ry="10.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2.8" />
                  <ellipse cx="95" cy="85" rx="5.2" ry="7" fill="#7f1d1d" />
                  <circle cx="94" cy="81" r="2.5" fill="#ffffff" />
                  <circle cx="99" cy="87" r="1.2" fill="#ffffff" />
                </>
              )}

              {/* Cheeks */}
              <ellipse cx="51" cy="92" rx="6" ry="3.5" fill="#fde047" opacity="0.75" />
              <ellipse cx="111" cy="92" rx="6" ry="3.5" fill="#fde047" opacity="0.75" />

              {/* Big Operatic Lava Diva Singing Mouth */}
              <path d="M 66 96 Q 81 132 96 96 Z" fill="#450a0a" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
                <animate
                  attributeName="d"
                  values="M 66 96 Q 81 132 96 96 Z; M 70 98 Q 81 104 92 98 Z; M 65 95 Q 81 136 97 95 Z; M 69 98 Q 81 108 93 98 Z; M 66 96 Q 81 132 96 96 Z"
                  dur={mouthDur}
                  repeatCount="indefinite"
                />
              </path>
              {/* Bright Lava Tongue */}
              <ellipse cx="81" cy="108" rx="7.5" ry="4.5" fill="#fb7185">
                <animate attributeName="ry" values="4.5;1;5.2;1.5;4.5" dur={mouthDur} repeatCount="indefinite" />
                <animate attributeName="cy" values="108;100;110;102;108" dur={mouthDur} repeatCount="indefinite" />
              </ellipse>
              {/* Upper Teeth Bar */}
              <path d="M 71 96.5 L 91 96.5 L 89 100 L 73 100 Z" fill="#ffffff" />
            </g>
          )}

          {/* Cel-Shaded Flowing Lava Tendrils */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''} style={{ animationDuration: animDuration }}>
            <path d="M 44 120 Q 36 150 46 190" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
            <path d="M 44 120 Q 36 150 46 190" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            <path d="M 64 122 Q 58 155 64 196" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 64 122 Q 58 155 64 196" stroke="#ef4444" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 82 122 Q 84 160 80 198" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M 82 122 Q 84 160 80 198" stroke="#fde047" strokeWidth="4" strokeLinecap="round" fill="none" />

            <path d="M 98 122 Q 102 155 98 196" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 98 122 Q 102 155 98 196" stroke="#ef4444" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 116 120 Q 124 150 114 190" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
            <path d="M 116 120 Q 124 150 114 190" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. VENT CRACKER (Industrial Steam Blasts & Snares)
// ---------------------------------------------------------------------------
export function VentCracker({
  isSleeping,
  isSupercharged,
  hasCoin,
  coinAmount = 1,
  level = 1,
  costumeId = null,
  tempoSpeed = 1.0,
  isNight,
  isSelecting,
  selectionIndex,
  onCoinCollect,
  onClick
}) {
  const animDuration = isSupercharged ? '0.38s' : `${1.0 / tempoSpeed}s`;
  const mouthDur = isSupercharged ? '0.24s' : `${Math.max(0.32, 0.42 / tempoSpeed).toFixed(2)}s`;
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

      <div
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-vent' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 160 200">
          {/* Floating Singing Notes */}
          {!isSleeping && (
            <g transform="translate(80, 44)">
              <text x="-58" y="-4" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-2;-14;-2" dur="0.78s" repeatCount="indefinite" />
              </text>
              <text x="44" y="-8" fill="#fb923c" stroke="#0f172a" strokeWidth="1.5" fontSize="23" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♫
                <animate attributeName="y" values="-6;-20;-6" dur="0.88s" repeatCount="indefinite" />
              </text>
            </g>
          )}

          {/* Sleeping Zzz */}
          {isSleeping && (
            <g transform="translate(65, 16) rotate(-12)">
              <path d="M 0 28 Q 28 -8 52 18 Z" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="52" cy="18" r="7" fill="#86efac" stroke="#0f172a" strokeWidth="2" />
              <text x="62" y="-2" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" fontSize="18" fontWeight="900" fontFamily="'Lilita One', sans-serif">Zzz</text>
            </g>
          )}

          {/* Animated Steam Puff with Comic Ink */}
          {!isSleeping && (
            <g transform="translate(80, 24)">
              <circle cx="0" cy="0" r="10" fill="#fdba74" stroke="#0f172a" strokeWidth="2" opacity="0.9">
                <animate attributeName="cy" values="2;-10;2" dur={mouthDur} repeatCount="indefinite" />
                <animate attributeName="r" values="8;13;8" dur={mouthDur} repeatCount="indefinite" />
              </circle>
              <circle cx="-6" cy="-4" r="5" fill="#fef08a">
                <animate attributeName="cy" values="-2;-14;-2" dur={mouthDur} repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {/* Volcanic Rock Carapace Body with Bold Ink Outline */}
          <polygon points="30,140 44,70 80,48 116,70 130,140" fill="#334155" stroke="#0f172a" strokeWidth="4.5" strokeLinejoin="round" />

          {/* Cel-Shaded Facet Partitions */}
          <polygon points="80,48 116,70 130,140 80,140" fill="#1e293b" />
          <polygon points="44,70 80,48 80,140 30,140" fill="#475569" />

          {/* Top Steam Vent Crater */}
          <ellipse cx="80" cy="48" rx="24" ry="10" fill="#7f1d1d" stroke="#0f172a" strokeWidth="3" />
          <ellipse cx="80" cy="48" rx="14" ry="5.5" fill="#f97316">
            {!isSleeping && <animate attributeName="rx" values="12;17;12" dur={mouthDur} repeatCount="indefinite" />}
          </ellipse>

          {/* Eyes & Furnace Singing Mouth */}
          {isSleeping ? (
            <g>
              <path d="M 56 96 Q 66 104 76 96" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 84 96 Q 94 104 104 96" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 68 118 L 92 118" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {isSupercharged ? (
                <>
                  <circle cx="65" cy="94" r="10" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="65" y="99" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                  <circle cx="95" cy="94" r="10" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="95" y="99" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                </>
              ) : (
                <>
                  <polygon points="56,96 74,88 70,104" fill="#fde047" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
                  <circle cx="66" cy="95" r="2.5" fill="#0f172a" />
                  <polygon points="104,96 86,88 90,104" fill="#fde047" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
                  <circle cx="94" cy="95" r="2.5" fill="#0f172a" />
                </>
              )}

              {/* Big Glowing Furnace Singing Mouth */}
              <path d="M 58 110 Q 80 150 102 110 Z" fill="#7f1d1d" stroke="#0f172a" strokeWidth="3.2" strokeLinejoin="round">
                <animate
                  attributeName="d"
                  values="M 58 110 Q 80 150 102 110 Z; M 63 112 Q 80 118 97 112 Z; M 57 109 Q 80 154 103 109 Z; M 62 112 Q 80 124 98 112 Z; M 58 110 Q 80 150 102 110 Z"
                  dur={mouthDur}
                  repeatCount="indefinite"
                />
              </path>
              {/* Bright Magma Tongue */}
              <ellipse cx="80" cy="124" rx="10" ry="5.5" fill="#fde047">
                <animate attributeName="ry" values="5.5;1.2;6.2;1.8;5.5" dur={mouthDur} repeatCount="indefinite" />
                <animate attributeName="cy" values="124;114;126;116;124" dur={mouthDur} repeatCount="indefinite" />
              </ellipse>
              {/* Upper Rock/Fang Teeth */}
              <path d="M 64 110.5 L 96 110.5 L 93 114.5 L 67 114.5 Z" fill="#ffffff" />
            </g>
          )}

          {/* Cel-Shaded Rock Feet */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''} style={{ animationDuration: animDuration }}>
            <path d="M 38 140 L 30 186" stroke="#0f172a" strokeWidth="9" strokeLinecap="round" />
            <path d="M 38 140 L 30 186" stroke="#475569" strokeWidth="5" strokeLinecap="round" />

            <path d="M 64 140 L 58 192" stroke="#0f172a" strokeWidth="9" strokeLinecap="round" />
            <path d="M 64 140 L 58 192" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />

            <path d="M 96 140 L 102 192" stroke="#0f172a" strokeWidth="9" strokeLinecap="round" />
            <path d="M 96 140 L 102 192" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />

            <path d="M 122 140 L 130 186" stroke="#0f172a" strokeWidth="9" strokeLinecap="round" />
            <path d="M 122 140 L 130 186" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. OBSIDIAN SIREN (Magma + Angler Hybrid)
// ---------------------------------------------------------------------------
export function ObsidianSiren({
  isSleeping,
  isSupercharged,
  hasCoin,
  coinAmount = 1,
  level = 1,
  costumeId = null,
  tempoSpeed = 1.0,
  isNight,
  isSelecting,
  selectionIndex,
  onCoinCollect,
  onClick
}) {
  const animDuration = isSupercharged ? '0.38s' : `${1.4 / tempoSpeed}s`;
  const mouthDur = isSupercharged ? '0.26s' : `${Math.max(0.34, 0.44 / tempoSpeed).toFixed(2)}s`;
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

      <div
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-obsidian' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 160 200">
          <defs>
            <clipPath id="obsidianSirenClip">
              <path d="M 34 110 Q 38 42 80 42 Q 122 42 126 110 Q 105 125 80 125 Q 55 125 34 110 Z" />
            </clipPath>
          </defs>

          {/* Floating Singing Notes */}
          {!isSleeping && (
            <g transform="translate(80, 44)">
              <text x="-58" y="-4" fill="#e879f9" stroke="#0f172a" strokeWidth="1.5" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-2;-14;-2" dur="0.84s" repeatCount="indefinite" />
              </text>
              <text x="44" y="-8" fill="#c084fc" stroke="#0f172a" strokeWidth="1.5" fontSize="23" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♫
                <animate attributeName="y" values="-6;-20;-6" dur="0.94s" repeatCount="indefinite" />
              </text>
            </g>
          )}

          {/* Sleeping Zzz */}
          {isSleeping && (
            <g transform="translate(65, 16) rotate(-12)">
              <path d="M 0 28 Q 28 -8 52 18 Z" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="52" cy="18" r="7" fill="#86efac" stroke="#0f172a" strokeWidth="2" />
              <text x="62" y="-2" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" fontSize="18" fontWeight="900" fontFamily="'Lilita One', sans-serif">Zzz</text>
            </g>
          )}

          {/* Glowing Purple Crown Jewel with Ink Rim */}
          <circle cx="80" cy="40" r="9" fill="#a855f7" stroke="#0f172a" strokeWidth="2.5" />
          <circle cx="78" cy="38" r="2.5" fill="#ffffff" />

          {/* Sleek Obsidian Glass Dome with Bold Ink Contour */}
          <path d="M 34 110 Q 38 42 80 42 Q 122 42 126 110 Q 105 125 80 125 Q 55 125 34 110 Z" fill="#3b0764" stroke="#0f172a" strokeWidth="4.5" strokeLinejoin="round" />

          {/* Hard Cel-Shadow Partition */}
          <g clipPath="url(#obsidianSirenClip)">
            <path d="M 80 42 Q 122 42 126 110 L 68 118 Q 110 88 80 42 Z" fill="#1e1b4b" />
          </g>

          {/* Specular Highlight Gloss Arc */}
          <path d="M 46 68 Q 58 48 80 46" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <circle cx="92" cy="48" r="2.8" fill="#ffffff" opacity="0.85" />

          {/* Eyes & High-Contrast Singing Mouth */}
          {isSleeping ? (
            <g>
              <path d="M 60 88 Q 68 96 76 88 M 84 88 Q 92 96 100 88" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 74 104 Q 81 109 88 104" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {isSupercharged ? (
                <>
                  <circle cx="66" cy="86" r="10" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="66" y="91" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                  <circle cx="96" cy="86" r="10" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="96" y="91" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                </>
              ) : (
                <>
                  <ellipse cx="66" cy="86" rx="8" ry="10.5" fill="#e9d5ff" stroke="#0f172a" strokeWidth="2.5" />
                  <ellipse cx="68" cy="87" rx="5" ry="7" fill="#581c87" />
                  <circle cx="66" cy="84" r="2.2" fill="#ffffff" />

                  <ellipse cx="96" cy="86" rx="8" ry="10.5" fill="#e9d5ff" stroke="#0f172a" strokeWidth="2.5" />
                  <ellipse cx="94" cy="87" rx="5" ry="7" fill="#581c87" />
                  <circle cx="92" cy="84" r="2.2" fill="#ffffff" />
                </>
              )}

              {/* Cheeks */}
              <ellipse cx="52" cy="94" rx="5.5" ry="3.2" fill="#e879f9" opacity="0.8" />
              <ellipse cx="110" cy="94" rx="5.5" ry="3.2" fill="#e879f9" opacity="0.8" />

              {/* High-Contrast Crimson Singing Mouth (stands out sharply against dark obsidian body) */}
              <path d="M 66 97 Q 81 132 96 97 Z" fill="#881337" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
                <animate
                  attributeName="d"
                  values="M 66 97 Q 81 132 96 97 Z; M 70 99 Q 81 105 92 99 Z; M 65 96 Q 81 136 97 96 Z; M 69 99 Q 81 109 93 99 Z; M 66 97 Q 81 132 96 97 Z"
                  dur={mouthDur}
                  repeatCount="indefinite"
                />
              </path>
              {/* Bright Pink/Neon Tongue */}
              <ellipse cx="81" cy="109" rx="7.5" ry="4.5" fill="#f472b6">
                <animate attributeName="ry" values="4.5;1;5.2;1.5;4.5" dur={mouthDur} repeatCount="indefinite" />
                <animate attributeName="cy" values="109;101;111;103;109" dur={mouthDur} repeatCount="indefinite" />
              </ellipse>
              {/* Upper Teeth Bar */}
              <path d="M 71 97.5 L 91 97.5 L 89 101 L 73 101 Z" fill="#ffffff" />
            </g>
          )}

          {/* Cel-Shaded Crystal Shard Tentacles */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''} style={{ animationDuration: animDuration }}>
            <path d="M 44 120 Q 38 155 46 195" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
            <path d="M 44 120 Q 38 155 46 195" stroke="#a855f7" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            <path d="M 68 124 Q 65 160 70 198" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 68 124 Q 65 160 70 198" stroke="#c084fc" strokeWidth="5" strokeLinecap="round" fill="none" />

            <path d="M 92 124 Q 95 160 90 198" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 92 124 Q 95 160 90 198" stroke="#c084fc" strokeWidth="5" strokeLinecap="round" fill="none" />

            <path d="M 116 120 Q 122 155 114 195" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
            <path d="M 116 120 Q 122 155 114 195" stroke="#a855f7" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5. PYRE PUFF (Magma + Vent Hybrid)
// ---------------------------------------------------------------------------
export function PyrePuff({
  isSleeping,
  isSupercharged,
  hasCoin,
  coinAmount = 1,
  level = 1,
  costumeId = null,
  tempoSpeed = 1.0,
  isNight,
  isSelecting,
  selectionIndex,
  onCoinCollect,
  onClick
}) {
  const animDuration = isSupercharged ? '0.38s' : `${0.8 / tempoSpeed}s`;
  const mouthDur = isSupercharged ? '0.24s' : `${Math.max(0.32, 0.40 / tempoSpeed).toFixed(2)}s`;
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

      <div
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-pyre' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 160 200">
          {/* Floating Singing Notes */}
          {!isSleeping && (
            <g transform="translate(80, 46)">
              <text x="-58" y="-4" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-2;-14;-2" dur="0.76s" repeatCount="indefinite" />
              </text>
              <text x="44" y="-8" fill="#fb923c" stroke="#0f172a" strokeWidth="1.5" fontSize="23" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♫
                <animate attributeName="y" values="-6;-20;-6" dur="0.86s" repeatCount="indefinite" />
              </text>
            </g>
          )}

          {/* Sleeping Zzz */}
          {isSleeping && (
            <g transform="translate(65, 16) rotate(-12)">
              <path d="M 0 28 Q 28 -8 52 18 Z" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="52" cy="18" r="7" fill="#86efac" stroke="#0f172a" strokeWidth="2" />
              <text x="62" y="-2" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" fontSize="18" fontWeight="900" fontFamily="'Lilita One', sans-serif">Zzz</text>
            </g>
          )}

          {/* Dancing Flame Crest with Ink Outlines */}
          <polygon points="65,58 75,28 85,55" fill="#fde047" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="80,55 90,24 100,60" fill="#fb923c" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />

          {/* Main Spherical Body Contour */}
          <circle cx="80" cy="100" r="48" fill="#f43f5e" stroke="#0f172a" strokeWidth="4.5" />

          {/* Hard Cel-Shadow Partition */}
          <path d="M 80 52 A 48 48 0 0 1 128 100 A 48 48 0 0 1 80 148 C 65 148 55 144 48 138 C 90 132 118 112 112 82 C 105 64 94 54 80 52 Z" fill="#be123c" />

          {/* Specular Highlight Gloss Arc */}
          <path d="M 48 74 C 58 60 74 58 86 60" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <circle cx="96" cy="62" r="2.8" fill="#ffffff" opacity="0.85" />

          {/* Eyes & Singing Mouth */}
          {isSleeping ? (
            <g>
              <path d="M 58 96 Q 68 104 78 96 M 86 96 Q 96 104 106 96" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 73 114 Q 81 119 89 114" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {isSupercharged ? (
                <>
                  <circle cx="66" cy="92" r="10" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="66" y="97" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                  <circle cx="96" cy="92" r="10" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="96" y="97" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                </>
              ) : (
                <>
                  <ellipse cx="66" cy="92" rx="8.5" ry="10.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2.8" />
                  <ellipse cx="68" cy="93" rx="5.2" ry="7" fill="#881337" />
                  <circle cx="65" cy="89" r="2.5" fill="#ffffff" />
                  <circle cx="70" cy="95" r="1.2" fill="#ffffff" />

                  <ellipse cx="96" cy="92" rx="8.5" ry="10.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2.8" />
                  <ellipse cx="94" cy="93" rx="5.2" ry="7" fill="#881337" />
                  <circle cx="93" cy="89" r="2.5" fill="#ffffff" />
                  <circle cx="98" cy="95" r="1.2" fill="#ffffff" />
                </>
              )}

              {/* Cheeks */}
              <ellipse cx="52" cy="100" rx="6" ry="3.5" fill="#fde047" opacity="0.8" />
              <ellipse cx="110" cy="100" rx="6" ry="3.5" fill="#fde047" opacity="0.8" />

              {/* Big Animated Fiery Singing Mouth */}
              <path d="M 65 107 Q 81 144 97 107 Z" fill="#881337" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
                <animate
                  attributeName="d"
                  values="M 65 107 Q 81 144 97 107 Z; M 69 109 Q 81 115 93 109 Z; M 64 106 Q 81 148 98 106 Z; M 68 109 Q 81 119 94 109 Z; M 65 107 Q 81 144 97 107 Z"
                  dur={mouthDur}
                  repeatCount="indefinite"
                />
              </path>
              {/* Bright Flame Tongue */}
              <ellipse cx="81" cy="119" rx="8" ry="4.5" fill="#fde047">
                <animate attributeName="ry" values="4.5;1;5.2;1.5;4.5" dur={mouthDur} repeatCount="indefinite" />
                <animate attributeName="cy" values="119;111;121;113;119" dur={mouthDur} repeatCount="indefinite" />
              </ellipse>
              {/* Upper Teeth Bar */}
              <path d="M 70 107.5 L 92 107.5 L 90 111 L 72 111 Z" fill="#ffffff" />
            </g>
          )}

          {/* Cel-Shaded Flame Tentacles */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''} style={{ animationDuration: animDuration }}>
            <path d="M 50 144 Q 44 170 52 196" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 50 144 Q 44 170 52 196" stroke="#f43f5e" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 70 148 Q 65 175 72 198" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 70 148 Q 65 175 72 198" stroke="#fb923c" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 90 148 Q 95 175 88 198" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 90 148 Q 95 175 88 198" stroke="#fb923c" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 110 144 Q 116 170 108 196" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 110 144 Q 116 170 108 196" stroke="#f43f5e" strokeWidth="4.8" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}
