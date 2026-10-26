export default function CartoonSeafloor({ islandId = 'lagoon', isNight }) {
  const themes = {
    lagoon: {
      sandFill: isNight ? '#78350f' : '#e0a96d',
      sandStroke: isNight ? '#451a03' : '#c28543',
      duneFill: isNight ? '#582405' : '#cb9559',
      starfishColor: '#f43f5e',
      seaweedColor: isNight ? '#15803d' : '#22c55e',
      shellFill: '#fbcfe8'
    },
    trench: {
      sandFill: isNight ? '#1a0505' : '#2d0c0c',
      sandStroke: isNight ? '#450a0a' : '#571515',
      duneFill: isNight ? '#120303' : '#1f0808',
      starfishColor: '#ea580c',
      seaweedColor: '#dc2626',
      shellFill: '#f97316'
    },
    cavern: {
      sandFill: isNight ? '#032018' : '#0d4a3e',
      sandStroke: isNight ? '#064e3b' : '#115e59',
      duneFill: isNight ? '#021812' : '#0a3a30',
      starfishColor: '#06b6d4',
      seaweedColor: '#10b981',
      shellFill: '#6ee7b7'
    }
  }[islandId] || {
    sandFill: '#e0a96d',
    sandStroke: '#c28543',
    duneFill: '#cb9559',
    starfishColor: '#f43f5e',
    seaweedColor: '#22c55e',
    shellFill: '#fbcfe8'
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '64px',
      pointerEvents: 'none',
      zIndex: 10,
      userSelect: 'none'
    }}>
      {/* Background undulating dune layer */}
      <svg 
        width="100%" 
        height="64" 
        viewBox="0 0 1200 64" 
        preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '64px' }}
      >
        <path
          d="M 0 35 Q 150 18 300 32 T 600 24 T 900 35 T 1200 20 L 1200 64 L 0 64 Z"
          fill={themes.duneFill}
        />
        {/* Foreground wavy dune bed with cartoon outline */}
        <path
          d="M 0 28 Q 180 38 360 22 T 720 32 T 1080 20 Q 1150 24 1200 22 L 1200 64 L 0 64 Z"
          fill={themes.sandFill}
          stroke={themes.sandStroke}
          strokeWidth="4"
        />
      </svg>

      {/* Decorative Cartoon Marine Life on the Seafloor */}
      <div style={{
        position: 'absolute',
        bottom: '8px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 5vw',
        pointerEvents: 'none'
      }}>
        {/* Left: Starfish & Seaweed */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          {/* Starfish */}
          <div style={{
            fontSize: '22px',
            filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.4))`,
            transform: 'rotate(-15deg)'
          }}>
            ⭐
          </div>
          {/* Seaweed sprout */}
          <svg width="24" height="34" viewBox="0 0 24 34">
            <path d="M 12 34 Q 4 22 14 14 Q 22 6 12 0 Q 6 10 10 20 Z" fill={themes.seaweedColor} />
          </svg>
        </div>

        {/* Mid-Left: Little Seashell */}
        <div style={{ fontSize: '18px', transform: 'rotate(20deg) translateY(4px)' }}>
          🐚
        </div>

        {/* Mid-Right: Coral Flora / Crystal */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
          <div style={{ fontSize: '19px', transform: 'scale(1.1)' }}>
            {islandId === 'trench' ? '🔥' : islandId === 'cavern' ? '💎' : '🪸'}
          </div>
          <div style={{ fontSize: '14px', transform: 'rotate(-10deg)' }}>
            {islandId === 'cavern' ? '🫧' : '🌸'}
          </div>
        </div>

        {/* Right: Sleeping Clam & Starfish */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          <svg width="28" height="22" viewBox="0 0 28 22">
            <path d="M 4 18 Q 14 2 24 18 Z" fill={themes.shellFill} stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="3" fill="#ffffff" filter="drop-shadow(0 0 3px #ffffff)" />
          </svg>
          <div style={{ fontSize: '18px', transform: 'rotate(25deg)' }}>
            ⭐
          </div>
        </div>
      </div>
    </div>
  );
}
