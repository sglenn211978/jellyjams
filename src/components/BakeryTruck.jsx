export default function BakeryTruck({ 
  coins, 
  onBuyTreat, 
  onUnlockBob, 
  bobUnlocked, 
  activeTreat, 
  isNight,
  onOpenWardrobe,
  onOpenDecorations,
  recruitName = 'BOB',
  recruitIcon = '📦',
  recruitUnlocked,
  onRecruit
}) {
  const isUnlocked = recruitUnlocked !== undefined ? recruitUnlocked : bobUnlocked;
  const handleRecruit = onRecruit || onUnlockBob;
  const canAffordRecruit = coins >= 15;
  const canAffordCupcake = coins >= 5 && !activeTreat;
  const canAffordDonut = coins >= 12 && !activeTreat;

  return (
    <div className="seafloor-truck-container" style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '8px',
      userSelect: 'none'
    }}>
      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        padding: '8px 14px',
        borderRadius: '24px',
        border: '4px solid #090d16',
        boxShadow: 'inset 0 3px 0 rgba(255, 255, 255, 0.35), inset 0 -4px 0 rgba(0, 0, 0, 0.35), 0 7px 0 #090d16, 0 12px 24px rgba(0, 0, 0, 0.55)',
        flexWrap: 'wrap'
      }}>
        {/* Kelp Cake: +1 Level */}
        <button
          onClick={() => onBuyTreat('cupcake', 5)}
          disabled={!canAffordCupcake}
          className={`game-btn ${canAffordCupcake ? 'game-btn-yellow' : 'game-btn-stone'}`}
          style={{
            padding: '8px 16px',
            fontSize: '15px'
          }}
          title="Buy a Kelp Cake (+1 Level & 15s Sugar Rush) - 5 Coins"
        >
          <span style={{ fontSize: '24px' }}>🧁</span>
          <div style={{ textAlign: 'left', lineHeight: '1.1' }}>
            <div>CAKE</div>
            <div style={{ 
              fontSize: '13px', 
              fontWeight: '900', 
              background: 'rgba(0, 0, 0, 0.45)', 
              padding: '1px 6px', 
              borderRadius: '8px',
              marginTop: '2px',
              color: '#fef08a'
            }}>5 🪙</div>
          </div>
        </button>

        {/* Coral Donut: +2 Levels */}
        <button
          onClick={() => onBuyTreat('donut', 12)}
          disabled={!canAffordDonut}
          className={`game-btn ${canAffordDonut ? 'game-btn-pink' : 'game-btn-stone'}`}
          style={{
            padding: '8px 16px',
            fontSize: '15px'
          }}
          title="Buy a Coral Donut (+2 Levels & 20s Super Rush) - 12 Coins"
        >
          <span style={{ fontSize: '24px' }}>🍩</span>
          <div style={{ textAlign: 'left', lineHeight: '1.1' }}>
            <div>DONUT</div>
            <div style={{ 
              fontSize: '13px', 
              fontWeight: '900', 
              background: 'rgba(0, 0, 0, 0.45)', 
              padding: '1px 6px', 
              borderRadius: '8px',
              marginTop: '2px',
              color: '#fef08a'
            }}>12 🪙</div>
          </div>
        </button>

        {/* Boutique Wardrobe button */}
        <button
          onClick={onOpenWardrobe}
          className="game-btn game-btn-purple"
          style={{
            padding: '8px 16px',
            fontSize: '15px'
          }}
          title="Open Reef Boutique & Wardrobe to buy hats & accessories"
        >
          <span style={{ fontSize: '22px' }}>🎩</span>
          <span>HATS</span>
        </button>

        {/* Decorations Shop button */}
        <button
          onClick={onOpenDecorations}
          className="game-btn game-btn-green"
          style={{
            padding: '8px 16px',
            fontSize: '15px'
          }}
          title="Open Seafloor Decorations Shop for passive coin buffs"
        >
          <span style={{ fontSize: '22px' }}>🪸</span>
          <span>RELICS</span>
        </button>

        {!isUnlocked ? (
          <button
            onClick={handleRecruit}
            disabled={!canAffordRecruit}
            className={`game-btn ${canAffordRecruit ? 'game-btn-cyan recruit-btn-active' : 'game-btn-stone'}`}
            style={{
              padding: '8px 16px',
              fontSize: '15px'
            }}
            title={`Dispatch delivery for ${recruitName} (15 Coins)`}
          >
            <span style={{ fontSize: '24px' }}>{recruitIcon}</span>
            <div style={{ textAlign: 'left', lineHeight: '1.1' }}>
              <div>{recruitName}</div>
              <div style={{ 
                fontSize: '13px', 
                fontWeight: '900', 
                background: 'rgba(0, 0, 0, 0.45)', 
                padding: '1px 6px', 
                borderRadius: '8px',
                marginTop: '2px',
                color: '#fef08a'
              }}>15 🪙</div>
            </div>
          </button>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(180deg, #15803d 0%, #166534 100%)',
            border: '3px solid #090d16',
            boxShadow: '0 4px 0 #090d16',
            padding: '8px 14px',
            borderRadius: '18px',
            color: '#bbf7d0',
            fontWeight: '900',
            fontFamily: "'Lilita One', sans-serif",
            fontSize: '14px',
            letterSpacing: '0.5px'
          }}>
            <span style={{ fontSize: '18px' }}>{recruitIcon}</span>
            <span>{recruitName}</span>
          </div>
        )}
      </div>

      <div className="bakery-truck-wrap" style={{ position: 'relative' }}>
        <div className="truck-bubble" style={{ position: 'absolute', top: '15px', left: '46px', width: '12px', height: '12px', background: '#e0f2fe', borderRadius: '50%' }} />
        <div className="truck-bubble" style={{ position: 'absolute', top: '5px', left: '52px', width: '16px', height: '16px', background: '#e0f2fe', borderRadius: '50%', animationDelay: '0.6s' }} />

        <svg width="290" height="150" viewBox="0 0 400 200">
          <circle cx="85" cy="175" r="20" fill="#1e293b" stroke="#0f172a" strokeWidth="4" />
          <circle cx="85" cy="175" r="9" fill="#f59e0b" />
          <circle cx="315" cy="175" r="20" fill="#1e293b" stroke="#0f172a" strokeWidth="4" />
          <circle cx="315" cy="175" r="9" fill="#f59e0b" />

          <rect x="42" y="30" width="18" height="50" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <ellipse cx="51" cy="30" rx="12" ry="5" fill="#f97316" stroke="#451a03" strokeWidth="2" />

          <rect x="35" y="55" width="330" height="115" rx="36" fill={isNight ? '#7c2d12' : '#ea580c'} stroke="#451a03" strokeWidth="5" />
          
          <circle cx="55" cy="72" r="3" fill="#fde047" />
          <circle cx="55" cy="148" r="3" fill="#fde047" />
          <circle cx="345" cy="72" r="3" fill="#fde047" />
          <circle cx="345" cy="148" r="3" fill="#fde047" />

          <circle cx="320" cy="105" r="26" fill="#38bdf8" stroke="#0284c7" strokeWidth="4" />
          <circle cx="320" cy="105" r="18" fill="#e0f2fe" opacity="0.6" />
          <line x1="308" y1="96" x2="332" y2="114" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

          <rect x="70" y="80" width="190" height="78" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
          <rect x="74" y="84" width="182" height="70" rx="6" fill={isNight ? '#38bdf8' : '#fef08a'} opacity="0.25" />

          <g transform="translate(100, 92)">
            <ellipse cx="28" cy="6" rx="18" ry="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="16" y="10" width="24" height="9" fill="#ffffff" />
            <ellipse cx="28" cy="28" rx="22" ry="15" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
            <circle cx="20" cy="22" r="3.5" fill="#000000" />
            <circle cx="36" cy="22" r="3.5" fill="#000000" />
            <path d="M 4 28 Q -8 18 2 10" stroke="#ef4444" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 52 28 Q 64 18 54 10" stroke="#ef4444" strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="52" y="4" width="4" height="20" rx="1" fill="#94a3b8" />
            <rect x="48" y="2" width="12" height="6" rx="1" fill="#cbd5e1" />
          </g>

          <rect x="65" y="150" width="202" height="12" rx="4" fill="#fed7aa" stroke="#c2410c" strokeWidth="2.5" />

          <g transform="translate(175, 142)">
            <ellipse cx="14" cy="6" rx="10" ry="4" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
            <circle cx="14" cy="2" r="3" fill="#ef4444" />
            <ellipse cx="44" cy="6" rx="10" ry="4" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
          </g>

          <g transform="translate(55, 38)">
            <path d="M 0 26 L 220 26 L 205 0 L 15 0 Z" fill="#ffffff" />
            <path d="M 0 26 L 36 26 L 30 0 L 15 0 Z" fill="#ef4444" />
            <path d="M 72 26 L 108 26 L 100 0 L 85 0 Z" fill="#ef4444" />
            <path d="M 144 26 L 180 26 L 170 0 L 155 0 Z" fill="#ef4444" />
            <circle cx="18" cy="28" r="7" fill="#ef4444" />
            <circle cx="54" cy="28" r="7" fill="#ffffff" />
            <circle cx="90" cy="28" r="7" fill="#ef4444" />
            <circle cx="126" cy="28" r="7" fill="#ffffff" />
            <circle cx="162" cy="28" r="7" fill="#ef4444" />
            <circle cx="198" cy="28" r="7" fill="#ffffff" />
          </g>

          <rect x="85" y="12" width="160" height="24" rx="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <text x="165" y="29" textAnchor="middle" fill="#78350f" fontSize="13" fontWeight="900" letterSpacing="1">
            CORAL CRUMB CRUISER
          </text>
        </svg>
      </div>
    </div>
  );
}
