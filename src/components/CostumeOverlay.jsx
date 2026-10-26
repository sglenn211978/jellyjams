export default function CostumeOverlay({ costumeId, isNight }) {
  if (!costumeId) return null;

  switch (costumeId) {
    case 'shades':
      return (
        <div style={{
          position: 'absolute',
          top: '38px',
          zIndex: 25,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))'
        }}>
          <svg width="76" height="24" viewBox="0 0 76 24">
            {/* Sunglasses frame */}
            <path d="M 6 4 L 32 4 L 28 18 L 10 18 Z" fill="#0f172a" stroke={isNight ? '#38bdf8' : '#ec4899'} strokeWidth="2.5" />
            <path d="M 44 4 L 70 4 L 66 18 L 48 18 Z" fill="#0f172a" stroke={isNight ? '#38bdf8' : '#ec4899'} strokeWidth="2.5" />
            <line x1="32" y1="8" x2="44" y2="8" stroke={isNight ? '#38bdf8' : '#ec4899'} strokeWidth="3" />
            {/* Neon lens gloss */}
            <polygon points="12,7 24,7 22,12 10,12" fill={isNight ? '#38bdf8' : '#f472b6'} opacity="0.75" />
            <polygon points="50,7 62,7 60,12 48,12" fill={isNight ? '#38bdf8' : '#f472b6'} opacity="0.75" />
          </svg>
        </div>
      );

    case 'tophat':
      return (
        <div style={{
          position: 'absolute',
          top: '-24px',
          zIndex: 25,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
        }}>
          <svg width="60" height="42" viewBox="0 0 60 42">
            {/* Brim */}
            <ellipse cx="30" cy="36" rx="28" ry="6" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            {/* Crown */}
            <path d="M 16 34 L 18 10 L 42 10 L 44 34 Z" fill="#0f172a" stroke="#020617" strokeWidth="2" />
            {/* Satin Ribbon */}
            <path d="M 16.5 32 L 43.5 32 L 43 24 L 17 24 Z" fill={isNight ? '#a855f7' : '#ef4444'} />
            <ellipse cx="30" cy="10" rx="12" ry="4" fill="#334155" />
          </svg>
        </div>
      );

    case 'headphones':
      return (
        <div style={{
          position: 'absolute',
          top: '12px',
          zIndex: 25,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))'
        }}>
          <svg width="104" height="65" viewBox="0 0 104 65">
            {/* Headband arch */}
            <path d="M 12 42 Q 52 -6 92 42" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
            <path d="M 12 42 Q 52 -4 92 42" fill="none" stroke={isNight ? '#38bdf8' : '#facc15'} strokeWidth="2.5" strokeLinecap="round" />
            {/* Left Ear Cup */}
            <rect x="2" y="32" width="16" height="26" rx="8" fill="#1e293b" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="10" cy="45" r="4" fill={isNight ? '#38bdf8' : '#facc15'} />
            {/* Right Ear Cup */}
            <rect x="86" y="32" width="16" height="26" rx="8" fill="#1e293b" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="94" cy="45" r="4" fill={isNight ? '#38bdf8' : '#facc15'} />
          </svg>
        </div>
      );

    case 'crown':
      return (
        <div style={{
          position: 'absolute',
          top: '-18px',
          zIndex: 25,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.7))'
        }}>
          <svg width="68" height="34" viewBox="0 0 68 34">
            <path d="M 8 30 L 12 8 L 26 22 L 34 4 L 42 22 L 56 8 L 60 30 Z" fill="url(#crownGold)" stroke="#b45309" strokeWidth="2.5" strokeLinejoin="round" />
            <defs>
              <linearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
            {/* Ruby / Coral Gems */}
            <circle cx="12" cy="8" r="3" fill="#ec4899" stroke="#9d174d" strokeWidth="1" />
            <circle cx="34" cy="4" r="4" fill="#38bdf8" stroke="#0369a1" strokeWidth="1" />
            <circle cx="56" cy="8" r="3" fill="#ec4899" stroke="#9d174d" strokeWidth="1" />
            <circle cx="34" cy="24" r="3" fill="#ef4444" />
          </svg>
        </div>
      );

    case 'snorkel':
      return (
        <div style={{
          position: 'absolute',
          top: '28px',
          zIndex: 25,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))'
        }}>
          <svg width="86" height="40" viewBox="0 0 86 40">
            {/* Goggle strap */}
            <path d="M 2 15 Q 38 12 74 15" stroke="#0f172a" strokeWidth="4" fill="none" />
            {/* Oval Double Mask */}
            <rect x="14" y="8" width="48" height="22" rx="10" fill="#38bdf8" opacity="0.6" stroke="#0284c7" strokeWidth="3" />
            {/* Snorkel tube */}
            <path d="M 64 22 L 72 22 Q 78 22 78 12 L 78 -14" stroke="#fbbf24" strokeWidth="5" fill="none" strokeLinecap="round" />
            <rect x="74" y="-18" width="8" height="6" rx="2" fill="#ef4444" />
          </svg>
        </div>
      );

    // 🏴‍☠️ Pirate Captain: Tricorne Hat, Bandana & Skull Eye Patch
    case 'pirate':
      return (
        <div style={{
          position: 'absolute',
          top: '-28px',
          zIndex: 25,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))'
        }}>
          <svg width="88" height="96" viewBox="0 0 88 96">
            {/* Eye patch strap */}
            <line x1="26" y1="62" x2="68" y2="76" stroke="#090d16" strokeWidth="3" />
            {/* Eye patch heart-shield */}
            <ellipse cx="36" cy="67" rx="9" ry="8" fill="#090d16" stroke="#475569" strokeWidth="1.5" />
            <circle cx="36" cy="67" r="2.5" fill="#f87171" />

            {/* Red pirate bandana wrap under hat */}
            <path d="M 18 36 Q 44 32 70 36 L 72 46 Q 44 42 16 46 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
            {/* Bandana tie knot hanging on right side */}
            <path d="M 70 42 Q 80 48 82 62 Q 76 56 70 46 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
            <path d="M 69 44 Q 84 56 80 70 Q 74 60 67 48 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />

            {/* Pirate Tricorne Hat with Gold Trim */}
            <path d="M 8 36 Q 44 8 80 36 Q 74 16 44 14 Q 14 16 8 36 Z" fill="#1e293b" stroke="#090d16" strokeWidth="3" />
            <path d="M 12 34 Q 44 14 76 34" stroke="#facc15" strokeWidth="3" fill="none" strokeLinecap="round" />
            
            {/* Skull & Crossbones Emblem */}
            <circle cx="44" cy="24" r="5.5" fill="#f8fafc" stroke="#090d16" strokeWidth="1.5" />
            <circle cx="42" cy="23.5" r="1.2" fill="#090d16" />
            <circle cx="46" cy="23.5" r="1.2" fill="#090d16" />
            <line x1="36" y1="21" x2="52" y2="28" stroke="#f8fafc" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="36" y1="28" x2="52" y2="21" stroke="#f8fafc" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      );

    // 🎸 Neon Rocker: Electric Spiky Hair & Lightning Bolt Makeup
    case 'rocker':
      return (
        <div style={{
          position: 'absolute',
          top: '-32px',
          zIndex: 25,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 4px 12px rgba(236, 72, 153, 0.6))'
        }}>
          <svg width="86" height="90" viewBox="0 0 86 90">
            {/* Lightning bolt face makeup over left eye */}
            <polygon points="30,52 35,62 31,64 36,75 25,65 29,63 24,54" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />

            {/* Studded rocker headband */}
            <path d="M 16 38 Q 43 32 70 38 L 71 44 Q 43 38 15 44 Z" fill="#090d16" stroke="#475569" strokeWidth="2" />
            <circle cx="26" cy="39" r="2.5" fill="#e2e8f0" />
            <circle cx="38" cy="37.5" r="2.5" fill="#e2e8f0" />
            <circle cx="48" cy="37.5" r="2.5" fill="#e2e8f0" />
            <circle cx="60" cy="39" r="2.5" fill="#e2e8f0" />

            {/* Wild Spiky Electric Punk Hair */}
            <path d="M 18 36 L 10 16 L 24 24 L 28 6 L 40 18 L 44 2 L 52 18 L 64 6 L 66 24 L 78 16 L 70 36 Z" 
              fill={isNight ? '#ec4899' : '#a855f7'} 
              stroke="#090d16" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
            {/* Inner hair highlight spikes */}
            <path d="M 28 26 L 30 12 L 38 22 L 44 8 L 50 22 L 58 12 L 60 26 Z" 
              fill={isNight ? '#f472b6' : '#c084fc'} 
            />
          </svg>
        </div>
      );

    // 🚀 Space Cadet Astronaut: Cosmic Glass Bubble Helmet & Radio Antenna
    case 'astronaut':
      return (
        <div style={{
          position: 'absolute',
          top: '-34px',
          zIndex: 25,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 4px 14px rgba(56, 189, 248, 0.6))'
        }}>
          <svg width="96" height="88" viewBox="0 0 96 88">
            {/* Radio Antenna with glowing beacon */}
            <line x1="72" y1="24" x2="84" y2="4" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="84" cy="4" r="4.5" fill="#ef4444" stroke="#090d16" strokeWidth="1.5" />
            <circle cx="84" cy="4" r="2" fill="#ffffff" />

            {/* Bubble Space Helmet Outer Rim */}
            <ellipse cx="48" cy="44" rx="42" ry="34" fill="rgba(56, 189, 248, 0.18)" stroke="#e2e8f0" strokeWidth="3.5" />
            <ellipse cx="48" cy="44" rx="42" ry="34" fill="none" stroke="#090d16" strokeWidth="1.5" />

            {/* Specular curved reflection arc */}
            <path d="M 20 32 Q 32 16 58 18" stroke="#ffffff" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.85" />
            <circle cx="68" cy="22" r="3" fill="#ffffff" opacity="0.8" />
          </svg>
        </div>
      );

    // 🦸 Superhero Squad: Hero Domino Mask & Animated Flowing Hero Cape
    case 'superhero':
      return (
        <div style={{
          position: 'absolute',
          top: '-10px',
          zIndex: 25,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))'
        }}>
          <svg width="100" height="90" viewBox="0 0 100 90">
            {/* Flowing hero cape in back (curves behind head) */}
            <path d="M 18 42 Q 6 65 2 86 Q 16 78 30 84 Q 24 60 22 42 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2.5" />
            <path d="M 82 42 Q 94 65 98 86 Q 84 78 70 84 Q 76 60 78 42 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2.5" />

            {/* Hero Mask Strap */}
            <path d="M 12 45 Q 50 42 88 45" stroke="#090d16" strokeWidth="3" fill="none" />

            {/* Sleek Hero Domino Eye Mask */}
            <path d="M 20 48 Q 34 36 50 45 Q 66 36 80 48 Q 72 60 50 52 Q 28 60 20 48 Z" 
              fill="#090d16" 
              stroke="#fbbf24" 
              strokeWidth="2.5" 
            />
            {/* Eye Cutouts */}
            <ellipse cx="34" cy="48" rx="6" ry="4" fill="#ffffff" />
            <circle cx="34" cy="48" r="2.5" fill="#38bdf8" />
            <ellipse cx="66" cy="48" rx="6" ry="4" fill="#ffffff" />
            <circle cx="66" cy="48" r="2.5" fill="#38bdf8" />

            {/* Golden Star Crest on forehead */}
            <polygon points="50,33 52,38 57,39 53,42 54,47 50,44 46,47 47,42 43,39 48,38" fill="#facc15" stroke="#78350f" strokeWidth="1" />
          </svg>
        </div>
      );

    // 👨‍🍳 Master Chef: Puffy White Toque Hat & Red Bow Neckerchief
    case 'chef':
      return (
        <div style={{
          position: 'absolute',
          top: '-36px',
          zIndex: 25,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.35))'
        }}>
          <svg width="84" height="66" viewBox="0 0 84 66">
            {/* Puffy Toque Clouds */}
            <path d="M 24 38 Q 8 26 18 10 Q 32 -4 42 8 Q 52 -4 66 10 Q 76 26 60 38 Z" 
              fill="#ffffff" 
              stroke="#090d16" 
              strokeWidth="3.5" 
            />
            {/* Hat pleat folds */}
            <path d="M 30 18 Q 36 28 34 38" stroke="#cbd5e1" strokeWidth="2" fill="none" />
            <path d="M 42 12 Q 44 26 42 38" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
            <path d="M 54 18 Q 48 28 50 38" stroke="#cbd5e1" strokeWidth="2" fill="none" />

            {/* Hat Base Band */}
            <rect x="22" y="36" width="40" height="12" rx="3" fill="#f8fafc" stroke="#090d16" strokeWidth="3" />
            <line x1="26" y1="42" x2="58" y2="42" stroke="#e2e8f0" strokeWidth="1.5" />
          </svg>
        </div>
      );

    // 💂 Marching Band: Tall Navy Shako Hat with Golden Feather Plume
    case 'marching':
      return (
        <div style={{
          position: 'absolute',
          top: '-38px',
          zIndex: 25,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))'
        }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            {/* Golden Feather Plume swaying tall on left */}
            <path d="M 32 30 Q 18 14 26 -2 Q 38 12 34 30 Z" fill="#facc15" stroke="#78350f" strokeWidth="2" />
            <line x1="28" y1="28" x2="26" y2="4" stroke="#ffffff" strokeWidth="1.5" />

            {/* Cylindrical Shako Hat Body */}
            <path d="M 24 50 L 26 24 L 54 24 L 56 50 Z" fill="#1e3a8a" stroke="#090d16" strokeWidth="3" />
            {/* Top flat crown */}
            <ellipse cx="40" cy="24" rx="14" ry="4" fill="#1e40af" stroke="#090d16" strokeWidth="2" />

            {/* Braided gold chains & star burst badge */}
            <path d="M 25 36 Q 40 44 55 36" stroke="#facc15" strokeWidth="2.5" fill="none" />
            <circle cx="40" cy="33" r="5" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="40" cy="33" r="2" fill="#ef4444" />

            {/* Visor bill */}
            <path d="M 22 50 Q 40 58 58 50" stroke="#090d16" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      );

    default:
      return null;
  }
}
