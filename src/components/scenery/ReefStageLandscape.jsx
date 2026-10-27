import React from 'react';

/**
 * ReefStageLandscape - Rich Illustrated Cartoon Living Island Habitat World
 * Spans the full 1400x820 canvas with:
 * - Winding cobblestone & shell stepping paths between monster perches
 * - A gentle sleeping Reef Colossus Titan face embedded in the background cliff (MSM tribute)
 * - Swaying cartoon kelp trees & bubbly sea flora
 * - Underwater sunbeams (god rays) streaming through turquoise waters
 * - Playful animated critters: smiling starfish, peeking hermit crabs, and clapping pearl clams
 * - Fully themed for Coral Lagoon, Abyssal Magma Trench, and Bioluminescent Cavern
 */
export default function ReefStageLandscape({ 
  islandId = 'lagoon', 
  isNight = false, 
  tempoSpeed = 1.0 
}) {
  const isLagoon = islandId === 'lagoon';
  const isTrench = islandId === 'trench';
  const isCavern = islandId === 'cavern';

  // Dynamic tempo pulse duration
  const pulseDuration = `${1.2 / tempoSpeed}s`;

  return (
    <div 
      className="reef-stage-landscape"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      {/* ========================================================
          1. CORAL LAGOON: LUSH SUNLIT TROPICAL REEF ATOLL ISLAND
          ======================================================== */}
      {isLagoon && (
        <svg
          width="1400"
          height="820"
          viewBox="0 0 1400 820"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            {/* Ocean Waters Ambient Gradient */}
            <radialGradient id="lagoonWaterBg" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor={isNight ? '#0369a1' : '#38bdf8'} stopOpacity={isNight ? '0.4' : '0.28'} />
              <stop offset="55%" stopColor={isNight ? '#082f49' : '#0284c7'} stopOpacity={isNight ? '0.6' : '0.45'} />
              <stop offset="100%" stopColor={isNight ? '#020617' : '#0369a1'} stopOpacity="0.85" />
            </radialGradient>

            {/* Sunbeam Light Gradient */}
            <linearGradient id="sunbeamGrad" x1="0%" y1="0%" x2="40%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={isNight ? '0.08' : '0.24'} />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity={isNight ? '0.04' : '0.12'} />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </linearGradient>

            {/* High Tier Coral Rock Gradient */}
            <linearGradient id="highTierRock" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isNight ? '#1e1b4b' : '#0891b2'} />
              <stop offset="50%" stopColor={isNight ? '#0f172a' : '#0e7490'} />
              <stop offset="100%" stopColor={isNight ? '#020617' : '#155e75'} />
            </linearGradient>

            {/* High Tier Sand / Moss Top */}
            <linearGradient id="highTierSand" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isNight ? '#38bdf8' : '#22d3ee'} />
              <stop offset="70%" stopColor={isNight ? '#0284c7' : '#06b6d4'} />
              <stop offset="100%" stopColor={isNight ? '#0369a1' : '#0891b2'} />
            </linearGradient>

            {/* Mid Tier Central Island Plateau */}
            <linearGradient id="midTierRock" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isNight ? '#1e293b' : '#0d9488'} />
              <stop offset="40%" stopColor={isNight ? '#0f172a' : '#0f766e'} />
              <stop offset="100%" stopColor={isNight ? '#020617' : '#115e59'} />
            </linearGradient>

            {/* Low Tier Sandy Shoreline */}
            <linearGradient id="lowTierSand" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isNight ? '#2dd4bf' : '#fed7aa'} />
              <stop offset="45%" stopColor={isNight ? '#0d9488' : '#fcd34d'} />
              <stop offset="100%" stopColor={isNight ? '#134e4a' : '#f59e0b'} />
            </linearGradient>

            {/* Rainbow Coral Glow */}
            <linearGradient id="coralRainbowGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="25%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#fde047" />
              <stop offset="75%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            {/* Cobblestone Path Color */}
            <linearGradient id="cobblestoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isNight ? '#64748b' : '#fef08a'} />
              <stop offset="100%" stopColor={isNight ? '#334155' : '#d97706'} />
            </linearGradient>
          </defs>

          {/* 1. Island Water Backdrop */}
          <rect width="1400" height="820" fill="url(#lagoonWaterBg)" />

          {/* 2. Shimmering Underwater Sunbeams (God Rays) */}
          <g opacity="0.85" className="sunbeam-shimmer">
            <polygon points="120,0 280,0 460,820 220,820" fill="url(#sunbeamGrad)" />
            <polygon points="450,0 620,0 850,820 620,820" fill="url(#sunbeamGrad)" />
            <polygon points="800,0 960,0 1200,820 980,820" fill="url(#sunbeamGrad)" />
          </g>

          {/* 3. Swaying Left Giant Cartoon Kelp Tree */}
          <g className="kelp-tree-sway-left" transform="translate(40, 240)">
            {/* Trunk */}
            <path d="M 40 500 Q 25 350 45 220 Q 60 110 35 0" stroke={isNight ? '#15803d' : '#22c55e'} strokeWidth="16" fill="none" strokeLinecap="round" />
            {/* Bubbly Round Leaves */}
            <ellipse cx="20" cy="50" rx="30" ry="18" fill={isNight ? '#166534' : '#4ade80'} stroke="#0f172a" strokeWidth="3" transform="rotate(-25 20 50)" />
            <ellipse cx="55" cy="120" rx="34" ry="20" fill={isNight ? '#14532d' : '#22c55e'} stroke="#0f172a" strokeWidth="3" transform="rotate(20 55 120)" />
            <ellipse cx="25" cy="210" rx="36" ry="22" fill={isNight ? '#166534' : '#4ade80'} stroke="#0f172a" strokeWidth="3" transform="rotate(-20 25 210)" />
            <ellipse cx="60" cy="310" rx="40" ry="24" fill={isNight ? '#14532d' : '#22c55e'} stroke="#0f172a" strokeWidth="3.5" transform="rotate(25 60 310)" />
          </g>

          {/* 4. Swaying Right Giant Cartoon Kelp Tree */}
          <g className="kelp-tree-sway-right" transform="translate(1300, 220)">
            <path d="M 40 520 Q 55 360 35 220 Q 15 110 45 0" stroke={isNight ? '#15803d' : '#22c55e'} strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="60" cy="60" rx="32" ry="18" fill={isNight ? '#166534' : '#4ade80'} stroke="#0f172a" strokeWidth="3" transform="rotate(25 60 60)" />
            <ellipse cx="20" cy="140" rx="36" ry="22" fill={isNight ? '#14532d' : '#22c55e'} stroke="#0f172a" strokeWidth="3" transform="rotate(-20 20 140)" />
            <ellipse cx="65" cy="230" rx="38" ry="24" fill={isNight ? '#166534' : '#4ade80'} stroke="#0f172a" strokeWidth="3" transform="rotate(22 65 230)" />
            <ellipse cx="25" cy="330" rx="42" ry="26" fill={isNight ? '#14532d' : '#22c55e'} stroke="#0f172a" strokeWidth="3.5" transform="rotate(-25 25 330)" />
          </g>

          {/* ========================================================
              TIER 1 (BACK HIGH TERRACE - y: ~30-44%)
              Carries Queen Beatbox (36%), Starlight Jelly (64%), Diva (22%)
              ======================================================== */}
          {/* Back Giant Coral Spires & Sea Fans */}
          <g opacity={isNight ? '0.75' : '0.9'}>
            {/* Left Coral Spires behind Diva/Queen */}
            <path d="M 220 380 L 250 180 C 250 160 280 160 280 180 L 310 380 Z" fill={isNight ? '#4c1d95' : '#7c3aed'} stroke="#3b0764" strokeWidth="4" />
            <ellipse cx="265" cy="180" rx="15" ry="8" fill="#c084fc" stroke="#3b0764" strokeWidth="2.5" />
            <ellipse cx="265" cy="180" rx="8" ry="4" fill="#2e1065" />

            <path d="M 310 380 L 330 220 C 330 205 355 205 355 220 L 375 380 Z" fill={isNight ? '#6b21a8' : '#9333ea'} stroke="#3b0764" strokeWidth="4" />
            <ellipse cx="342" cy="220" rx="12.5" ry="7" fill="#d8b4fe" stroke="#3b0764" strokeWidth="2.5" />

            {/* Right Sea Fan & Spires behind Starlight Jelly */}
            <path d="M 880 370 L 910 170 C 910 150 940 150 940 170 L 970 370 Z" fill={isNight ? '#581c87' : '#a855f7'} stroke="#3b0764" strokeWidth="4" />
            <ellipse cx="925" cy="170" rx="15" ry="8" fill="#e9d5ff" stroke="#3b0764" strokeWidth="2.5" />
            
            {/* Glowing Pink Gorgonian Sea Fan */}
            <path d="M 980 360 Q 1040 250 1020 180 M 1000 280 Q 1070 230 1090 190 M 1010 230 Q 980 170 960 130" stroke={isNight ? '#ec4899' : '#f43f5e'} strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>

          {/* ========================================================
              MY SINGING MONSTERS HOMAGE:
              SLEEPING REEF COLOSSUS TITAN FACE IN CENTRAL CLIFF WALL
              ======================================================== */}
          <g 
            className="sleeping-colossus-face"
            style={{ 
              animation: `colossusBreathe ${pulseDuration} ease-in-out infinite`,
              transformOrigin: '700px 290px'
            }}
          >
            {/* Giant Mossy Rock Head Shape */}
            <path
              d="M 640 320 C 640 240 760 240 760 320 C 760 350 640 350 640 320 Z"
              fill={isNight ? '#1e293b' : '#0891b2'}
              stroke="#090d16"
              strokeWidth="4"
              opacity="0.9"
            />
            {/* Peaceful Closed Cartoon Eyes (gentle curves) */}
            <path d="M 662 292 Q 675 304 688 292" stroke="#090d16" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 712 292 Q 725 304 738 292" stroke="#090d16" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Gentle Smiling Rock Mouth */}
            <path d="M 686 322 Q 700 334 714 322" stroke="#090d16" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Blushing Coral Cheeks */}
            <circle cx="658" cy="305" r="7" fill="#f472b6" opacity="0.65" />
            <circle cx="742" cy="305" r="7" fill="#f472b6" opacity="0.65" />
            {/* Cute Coral Crown / Foliage on Head */}
            <circle cx="700" cy="245" r="16" fill="#f59e0b" stroke="#78350f" strokeWidth="3" />
            <circle cx="678" cy="254" r="12" fill="#ec4899" stroke="#831843" strokeWidth="2.5" />
            <circle cx="722" cy="254" r="12" fill="#22c55e" stroke="#14532d" strokeWidth="2.5" />
          </g>

          {/* High Tier Raised Coral Shelf Mound */}
          <path
            d="M 160 380
               C 280 270 480 270 650 280
               C 800 270 1000 275 1160 380
               C 1040 440 850 435 650 440
               C 450 435 260 440 160 380 Z"
            fill="url(#highTierSand)"
            stroke="#bae6fd"
            strokeWidth="5"
            filter="drop-shadow(0 6px 12px rgba(0,0,0,0.45))"
          />
          {/* High Tier Rim Highlight */}
          <path
            d="M 180 370
               C 290 278 480 278 650 288
               C 800 278 990 282 1140 370"
            fill="none"
            stroke="url(#coralRainbowGlow)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* ========================================================
              WINDING COBBLESTONE & SHELL STEPPING PATHS (High to Mid)
              ======================================================== */}
          <g className="island-stepping-paths">
            {/* Left Path: Queen & Diva down to Bob */}
            <ellipse cx="440" cy="410" rx="18" ry="10" fill="url(#cobblestoneGrad)" stroke="#090d16" strokeWidth="3" />
            <ellipse cx="420" cy="445" rx="20" ry="11" fill="url(#cobblestoneGrad)" stroke="#090d16" strokeWidth="3" />
            <ellipse cx="455" cy="475" rx="22" ry="12" fill="url(#cobblestoneGrad)" stroke="#090d16" strokeWidth="3" />

            {/* Right Path: Starlight down to Zap */}
            <ellipse cx="800" cy="390" rx="18" ry="10" fill="url(#cobblestoneGrad)" stroke="#090d16" strokeWidth="3" />
            <ellipse cx="830" cy="425" rx="20" ry="11" fill="url(#cobblestoneGrad)" stroke="#090d16" strokeWidth="3" />
            <ellipse cx="805" cy="460" rx="22" ry="12" fill="url(#cobblestoneGrad)" stroke="#090d16" strokeWidth="3" />
          </g>

          {/* ========================================================
              TIER 2 (CENTRAL REEF PLATEAU - y: ~50-60%)
              Carries Boombox Bob (50%, 56%) and Zap Jelly (76%, 50%)
              ======================================================== */}
          {/* Central Living Island Rock Base */}
          <path
            d="M 100 580
               C 180 430 450 430 700 440
               C 950 430 1200 430 1300 580
               C 1180 660 920 660 700 650
               C 460 660 220 660 100 580 Z"
            fill="url(#midTierRock)"
            stroke="#042f2e"
            strokeWidth="6"
            filter="drop-shadow(0 10px 24px rgba(0,0,0,0.5))"
          />

          {/* Central Sand / Coral Bed */}
          <path
            d="M 140 560
               C 220 450 460 450 700 458
               C 940 450 1160 450 1260 560
               C 1150 630 910 630 700 620
               C 470 630 250 630 140 560 Z"
            fill="url(#highTierSand)"
            stroke="#67e8f9"
            strokeWidth="4"
          />

          {/* Winding Stepping Path from Mid (Bob/Zap) down to Low (Siren/Sparkpuff) */}
          <g className="island-stepping-paths">
            <ellipse cx="380" cy="590" rx="22" ry="12" fill="url(#cobblestoneGrad)" stroke="#090d16" strokeWidth="3" />
            <ellipse cx="320" cy="625" rx="24" ry="13" fill="url(#cobblestoneGrad)" stroke="#090d16" strokeWidth="3" />
            <ellipse cx="270" cy="660" rx="26" ry="14" fill="url(#cobblestoneGrad)" stroke="#090d16" strokeWidth="3" />

            <ellipse cx="880" cy="570" rx="22" ry="12" fill="url(#cobblestoneGrad)" stroke="#090d16" strokeWidth="3" />
            <ellipse cx="940" cy="610" rx="24" ry="13" fill="url(#cobblestoneGrad)" stroke="#090d16" strokeWidth="3" />
            <ellipse cx="1000" cy="645" rx="26" ry="14" fill="url(#cobblestoneGrad)" stroke="#090d16" strokeWidth="3" />
          </g>

          {/* Coral Reef Accent Shelves & Smiling Brain Coral on Mid Tier */}
          <g transform="translate(460, 500)">
            <circle cx="20" cy="20" r="22" fill="#f59e0b" stroke="#78350f" strokeWidth="3" />
            <path d="M 8 16 Q 20 8 32 16" fill="none" stroke="#fef08a" strokeWidth="2.5" />
            <path d="M 10 24 Q 20 16 30 24" fill="none" stroke="#fef08a" strokeWidth="2.5" />
          </g>

          <g transform="translate(930, 510)">
            <circle cx="20" cy="20" r="24" fill="#ec4899" stroke="#831843" strokeWidth="3" />
            <path d="M 6 16 Q 20 8 34 16" fill="none" stroke="#fdf2f8" strokeWidth="2.5" />
            <path d="M 8 24 Q 20 16 32 24" fill="none" stroke="#fdf2f8" strokeWidth="2.5" />
          </g>

          {/* ========================================================
              TIER 3 (FOREGROUND SHORELINE / TIDE POOL - y: ~68-80%)
              Carries Volt Siren (18%, 72%) and DJ Sparkpuff (82%, 70%)
              ======================================================== */}
          {/* Giant Bottom Coral Cliff Shelf */}
          <path
            d="M -20 840
               L -20 680
               C 120 630 320 640 480 670
               C 650 700 850 700 1020 660
               C 1180 620 1340 640 1420 680
               L 1420 840 Z"
            fill="url(#lowTierSand)"
            stroke="#78350f"
            strokeWidth="6"
            filter="drop-shadow(0 -8px 24px rgba(0,0,0,0.6))"
          />

          {/* PLAYFUL CRITTERS: Cute Orange Crab Peeking from Sand */}
          <g transform="translate(540, 680) scale(0.85)">
            {/* Claws */}
            <path d="M 8 18 C -6 2 -6 20 8 12" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" />
            <path d="M 42 18 C 56 2 56 20 42 12" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" />
            {/* Body */}
            <ellipse cx="25" cy="20" rx="18" ry="12" fill="#f97316" stroke="#7c2d12" strokeWidth="3" />
            {/* Stalk Eyes with Googly Pupils */}
            <circle cx="18" cy="8" r="5" fill="#ffffff" stroke="#7c2d12" strokeWidth="2" />
            <circle cx="19" cy="8" r="2.5" fill="#000000" />
            <circle cx="32" cy="8" r="5" fill="#ffffff" stroke="#7c2d12" strokeWidth="2" />
            <circle cx="33" cy="8" r="2.5" fill="#000000" />
            {/* Happy Smile */}
            <path d="M 20 23 Q 25 27 30 23" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* PLAYFUL CRITTERS: Clapping Pearl Clam */}
          <g transform="translate(800, 690) scale(0.9)">
            {/* Shell Base */}
            <path d="M 10 32 C 10 44 42 44 42 32 Z" fill="#c084fc" stroke="#581c87" strokeWidth="3" />
            {/* Shiny Golden Pearl Inside */}
            <circle cx="26" cy="28" r="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" filter="drop-shadow(0 0 6px #facc15)" />
            {/* Top Shell Lid (Bounces slightly to tempo) */}
            <path d="M 10 30 C 10 16 42 16 42 30 Z" fill="#d8b4fe" stroke="#581c87" strokeWidth="3" />
          </g>

          {/* Smiling Cartoon Starfish #1 (Orange) */}
          <g transform="translate(180, 750) rotate(12) scale(0.95)">
            <polygon points="24,0 31,14 47,16 35,27 38,43 24,35 9,43 13,27 1,16 17,14" fill="#f97316" stroke="#9a3412" strokeWidth="3" />
            <circle cx="20" cy="20" r="3" fill="#ffffff" />
            <circle cx="21" cy="20" r="1.5" fill="#000000" />
            <circle cx="28" cy="20" r="3" fill="#ffffff" />
            <circle cx="29" cy="20" r="1.5" fill="#000000" />
            <path d="M 21 27 Q 24 30 27 27" fill="none" stroke="#7c2d12" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* Smiling Cartoon Starfish #2 (Pink) */}
          <g transform="translate(1180, 740) rotate(-14) scale(0.95)">
            <polygon points="24,0 31,14 47,16 35,27 38,43 24,35 9,43 13,27 1,16 17,14" fill="#ec4899" stroke="#831843" strokeWidth="3" />
            <circle cx="20" cy="20" r="3" fill="#ffffff" />
            <circle cx="21" cy="20" r="1.5" fill="#000000" />
            <circle cx="28" cy="20" r="3" fill="#ffffff" />
            <circle cx="29" cy="20" r="1.5" fill="#000000" />
            <path d="M 21 27 Q 24 30 27 27" fill="none" stroke="#831843" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* Clustered Barnacles with Googly Eyes */}
          <g transform="translate(640, 730) scale(0.95)">
            <polygon points="10,24 16,6 26,6 32,24" fill="#cbd5e1" stroke="#334155" strokeWidth="2.5" />
            <circle cx="21" cy="14" r="3.5" fill="#ffffff" />
            <circle cx="22" cy="14" r="1.8" fill="#0f172a" />
            <polygon points="30,26 35,10 43,10 48,26" fill="#94a3b8" stroke="#334155" strokeWidth="2.5" />
            <circle cx="39" cy="17" r="3" fill="#ffffff" />
            <circle cx="40" cy="17" r="1.5" fill="#0f172a" />
          </g>

          {/* Ambient Schools of Little Tropical Fish Swimming Across Island */}
          <g className="floating-music-note" style={{ animationDuration: '6s', animationIterationCount: 'infinite' }}>
            <g transform="translate(320, 360) scale(0.65)">
              <polygon points="25,15 0,5 0,25" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
              <polygon points="5,15 -10,8 -10,22" fill="#facc15" />
              <circle cx="18" cy="12" r="2" fill="#000000" />
            </g>
            <g transform="translate(360, 385) scale(0.55)">
              <polygon points="25,15 0,5 0,25" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <polygon points="5,15 -10,8 -10,22" fill="#0284c7" />
              <circle cx="18" cy="12" r="2" fill="#000000" />
            </g>
            <g transform="translate(395, 365) scale(0.5)">
              <polygon points="25,15 0,5 0,25" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
              <polygon points="5,15 -10,8 -10,22" fill="#db2777" />
              <circle cx="18" cy="12" r="2" fill="#000000" />
            </g>
          </g>

          {/* Right School of Little Fish */}
          <g className="floating-music-note" style={{ animationDuration: '7s', animationDelay: '1.5s', animationIterationCount: 'infinite' }}>
            <g transform="translate(1050, 480) scale(-0.6, 0.6)">
              <polygon points="25,15 0,5 0,25" fill="#4ade80" stroke="#16a34a" strokeWidth="2" />
              <polygon points="5,15 -10,8 -10,22" fill="#16a34a" />
              <circle cx="18" cy="12" r="2" fill="#000000" />
            </g>
            <g transform="translate(1090, 505) scale(-0.5, 0.5)">
              <polygon points="25,15 0,5 0,25" fill="#fb923c" stroke="#c2410c" strokeWidth="2" />
              <polygon points="5,15 -10,8 -10,22" fill="#c2410c" />
              <circle cx="18" cy="12" r="2" fill="#000000" />
            </g>
          </g>
        </svg>
      )}

      {/* ========================================================
          2. ABYSSAL MAGMA TRENCH: VOLCANIC BASALT RIDGE ISLAND
          ======================================================== */}
      {isTrench && (
        <svg
          width="1400"
          height="820"
          viewBox="0 0 1400 820"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <radialGradient id="trenchWaterBg" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#450a0a" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#1c1917" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0c0a09" stopOpacity="0.95" />
            </radialGradient>
            <linearGradient id="trenchBasaltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#44403c" />
              <stop offset="40%" stopColor="#292524" />
              <stop offset="100%" stopColor="#0c0a09" />
            </linearGradient>
            <linearGradient id="trenchMagmaFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>

          <rect width="1400" height="820" fill="url(#trenchWaterBg)" />

          {/* High Tier Basalt Chimneys */}
          <polygon points="320,400 350,200 410,200 440,400" fill="#1c1917" stroke="#44403c" strokeWidth="4" />
          <polygon points="980,400 1010,210 1070,210 1100,400" fill="#1c1917" stroke="#44403c" strokeWidth="4" />

          {/* Sleeping Obsidian Titan Face */}
          <g 
            className="sleeping-colossus-face"
            style={{ 
              animation: `colossusBreathe ${pulseDuration} ease-in-out infinite`,
              transformOrigin: '700px 300px'
            }}
          >
            <path
              d="M 640 330 C 640 250 760 250 760 330 C 760 360 640 360 640 330 Z"
              fill="#1c1917"
              stroke="#ea580c"
              strokeWidth="4"
            />
            <path d="M 662 300 Q 675 312 688 300" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 712 300 Q 725 312 738 300" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 686 332 Q 700 344 714 332" stroke="#ea580c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>

          {/* Magma Fissures Pulsing with Tempo */}
          <path
            d="M 120 540 Q 400 440 700 460 T 1280 540"
            stroke="url(#trenchMagmaFlow)"
            strokeWidth="8"
            fill="none"
            filter="drop-shadow(0 0 14px #ea580c)"
            style={{ animation: `lavaGlowPulse ${pulseDuration} ease-in-out infinite` }}
          />

          {/* Central Plateau */}
          <path
            d="M 140 580
               C 280 460 520 460 700 470
               C 880 460 1120 460 1260 580
               C 1140 660 880 660 700 650
               C 500 660 260 660 140 580 Z"
            fill="url(#trenchBasaltGrad)"
            stroke="#78716c"
            strokeWidth="5"
          />

          {/* Stepping Basalt Stones */}
          <ellipse cx="440" cy="420" rx="18" ry="10" fill="#44403c" stroke="#ea580c" strokeWidth="2.5" />
          <ellipse cx="800" cy="410" rx="18" ry="10" fill="#44403c" stroke="#ea580c" strokeWidth="2.5" />

          {/* Foreground Magma Shelf */}
          <path
            d="M -20 840 L -20 680 C 200 640 500 680 700 700 C 900 680 1200 640 1420 680 L 1420 840 Z"
            fill="#1c1917"
            stroke="#44403c"
            strokeWidth="5"
          />
        </svg>
      )}

      {/* ========================================================
          3. BIOLUMINESCENT CAVERN: GLOWING CRYSTAL GROTTO
          ======================================================== */}
      {isCavern && (
        <svg
          width="1400"
          height="820"
          viewBox="0 0 1400 820"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <radialGradient id="cavernWaterBg" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#064e3b" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#022c22" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#021a14" stopOpacity="0.95" />
            </radialGradient>
            <linearGradient id="cavernRockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="40%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <linearGradient id="crystalGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>

          <rect width="1400" height="820" fill="url(#cavernWaterBg)" />

          {/* Back Giant Glowing Emerald & Amethyst Crystals */}
          <polygon points="320,400 350,190 390,160 430,220 410,400" fill="#10b981" stroke="#a7f3d0" strokeWidth="4" filter="drop-shadow(0 0 14px #10b981)" opacity="0.9" />
          <polygon points="980,400 1020,180 1060,150 1100,210 1070,400" fill="#a855f7" stroke="#e9d5ff" strokeWidth="4" filter="drop-shadow(0 0 14px #c084fc)" opacity="0.85" />

          {/* Sleeping Crystal Titan Face */}
          <g 
            className="sleeping-colossus-face"
            style={{ 
              animation: `colossusBreathe ${pulseDuration} ease-in-out infinite`,
              transformOrigin: '700px 300px'
            }}
          >
            <path
              d="M 640 330 C 640 250 760 250 760 330 C 760 360 640 360 640 330 Z"
              fill="#065f46"
              stroke="#34d399"
              strokeWidth="4"
            />
            <path d="M 662 300 Q 675 312 688 300" stroke="#34d399" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 712 300 Q 725 312 738 300" stroke="#34d399" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 686 332 Q 700 344 714 332" stroke="#2dd4bf" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Crystal Forehead Crown */}
            <polygon points="700,230 685,260 715,260" fill="#22d3ee" stroke="#cffafe" strokeWidth="2" />
          </g>

          {/* Runic Glowing Energy Stream */}
          <path
            d="M 140 540 Q 400 450 700 465 T 1260 540"
            stroke="url(#crystalGlow)"
            strokeWidth="7"
            fill="none"
            filter="drop-shadow(0 0 12px #34d399)"
            style={{ animation: `lavaGlowPulse ${pulseDuration} ease-in-out infinite` }}
          />

          {/* Central Geode Shelf */}
          <path
            d="M 140 580
               C 280 460 520 460 700 470
               C 880 460 1120 460 1260 580
               C 1140 660 880 660 700 650
               C 500 660 260 660 140 580 Z"
            fill="url(#cavernRockGrad)"
            stroke="#6ee7b7"
            strokeWidth="5"
          />

          {/* Foreground Crystal Cavern Ledge */}
          <path
            d="M -20 840 L -20 680 C 200 640 500 680 700 700 C 900 680 1200 640 1420 680 L 1420 840 Z"
            fill="#022c22"
            stroke="#065f46"
            strokeWidth="5"
          />
        </svg>
      )}
    </div>
  );
}
