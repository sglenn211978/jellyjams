import Coin from '../Coin';
import SelectionBadge from '../SelectionBadge';
import CostumeOverlay from '../CostumeOverlay';

// ---------------------------------------------------------------------------
// 1. SOL CLAM (Golden Sandstone Clam with Marimba Mallets)
// ---------------------------------------------------------------------------
export function SolClam({
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
  rarity = 'common',
  onCoinCollect,
  onClick
}) {
  const animDuration = isSupercharged ? '0.36s' : `${1.4 / tempoSpeed}s`;
  const scaleFactor = 1 + (level - 1) * 0.04;

  const shellColor = rarity === 'epic' ? '#ec4899' : rarity === 'rare' ? '#f59e0b' : '#eab308';
  const rimColor = rarity === 'epic' ? '#f472b6' : rarity === 'rare' ? '#fbbf24' : '#fef08a';

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        transition: 'transform 0.4s ease, filter 0.4s ease',
        transform: isSleeping ? 'translateY(36px) scale(0.92)' : `scale(${scaleFactor})`,
        filter: isSleeping ? 'grayscale(45%) opacity(0.75)' : 'none'
      }}
    >
      {selectionIndex > 0 && <SelectionBadge index={selectionIndex} />}
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
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-jelly' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="175" viewBox="0 0 160 180">
          <defs>
            <radialGradient id="solClamGrad" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor={rimColor} />
              <stop offset="70%" stopColor={shellColor} />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>
            <radialGradient id="pearlGlow" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
          </defs>

          {/* Marimba Mallets held in side fins */}
          {!isSleeping && (
            <g>
              <line x1="28" y1="120" x2="16" y2="70" stroke="#78350f" strokeWidth="5" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" values="-10 28 120; 15 28 120; -10 28 120" dur="0.5s" repeatCount="indefinite" />
              </line>
              <circle cx="16" cy="70" r="10" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5">
                <animateTransform attributeName="transform" type="rotate" values="-10 28 120; 15 28 120; -10 28 120" dur="0.5s" repeatCount="indefinite" />
              </circle>
              <line x1="132" y1="120" x2="144" y2="70" stroke="#78350f" strokeWidth="5" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" values="10 132 120; -15 132 120; 10 132 120" dur="0.5s" repeatCount="indefinite" />
              </line>
              <circle cx="144" cy="70" r="10" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5">
                <animateTransform attributeName="transform" type="rotate" values="10 132 120; -15 132 120; 10 132 120" dur="0.5s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {/* Lower Clam Shell */}
          <path d="M 24 130 C 24 165, 136 165, 136 130 C 136 110, 24 110, 24 130 Z" fill="#b45309" stroke="#0f172a" strokeWidth="4" />

          {/* Golden Pearl Center Body */}
          <circle cx="80" cy="115" r="28" fill="url(#pearlGlow)" stroke="#0f172a" strokeWidth="3.5" />

          {/* Upper Clam Shell (Hinged Animated Lid) */}
          <g>
            {!isSleeping ? (
              <animateTransform attributeName="transform" type="rotate" values="0 80 130; -24 80 130; 0 80 130" dur={animDuration} repeatCount="indefinite" />
            ) : null}
            <path
              d="M 20 120 C 10 60, 150 60, 140 120 C 130 115, 30 115, 20 120 Z"
              fill="url(#solClamGrad)"
              stroke="#0f172a"
              strokeWidth="4"
            />
            {/* Shell Ridges */}
            <line x1="80" y1="65" x2="80" y2="116" stroke="#78350f" strokeWidth="3" opacity="0.6" />
            <line x1="50" y1="75" x2="65" y2="116" stroke="#78350f" strokeWidth="3" opacity="0.6" />
            <line x1="110" y1="75" x2="95" y2="116" stroke="#78350f" strokeWidth="3" opacity="0.6" />

            {/* Cartoon Eyes on Shell Top */}
            <circle cx="62" cy="85" r="11" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
            <circle cx="64" cy="85" r="5" fill="#0f172a" />
            <circle cx="66" cy="83" r="2" fill="#ffffff" />

            <circle cx="98" cy="85" r="11" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
            <circle cx="96" cy="85" r="5" fill="#0f172a" />
            <circle cx="98" cy="83" r="2" fill="#ffffff" />
          </g>

          {/* Singing Mouth on Pearl */}
          {!isSleeping ? (
            <ellipse cx="80" cy="120" rx="9" ry="8" fill="#78350f" stroke="#0f172a" strokeWidth="2">
              <animate attributeName="ry" values="4;10;4" dur={animDuration} repeatCount="indefinite" />
            </ellipse>
          ) : (
            <path d="M 72 122 Q 80 128 88 122" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}

          {/* Sun Rays Crown */}
          {!isSleeping && (
            <g stroke="#facc15" strokeWidth="3" strokeLinecap="round" opacity="0.85">
              <line x1="80" y1="36" x2="80" y2="48" />
              <line x1="56" y1="42" x2="62" y2="52" />
              <line x1="104" y1="42" x2="98" y2="52" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. CONCH HORN (Caribbean Brass Conch Creature)
// ---------------------------------------------------------------------------
export function ConchHorn({
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
  rarity = 'common',
  onCoinCollect,
  onClick
}) {
  const animDuration = isSupercharged ? '0.34s' : `${1.35 / tempoSpeed}s`;
  const scaleFactor = 1 + (level - 1) * 0.04;

  const shellColor = rarity === 'epic' ? '#a855f7' : rarity === 'rare' ? '#10b981' : '#f97316';
  const rimColor = rarity === 'epic' ? '#d8b4fe' : rarity === 'rare' ? '#6ee7b7' : '#fdba74';

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        transition: 'transform 0.4s ease, filter 0.4s ease',
        transform: isSleeping ? 'translateY(36px) scale(0.92)' : `scale(${scaleFactor})`,
        filter: isSleeping ? 'grayscale(45%) opacity(0.75)' : 'none'
      }}
    >
      {selectionIndex > 0 && <SelectionBadge index={selectionIndex} />}
      {!isSleeping && hasCoin && <Coin onCollect={onCoinCollect} isSupercharged={isSupercharged} amount={coinAmount} />}

      <div
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-jelly' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="175" viewBox="0 0 160 180">
          <defs>
            <radialGradient id="conchGrad" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor={rimColor} />
              <stop offset="65%" stopColor={shellColor} />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
          </defs>

          {/* Coiled Spiral Shell Body */}
          <path
            d="M 50 145 C 15 130, 20 60, 75 40 C 135 20, 155 90, 115 145 C 95 165, 70 160, 50 145 Z"
            fill="url(#conchGrad)"
            stroke="#0f172a"
            strokeWidth="4"
          />

          {/* Spiral ridges */}
          <path d="M 75 40 Q 60 85 95 115" stroke="#7c2d12" strokeWidth="4" fill="none" opacity="0.5" />
          <path d="M 105 50 Q 85 105 110 135" stroke="#7c2d12" strokeWidth="4" fill="none" opacity="0.5" />

          {/* Conch Brass Bell Horn Opening (Left/Front) */}
          <ellipse cx="44" cy="115" rx="20" ry="26" fill="#facc15" stroke="#0f172a" strokeWidth="3.5" />
          <ellipse cx="44" cy="115" rx="13" ry="19" fill="#78350f" stroke="#0f172a" strokeWidth="2" />

          {/* Blowing Puff Cheeks & Cute Eyes on top of shell */}
          <g>
            <circle cx="82" cy="75" r="12" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
            <circle cx="85" cy="75" r="5" fill="#0f172a" />
            <circle cx="87" cy="73" r="2" fill="#ffffff" />

            <circle cx="112" cy="78" r="12" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
            <circle cx="114" cy="78" r="5" fill="#0f172a" />
            <circle cx="116" cy="76" r="2" fill="#ffffff" />
          </g>

          {/* Animated Brass Musical Puff */}
          {!isSleeping && (
            <g transform="translate(18, 100)">
              <text x="0" y="0" fill="#facc15" stroke="#0f172a" strokeWidth="1.5" fontSize="22" fontWeight="900" fontFamily="'Lilita One', sans-serif">
                🎺
                <animateTransform attributeName="transform" type="translate" values="0,0; -14,-14; 0,0" dur="0.68s" repeatCount="indefinite" />
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. MARIMBA MANTA (Acoustic Upright Wooden Bass Manta Ray)
// ---------------------------------------------------------------------------
export function MarimbaManta({
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
  rarity = 'common',
  onCoinCollect,
  onClick
}) {
  const animDuration = isSupercharged ? '0.38s' : `${1.5 / tempoSpeed}s`;
  const scaleFactor = 1 + (level - 1) * 0.04;

  const mantaColor = rarity === 'epic' ? '#ec4899' : rarity === 'rare' ? '#3b82f6' : '#d97706';
  const bellyColor = rarity === 'epic' ? '#fbcfe8' : rarity === 'rare' ? '#bfdbfe' : '#fef3c7';

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        transition: 'transform 0.4s ease, filter 0.4s ease',
        transform: isSleeping ? 'translateY(36px) scale(0.92)' : `scale(${scaleFactor})`,
        filter: isSleeping ? 'grayscale(45%) opacity(0.75)' : 'none'
      }}
    >
      {selectionIndex > 0 && <SelectionBadge index={selectionIndex} />}
      {!isSleeping && hasCoin && <Coin onCollect={onCoinCollect} isSupercharged={isSupercharged} amount={coinAmount} />}

      <div
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-jelly' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="168" height="175" viewBox="0 0 170 180">
          {/* Manta Wings */}
          <path
            d="M 85 45 C 130 55, 170 95, 160 130 C 130 115, 105 130, 85 145 C 65 130, 40 115, 10 130 C 0 95, 40 55, 85 45 Z"
            fill={mantaColor}
            stroke="#0f172a"
            strokeWidth="4"
          />

          {/* Cream Underbelly */}
          <path
            d="M 85 65 C 110 75, 130 100, 120 125 C 105 118, 95 125, 85 135 C 75 125, 65 118, 50 125 C 40 100, 60 75, 85 65 Z"
            fill={bellyColor}
            stroke="#0f172a"
            strokeWidth="2.5"
          />

          {/* Wooden Marimba Slats on Back */}
          <g>
            <rect x="68" y="72" width="34" height="7" rx="3" fill="#78350f" stroke="#0f172a" strokeWidth="2" />
            <rect x="65" y="83" width="40" height="7" rx="3" fill="#92400e" stroke="#0f172a" strokeWidth="2" />
            <rect x="62" y="94" width="46" height="7" rx="3" fill="#78350f" stroke="#0f172a" strokeWidth="2" />
            <rect x="66" y="105" width="38" height="7" rx="3" fill="#92400e" stroke="#0f172a" strokeWidth="2" />
          </g>

          {/* Cartoon Cephalic Horns & Eyes */}
          <circle cx="68" cy="52" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          <circle cx="70" cy="52" r="4.5" fill="#0f172a" />
          <circle cx="102" cy="52" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          <circle cx="100" cy="52" r="4.5" fill="#0f172a" />

          {/* Long Slender Tail */}
          <path d="M 85 145 Q 88 165 92 178" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. SOLAR SIREN (Sunbeam Crowned Golden Jelly)
// ---------------------------------------------------------------------------
export function SolarSiren({
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
  rarity = 'common',
  onCoinCollect,
  onClick
}) {
  const animDuration = isSupercharged ? '0.36s' : `${1.4 / tempoSpeed}s`;
  const scaleFactor = 1 + (level - 1) * 0.04;

  const bodyColor = rarity === 'epic' ? '#22c55e' : rarity === 'rare' ? '#a855f7' : '#f59e0b';
  const crownColor = rarity === 'epic' ? '#86efac' : rarity === 'rare' ? '#e9d5ff' : '#fde047';

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        transition: 'transform 0.4s ease, filter 0.4s ease',
        transform: isSleeping ? 'translateY(36px) scale(0.92)' : `scale(${scaleFactor})`,
        filter: isSleeping ? 'grayscale(45%) opacity(0.75)' : 'none'
      }}
    >
      {selectionIndex > 0 && <SelectionBadge index={selectionIndex} />}
      {!isSleeping && hasCoin && <Coin onCollect={onCoinCollect} isSupercharged={isSupercharged} amount={coinAmount} />}

      <div
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-jelly' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="175" viewBox="0 0 160 180">
          {/* Sun Halo Crown */}
          <polygon points="80,18 88,32 104,26 98,40 114,46 102,56 112,70 96,72 80,62 64,72 48,70 58,56 46,46 62,40 56,26 72,32" fill={crownColor} stroke="#0f172a" strokeWidth="3" />

          {/* Golden Dome Bell */}
          <path
            d="M 35 110 C 30 50, 130 50, 125 110 C 110 115, 50 115, 35 110 Z"
            fill={bodyColor}
            stroke="#0f172a"
            strokeWidth="4"
          />

          {/* Cute Big Cartoon Eyes */}
          <circle cx="62" cy="88" r="12" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          <circle cx="65" cy="88" r="5" fill="#0f172a" />
          <circle cx="67" cy="86" r="2.5" fill="#ffffff" />

          <circle cx="98" cy="88" r="12" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          <circle cx="95" cy="88" r="5" fill="#0f172a" />
          <circle cx="97" cy="86" r="2.5" fill="#ffffff" />

          {/* Singing Mouth */}
          {!isSleeping ? (
            <ellipse cx="80" cy="106" rx="8" ry="9" fill="#7c2d12" stroke="#0f172a" strokeWidth="2.5">
              <animate attributeName="ry" values="4;10;4" dur={animDuration} repeatCount="indefinite" />
            </ellipse>
          ) : (
            <path d="M 74 106 Q 80 110 86 106" stroke="#7c2d12" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}

          {/* Flowing Sun Ribbon Tentacles */}
          <g stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M 45 112 Q 38 135 48 158 Q 52 170 46 178" />
            <path d="M 62 114 Q 70 138 60 162 Q 56 172 64 178" />
            <path d="M 80 115 Q 82 140 78 165 Q 82 174 80 178" />
            <path d="M 98 114 Q 90 138 100 162 Q 104 172 96 178" />
            <path d="M 115 112 Q 122 135 112 158 Q 108 170 114 178" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5. SUN CORAL (Steelpan Calypso Brain Coral)
// ---------------------------------------------------------------------------
export function SunCoral({
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
  rarity = 'common',
  onCoinCollect,
  onClick
}) {
  const animDuration = isSupercharged ? '0.34s' : `${1.3 / tempoSpeed}s`;
  const scaleFactor = 1 + (level - 1) * 0.04;

  const coralColor = rarity === 'epic' ? '#facc15' : rarity === 'rare' ? '#06b6d4' : '#ec4899';
  const rimColor = rarity === 'epic' ? '#fef08a' : rarity === 'rare' ? '#67e8f9' : '#fbcfe8';

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        transition: 'transform 0.4s ease, filter 0.4s ease',
        transform: isSleeping ? 'translateY(36px) scale(0.92)' : `scale(${scaleFactor})`,
        filter: isSleeping ? 'grayscale(45%) opacity(0.75)' : 'none'
      }}
    >
      {selectionIndex > 0 && <SelectionBadge index={selectionIndex} />}
      {!isSleeping && hasCoin && <Coin onCollect={onCoinCollect} isSupercharged={isSupercharged} amount={coinAmount} />}

      <div
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-jelly' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="175" viewBox="0 0 160 180">
          {/* Steelpan Bowl Body */}
          <ellipse cx="80" cy="115" rx="55" ry="38" fill="#334155" stroke="#0f172a" strokeWidth="4" />
          <ellipse cx="80" cy="112" rx="48" ry="30" fill="#475569" stroke="#0f172a" strokeWidth="2.5" />

          {/* Steelpan Note Sections */}
          <ellipse cx="80" cy="110" rx="14" ry="10" fill="#64748b" stroke="#0f172a" strokeWidth="2" />
          <ellipse cx="56" cy="106" rx="10" ry="7" fill="#64748b" stroke="#0f172a" strokeWidth="1.5" />
          <ellipse cx="104" cy="106" rx="10" ry="7" fill="#64748b" stroke="#0f172a" strokeWidth="1.5" />
          <ellipse cx="64" cy="122" rx="10" ry="7" fill="#64748b" stroke="#0f172a" strokeWidth="1.5" />
          <ellipse cx="96" cy="122" rx="10" ry="7" fill="#64748b" stroke="#0f172a" strokeWidth="1.5" />

          {/* Dancing Coral Branches popping up from steelpan */}
          <path
            d="M 50 100 Q 40 60 52 40 Q 60 55 65 75 Q 75 50 85 35 Q 92 52 95 72 Q 105 45 118 40 Q 120 62 110 100"
            fill={coralColor}
            stroke="#0f172a"
            strokeWidth="3.5"
          />

          {/* Cute Smiling Face on Center Coral */}
          <circle cx="75" cy="62" r="5" fill="#0f172a" />
          <circle cx="76" cy="60" r="1.5" fill="#ffffff" />
          <circle cx="92" cy="62" r="5" fill="#0f172a" />
          <circle cx="93" cy="60" r="1.5" fill="#ffffff" />
          {!isSleeping ? (
            <path d="M 78 72 Q 84 80 90 72" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M 80 72 L 88 72" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          )}
        </svg>
      </div>
    </div>
  );
}
