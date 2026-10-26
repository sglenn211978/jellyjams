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
        bottom: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(1280px, 98vw)',
        height: '280px',
        pointerEvents: 'none',
        zIndex: 2,
        userSelect: 'none'
      }}
    >
      {/* ========================================================
          1. LAGOON ISLAND: CARTOON SUNLIT CORAL REEF ATOLL
          ======================================================== */}
      {isLagoon && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Back Coral Spires & Sea Fans (Rises up behind the monsters) */}
          <div style={{ position: 'absolute', top: '-110px', left: '1%', width: '180px', height: '180px', zIndex: 1 }}>
            <svg width="180" height="180" viewBox="0 0 180 180">
              {/* Giant Purple Tube Sponges with bubble caps */}
              <g>
                {/* Spire 1 */}
                <path d="M 40 180 L 48 50 C 48 42 66 42 66 50 L 74 180 Z" fill={isNight ? '#4c1d95' : '#7c3aed'} stroke="#3b0764" strokeWidth="3" />
                <ellipse cx="57" cy="50" rx="9" ry="5" fill="#c084fc" stroke="#3b0764" strokeWidth="2" />
                <ellipse cx="57" cy="50" rx="5" ry="3" fill="#2e1065" />
                {/* Tiny bubbles rising from tube */}
                <circle cx="57" cy="38" r="4" fill="rgba(255,255,255,0.8)" stroke="#38bdf8" strokeWidth="1.5" className="floating-music-note" style={{ animationDuration: '3s' }} />
                <circle cx="59" cy="22" r="6" fill="rgba(255,255,255,0.7)" stroke="#38bdf8" strokeWidth="1.5" className="floating-music-note" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />

                {/* Spire 2 (Shorter) */}
                <path d="M 80 180 L 86 85 C 86 78 100 78 100 85 L 106 180 Z" fill={isNight ? '#6b21a8' : '#9333ea'} stroke="#3b0764" strokeWidth="3" />
                <ellipse cx="93" cy="85" rx="7" ry="4" fill="#d8b4fe" stroke="#3b0764" strokeWidth="2" />
                <ellipse cx="93" cy="85" rx="4" ry="2" fill="#2e1065" />
                <circle cx="93" cy="74" r="3.5" fill="rgba(255,255,255,0.8)" stroke="#38bdf8" strokeWidth="1.5" className="floating-music-note" style={{ animationDuration: '3.2s', animationDelay: '0.5s' }} />

                {/* Spire 3 (Curved) */}
                <path d="M 112 180 Q 125 130 135 110 C 140 102 152 108 146 116 Q 134 135 124 180 Z" fill={isNight ? '#581c87' : '#a855f7'} stroke="#3b0764" strokeWidth="3" />
              </g>
              {/* Golden Sea Anemone Fan */}
              <path d="M 10 180 Q 22 135 14 110 Q 30 125 24 180" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 18 180 Q 38 120 32 90 Q 42 125 30 180" stroke="#fbbf24" strokeWidth="5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* Right Coral Garden (Sea Fans & Brain Coral) */}
          <div style={{ position: 'absolute', top: '-105px', right: '1%', width: '190px', height: '175px', zIndex: 1 }}>
            <svg width="190" height="175" viewBox="0 0 190 175">
              {/* Vibrant Pink Gorgonian Sea Fan */}
              <path d="M 140 175 Q 120 110 90 70 M 115 105 Q 85 90 60 75 M 100 85 Q 90 55 75 35 M 130 125 Q 155 105 170 85 M 145 95 Q 170 75 160 50" stroke={isNight ? '#ec4899' : '#f43f5e'} strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* Glowing Yellow Brain Coral Dome */}
              <circle cx="65" cy="150" r="32" fill={isNight ? '#b45309' : '#f59e0b'} stroke="#78350f" strokeWidth="3" />
              <path d="M 45 140 Q 55 132 65 140 Q 75 148 85 140" fill="none" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 48 152 Q 58 144 68 152 Q 78 160 88 152" fill="none" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 52 164 Q 62 156 72 164" fill="none" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Main Stage Rock Shelf Plateau SVG */}
          <svg 
            width="100%" 
            height="240" 
            viewBox="0 0 1200 240" 
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              filter: 'drop-shadow(0 -4px 18px rgba(0, 0, 0, 0.45))',
              zIndex: 2
            }}
          >
            <defs>
              <linearGradient id="lagoonShelfTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isNight ? '#38bdf8' : '#67e8f9'} />
                <stop offset="35%" stopColor={isNight ? '#0284c7' : '#06b6d4'} />
                <stop offset="100%" stopColor={isNight ? '#0369a1' : '#0891b2'} />
              </linearGradient>

              <linearGradient id="lagoonShelfRockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isNight ? '#0f172a' : '#0e7490'} />
                <stop offset="50%" stopColor={isNight ? '#082f49' : '#155e75'} />
                <stop offset="100%" stopColor={isNight ? '#030712' : '#083344'} />
              </linearGradient>

              <linearGradient id="coralRimGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="25%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#fde047" />
                <stop offset="75%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>

            {/* Cliff Drop-Shadow Silhouette */}
            <path 
              d="M 15 65 Q 280 40 600 44 Q 920 40 1185 65 L 1195 240 L 5 240 Z" 
              fill="rgba(0,0,0,0.3)" 
            />

            {/* Deep Rock Cliff Strata (Layer 1 - Dark Sea Rock) */}
            <path 
              d="M 25 70 
                 Q 160 55 340 60 
                 T 720 54 
                 T 1050 62 
                 L 1175 75 
                 L 1185 240 
                 L 15 240 Z" 
              fill="url(#lagoonShelfRockGrad)" 
              stroke="#042f2e" 
              strokeWidth="4" 
            />

            {/* Coral Rock Strata Crevices & Texture */}
            <path d="M 120 110 Q 220 135 340 115" stroke={isNight ? '#0369a1' : '#0e7490'} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 460 145 Q 600 170 760 135" stroke={isNight ? '#0369a1' : '#0e7490'} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 880 120 Q 990 140 1080 115" stroke={isNight ? '#0369a1' : '#0e7490'} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />

            {/* Cartoon Fossil Shell in Cliff Wall */}
            <g transform="translate(240, 155) rotate(-15) scale(0.7)">
              <circle cx="20" cy="20" r="18" fill="#0891b2" stroke="#164e63" strokeWidth="3" />
              <path d="M 8 20 A 12 12 0 0 1 32 20 A 8 8 0 0 1 20 28 A 4 4 0 0 1 18 20" fill="none" stroke="#bae6fd" strokeWidth="2.5" />
            </g>

            {/* Secret Glowing Eyes in Cave Crevice (Left) */}
            <g transform="translate(160, 180)">
              <ellipse cx="25" cy="18" rx="28" ry="14" fill="#020617" />
              <g className="blinking-cave-eyes">
                <circle cx="18" cy="18" r="4.5" fill="#facc15" />
                <circle cx="19" cy="18" r="2" fill="#000000" />
                <circle cx="32" cy="18" r="4.5" fill="#facc15" />
                <circle cx="33" cy="18" r="2" fill="#000000" />
              </g>
            </g>

            {/* Secret Glowing Eyes in Cave Crevice (Right) */}
            <g transform="translate(980, 175)">
              <ellipse cx="25" cy="18" rx="26" ry="13" fill="#020617" />
              <g className="blinking-cave-eyes" style={{ animationDelay: '2.5s' }}>
                <circle cx="18" cy="18" r="4" fill="#4ade80" />
                <circle cx="19" cy="18" r="1.8" fill="#000000" />
                <circle cx="32" cy="18" r="4" fill="#4ade80" />
                <circle cx="33" cy="18" r="1.8" fill="#000000" />
              </g>
            </g>

            {/* Top Coral Plateau Shelf (Layer 2 - Vibrant Step where performers stand) */}
            <path 
              d="M 30 68 
                 C 140 45 320 48 500 46 
                 C 700 44 880 48 1060 46 
                 C 1120 45 1160 55 1170 68 
                 C 1160 85 1120 90 1060 88 
                 C 880 84 700 88 500 86 
                 C 320 84 140 90 30 68 Z" 
              fill="url(#lagoonShelfTopGrad)" 
              stroke="#bae6fd" 
              strokeWidth="4" 
            />

            {/* Vibrant Rainbow Coral Stage Rim Highlight */}
            <path 
              d="M 36 62 
                 C 140 42 320 45 500 43 
                 C 700 41 880 45 1060 43 
                 C 1120 42 1150 50 1164 62" 
              fill="none" 
              stroke="url(#coralRimGlow)" 
              strokeWidth="5" 
              strokeLinecap="round"
              filter="drop-shadow(0 2px 4px rgba(255,255,255,0.7))"
            />

            {/* Cartoon Starfish #1 Clinging to Cliff Shelf (Smiling, Bright Orange) */}
            <g transform="translate(380, 78) rotate(14) scale(0.85)">
              <polygon 
                points="24,0 31,14 47,16 35,27 38,43 24,35 9,43 13,27 1,16 17,14" 
                fill="#f97316" 
                stroke="#c2410c" 
                strokeWidth="2.5" 
              />
              <circle cx="20" cy="20" r="2.5" fill="#ffffff" />
              <circle cx="21" cy="20" r="1.2" fill="#000000" />
              <circle cx="28" cy="20" r="2.5" fill="#ffffff" />
              <circle cx="29" cy="20" r="1.2" fill="#000000" />
              <path d="M 21 26 Q 24 29 27 26" fill="none" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Cartoon Starfish #2 Clinging to Right Cliff Shelf (Cute Magenta) */}
            <g transform="translate(840, 80) rotate(-18) scale(0.8)">
              <polygon 
                points="24,0 31,14 47,16 35,27 38,43 24,35 9,43 13,27 1,16 17,14" 
                fill="#ec4899" 
                stroke="#9d174d" 
                strokeWidth="2.5" 
              />
              <circle cx="20" cy="20" r="2.2" fill="#ffffff" />
              <circle cx="21" cy="20" r="1.2" fill="#000000" />
              <circle cx="28" cy="20" r="2.2" fill="#ffffff" />
              <circle cx="29" cy="20" r="1.2" fill="#000000" />
              <path d="M 21 26 Q 24 29 27 26" fill="none" stroke="#831843" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Clustered Barnacles with Googly Eyes */}
            <g transform="translate(680, 88) scale(0.75)">
              <polygon points="10,24 16,6 26,6 32,24" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
              <ellipse cx="21" cy="6" rx="5" ry="2.5" fill="#334155" />
              <circle cx="21" cy="14" r="3" fill="#ffffff" />
              <circle cx="22" cy="14" r="1.5" fill="#0f172a" />

              <polygon points="30,26 35,10 43,10 48,26" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
              <ellipse cx="39" cy="10" rx="4" ry="2" fill="#1e293b" />
              <circle cx="39" cy="17" r="2.5" fill="#ffffff" />
              <circle cx="40" cy="17" r="1.2" fill="#0f172a" />
            </g>
          </svg>
        </div>
      )}

      {/* ========================================================
          2. MAGMA TRENCH: BASALT CRAGS & VOLCANIC FISSURES
          ======================================================== */}
      {isTrench && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Back Basalt Spire & Geothermal Vent Steam */}
          <div style={{ position: 'absolute', top: '-130px', left: '2%', width: '190px', height: '200px', zIndex: 1 }}>
            <svg width="190" height="200" viewBox="0 0 190 200">
              {/* Jagged Basalt Column */}
              <polygon points="50,200 45,40 70,30 95,45 85,200" fill="#1c1917" stroke="#44403c" strokeWidth="3" />
              <polygon points="90,200 85,60 110,50 135,65 125,200" fill="#292524" stroke="#44403c" strokeWidth="3" />
              {/* Glowing Lava River down the spire */}
              <path d="M 68 35 Q 60 110 74 200" stroke="#f97316" strokeWidth="4" fill="none" filter="drop-shadow(0 0 6px #ea580c)" />
              <path d="M 110 55 Q 120 120 108 200" stroke="#ef4444" strokeWidth="3" fill="none" filter="drop-shadow(0 0 6px #dc2626)" />
              {/* Steaming Vent Wisps */}
              <ellipse cx="70" cy="24" rx="14" ry="7" fill="rgba(254, 215, 170, 0.35)" className="floating-music-note" style={{ animationDuration: '2.8s' }} />
              <ellipse cx="110" cy="40" rx="12" ry="6" fill="rgba(254, 215, 170, 0.3)" className="floating-music-note" style={{ animationDuration: '3.1s', animationDelay: '0.8s' }} />
            </svg>
          </div>

          {/* Right Volcanic Chimney */}
          <div style={{ position: 'absolute', top: '-120px', right: '2%', width: '180px', height: '190px', zIndex: 1 }}>
            <svg width="180" height="190" viewBox="0 0 180 190">
              <polygon points="40,190 60,50 95,45 110,190" fill="#1c1917" stroke="#44403c" strokeWidth="3" />
              {/* Lava Vent Mouth */}
              <ellipse cx="78" cy="48" rx="18" ry="8" fill="#f97316" stroke="#fbbf24" strokeWidth="2.5" filter="drop-shadow(0 0 8px #f97316)" />
              <ellipse cx="78" cy="48" rx="10" ry="4" fill="#fef08a" />
              <ellipse cx="78" cy="30" rx="12" ry="6" fill="rgba(254, 215, 170, 0.4)" className="floating-music-note" style={{ animationDuration: '2.6s' }} />
            </svg>
          </div>

          {/* Main Basalt Magma Stage Shelf SVG */}
          <svg 
            width="100%" 
            height="240" 
            viewBox="0 0 1200 240" 
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              filter: 'drop-shadow(0 -4px 20px rgba(234, 88, 12, 0.35))',
              zIndex: 2
            }}
          >
            <defs>
              <linearGradient id="trenchBasaltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#292524" />
                <stop offset="50%" stopColor="#1c1917" />
                <stop offset="100%" stopColor="#0c0a09" />
              </linearGradient>

              <linearGradient id="magmaFissureGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="30%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#fde047" />
                <stop offset="70%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>

            {/* Jagged Hexagonal Basalt Cliff Face */}
            <path 
              d="M 20 65 
                 L 140 50 L 260 56 L 420 48 L 600 52 L 780 46 L 940 54 L 1080 48 L 1180 65 
                 L 1190 240 L 10 240 Z" 
              fill="url(#trenchBasaltGrad)" 
              stroke="#44403c" 
              strokeWidth="4" 
            />

            {/* Glowing Magma Fissures Pulsing with Tempo */}
            <path 
              d="M 80 120 Q 220 150 360 110 T 680 130 T 960 115 T 1120 130" 
              stroke="url(#magmaFissureGrad)" 
              strokeWidth="6" 
              fill="none" 
              strokeLinecap="round"
              filter="drop-shadow(0 0 10px #ea580c)"
              style={{ animation: `lavaGlowPulse ${pulseDuration} ease-in-out infinite` }}
            />
            <path 
              d="M 240 135 L 290 190 M 520 125 L 560 185 M 820 122 L 870 195" 
              stroke="#ea580c" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px #ea580c)"
            />

            {/* Glowing Magma Core Eyes Peeking from Basalt Fissure */}
            <g transform="translate(560, 150)">
              <ellipse cx="25" cy="18" rx="26" ry="12" fill="#0c0a09" />
              <g className="blinking-cave-eyes">
                <circle cx="18" cy="18" r="4.5" fill="#ef4444" filter="drop-shadow(0 0 4px #ef4444)" />
                <circle cx="19" cy="18" r="2" fill="#fde047" />
                <circle cx="32" cy="18" r="4.5" fill="#ef4444" filter="drop-shadow(0 0 4px #ef4444)" />
                <circle cx="33" cy="18" r="2" fill="#fde047" />
              </g>
            </g>

            {/* Top Basalt Rim where monsters stand */}
            <path 
              d="M 25 64 
                 Q 300 42 600 46 
                 Q 900 42 1175 64 
                 Q 900 82 600 78 
                 Q 300 82 25 64 Z" 
              fill="#44403c" 
              stroke="#78716c" 
              strokeWidth="3.5" 
            />

            {/* Glowing Lava Lip */}
            <path 
              d="M 30 60 
                 Q 300 38 600 42 
                 Q 900 38 1170 60" 
              stroke="url(#magmaFissureGrad)" 
              strokeWidth="5" 
              fill="none" 
              strokeLinecap="round"
              filter="drop-shadow(0 0 8px #f97316)"
            />

            {/* Spiky Obsidian Crystals along the shelf */}
            <g transform="translate(180, 52) scale(0.7)">
              <polygon points="15,40 5,0 25,40" fill="#1c1917" stroke="#ea580c" strokeWidth="2" />
              <polygon points="25,40 20,8 35,40" fill="#292524" stroke="#ea580c" strokeWidth="2" />
            </g>
            <g transform="translate(1000, 52) scale(0.7)">
              <polygon points="15,40 10,2 25,40" fill="#1c1917" stroke="#ea580c" strokeWidth="2" />
              <polygon points="25,40 32,10 40,40" fill="#292524" stroke="#ea580c" strokeWidth="2" />
            </g>
          </svg>
        </div>
      )}

      {/* ========================================================
          3. BIOLUMINESCENT CAVERN: GLOWING CRYSTALS & RUNIC GROTTO
          ======================================================== */}
      {isCavern && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Back Giant Crystal Cluster (Left) */}
          <div style={{ position: 'absolute', top: '-135px', left: '2%', width: '190px', height: '210px', zIndex: 1 }}>
            <svg width="190" height="210" viewBox="0 0 190 210">
              {/* Amethyst / Emerald Crystal Prisms */}
              <polygon points="40,210 20,60 55,20 75,70 65,210" fill="#10b981" stroke="#a7f3d0" strokeWidth="3" filter="drop-shadow(0 0 12px #10b981)" opacity="0.9" />
              <polygon points="65,210 60,75 90,40 110,85 100,210" fill="#065f46" stroke="#34d399" strokeWidth="2.5" />
              <polygon points="95,210 95,95 125,65 145,105 130,210" fill="#a855f7" stroke="#e9d5ff" strokeWidth="3" filter="drop-shadow(0 0 10px #c084fc)" opacity="0.85" />
            </svg>
          </div>

          {/* Back Giant Crystal Cluster (Right) */}
          <div style={{ position: 'absolute', top: '-125px', right: '2%', width: '180px', height: '200px', zIndex: 1 }}>
            <svg width="180" height="200" viewBox="0 0 180 200">
              <polygon points="50,200 70,50 105,15 125,65 110,200" fill="#06b6d4" stroke="#cffafe" strokeWidth="3" filter="drop-shadow(0 0 12px #22d3ee)" opacity="0.9" />
              <polygon points="105,200 115,70 145,35 160,80 145,200" fill="#8b5cf6" stroke="#ddd6fe" strokeWidth="2.5" filter="drop-shadow(0 0 10px #a78bfa)" opacity="0.85" />
            </svg>
          </div>

          {/* Main Crystal Cavern Plateau Shelf SVG */}
          <svg 
            width="100%" 
            height="240" 
            viewBox="0 0 1200 240" 
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              filter: 'drop-shadow(0 -4px 22px rgba(16, 185, 129, 0.4))',
              zIndex: 2
            }}
          >
            <defs>
              <linearGradient id="cavernShelfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#042f2e" />
                <stop offset="50%" stopColor="#022c22" />
                <stop offset="100%" stopColor="#021a14" />
              </linearGradient>

              <linearGradient id="runicGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="25%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="75%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>

            {/* Deep Subterranean Gemstone Cliff Strata */}
            <path 
              d="M 25 70 
                 Q 280 46 600 50 
                 Q 920 46 1175 70 
                 L 1185 240 L 15 240 Z" 
              fill="url(#cavernShelfGrad)" 
              stroke="#064e3b" 
              strokeWidth="4" 
            />

            {/* Ancient Glowing Musical Runes Etched into Cliff Face */}
            <g 
              stroke="url(#runicGlowGrad)" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round"
              filter="drop-shadow(0 0 8px #2dd4bf)"
              style={{ animation: `lavaGlowPulse ${pulseDuration} ease-in-out infinite` }}
            >
              {/* Rune 1 (Treble Clef Symbol variation) */}
              <path d="M 160 140 C 140 120 170 100 170 150 C 170 170 150 170 150 160" />
              {/* Rune 2 (Cadence Wave) */}
              <path d="M 380 150 Q 420 120 460 150 T 540 150" />
              {/* Rune 3 (Harmony Triad) */}
              <polygon points="680,165 710,120 740,165" strokeWidth="3" />
              <circle cx="710" cy="145" r="4" fill="#a78bfa" />
              {/* Rune 4 (Rhythm Spiral) */}
              <path d="M 920 150 Q 945 125 970 150 Q 985 165 965 170 Q 945 165 955 150" />
            </g>

            {/* Glowing Cave Hollow with Friendly Eyes */}
            <g transform="translate(800, 160)">
              <ellipse cx="25" cy="18" rx="26" ry="13" fill="#021a14" />
              <g className="blinking-cave-eyes">
                <circle cx="18" cy="18" r="4.5" fill="#38bdf8" filter="drop-shadow(0 0 5px #38bdf8)" />
                <circle cx="19" cy="18" r="2" fill="#ffffff" />
                <circle cx="32" cy="18" r="4.5" fill="#38bdf8" filter="drop-shadow(0 0 5px #38bdf8)" />
                <circle cx="33" cy="18" r="2" fill="#ffffff" />
              </g>
            </g>

            {/* Top Crystal Ledge Step */}
            <path 
              d="M 30 68 
                 Q 300 45 600 48 
                 Q 900 45 1170 68 
                 Q 900 86 600 82 
                 Q 300 86 30 68 Z" 
              fill="#065f46" 
              stroke="#6ee7b7" 
              strokeWidth="3.5" 
            />

            {/* Luminous Neon Emerald Edge */}
            <path 
              d="M 35 62 
                 Q 300 40 600 43 
                 Q 900 40 1165 62" 
              stroke="url(#runicGlowGrad)" 
              strokeWidth="5" 
              fill="none" 
              strokeLinecap="round"
              filter="drop-shadow(0 0 10px #34d399)"
            />

            {/* Sprouting Glowing Bioluminescent Mushrooms */}
            <g transform="translate(260, 68) scale(0.8)">
              <path d="M 12 30 Q 14 16 16 10" stroke="#f0fdf4" strokeWidth="3" fill="none" />
              <path d="M 4 12 C 4 2 28 2 28 12 Z" fill="#ec4899" stroke="#be185d" strokeWidth="2" filter="drop-shadow(0 0 6px #f472b6)" />
              <circle cx="11" cy="7" r="2" fill="#ffffff" />
              <circle cx="21" cy="7" r="2" fill="#ffffff" />
            </g>
            <g transform="translate(930, 68) scale(0.85)">
              <path d="M 14 30 Q 15 16 16 10" stroke="#f0fdf4" strokeWidth="3" fill="none" />
              <path d="M 4 12 C 4 2 28 2 28 12 Z" fill="#a855f7" stroke="#7e22ce" strokeWidth="2" filter="drop-shadow(0 0 6px #c084fc)" />
              <circle cx="10" cy="7" r="2" fill="#ffffff" />
              <circle cx="20" cy="7" r="2" fill="#ffffff" />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}
