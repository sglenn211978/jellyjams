import { useState } from 'react';
import { COLLECTIBLE_STICKERS } from '../constants/quests';

export default function QuestsModal({
  isOpen,
  onClose,
  quests = [],
  unlockedStickers = [],
  onClaimQuest,
  engineRef
}) {
  const [activeTab, setActiveTab] = useState('quests'); // 'quests' | 'stickers'
  const [wobbleStickerId, setWobbleStickerId] = useState(null);

  if (!isOpen) return null;

  const handleStickerTap = (stickerId) => {
    if (!unlockedStickers.includes(stickerId)) return;
    setWobbleStickerId(stickerId);
    engineRef?.current?.playStickerSlap?.();
    setTimeout(() => setWobbleStickerId(null), 300);
  };

  const completedCount = quests.filter(q => q.progress >= q.target).length;
  const claimableCount = quests.filter(q => q.progress >= q.target && !q.claimed).length;

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
          maxWidth: '780px',
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
        <button onClick={onClose} className="game-close-btn" title="Close Quests & Stickers">
          ✕
        </button>

        {/* Modal Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '2px solid rgba(250, 204, 21, 0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.9)',
          borderRadius: '28px 28px 0 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '36px' }}>⭐</span>
            <div>
              <h2 style={{
                fontFamily: "'Lilita One', cursive, sans-serif",
                fontSize: '26px',
                letterSpacing: '0.5px',
                color: '#fef08a',
                textShadow: '0 2px 0 #78350f'
              }}>
                HUDSON'S STAR QUESTS & STICKER ALBUM
              </h2>
              <div style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '800' }}>
                Complete daily musical tasks, earn gold coins, and collect shiny holographic stickers!
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
            onClick={() => setActiveTab('quests')}
            className={`game-btn ${activeTab === 'quests' ? 'game-btn-yellow' : 'game-btn-stone'}`}
            style={{
              padding: '10px 24px',
              fontSize: '15px',
              position: 'relative'
            }}
          >
            <span>🌟 Daily Star Quests ({completedCount}/{quests.length})</span>
            {claimableCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#ef4444',
                color: '#ffffff',
                fontSize: '11px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff',
                animation: 'bounceSoft 1s infinite'
              }}>
                !
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('stickers')}
            className={`game-btn ${activeTab === 'stickers' ? 'game-btn-purple' : 'game-btn-stone'}`}
            style={{
              padding: '10px 24px',
              fontSize: '15px'
            }}
          >
            <span>📒 Sticker Album ({unlockedStickers.length}/{COLLECTIBLE_STICKERS.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '22px 24px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'quests' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                background: 'rgba(250, 204, 21, 0.1)',
                border: '2px dashed #facc15',
                borderRadius: '18px',
                padding: '10px 18px',
                fontSize: '13px',
                color: '#fef08a',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '24px' }}>🎁</span>
                <span>Each completed quest awards <strong>Coins</strong>, <strong>Concert Fame XP</strong>, and unlocks a <strong>New Holographic Sticker</strong>!</span>
              </div>

              {quests.map((quest) => {
                const isReady = quest.progress >= quest.target;
                const isClaimed = quest.claimed;
                const progressPct = Math.min(100, Math.round((quest.progress / quest.target) * 100));

                return (
                  <div
                    key={quest.id}
                    style={{
                      background: isClaimed
                        ? 'rgba(15, 23, 42, 0.5)'
                        : isReady
                          ? 'linear-gradient(135deg, rgba(250, 204, 21, 0.2) 0%, rgba(30, 41, 59, 0.8) 100%)'
                          : 'rgba(15, 23, 42, 0.75)',
                      border: isReady && !isClaimed
                        ? '2.5px solid #facc15'
                        : isClaimed
                          ? '1.5px solid rgba(34, 197, 94, 0.4)'
                          : '1.5px solid rgba(71, 85, 105, 0.5)',
                      borderRadius: '20px',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      boxShadow: isReady && !isClaimed ? '0 0 18px rgba(250, 204, 21, 0.35)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '18px',
                        background: 'linear-gradient(135deg, #0284c7, #0f172a)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '30px',
                        border: '2px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                      }}>
                        {quest.icon}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h4 style={{
                            fontSize: '16px',
                            fontWeight: '900',
                            fontFamily: "'Fredoka', sans-serif",
                            color: '#f0f9ff'
                          }}>
                            {quest.title}
                          </h4>
                          <span style={{
                            background: 'rgba(250, 204, 21, 0.2)',
                            color: '#fef08a',
                            fontSize: '11px',
                            fontWeight: '900',
                            padding: '2px 8px',
                            borderRadius: '8px'
                          }}>
                            +{quest.rewardCoins} 🪙 • +{quest.rewardXP} XP
                          </span>
                        </div>

                        <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '3px 0 8px 0' }}>
                          {quest.desc}
                        </p>

                        {/* Progress Bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            flex: 1,
                            height: '10px',
                            background: '#090d16',
                            borderRadius: '9999px',
                            overflow: 'hidden',
                            border: '1.5px solid rgba(255,255,255,0.1)'
                          }}>
                            <div style={{
                              width: `${progressPct}%`,
                              height: '100%',
                              background: isReady ? 'linear-gradient(90deg, #4ade80, #22c55e)' : 'linear-gradient(90deg, #38bdf8, #0284c7)',
                              borderRadius: '9999px',
                              transition: 'width 0.3s ease'
                            }} />
                          </div>
                          <span style={{
                            fontFamily: "'Lilita One', sans-serif",
                            fontSize: '13px',
                            color: isReady ? '#86efac' : '#cbd5e1',
                            minWidth: '55px',
                            textAlign: 'right'
                          }}>
                            {quest.progress} / {quest.target}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div>
                      {isClaimed ? (
                        <div style={{
                          padding: '8px 16px',
                          borderRadius: '16px',
                          background: 'rgba(34, 197, 94, 0.2)',
                          border: '1.5px solid #22c55e',
                          color: '#86efac',
                          fontWeight: '900',
                          fontSize: '13px',
                          fontFamily: "'Lilita One', sans-serif"
                        }}>
                          ✓ CLAIMED
                        </div>
                      ) : isReady ? (
                        <button
                          onClick={() => onClaimQuest(quest.id)}
                          className="game-btn game-btn-yellow"
                          style={{
                            padding: '12px 22px',
                            fontSize: '14px',
                            animation: 'bankPulse 1.2s infinite'
                          }}
                        >
                          🎁 CLAIM!
                        </button>
                      ) : (
                        <div style={{
                          padding: '8px 14px',
                          borderRadius: '14px',
                          background: 'rgba(51, 65, 85, 0.4)',
                          color: '#94a3b8',
                          fontWeight: '800',
                          fontSize: '12px'
                        }}>
                          IN PROGRESS
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Sticker Album Grid */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(15, 23, 42, 0.8)',
                padding: '12px 18px',
                borderRadius: '18px',
                border: '1.5px solid rgba(168, 85, 247, 0.4)'
              }}>
                <span style={{ fontSize: '14px', fontWeight: '900', color: '#fef08a' }}>
                  ✨ Hudson's Collectible Sticker Album: {unlockedStickers.length} of {COLLECTIBLE_STICKERS.length} Pasted!
                </span>
                <span style={{ fontSize: '12px', color: '#cbd5e1' }}>
                  Tap unlocked stickers to hear them squeak!
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '14px'
              }}>
                {COLLECTIBLE_STICKERS.map((sticker) => {
                  const isUnlocked = unlockedStickers.includes(sticker.id);
                  const isWobbling = wobbleStickerId === sticker.id;

                  return (
                    <div
                      key={sticker.id}
                      onClick={() => handleStickerTap(sticker.id)}
                      className={isUnlocked ? 'sticker-album-card' : ''}
                      style={{
                        background: isUnlocked
                          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(30, 41, 59, 0.8) 100%)'
                          : 'rgba(15, 23, 42, 0.45)',
                        border: isUnlocked
                          ? `3px solid ${sticker.border}`
                          : '2px dashed rgba(71, 85, 105, 0.5)',
                        borderRadius: '20px',
                        padding: '16px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '8px',
                        cursor: isUnlocked ? 'pointer' : 'default',
                        boxShadow: isUnlocked ? `0 6px 16px ${sticker.color}33` : 'none',
                        transform: isWobbling ? 'scale(1.15) rotate(6deg)' : 'scale(1)',
                        transition: 'transform 0.15s ease'
                      }}
                    >
                      <div style={{
                        fontSize: '44px',
                        lineHeight: 1,
                        filter: isUnlocked ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))' : 'grayscale(100%) opacity(0.25)'
                      }}>
                        {isUnlocked ? sticker.emoji : '❓'}
                      </div>

                      <div style={{
                        fontFamily: "'Lilita One', cursive, sans-serif",
                        fontSize: '15px',
                        color: isUnlocked ? '#ffffff' : '#64748b',
                        letterSpacing: '0.5px'
                      }}>
                        {isUnlocked ? sticker.title : 'Locked Sticker'}
                      </div>

                      <div style={{
                        fontSize: '11px',
                        color: isUnlocked ? '#cbd5e1' : '#475569',
                        lineHeight: '1.3'
                      }}>
                        {isUnlocked ? sticker.desc : 'Earn from daily quests!'}
                      </div>

                      {isUnlocked && (
                        <span style={{
                          background: sticker.border,
                          color: '#ffffff',
                          fontSize: '10px',
                          fontWeight: '900',
                          padding: '2px 8px',
                          borderRadius: '8px',
                          marginTop: 'auto'
                        }}>
                          ★ COLLECTED
                        </span>
                      )}
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
