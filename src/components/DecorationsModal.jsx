const REEF_DECORATIONS = [
  {
    id: 'disco_coral',
    name: 'Disco Coral Lamp',
    icon: '🪸',
    cost: 15,
    buff: '+1 Bonus Coin per drop for all singing jellies',
    desc: 'Vibrant bioluminescent coral branch that pulses in sync with the reef groove, boosting every creature’s coin yield.'
  },
  {
    id: 'neon_anemone',
    name: 'Neon Sea Anemone',
    icon: '🌸',
    cost: 18,
    buff: 'Passive Income: Automatically generates +2 🪙 every 30s',
    desc: 'A swaying neon anemone that catches drifting treasure particles from the ocean currents.'
  },
  {
    id: 'sunken_sub',
    name: 'Sunken Toy Submarine',
    icon: '🚢',
    cost: 25,
    buff: 'Sugar Rush Booster: +5s duration on all bakery treats',
    desc: 'An adorable yellow toy sub that fell off a tour boat. Your jellyfish love doing backflips around it.'
  },
  {
    id: 'crystal_obelisk',
    name: 'Sea Crystal Obelisk',
    icon: '💎',
    cost: 35,
    buff: 'Hatch Master: All hatched eggs get +1 Free Level!',
    desc: 'Ancient purple sea crystal imbued with natural resonance. Grants freshly hatched hybrid monsters instant power.'
  }
];

export default function DecorationsModal({
  isOpen,
  onClose,
  coins,
  ownedDecorations = [],
  onBuyDecoration
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 220,
        background: 'rgba(2, 6, 23, 0.82)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        userSelect: 'none',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="game-modal-frame"
        style={{
          background: 'linear-gradient(180deg, #022c22 0%, #0f172a 100%)',
          maxWidth: '740px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          color: '#ffffff',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cartoon Red Pop Close Button */}
        <button onClick={onClose} className="game-close-btn" title="Close Decorations Shop">
          ✕
        </button>

        {/* Header Bar */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '2px solid rgba(52, 211, 153, 0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.85)',
          borderRadius: '28px 28px 0 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '32px' }}>🪸</span>
            <div>
              <h2 style={{
                fontFamily: "'Lilita One', cursive, sans-serif",
                fontSize: '24px',
                letterSpacing: '0.5px',
                color: '#f0f9ff',
                textShadow: '0 2px 0 #059669'
              }}>
                SEAFLOOR DECORATIONS & MONUMENTS
              </h2>
              <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '700' }}>
                Place permanent structures on the ocean bed for massive passive coin boosts!
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginRight: '24px' }}>
            <div className="game-coin-badge" style={{ padding: '4px 14px', fontSize: '14px' }}>
              <span>🪙</span>
              <span>{coins}</span>
            </div>
          </div>
        </div>

        {/* Catalog List */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
          {REEF_DECORATIONS.map((item) => {
            const isOwned = ownedDecorations.includes(item.id);
            const canAfford = coins >= item.cost;

            return (
              <div
                key={item.id}
                style={{
                  background: isOwned ? 'rgba(6, 78, 59, 0.35)' : 'rgba(15, 23, 42, 0.7)',
                  border: isOwned ? '2px solid #10b981' : '1.5px solid rgba(71, 85, 105, 0.5)',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '240px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: isOwned ? 'linear-gradient(135deg, #10b981, #047857)' : 'rgba(30, 41, 59, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    boxShadow: isOwned ? '0 0 16px rgba(16, 185, 129, 0.4)' : 'none'
                  }}>
                    {item.icon}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#f0f9ff' }}>
                        {item.name}
                      </h3>
                      {isOwned && (
                        <span style={{ fontSize: '10px', background: '#059669', color: '#ffffff', padding: '2px 8px', borderRadius: '8px', fontWeight: '900' }}>
                          ✓ PLACED ON REEF
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#fde047', marginTop: '2px' }}>
                      ✨ BUFF: {item.buff}
                    </div>

                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', lineHeight: '1.4' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div>
                  {!isOwned ? (
                    <button
                      disabled={!canAfford}
                      onClick={() => onBuyDecoration(item.id, item.cost)}
                      className={`game-btn ${canAfford ? 'game-btn-green' : 'game-btn-stone'}`}
                      style={{
                        padding: '12px 24px',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {canAfford ? `BUY (${item.cost} 🪙)` : `NEED ${item.cost} 🪙`}
                    </button>
                  ) : (
                    <div style={{
                      padding: '8px 18px',
                      borderRadius: '16px',
                      background: 'rgba(16, 185, 129, 0.25)',
                      border: '2px solid #10b981',
                      color: '#6ee7b7',
                      fontWeight: '900',
                      fontFamily: "'Lilita One', sans-serif",
                      fontSize: '13px',
                      letterSpacing: '0.5px',
                      textAlign: 'center'
                    }}>
                      ⚡ ACTIVE
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
