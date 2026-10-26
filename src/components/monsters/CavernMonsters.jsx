import Coin from '../Coin';
import SelectionBadge from '../SelectionBadge';
import CostumeOverlay from '../CostumeOverlay';

// ---------------------------------------------------------------------------
// 1. CRYSTAL BELL (Water Harp & Pristine Pentatonic Chimes)
// ---------------------------------------------------------------------------
export function CrystalBell({
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
  const animDuration = isSupercharged ? '0.38s' : `${1.5 / tempoSpeed}s`;
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
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-crystal-bell' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 160 200">
          <defs>
            <clipPath id="crystalBellClip">
              <polygon points="80,32 128,75 112,122 48,122 32,75" />
            </clipPath>
          </defs>

          {/* Floating Singing Notes */}
          {!isSleeping && (
            <g transform="translate(80, 44)">
              <text x="-58" y="-4" fill="#67e8f9" stroke="#0f172a" strokeWidth="1.5" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-2;-14;-2" dur="0.82s" repeatCount="indefinite" />
              </text>
              <text x="44" y="-8" fill="#facc15" stroke="#0f172a" strokeWidth="1.5" fontSize="23" fontWeight="900" fontFamily="'Lilita One', sans-serif">
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

          {/* Faceted Crystal Bell Dome with Bold Ink Contour */}
          <polygon points="80,32 128,75 112,122 48,122 32,75" fill="#38bdf8" stroke="#0f172a" strokeWidth="4.5" strokeLinejoin="round" />

          {/* Cel-Shaded Facet Partitions */}
          <polygon points="80,32 128,75 112,122 80,122" fill="#0284c7" />
          <polygon points="80,32 48,122 32,75" fill="#67e8f9" />
          <polygon points="80,32 80,122 48,122" fill="#bae6fd" />

          {/* Cel Specular Gloss Highlights & Facet Lines (Center line stops at y=70 above eyes/mouth!) */}
          <polygon points="80,35 60,65 52,60 76,34" fill="#ffffff" opacity="0.85" />
          <line x1="80" y1="32" x2="80" y2="70" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="32" x2="48" y2="122" stroke="#0f172a" strokeWidth="2.5" />
          <line x1="80" y1="32" x2="112" y2="122" stroke="#0f172a" strokeWidth="2.5" />

          {/* Expressive Cartoon Eyes & Chime Singing Mouth */}
          {isSleeping ? (
            <g>
              <path d="M 56 84 Q 66 92 76 84" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 86 84 Q 96 92 106 84" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 74 102 Q 81 107 88 102" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {isSupercharged ? (
                <>
                  <circle cx="65" cy="82" r="10" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="65" y="87" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                  <circle cx="97" cy="82" r="10" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="97" y="87" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                </>
              ) : (
                <>
                  <ellipse cx="65" cy="82" rx="8.5" ry="11" fill="#ffffff" stroke="#0f172a" strokeWidth="2.8" />
                  <ellipse cx="67" cy="83" rx="5.2" ry="7" fill="#0891b2" />
                  <circle cx="64" cy="79" r="2.8" fill="#ffffff" />
                  <circle cx="69" cy="86" r="1.3" fill="#ffffff" />

                  <ellipse cx="97" cy="82" rx="8.5" ry="11" fill="#ffffff" stroke="#0f172a" strokeWidth="2.8" />
                  <ellipse cx="95" cy="83" rx="5.2" ry="7" fill="#0891b2" />
                  <circle cx="93" cy="79" r="2.8" fill="#ffffff" />
                  <circle cx="98" cy="86" r="1.3" fill="#ffffff" />
                </>
              )}

              {/* Cheeks */}
              <ellipse cx="52" cy="90" rx="5.5" ry="3.2" fill="#f472b6" opacity="0.8" />
              <ellipse cx="110" cy="90" rx="5.5" ry="3.2" fill="#f472b6" opacity="0.8" />

              {/* Big Crystal Chime Singing Mouth */}
              <path d="M 66 94 Q 81 130 96 94 Z" fill="#881337" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
                <animate
                  attributeName="d"
                  values="M 66 94 Q 81 130 96 94 Z; M 70 96 Q 81 102 92 96 Z; M 65 93 Q 81 134 97 93 Z; M 69 96 Q 81 106 93 96 Z; M 66 94 Q 81 130 96 94 Z"
                  dur={mouthDur}
                  repeatCount="indefinite"
                />
              </path>
              {/* Tongue */}
              <ellipse cx="81" cy="106" rx="7.5" ry="4.5" fill="#fb7185">
                <animate attributeName="ry" values="4.5;1;5.2;1.5;4.5" dur={mouthDur} repeatCount="indefinite" />
                <animate attributeName="cy" values="106;98;108;100;106" dur={mouthDur} repeatCount="indefinite" />
              </ellipse>
              {/* Upper Teeth Bar */}
              <path d="M 71 94.5 L 91 94.5 L 89 98 L 73 98 Z" fill="#ffffff" />
            </g>
          )}

          {/* Cel-Shaded Crystalline Pendant Tentacles */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''} style={{ animationDuration: animDuration }}>
            <path d="M 44 122 L 38 185" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" />
            <path d="M 44 122 L 38 185" stroke="#22d3ee" strokeWidth="4.5" strokeLinecap="round" />

            <path d="M 68 124 L 64 195" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
            <path d="M 68 124 L 64 195" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" />

            <path d="M 92 124 L 96 195" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
            <path d="M 92 124 L 96 195" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" />

            <path d="M 116 122 L 122 185" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" />
            <path d="M 116 122 L 122 185" stroke="#22d3ee" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. LO-FI SPORE (Rhodes Electric Piano 7th Chords)
// ---------------------------------------------------------------------------
export function LoFiSpore({
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
  const animDuration = isSupercharged ? '0.38s' : `${1.8 / tempoSpeed}s`;
  const mouthDur = isSupercharged ? '0.26s' : `${Math.max(0.36, 0.48 / tempoSpeed).toFixed(2)}s`;
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
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-lofi-spore' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 160 200">
          <defs>
            <clipPath id="sporeCapClip">
              <path d="M 24 118 Q 24 40 80 40 Q 136 40 136 118 Z" />
            </clipPath>
          </defs>

          {/* Floating Singing Notes */}
          {!isSleeping && (
            <g transform="translate(80, 44)">
              <text x="-58" y="-4" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-2;-14;-2" dur="0.88s" repeatCount="indefinite" />
              </text>
              <text x="44" y="-8" fill="#e879f9" stroke="#0f172a" strokeWidth="1.5" fontSize="23" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♫
                <animate attributeName="y" values="-6;-20;-6" dur="0.98s" repeatCount="indefinite" />
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

          {/* Mushroom Cap Dome with Bold Ink Outline */}
          <path d="M 24 118 Q 24 40 80 40 Q 136 40 136 118 Z" fill="#a855f7" stroke="#0f172a" strokeWidth="4.5" strokeLinejoin="round" />

          {/* Hard Cel-Shadow Partition */}
          <g clipPath="url(#sporeCapClip)">
            <path d="M 80 40 Q 136 40 136 118 L 65 118 Q 115 88 80 40 Z" fill="#6b21a8" />
          </g>

          {/* Specular Highlight Gloss Arc */}
          <path d="M 38 68 Q 52 46 80 44" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
          <circle cx="92" cy="46" r="3" fill="#ffffff" opacity="0.85" />

          {/* Bioluminescent Spore Spots with Ink Outlines */}
          <circle cx="52" cy="68" r="7.5" fill="#fef08a" stroke="#0f172a" strokeWidth="2.5" />
          <circle cx="50" cy="66" r="2" fill="#ffffff" />
          <circle cx="80" cy="56" r="9.5" fill="#fef08a" stroke="#0f172a" strokeWidth="2.5" />
          <circle cx="77" cy="53" r="2.5" fill="#ffffff" />
          <circle cx="108" cy="70" r="7" fill="#fef08a" stroke="#0f172a" strokeWidth="2.5" />
          <circle cx="106" cy="68" r="2" fill="#ffffff" />

          {/* Relaxed Lo-Fi Cartoon Eyes & Big Singing Mouth */}
          {isSleeping ? (
            <g>
              <path d="M 56 88 Q 66 96 76 88 M 86 88 Q 96 96 106 88" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 74 104 Q 81 109 88 104" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {isSupercharged ? (
                <>
                  <circle cx="66" cy="84" r="10" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="66" y="89" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                  <circle cx="96" cy="84" r="10" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="96" y="89" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="900">★</text>
                </>
              ) : (
                <>
                  <ellipse cx="66" cy="84" rx="8.5" ry="9.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
                  <ellipse cx="68" cy="85" rx="5.2" ry="6.5" fill="#3b0764" />
                  <circle cx="66" cy="82" r="2.2" fill="#ffffff" />
                  <path d="M 58 80 Q 66 85 74 80" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />

                  <ellipse cx="96" cy="84" rx="8.5" ry="9.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
                  <ellipse cx="94" cy="85" rx="5.2" ry="6.5" fill="#3b0764" />
                  <circle cx="92" cy="82" r="2.2" fill="#ffffff" />
                  <path d="M 88 80 Q 96 85 104 80" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
                </>
              )}

              {/* Cheeks */}
              <ellipse cx="50" cy="92" rx="6" ry="3.5" fill="#f472b6" opacity="0.8" />
              <ellipse cx="112" cy="92" rx="6" ry="3.5" fill="#f472b6" opacity="0.8" />

              {/* Big Animated Lo-Fi Singing Mouth */}
              <path d="M 65 95 Q 81 131 97 95 Z" fill="#881337" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
                <animate
                  attributeName="d"
                  values="M 65 95 Q 81 131 97 95 Z; M 69 97 Q 81 103 93 97 Z; M 64 94 Q 81 135 98 94 Z; M 68 97 Q 81 107 94 97 Z; M 65 95 Q 81 131 97 95 Z"
                  dur={mouthDur}
                  repeatCount="indefinite"
                />
              </path>
              {/* Tongue */}
              <ellipse cx="81" cy="107" rx="7.5" ry="4.5" fill="#fb7185">
                <animate attributeName="ry" values="4.5;1;5.2;1.5;4.5" dur={mouthDur} repeatCount="indefinite" />
                <animate attributeName="cy" values="107;99;109;101;107" dur={mouthDur} repeatCount="indefinite" />
              </ellipse>
              {/* Upper Teeth Bar */}
              <path d="M 70 95.5 L 92 95.5 L 90 99 L 72 99 Z" fill="#ffffff" />
            </g>
          )}

          {/* Cel-Shaded Ribbon Tentacles */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''} style={{ animationDuration: animDuration }}>
            <path d="M 54 118 Q 48 148 52 186" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 54 118 Q 48 148 52 186" stroke="#c084fc" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            <path d="M 72 118 Q 70 152 74 196" stroke="#0f172a" strokeWidth="8.5" strokeLinecap="round" fill="none" />
            <path d="M 72 118 Q 70 152 74 196" stroke="#e879f9" strokeWidth="5" strokeLinecap="round" fill="none" />

            <path d="M 90 118 Q 92 152 88 196" stroke="#0f172a" strokeWidth="8.5" strokeLinecap="round" fill="none" />
            <path d="M 90 118 Q 92 152 88 196" stroke="#e879f9" strokeWidth="5" strokeLinecap="round" fill="none" />

            <path d="M 108 118 Q 112 148 108 186" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 108 118 Q 112 148 108 186" stroke="#c084fc" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. ECHO NAUTILUS (Dusty Vinyl Boom-Bap Drums)
// ---------------------------------------------------------------------------
export function EchoNautilus({
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
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-nautilus' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 160 200">
          {/* Floating Singing Notes */}
          {!isSleeping && (
            <g transform="translate(80, 44)">
              <text x="-58" y="-4" fill="#34d399" stroke="#0f172a" strokeWidth="1.5" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-2;-14;-2" dur="0.78s" repeatCount="indefinite" />
              </text>
              <text x="46" y="-8" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" fontSize="23" fontWeight="900" fontFamily="'Lilita One', sans-serif">
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

          {/* Cel-Shaded Spiral Nautilus Shell */}
          <path
            d="M 38 120 C 18 80 48 32 90 32 C 132 32 144 78 138 125 C 132 146 90 146 64 130 Z"
            fill="#10b981"
            stroke="#0f172a"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* Hard Cel-Shadow Undertone */}
          <path
            d="M 90 32 C 132 32 144 78 138 125 C 132 146 90 146 64 130 C 100 135 125 110 118 70 C 112 48 98 36 90 32 Z"
            fill="#047857"
          />

          {/* Inner Spiral Ridge with Dark Ink (kept on upper-right shell so face is unobstructed) */}
          <path d="M 92 46 C 120 50 128 78 122 108 C 118 120 104 120 96 108 C 90 98 98 80 108 84" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Gloss Specular Arc */}
          <path d="M 44 75 C 50 50 72 38 90 38" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <circle cx="102" cy="42" r="2.8" fill="#ffffff" opacity="0.85" />

          {/* Drummer Cartoon Eyes & Beatbox Mouth */}
          {isSleeping ? (
            <g>
              <path d="M 48 92 Q 56 100 64 92 M 74 92 Q 82 100 90 92" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 60 110 Q 69 115 78 110" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {isSupercharged ? (
                <>
                  <circle cx="56" cy="90" r="9.5" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="56" y="95" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">★</text>
                  <circle cx="82" cy="90" r="9.5" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="82" y="95" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">★</text>
                </>
              ) : (
                <>
                  <ellipse cx="56" cy="90" rx="8" ry="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2.8" />
                  <ellipse cx="58" cy="91" rx="5" ry="6.5" fill="#064e3b" />
                  <circle cx="55.5" cy="87.5" r="2.5" fill="#ffffff" />
                  <circle cx="60" cy="93" r="1.2" fill="#ffffff" />

                  <ellipse cx="82" cy="90" rx="8" ry="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2.8" />
                  <ellipse cx="80" cy="91" rx="5" ry="6.5" fill="#064e3b" />
                  <circle cx="78" cy="87.5" r="2.5" fill="#ffffff" />
                  <circle cx="82.5" cy="93" r="1.2" fill="#ffffff" />
                </>
              )}

              {/* Big Beatbox Singing Mouth */}
              <path d="M 53 104 Q 69 140 85 104 Z" fill="#881337" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
                <animate
                  attributeName="d"
                  values="M 53 104 Q 69 140 85 104 Z; M 57 106 Q 69 112 81 106 Z; M 52 103 Q 69 144 86 103 Z; M 56 106 Q 69 116 82 106 Z; M 53 104 Q 69 140 85 104 Z"
                  dur={mouthDur}
                  repeatCount="indefinite"
                />
              </path>
              {/* Tongue */}
              <ellipse cx="69" cy="116" rx="7.5" ry="4.5" fill="#fb7185">
                <animate attributeName="ry" values="4.5;1;5.2;1.5;4.5" dur={mouthDur} repeatCount="indefinite" />
                <animate attributeName="cy" values="116;108;118;110;116" dur={mouthDur} repeatCount="indefinite" />
              </ellipse>
              {/* Upper Teeth Bar */}
              <path d="M 58 104.5 L 80 104.5 L 78 108 L 60 108 Z" fill="#ffffff" />
            </g>
          )}

          {/* Drum-Tapping Rhythm Tentacles */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''} style={{ animationDuration: animDuration }}>
            <path d="M 40 130 Q 30 160 38 186" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
            <path d="M 40 130 Q 30 160 38 186" stroke="#34d399" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            <path d="M 60 135 Q 55 165 62 196" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 60 135 Q 55 165 62 196" stroke="#10b981" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 80 135 Q 85 165 78 196" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 80 135 Q 85 165 78 196" stroke="#10b981" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 100 130 Q 110 160 102 186" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
            <path d="M 100 130 Q 110 160 102 186" stroke="#34d399" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. PRISM BLOOM (Crystal Bell + Lo-Fi Spore Hybrid)
// ---------------------------------------------------------------------------
export function PrismBloom({
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
  const mouthDur = isSupercharged ? '0.26s' : `${Math.max(0.35, 0.46 / tempoSpeed).toFixed(2)}s`;
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
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-prism-bloom' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 160 200">
          {/* Floating Singing Notes */}
          {!isSleeping && (
            <g transform="translate(80, 44)">
              <text x="-58" y="-4" fill="#f472b6" stroke="#0f172a" strokeWidth="1.5" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-2;-14;-2" dur="0.84s" repeatCount="indefinite" />
              </text>
              <text x="44" y="-8" fill="#67e8f9" stroke="#0f172a" strokeWidth="1.5" fontSize="23" fontWeight="900" fontFamily="'Lilita One', sans-serif">
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

          {/* Floral Crystalline Petals with Ink Outlines */}
          <polygon points="80,22 96,50 80,76 64,50" fill="#f472b6" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="48,52 75,70 60,96 34,80" fill="#c084fc" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="112,52 126,80 100,96 85,70" fill="#c084fc" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />

          {/* Central Dome with Ink Contour and Cel Shading */}
          <ellipse cx="80" cy="98" rx="45" ry="38" fill="#fbcfe8" stroke="#0f172a" strokeWidth="4.5" />
          <path d="M 80 60 C 105 60, 125 77, 125 98 C 125 119, 105 136, 80 136 C 70 136, 60 134, 52 128 C 95 120, 114 100, 108 77 C 100 66, 90 62, 80 60 Z" fill="#f472b6" />
          <circle cx="62" cy="74" r="3" fill="#ffffff" opacity="0.85" />

          {/* Eyes & Singing Mouth */}
          {isSleeping ? (
            <g>
              <path d="M 60 92 Q 68 100 76 92 M 84 92 Q 92 100 100 92" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 74 106 Q 81 111 88 106" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              {isSupercharged ? (
                <>
                  <circle cx="66" cy="88" r="9.5" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="66" y="93" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">★</text>
                  <circle cx="96" cy="88" r="9.5" fill="#fef08a" stroke="#0f172a" strokeWidth="2.8" />
                  <text x="96" y="93" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">★</text>
                </>
              ) : (
                <>
                  <ellipse cx="66" cy="88" rx="8" ry="10.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
                  <ellipse cx="68" cy="89" rx="5" ry="7" fill="#9d174d" />
                  <circle cx="66" cy="86" r="2.2" fill="#ffffff" />

                  <ellipse cx="96" cy="88" rx="8" ry="10.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
                  <ellipse cx="94" cy="89" rx="5" ry="7" fill="#9d174d" />
                  <circle cx="92" cy="86" r="2.2" fill="#ffffff" />
                </>
              )}

              <ellipse cx="52" cy="96" rx="5.5" ry="3.2" fill="#f472b6" opacity="0.85" />
              <ellipse cx="110" cy="96" rx="5.5" ry="3.2" fill="#f472b6" opacity="0.85" />

              {/* Big Floral Singing Mouth */}
              <path d="M 65 99 Q 81 134 97 99 Z" fill="#881337" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
                <animate
                  attributeName="d"
                  values="M 65 99 Q 81 134 97 99 Z; M 69 101 Q 81 107 93 101 Z; M 64 98 Q 81 138 98 98 Z; M 68 101 Q 81 111 94 101 Z; M 65 99 Q 81 134 97 99 Z"
                  dur={mouthDur}
                  repeatCount="indefinite"
                />
              </path>
              {/* Tongue */}
              <ellipse cx="81" cy="111" rx="7.5" ry="4.5" fill="#fb7185">
                <animate attributeName="ry" values="4.5;1;5.2;1.5;4.5" dur={mouthDur} repeatCount="indefinite" />
                <animate attributeName="cy" values="111;103;113;105;111" dur={mouthDur} repeatCount="indefinite" />
              </ellipse>
              {/* Upper Teeth Bar */}
              <path d="M 70 99.5 L 92 99.5 L 90 103 L 72 103 Z" fill="#ffffff" />
            </g>
          )}

          {/* Cel-Shaded Flower Tentacles */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''} style={{ animationDuration: animDuration }}>
            <path d="M 50 130 Q 42 162 48 190" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
            <path d="M 50 130 Q 42 162 48 190" stroke="#f472b6" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            <path d="M 70 132 Q 68 166 72 196" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 70 132 Q 68 166 72 196" stroke="#c084fc" strokeWidth="5" strokeLinecap="round" fill="none" />

            <path d="M 90 132 Q 92 166 88 196" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 90 132 Q 92 166 88 196" stroke="#c084fc" strokeWidth="5" strokeLinecap="round" fill="none" />

            <path d="M 110 130 Q 118 162 112 190" stroke="#0f172a" strokeWidth="7.5" strokeLinecap="round" fill="none" />
            <path d="M 110 130 Q 118 162 112 190" stroke="#f472b6" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5. LAPIS GROOVE (Lo-Fi Spore + Echo Nautilus Hybrid)
// ---------------------------------------------------------------------------
export function LapisGroove({
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
  const animDuration = isSupercharged ? '0.38s' : `${1.1 / tempoSpeed}s`;
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
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-lapis-groove' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="186" viewBox="0 0 160 200">
          {/* Floating Singing Notes */}
          {!isSleeping && (
            <g transform="translate(80, 46)">
              <text x="-58" y="-4" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♪
                <animate attributeName="y" values="-2;-14;-2" dur="0.8s" repeatCount="indefinite" />
              </text>
              <text x="44" y="-8" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" fontSize="23" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                ♫
                <animate attributeName="y" values="-6;-20;-6" dur="0.9s" repeatCount="indefinite" />
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

          {/* Main Body with Heavy Ink Contour */}
          <ellipse cx="80" cy="96" rx="46" ry="42" fill="#2563eb" stroke="#0f172a" strokeWidth="4.5" />
          {/* Cel Shadow */}
          <path d="M 80 54 C 105 54, 126 73, 126 96 C 126 119, 105 138, 80 138 C 70 138, 60 135, 52 130 C 95 122, 116 104, 110 80 C 103 66, 92 57, 80 54 Z" fill="#1e3a8a" />
          {/* Specular Highlight */}
          <path d="M 52 70 C 62 60, 78 58, 86 60" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />

          {/* Cool Retro Shades with Dark Ink Outlines */}
          <rect x="48" y="76" width="28" height="18" rx="5" fill="#0f172a" stroke="#0f172a" strokeWidth="2.5" />
          <rect x="50" y="78" width="24" height="14" rx="3" fill={isSupercharged ? '#fef08a' : '#1e293b'} />
          {isSupercharged ? (
            <text x="62" y="90" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">★</text>
          ) : (
            <line x1="53" y1="84" x2="71" y2="84" stroke="#38bdf8" strokeWidth="2.5" />
          )}

          <rect x="84" y="76" width="28" height="18" rx="5" fill="#0f172a" stroke="#0f172a" strokeWidth="2.5" />
          <rect x="86" y="78" width="24" height="14" rx="3" fill={isSupercharged ? '#fef08a' : '#1e293b'} />
          {isSupercharged ? (
            <text x="98" y="90" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="900">★</text>
          ) : (
            <line x1="89" y1="84" x2="107" y2="84" stroke="#38bdf8" strokeWidth="2.5" />
          )}

          <line x1="76" y1="84" x2="84" y2="84" stroke="#0f172a" strokeWidth="3.5" />

          {/* Animated Jazz Bass Singing Mouth */}
          {isSleeping ? (
            <path d="M 70 108 L 90 108" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
          ) : (
            <g>
              <path d="M 62 100 Q 80 138 98 100 Z" fill="#881337" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round">
                <animate
                  attributeName="d"
                  values="M 62 100 Q 80 138 98 100 Z; M 67 102 Q 80 108 93 102 Z; M 61 99 Q 80 142 99 99 Z; M 66 102 Q 80 112 94 102 Z; M 62 100 Q 80 138 98 100 Z"
                  dur={mouthDur}
                  repeatCount="indefinite"
                />
              </path>
              {/* Tongue */}
              <ellipse cx="80" cy="113" rx="8.5" ry="5" fill="#fb7185">
                <animate attributeName="ry" values="5;1;5.6;1.6;5" dur={mouthDur} repeatCount="indefinite" />
                <animate attributeName="cy" values="113;104;115;106;113" dur={mouthDur} repeatCount="indefinite" />
              </ellipse>
              {/* Upper Teeth Bar */}
              <path d="M 67 100.5 L 93 100.5 L 91 104 L 69 104 Z" fill="#ffffff" />
            </g>
          )}

          {/* Cel-Shaded Groove Tentacles */}
          <g className={!isSleeping ? 'wiggle-tentacles' : ''} style={{ animationDuration: animDuration }}>
            <path d="M 44 134 Q 38 166 45 196" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 44 134 Q 38 166 45 196" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            <path d="M 68 138 Q 64 168 70 198" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 68 138 Q 64 168 70 198" stroke="#60a5fa" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 92 138 Q 96 168 90 198" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 92 138 Q 96 168 90 198" stroke="#60a5fa" strokeWidth="4.8" strokeLinecap="round" fill="none" />

            <path d="M 116 134 Q 122 166 115 196" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 116 134 Q 122 166 115 196" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>
    </div>
  );
}
