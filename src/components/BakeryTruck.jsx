import { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

  const isUnlocked = recruitUnlocked !== undefined ? recruitUnlocked : bobUnlocked;
  const handleRecruit = onRecruit || onUnlockBob;
  const canAffordRecruit = coins >= 15;
  const canAffordCupcake = coins >= 5 && !activeTreat;
  const canAffordDonut = coins >= 12 && !activeTreat;

  const handleBuy = (type, cost) => {
    onBuyTreat(type, cost);
    setIsOpen(false);
  };

  return (
    <>
      {/* Compact Seafloor Bakery Station Dock — Zero Stage Clutter! */}
      <div className="seafloor-truck-container" style={{ userSelect: 'none' }}>
        <button
          onClick={() => setIsOpen(true)}
          className="game-btn game-btn-yellow"
          style={{
            padding: '10px 18px',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 6px 0 #090d16, 0 10px 20px rgba(0,0,0,0.5)',
            border: '3.5px solid #090d16',
            cursor: 'pointer'
          }}
          title="Open Coral Crumb Cruiser Bakery & Treats Shop!"
        >
          <span style={{ fontSize: '28px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>🧁</span>
          <div style={{ textAlign: 'left', lineHeight: '1.15' }}>
            <div style={{ fontSize: '15px', fontWeight: '900', letterSpacing: '0.5px' }}>BAKERY & SHOP</div>
            <div style={{ 
              fontSize: '11px', 
              fontWeight: '800', 
              color: '#78350f',
              background: '#fef08a',
              padding: '1px 6px',
              borderRadius: '6px',
              marginTop: '2px',
              display: 'inline-block'
            }}>
              TREATS • HATS • RELICS
            </div>
          </div>
        </button>
      </div>

      {/* Full Coral Crumb Cruiser Bakery Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 250,
            background: 'rgba(2, 6, 23, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            userSelect: 'none',
            padding: '16px'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="game-modal-frame"
            style={{
              background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '92vh',
              display: 'flex',
              flexDirection: 'column',
              color: '#ffffff',
              position: 'relative',
              borderRadius: '28px',
              border: '4px solid #090d16',
              boxShadow: '0 12px 32px rgba(0,0,0,0.8)',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '4px solid #090d16'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '28px' }}>🧁</span>
                <div>
                  <h2 style={{
                    margin: 0,
                    fontSize: '20px',
                    fontWeight: '900',
                    fontFamily: "'Fredoka', 'Lilita One', sans-serif",
                    color: '#ffffff',
                    letterSpacing: '0.8px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    CORAL CRUMB CRUISER
                  </h2>
                  <div style={{ fontSize: '12px', color: '#fef08a', fontWeight: '800' }}>
                    Sweet Treats & Island Bakery
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '15px',
                  fontWeight: '900',
                  color: '#fef08a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>🪙</span>
                  <span>{coins} Coins</span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="game-modal-close"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    border: '3px solid #090d16',
                    color: '#ffffff',
                    fontSize: '18px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 3px 0 #090d16'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Bakery Truck Cartoon Illustration */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="bakery-truck-wrap" style={{ position: 'relative' }}>
                  <svg width="260" height="130" viewBox="0 0 400 200">
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
                      CHEF CRAB'S BAKERY
                    </text>
                  </svg>
                </div>
              </div>

              {/* Treat Cards Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                
                {/* Kelp Cake Card */}
                <div style={{
                  background: 'linear-gradient(180deg, #334155 0%, #1e293b 100%)',
                  padding: '16px',
                  borderRadius: '20px',
                  border: '3px solid #090d16',
                  boxShadow: '0 5px 0 #090d16',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '42px' }}>🧁</span>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: '#fef08a' }}>KELP CAKE</div>
                  <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.3' }}>
                    +1 Monster Level & 15s Sugar Rush! (3x Coins)
                  </div>
                  <button
                    onClick={() => handleBuy('cupcake', 5)}
                    disabled={!canAffordCupcake}
                    className={`game-btn ${canAffordCupcake ? 'game-btn-yellow' : 'game-btn-stone'}`}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      fontSize: '15px',
                      marginTop: '6px'
                    }}
                  >
                    <span>BUY CAKE</span>
                    <span style={{
                      background: 'rgba(0,0,0,0.4)',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      fontSize: '13px'
                    }}>5 🪙</span>
                  </button>
                </div>

                {/* Coral Donut Card */}
                <div style={{
                  background: 'linear-gradient(180deg, #334155 0%, #1e293b 100%)',
                  padding: '16px',
                  borderRadius: '20px',
                  border: '3px solid #090d16',
                  boxShadow: '0 5px 0 #090d16',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '42px' }}>🍩</span>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: '#f472b6' }}>CORAL DONUT</div>
                  <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.3' }}>
                    +2 Monster Levels & 20s Super Rush!
                  </div>
                  <button
                    onClick={() => handleBuy('donut', 12)}
                    disabled={!canAffordDonut}
                    className={`game-btn ${canAffordDonut ? 'game-btn-pink' : 'game-btn-stone'}`}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      fontSize: '15px',
                      marginTop: '6px'
                    }}
                  >
                    <span>BUY DONUT</span>
                    <span style={{
                      background: 'rgba(0,0,0,0.4)',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      fontSize: '13px'
                    }}>12 🪙</span>
                  </button>
                </div>
              </div>

              {/* Other Island Shops Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: !isUnlocked ? '1fr 1fr 1fr' : '1fr 1fr',
                gap: '10px',
                marginTop: '4px'
              }}>
                <button
                  onClick={() => { setIsOpen(false); onOpenWardrobe?.(); }}
                  className="game-btn game-btn-purple"
                  style={{ padding: '12px 14px', fontSize: '14px', borderRadius: '18px' }}
                >
                  <span style={{ fontSize: '20px' }}>🎩</span>
                  <span>WARDROBE</span>
                </button>

                <button
                  onClick={() => { setIsOpen(false); onOpenDecorations?.(); }}
                  className="game-btn game-btn-green"
                  style={{ padding: '12px 14px', fontSize: '14px', borderRadius: '18px' }}
                >
                  <span style={{ fontSize: '20px' }}>🪸</span>
                  <span>RELICS</span>
                </button>

                {!isUnlocked && (
                  <button
                    onClick={() => { handleRecruit?.(); setIsOpen(false); }}
                    disabled={!canAffordRecruit}
                    className={`game-btn ${canAffordRecruit ? 'game-btn-cyan' : 'game-btn-stone'}`}
                    style={{ padding: '12px 14px', fontSize: '14px', borderRadius: '18px' }}
                  >
                    <span style={{ fontSize: '20px' }}>{recruitIcon}</span>
                    <span>RECRUIT ({recruitName})</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
