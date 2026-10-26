import { useState } from 'react';
import { JELLY_SPECIES } from '../constants/jellies';

export default function JellyDexModal({ isOpen, onClose, performers, totalBreedsCount = 0 }) {
  const [activeTab, setActiveTab] = useState('almanac'); // 'almanac' | 'recipes'
  const [selectedSpeciesId, setSelectedSpeciesId] = useState('diva');

  if (!isOpen) return null;

  const speciesList = Object.values(JELLY_SPECIES);
  const totalDiscovered = speciesList.filter(s => performers[s.id]?.unlocked).length;
  const selectedSpecies = JELLY_SPECIES[selectedSpeciesId] || speciesList[0];
  const isSelectedUnlocked = performers[selectedSpecies.id]?.unlocked;
  const selectedLevel = performers[selectedSpecies.id]?.level || 1;

  const recipes = [
    // 🪸 Coral Lagoon
    { island: 'Coral Lagoon', parent1: 'diva', parent2: 'zap', result: 'siren' },
    { island: 'Coral Lagoon', parent1: 'zap', parent2: 'bob', result: 'sparkpuff' },
    { island: 'Coral Lagoon', parent1: 'diva', parent2: 'bob', result: 'queen' },
    { island: 'Coral Lagoon', parent1: 'siren', parent2: 'sparkpuff', result: 'starlight', note: 'Any Hybrid + Hybrid' },
    // 🌋 Magma Trench
    { island: 'Magma Trench', parent1: 'magma', parent2: 'angler', result: 'obsidian' },
    { island: 'Magma Trench', parent1: 'magma', parent2: 'vent', result: 'pyre' },
    // 🫧 Bioluminescent Caverns
    { island: 'Caverns', parent1: 'crystal_bell', parent2: 'lofi_spore', result: 'prism_bloom' },
    { island: 'Caverns', parent1: 'lofi_spore', parent2: 'nautilus', result: 'lapis_groove' },
  ];

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
          background: 'linear-gradient(180deg, #09172e 0%, #030a16 100%)',
          maxWidth: '820px',
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
        <button onClick={onClose} className="game-close-btn" title="Close Almanac">
          ✕
        </button>

        {/* Header Bar */}
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
            <span style={{ fontSize: '32px' }}>📖</span>
            <div>
              <h2 style={{
                fontFamily: "'Lilita One', cursive, sans-serif",
                fontSize: '24px',
                letterSpacing: '0.5px',
                color: '#f0f9ff',
                textShadow: '0 2px 0 #0284c7'
              }}>
                REEF ALMANAC & JELLY DEX
              </h2>
              <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '700' }}>
                Discovered: <span style={{ color: '#fde047', fontWeight: '900' }}>{totalDiscovered} / {speciesList.length} Species</span> • Eggs Hatched: <span style={{ color: '#38bdf8', fontWeight: '900' }}>{totalBreedsCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '12px',
          padding: '12px 24px',
          borderBottom: '2px solid #090d16',
          background: 'rgba(2, 6, 23, 0.5)'
        }}>
          <button
            onClick={() => setActiveTab('almanac')}
            className={`game-btn ${activeTab === 'almanac' ? 'game-btn-cyan' : 'game-btn-stone'}`}
            style={{
              padding: '10px 24px',
              fontSize: '15px'
            }}
          >
            📖 Species Catalog
          </button>

          <button
            onClick={() => setActiveTab('recipes')}
            className={`game-btn ${activeTab === 'recipes' ? 'game-btn-purple' : 'game-btn-stone'}`}
            style={{
              padding: '10px 24px',
              fontSize: '15px'
            }}
          >
            🧬 Breeding Lab Recipes
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'almanac' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '20px' }}>
              {/* Left Column: Species Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '12px',
                alignContent: 'start'
              }}>
                {speciesList.map((spec) => {
                  const unlocked = performers[spec.id]?.unlocked;
                  const isSelected = selectedSpeciesId === spec.id;
                  const level = performers[spec.id]?.level || 1;

                  return (
                    <div
                      key={spec.id}
                      onClick={() => setSelectedSpeciesId(spec.id)}
                      style={{
                        background: isSelected
                          ? 'rgba(56, 189, 248, 0.2)'
                          : unlocked
                            ? 'rgba(30, 41, 59, 0.7)'
                            : 'rgba(15, 23, 42, 0.5)',
                        border: isSelected
                          ? '2px solid #38bdf8'
                          : unlocked
                            ? '1.5px solid rgba(71, 85, 105, 0.6)'
                            : '1.5px dashed rgba(51, 65, 85, 0.5)',
                        borderRadius: '18px',
                        padding: '12px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease, border-color 0.15s ease',
                        transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                        boxShadow: isSelected ? '0 0 16px rgba(56, 189, 248, 0.3)' : 'none'
                      }}
                    >
                      <div style={{
                        fontSize: '36px',
                        filter: unlocked ? 'none' : 'grayscale(100%) opacity(0.35)',
                        lineHeight: 1
                      }}>
                        {unlocked ? spec.icon : '❓'}
                      </div>

                      <div style={{
                        fontSize: '14px',
                        fontWeight: '900',
                        fontFamily: "'Fredoka', sans-serif",
                        textAlign: 'center',
                        color: unlocked ? '#f0f9ff' : '#64748b',
                        letterSpacing: '0.3px'
                      }}>
                        {unlocked ? spec.name : 'Unknown'}
                      </div>

                      {unlocked ? (
                        <div style={{
                          fontSize: '11.5px',
                          background: level >= 5 ? '#f59e0b' : '#334155',
                          color: level >= 5 ? '#78350f' : '#cbd5e1',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontWeight: '900',
                          fontFamily: "'Lilita One', sans-serif"
                        }}>
                          {level >= 5 ? '⭐ Lv.5' : `Lv.${level}`}
                        </div>
                      ) : (
                        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '800' }}>
                          🔒 Locked
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Selected Species Detail Dossier */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1.5px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '24px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '20px',
                    background: isSelectedUnlocked ? selectedSpecies.colorScheme : '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '34px',
                    boxShadow: isSelectedUnlocked ? `0 0 20px ${selectedSpecies.colorScheme}88` : 'none'
                  }}>
                    {isSelectedUnlocked ? selectedSpecies.icon : '❓'}
                  </div>

                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '900', color: isSelectedUnlocked ? '#f0f9ff' : '#94a3b8' }}>
                      {isSelectedUnlocked ? selectedSpecies.name : 'Undiscovered Species'}
                    </h3>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
                      <span style={{
                        background: 'rgba(56, 189, 248, 0.2)',
                        color: '#7dd3fc',
                        padding: '2px 8px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '800'
                      }}>
                        {selectedSpecies.element}
                      </span>
                      <span style={{
                        background: 'rgba(168, 85, 247, 0.2)',
                        color: '#c084fc',
                        padding: '2px 8px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '800'
                      }}>
                        {selectedSpecies.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {isSelectedUnlocked ? (
                  <>
                    {/* Stats Pill Row */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                      background: 'rgba(2, 6, 23, 0.6)',
                      padding: '12px',
                      borderRadius: '16px',
                      border: '1px solid rgba(51, 65, 85, 0.6)'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800' }}>CREATURE LEVEL</div>
                        <div style={{ fontSize: '16px', fontWeight: '900', color: '#fde047' }}>
                          {selectedLevel >= 5 ? '⭐ Max Lv.5' : `Level ${selectedLevel}`}
                        </div>
                      </div>

                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800' }}>COIN RATE</div>
                        <div style={{ fontSize: '16px', fontWeight: '900', color: '#86efac' }}>
                          +{selectedLevel} 🪙 / drop
                        </div>
                      </div>

                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800' }}>SUGAR DROP</div>
                        <div style={{ fontSize: '16px', fontWeight: '900', color: '#ec4899' }}>
                          +{selectedLevel * 3} 🪙
                        </div>
                      </div>
                    </div>

                    {/* Bio Lore */}
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '900', color: '#cbd5e1', marginBottom: '4px' }}>
                        📜 SPECIES BIOGRAPHY
                      </div>
                      <p style={{ fontSize: '13px', lineHeight: '1.5', color: '#94a3b8' }}>
                        {selectedSpecies.bio}
                      </p>
                    </div>

                    {/* Origin / Breeding Note */}
                    <div style={{
                      background: 'rgba(30, 41, 59, 0.5)',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1px solid rgba(51, 65, 85, 0.5)',
                      fontSize: '12px',
                      color: '#cbd5e1'
                    }}>
                      <span style={{ fontWeight: '900', color: '#38bdf8' }}>How To Get: </span>
                      {selectedSpecies.breedingHint}
                    </div>
                  </>
                ) : (
                  <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{ fontSize: '42px' }}>🔒</div>
                    <div style={{ fontSize: '16px', fontWeight: '900', color: '#fde047' }}>
                      SPECIES NOT YET DISCOVERED
                    </div>
                    <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', maxWidth: '340px' }}>
                      This elusive jellyfish has not joined your reef concert yet! Follow the recipe hint below to breed it in the Coral Remix Pod.
                    </p>
                    <div style={{
                      background: 'rgba(168, 85, 247, 0.2)',
                      border: '1.5px dashed #c084fc',
                      padding: '12px 18px',
                      borderRadius: '16px',
                      color: '#e9d5ff',
                      fontWeight: '800',
                      fontSize: '13px'
                    }}>
                      🔮 Discovery Hint: {selectedSpecies.breedingHint}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Tab 2: Breeding Lab Recipes */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.8)',
                padding: '14px 18px',
                borderRadius: '18px',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                fontSize: '13px',
                color: '#cbd5e1',
                lineHeight: '1.4'
              }}>
                <span style={{ fontWeight: '900', color: '#fde047' }}>🧬 Coral Remix Lab Guide: </span>
                Select two unlocked performers to incubate an egg in the Coral Remix Pod (10 🪙). Tap the egg 3 times when it finishes to crack open your creation! If you already have that creature, it will trigger an instant <strong>Duplicate Level-Up Fusion</strong>!
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {recipes.map((rec, i) => {
                  const p1 = JELLY_SPECIES[rec.parent1];
                  const p2 = JELLY_SPECIES[rec.parent2];
                  const res = JELLY_SPECIES[rec.result];
                  const isDiscovered = performers[rec.result]?.unlocked;

                  return (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(15, 23, 42, 0.7)',
                        border: isDiscovered ? '1.5px solid rgba(34, 197, 94, 0.5)' : '1.5px solid rgba(71, 85, 105, 0.4)',
                        borderRadius: '20px',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Parent 1 */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '22px' }}>{p1?.icon}</span>
                          <span style={{ fontSize: '13px', fontWeight: '900', color: '#f0f9ff' }}>{p1?.name}</span>
                        </div>

                        <span style={{ color: '#a855f7', fontWeight: '900', fontSize: '16px' }}>+</span>

                        {/* Parent 2 */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '22px' }}>{p2?.icon}</span>
                          <span style={{ fontSize: '13px', fontWeight: '900', color: '#f0f9ff' }}>{p2?.name}</span>
                        </div>

                        <span style={{ color: '#38bdf8', fontWeight: '900', fontSize: '18px' }}>➔</span>

                        {/* Offspring Result */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '24px' }}>{isDiscovered ? res?.icon : '❓'}</span>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '900', color: isDiscovered ? '#fef08a' : '#94a3b8' }}>
                              {isDiscovered ? res?.name : '??? (Secret Hybrid)'}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>
                              {rec.note || res?.element}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Discovery Badge */}
                      <div style={{
                        background: isDiscovered ? 'rgba(34, 197, 94, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                        border: isDiscovered ? '1px solid #22c55e' : '1px solid #64748b',
                        color: isDiscovered ? '#86efac' : '#94a3b8',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: '900',
                        fontSize: '11px'
                      }}>
                        {isDiscovered ? '✅ DISCOVERED' : '🔒 UNDISCOVERED'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
