import Coin from '../Coin';
import SelectionBadge from '../SelectionBadge';
import CostumeOverlay from '../CostumeOverlay';

// ---------------------------------------------------------------------------
// 1. CRYO JELLY (Translucent Frost Glass Jellyfish with Chimes)
// ---------------------------------------------------------------------------
export function CryoJelly({
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
  const animDuration = isSupercharged ? '0.36s' : `${1.45 / tempoSpeed}s`;
  const scaleFactor = 1 + (level - 1) * 0.04;

  const bellColor = rarity === 'epic' ? '#facc15' : rarity === 'rare' ? '#a855f7' : '#38bdf8';
  const rimColor = rarity === 'epic' ? '#fef08a' : rarity === 'rare' ? '#e9d5ff' : '#bae6fd';

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
          background: 'linear-gradient(90deg, #38bdf8, #a855f7, #ec4899)',
          padding: '3px 12px',
          borderRadius: '99px',
          fontSize: '0.8rem',
          fontWeight: '900',
          color: '#ffffff',
          boxShadow: '0 0 15px #38bdf8',
          animation: 'floatNote 0.6s infinite alternate',
          whiteSpace: 'nowrap',
          zIndex: 10
        }}>
          ⚡ CRYO RUSH! ⚡
        </div>
      )}

      <div
        className={isSupercharged ? 'supercharged-jelly' : !isSleeping ? 'dancing-jelly' : ''}
        style={{ animationDuration: animDuration, position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <CostumeOverlay costumeId={costumeId} isNight={isNight} />
        <svg width="154" height="175" viewBox="0 0 160 180">
          <defs>
            <radialGradient id="cryoGrad" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor={rimColor} />
              <stop offset="100%" stopColor={bellColor} />
            </radialGradient>
          </defs>

          {/* Floating Ice Crystals behind */}
          {!isSleeping && (
            <g opacity="0.8">
              <polygon points="26,60 30,52 34,60 30,68" fill="#e0f2fe">
                <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur="1s" repeatCount="indefinite" />
              </polygon>
              <polygon points="130,55 135,46 140,55 135,64" fill="#e0f2fe">
                <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur="1.2s" repeatCount="indefinite" />
              </polygon>
            </g>
          )}

          {/* Translucent Crystal Ice Bell */}
          <path
            d="M 30 105 C 20 40, 140 40, 130 105 C 115 115, 45 115, 30 105 Z"
            fill="url(#cryoGrad)"
            fillOpacity="0.88"
            stroke="#0f172a"
            strokeWidth="4"
          />

          {/* Ice facet ridges */}
          <path d="M 80 44 L 80 110" stroke="#ffffff" strokeWidth="2.5" opacity="0.75" />
          <path d="M 52 56 L 62 108" stroke="#ffffff" strokeWidth="2" opacity="0.75" />
          <path d="M 108 56 L 98 108" stroke="#ffffff" strokeWidth="2" opacity="0.75" />

          {/* Big Cute Anime Eyes */}
          <circle cx="62" cy="80" r="12" fill="#0f172a" />
          <circle cx="65" cy="77" r="4" fill="#ffffff" />
          <circle cx="61" cy="83" r="2" fill="#38bdf8" />

          <circle cx="98" cy="80" r="12" fill="#0f172a" />
          <circle cx="95" cy="77" r="4" fill="#ffffff" />
          <circle cx="99" cy="83" r="2" fill="#38bdf8" />

          {/* Singing Mouth */}
          {!isSleeping ? (
            <ellipse cx="80" cy="98" rx="8" ry="8" fill="#0369a1" stroke="#0f172a" strokeWidth="2">
              <animate attributeName="ry" values="4;9;4" dur={animDuration} repeatCount="indefinite" />
            </ellipse>
          ) : (
            <path d="M 74 98 Q 80 102 86 98" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}

          {/* Icicle Chime Tentacles */}
          <g fill="#bae6fd" stroke="#0f172a" strokeWidth="2.5">
            <polygon points="45,110 50,155 42,155" />
            <polygon points="62,112 68,172 58,172" />
            <polygon points="80,114 85,178 75,178" />
            <polygon points="98,112 104,172 94,172" />
            <polygon points="115,110 120,155 112,155" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. FROST FIN (Sub-Zero 808 Sub-Bass Polar Shark)
// ---------------------------------------------------------------------------
export function FrostFin({
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

  const skinColor = rarity === 'epic' ? '#f43f5e' : rarity === 'rare' ? '#10b981' : '#0284c7';
  const bellyColor = rarity === 'epic' ? '#fecdd3' : rarity === 'rare' ? '#a7f3d0' : '#bae6fd';

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
          {/* Dorsal Ice Fin */}
          <polygon points="80,18 95,55 70,55" fill="#38bdf8" stroke="#0f172a" strokeWidth="3.5" />

          {/* Chubby Round Polar Shark Body */}
          <ellipse cx="80" cy="95" rx="52" ry="46" fill={skinColor} stroke="#0f172a" strokeWidth="4" />

          {/* Pale Blue Belly */}
          <ellipse cx="80" cy="108" rx="36" ry="26" fill={bellyColor} stroke="#0f172a" strokeWidth="2.5" />

          {/* Side Ice Pectoral Fins */}
          <polygon points="26,105 4,122 32,122" fill="#38bdf8" stroke="#0f172a" strokeWidth="3" />
          <polygon points="134,105 156,122 128,122" fill="#38bdf8" stroke="#0f172a" strokeWidth="3" />

          {/* Eyes with Frost Sparkles */}
          <circle cx="62" cy="78" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          <circle cx="64" cy="78" r="4.5" fill="#0f172a" />
          <circle cx="66" cy="76" r="1.5" fill="#ffffff" />

          <circle cx="98" cy="78" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
          <circle cx="96" cy="78" r="4.5" fill="#0f172a" />
          <circle cx="98" cy="76" r="1.5" fill="#ffffff" />

          {/* Grinning Sub-Bass Shark Mouth */}
          {!isSleeping ? (
            <ellipse cx="80" cy="106" rx="14" ry="10" fill="#082f49" stroke="#0f172a" strokeWidth="2.5">
              <animate attributeName="ry" values="6;12;6" dur={animDuration} repeatCount="indefinite" />
            </ellipse>
          ) : (
            <path d="M 70 106 Q 80 112 90 106" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}

          {/* Cute Little Shark Tail */}
          <polygon points="75,142 80,165 85,142" fill={skinColor} stroke="#0f172a" strokeWidth="2.5" />
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. GLACIER CHIME (Floating Frost Urchin with Ice Wind Chimes)
// ---------------------------------------------------------------------------
export function GlacierChime({
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

  const urchinColor = rarity === 'epic' ? '#fbbf24' : rarity === 'rare' ? '#ec4899' : '#67e8f9';

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
          {/* Spiky Ice Urchin Crystals radiating outwards */}
          <g stroke="#0f172a" strokeWidth="3" fill="#bae6fd">
            <polygon points="80,15 88,48 72,48" />
            <polygon points="125,32 108,58 96,46" />
            <polygon points="148,75 116,84 116,68" />
            <polygon points="35,32 52,58 64,46" />
            <polygon points="12,75 44,84 44,68" />
          </g>

          {/* Central Spherical Urchin Body */}
          <circle cx="80" cy="80" r="38" fill={urchinColor} stroke="#0f172a" strokeWidth="4" />

          {/* Wide Happy Eyes */}
          <circle cx="68" cy="74" r="8" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          <circle cx="70" cy="74" r="3.5" fill="#0f172a" />
          <circle cx="92" cy="74" r="8" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          <circle cx="90" cy="74" r="3.5" fill="#0f172a" />

          {/* Cute Open Mouth */}
          {!isSleeping ? (
            <ellipse cx="80" cy="90" rx="7" ry="7" fill="#0f172a">
              <animate attributeName="ry" values="3;8;3" dur={animDuration} repeatCount="indefinite" />
            </ellipse>
          ) : (
            <line x1="74" y1="90" x2="86" y2="90" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          )}

          {/* Hanging Glass Chimes swaying beneath */}
          <g stroke="#0284c7" strokeWidth="2">
            <line x1="55" y1="116" x2="52" y2="165" />
            <circle cx="52" cy="165" r="4" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />

            <line x1="72" y1="118" x2="70" y2="175" />
            <circle cx="70" cy="175" r="5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />

            <line x1="88" y1="118" x2="90" y2="175" />
            <circle cx="90" cy="175" r="5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />

            <line x1="105" y1="116" x2="108" y2="165" />
            <circle cx="108" cy="165" r="4" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. ICE WALRUS (Tusk Harmonium & Polar Reed Drone)
// ---------------------------------------------------------------------------
export function IceWalrus({
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
  const animDuration = isSupercharged ? '0.36s' : `${1.45 / tempoSpeed}s`;
  const scaleFactor = 1 + (level - 1) * 0.04;

  const walrusColor = rarity === 'epic' ? '#8b5cf6' : rarity === 'rare' ? '#f59e0b' : '#0ea5e9';

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
          {/* Heavy Walrus Body */}
          <ellipse cx="80" cy="100" rx="50" ry="44" fill={walrusColor} stroke="#0f172a" strokeWidth="4" />

          {/* Big Cartoon Snout Muzzle */}
          <ellipse cx="80" cy="88" rx="28" ry="20" fill="#bae6fd" stroke="#0f172a" strokeWidth="3" />
          <ellipse cx="80" cy="78" rx="8" ry="6" fill="#0f172a" />

          {/* Cute Eyes */}
          <circle cx="60" cy="62" r="9" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          <circle cx="62" cy="62" r="4" fill="#0f172a" />
          <circle cx="100" cy="62" r="9" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          <circle cx="98" cy="62" r="4" fill="#0f172a" />

          {/* Crystalline Hollow Flute Tusks */}
          <g fill="#e0f2fe" stroke="#0f172a" strokeWidth="3">
            <polygon points="62,94 56,155 70,145 68,96" />
            <polygon points="98,94 104,155 90,145 92,96" />
          </g>

          {/* Flute Holes on Tusks */}
          <circle cx="64" cy="115" r="2" fill="#0f172a" />
          <circle cx="64" cy="130" r="2" fill="#0f172a" />
          <circle cx="96" cy="115" r="2" fill="#0f172a" />
          <circle cx="96" cy="130" r="2" fill="#0f172a" />

          {/* Whiskers */}
          <line x1="50" y1="88" x2="32" y2="84" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="94" x2="30" y2="96" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          <line x1="110" y1="88" x2="128" y2="84" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          <line x1="110" y1="94" x2="130" y2="96" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5. AURORA NAUTILUS (Hypnotic Polar Ribbon Synth Arpeggios)
// ---------------------------------------------------------------------------
export function AuroraNautilus({
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

  const shellColor = rarity === 'epic' ? '#f43f5e' : rarity === 'rare' ? '#22c55e' : '#a855f7';
  const ribbonColor = rarity === 'epic' ? '#fecdd3' : rarity === 'rare' ? '#86efac' : '#38bdf8';

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
            <radialGradient id="auroraGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor={ribbonColor} />
              <stop offset="100%" stopColor={shellColor} />
            </radialGradient>
          </defs>

          {/* Sweeping Luminous Aurora Ribbons */}
          {!isSleeping && (
            <g stroke={ribbonColor} strokeWidth="3" fill="none" opacity="0.85">
              <path d="M 20 40 Q 80 10 140 35">
                <animate attributeName="d" values="M 20 40 Q 80 10 140 35; M 20 30 Q 80 30 140 25; M 20 40 Q 80 10 140 35" dur="1.8s" repeatCount="indefinite" />
              </path>
              <path d="M 15 55 Q 80 25 145 50">
                <animate attributeName="d" values="M 15 55 Q 80 25 145 50; M 15 45 Q 80 45 145 40; M 15 55 Q 80 25 145 50" dur="2.1s" repeatCount="indefinite" />
              </path>
            </g>
          )}

          {/* Spiral Nautilus Shell */}
          <path
            d="M 80 50 C 135 40, 150 115, 110 148 C 75 172, 28 150, 32 105 C 35 70, 75 60, 85 88 C 92 108, 70 120, 65 110"
            fill="url(#auroraGrad)"
            stroke="#0f172a"
            strokeWidth="4"
          />

          {/* Cute Big Peeking Eyes */}
          <circle cx="55" cy="118" r="11" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
          <circle cx="53" cy="118" r="5" fill="#0f172a" />
          <circle cx="55" cy="116" r="2" fill="#ffffff" />

          {/* Little Peeking Tentacles */}
          <g fill="#38bdf8" stroke="#0f172a" strokeWidth="2">
            <ellipse cx="44" cy="134" rx="4" ry="10" transform="rotate(-20 44 134)" />
            <ellipse cx="54" cy="138" rx="4" ry="11" />
            <ellipse cx="64" cy="136" rx="4" ry="10" transform="rotate(20 64 136)" />
          </g>
        </svg>
      </div>
    </div>
  );
}
