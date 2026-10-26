import { ISLANDS } from '../constants/islands';

export default function IslandMapModal({
  isOpen,
  onClose,
  currentIsland,
  unlockedIslands = ['lagoon'],
  coins,
  islandPerformers = {},
  onSelectIsland,
  onUnlockIsland
}) {
  if (!isOpen) return null;

  const islandList = Object.values(ISLANDS);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 220,
        background: 'rgba(2, 6, 23, 0.85)',
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
          background: 'linear-gradient(180deg, #09172e 0%, #030a16 100%)',
          maxWidth: '880px',
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
        <button onClick={onClose} className="game-close-btn" title="Close Map">
          ✕
        </button>

        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '2px solid rgba(56, 189, 248, 0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.9)',
          borderRadius: '28px 28px 0 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '32px' }}>🗺️</span>
            <div>
              <div style={{
                fontFamily: "'Lilita One', sans-serif",
                fontSize: '24px',
                color: '#f0f9ff',
                letterSpacing: '1px',
                textShadow: '0 2px 0 #0284c7'
              }}>
                REEF ARCHIPELAGO
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '700' }}>
                Travel between distinct musical ocean habitats & discover unique monsters
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

        {/* Island Cards Carousel Grid */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {islandList.map((island) => {
            const isUnlocked = unlockedIslands.includes(island.id);
            const isCurrent = currentIsland === island.id;
            const canAfford = coins >= island.unlockCost;

            // Count unlocked performers on this island
            const performersDict = islandPerformers[island.id] || island.defaultPerformers;
            const unlockedCount = Object.values(performersDict).filter(p => p.unlocked).length;
            const totalCount = island.species.length;

            return (
              <div
                key={island.id}
                style={{
                  background: isCurrent
                    ? 'rgba(56, 189, 248, 0.12)'
                    : 'rgba(15, 23, 42, 0.65)',
                  border: isCurrent
                    ? `2.5px solid ${island.accentColor}`
                    : isUnlocked
                      ? '1.5px solid rgba(148, 163, 184, 0.3)'
                      : '1.5px dashed rgba(100, 116, 139, 0.4)',
                  borderRadius: '24px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: isCurrent ? `0 8px 24px ${island.accentColor}33` : '0 4px 12px rgba(0,0,0,0.3)',
                  opacity: !isUnlocked && !canAfford ? 0.75 : 1,
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                {/* Island Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '18px',
                    background: `${island.accentColor}22`,
                    border: `1.5px solid ${island.accentColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px'
                  }}>
                    {island.icon}
                  </div>

                  <div style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '900',
                    background: isCurrent
                      ? island.accentColor
                      : isUnlocked
                        ? 'rgba(34, 197, 94, 0.2)'
                        : 'rgba(239, 68, 68, 0.2)',
                    color: isCurrent
                      ? '#0f172a'
                      : isUnlocked
                        ? '#86efac'
                        : '#fca5a5',
                    border: `1px solid ${isCurrent ? island.accentColor : isUnlocked ? '#4ade80' : '#f87171'}`
                  }}>
                    {isCurrent ? '⭐ CURRENT REEF' : isUnlocked ? 'ACTIVE' : `LOCKED (${island.unlockCost} 🪙)`}
                  </div>
                </div>

                <div>
                  <div style={{ 
                    fontFamily: "'Lilita One', cursive, sans-serif",
                    fontSize: '22px', 
                    fontWeight: '900', 
                    color: '#f8fafc',
                    letterSpacing: '0.5px'
                  }}>
                    {island.name}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: '900', color: island.accentColor, letterSpacing: '0.5px', marginTop: '2px' }}>
                    {island.badge} • {island.bpm} BPM
                  </div>
                </div>

                <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.45', minHeight: '52px' }}>
                  {island.description}
                </div>

                {/* Population and Species Tracker */}
                <div style={{
                  background: 'rgba(2, 6, 23, 0.6)',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '13px'
                }}>
                  <span style={{ color: '#cbd5e1', fontWeight: '800' }}>Singing Choir:</span>
                  <span style={{ fontWeight: '900', color: '#fef08a', fontSize: '15px', fontFamily: "'Lilita One', sans-serif" }}>
                    {unlockedCount} / {totalCount} Monsters
                  </span>
                </div>

                {/* Action Button */}
                <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                  {isCurrent ? (
                    <button
                      disabled
                      className="game-btn game-btn-stone"
                      style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '15px'
                      }}
                    >
                      ⭐ CURRENT ISLAND
                    </button>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => onSelectIsland(island.id)}
                      className="game-btn game-btn-cyan"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        fontSize: '15.5px'
                      }}
                    >
                      🚢 DIVE & TRAVEL HERE
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnlockIsland(island.id, island.unlockCost)}
                      disabled={!canAfford}
                      className={`game-btn ${canAfford ? 'game-btn-yellow' : 'game-btn-stone'}`}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        fontSize: '15.5px'
                      }}
                    >
                      {canAfford ? `🔓 UNLOCK REEF (${island.unlockCost} 🪙)` : `NEED ${island.unlockCost} 🪙`}
                    </button>
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
