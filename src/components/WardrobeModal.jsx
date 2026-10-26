import { useState } from 'react';
import { JELLY_SPECIES } from '../constants/jellies';
import { REEF_UNIFORMS, calculateSquadSynergy } from '../constants/uniforms';

export default function WardrobeModal({
  isOpen,
  onClose,
  coins,
  ownedCostumes = [],
  equippedCostumes = {},
  performers,
  onBuyCostume,
  onEquipCostume,
  onEquipAllCostume
}) {
  const [selectedCostumeId, setSelectedCostumeId] = useState('pirate');

  if (!isOpen) return null;

  const currentCostume = REEF_UNIFORMS.find(c => c.id === selectedCostumeId) || REEF_UNIFORMS[0];
  const isOwned = ownedCostumes.includes(currentCostume.id);
  const canAfford = coins >= currentCostume.cost;
  const unlockedPerformers = Object.values(JELLY_SPECIES).filter(s => performers[s.id]?.unlocked);
  const activeSynergy = calculateSquadSynergy(equippedCostumes);

  const handleEquipAll = () => {
    onEquipAllCostume?.(currentCostume.id);
  };

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
          background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)',
          maxWidth: '840px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          color: '#ffffff',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cartoon Red Pop Close Button */}
        <button onClick={onClose} className="game-close-btn" title="Close Boutique">
          ✕
        </button>

        {/* Header Bar */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '2px solid rgba(244, 114, 182, 0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.85)',
          borderRadius: '28px 28px 0 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '36px' }}>🎩</span>
            <div>
              <h2 style={{
                fontFamily: "'Lilita One', cursive, sans-serif",
                fontSize: '26px',
                letterSpacing: '0.5px',
                color: '#f0f9ff',
                textShadow: '0 2px 0 #db2777'
              }}>
                REEF BOUTIQUE & BAND UNIFORMS
              </h2>
              <div style={{ fontSize: '13.5px', color: '#94a3b8', fontWeight: '800' }}>
                Dress your choir in matching squad uniforms for massive concert set bonuses!
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginRight: '24px' }}>
            <div className="game-coin-badge" style={{ padding: '6px 16px', fontSize: '15px' }}>
              <span>🪙</span>
              <span>{coins}</span>
            </div>
          </div>
        </div>

        {/* Squad Synergy Alert Banner */}
        {activeSynergy.active ? (
          <div style={{
            background: 'linear-gradient(90deg, #7e22ce 0%, #ec4899 100%)',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #090d16',
            boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '22px' }}>{activeSynergy.icon}</span>
              <div>
                <span style={{ fontFamily: "'Lilita One', sans-serif", fontSize: '14px', color: '#fef08a', letterSpacing: '0.5px' }}>
                  ACTIVE SQUAD: {activeSynergy.themeName.toUpperCase()} ({activeSynergy.count}x MATCHING)!
                </span>
                <span style={{ fontSize: '12px', color: '#ffffff', marginLeft: '8px', fontWeight: '800' }}>
                  • {activeSynergy.bonusText}
                </span>
              </div>
            </div>
            <span style={{ background: '#090d16', color: '#facc15', fontSize: '11px', fontWeight: '900', padding: '3px 10px', borderRadius: '12px' }}>
              ⚡ SQUAD BOOST ON
            </span>
          </div>
        ) : (
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '7px 24px',
            fontSize: '12.5px',
            color: '#cbd5e1',
            borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>💡 <strong>Kid Tip:</strong> Dress 2 or more members in the same uniform to unlock a <strong>Band Squad Set Bonus</strong>!</span>
          </div>
        )}

        {/* Content Body */}
        <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '1.05fr 1.35fr', gap: '20px', overflowY: 'auto' }}>
          {/* Left Column: Uniform Catalog */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '13px', fontWeight: '900', color: '#cbd5e1', letterSpacing: '0.5px' }}>
              UNIFORM COLLECTION ({ownedCostumes.length}/{REEF_UNIFORMS.length} OWNED)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
              {REEF_UNIFORMS.map(item => {
                const owned = ownedCostumes.includes(item.id);
                const isSelected = selectedCostumeId === item.id;
                // Count how many performers currently wearing this
                const wearingCount = Object.values(equippedCostumes).filter(id => id === item.id).length;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCostumeId(item.id)}
                    style={{
                      background: isSelected
                        ? 'linear-gradient(90deg, rgba(236, 72, 153, 0.3) 0%, rgba(168, 85, 247, 0.25) 100%)'
                        : owned
                          ? 'rgba(30, 41, 59, 0.8)'
                          : 'rgba(15, 23, 42, 0.55)',
                      border: isSelected
                        ? '2.5px solid #ec4899'
                        : owned
                          ? '1.5px solid rgba(71, 85, 105, 0.6)'
                          : '1px solid rgba(51, 65, 85, 0.4)',
                      borderRadius: '18px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 0 14px rgba(236, 72, 153, 0.4)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '28px' }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '900', fontFamily: "'Fredoka', sans-serif", color: '#f0f9ff' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '11.5px', color: owned ? '#86efac' : '#fde047', fontWeight: '800' }}>
                          {owned ? (wearingCount > 0 ? `✓ WORN BY ${wearingCount}` : '✓ IN CLOSET') : `${item.cost} 🪙`}
                        </div>
                      </div>
                    </div>

                    {wearingCount >= 2 && (
                      <span style={{ fontSize: '11px', background: '#ec4899', color: '#ffffff', padding: '3px 8px', borderRadius: '10px', fontWeight: '900' }}>
                        ⭐ SQUAD x{wearingCount}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Uniform Details & Squad Dresser */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.85)',
            border: '2px solid rgba(244, 114, 182, 0.4)',
            borderRadius: '24px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '22px',
                background: 'linear-gradient(135deg, #f472b6, #db2777)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '38px',
                boxShadow: '0 8px 22px rgba(244, 114, 182, 0.45)',
                border: '2.5px solid #ffffff'
              }}>
                {currentCostume.icon}
              </div>

              <div>
                <h3 style={{ fontSize: '22px', fontWeight: '900', fontFamily: "'Lilita One', cursive, sans-serif", color: '#f0f9ff', letterSpacing: '0.5px' }}>
                  {currentCostume.name}
                </h3>
                <div style={{ fontSize: '13px', color: '#fde047', fontWeight: '900', marginTop: '2px' }}>
                  Price: {currentCostume.cost} Coins {isOwned && '• (Purchased)'}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.45', margin: 0 }}>
              {currentCostume.desc}
            </p>

            {/* Squad Set Bonus Highlight Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.2) 100%)',
              border: '2px solid #ec4899',
              borderRadius: '16px',
              padding: '10px 14px'
            }}>
              <div style={{ fontSize: '12px', fontWeight: '900', color: '#f472b6', letterSpacing: '0.5px' }}>
                ⭐ SQUAD THEME: {currentCostume.themeName.toUpperCase()}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#fef08a', marginTop: '2px' }}>
                {currentCostume.squadBonus}
              </div>
            </div>

            {/* Action Section */}
            {!isOwned ? (
              <div style={{ marginTop: 'auto' }}>
                <button
                  disabled={!canAfford}
                  onClick={() => onBuyCostume(currentCostume.id, currentCostume.cost)}
                  className={`game-btn ${canAfford ? 'game-btn-pink' : 'game-btn-stone'}`}
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '16px'
                  }}
                >
                  {canAfford ? `🛍️ BUY ${currentCostume.name.toUpperCase()} (${currentCostume.cost} 🪙)` : `🔒 NEED ${currentCostume.cost} 🪙 (Have ${coins})`}
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* 1-Click Dress Entire Band Button */}
                <button
                  onClick={handleEquipAll}
                  className="game-btn game-btn-yellow"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '15px',
                    animation: 'wiggle 4s ease-in-out infinite'
                  }}
                  title="Dress every member of your band in this matching uniform!"
                >
                  <span>👗 DRESS WHOLE BAND IN THIS OUTFIT!</span>
                </button>

                <div style={{ fontSize: '13px', fontWeight: '900', color: '#f0f9ff', marginTop: '4px', letterSpacing: '0.5px' }}>
                  OR EQUIP INDIVIDUAL CREATURES:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                  {unlockedPerformers.map(spec => {
                    const isEquipped = equippedCostumes[spec.id] === currentCostume.id;

                    return (
                      <button
                        key={spec.id}
                        onClick={() => onEquipCostume(spec.id, isEquipped ? null : currentCostume.id)}
                        className={`game-btn ${isEquipped ? 'game-btn-green' : 'game-btn-stone'}`}
                        style={{
                          padding: '9px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '13px'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '20px' }}>{spec.icon}</span>
                          <span>{spec.name.replace('Floaty ', '')}</span>
                        </span>
                        <span style={{ fontWeight: '900' }}>{isEquipped ? '✓ ON' : '+ WEAR'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
