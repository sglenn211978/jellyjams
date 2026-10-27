import React from 'react';

/**
 * MonsterActionTray - My Singing Monsters style chunky cartoon action tray.
 * Only appears when a monster is selected.
 * Contains large 3D cartoon touch buttons for Mute/Sing, Feed (Level Up), Solo, Volume, and Close.
 */
export default function MonsterActionTray({
  monsterId,
  monster,
  volume = 1.0,
  isSoloed = false,
  coins = 0,
  onToggleSleep,
  onFeed,
  onCycleVolume,
  onToggleSolo,
  onClose
}) {
  if (!monsterId || !monster) return null;

  const isSleeping = Boolean(monster.isSleeping);
  const isSinging = !isSleeping;
  const level = monster.level || 1;
  const isMaxLevel = level >= 5;
  const volPct = Math.round((volume ?? 1.0) * 100);
  const canAffordCupcake = coins >= 5;
  const canAffordDonut = coins >= 12;

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="monster-action-tray-container"
      onClick={handleContainerClick}
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 120,
        width: 'min(94vw, 680px)',
        userSelect: 'none',
        pointerEvents: 'auto',
        animation: 'actionTraySlideUp 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {/* Carved Stone / Coral Base Tray */}
      <div
        style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '28px',
          border: '4px solid #090d16',
          boxShadow: '0 8px 0 #090d16, 0 16px 36px rgba(0, 0, 0, 0.75), inset 0 2px 0 rgba(255,255,255,0.25)',
          padding: '14px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {/* Top Header: Monster Badge & Identity */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2.5px solid rgba(255, 255, 255, 0.12)',
            paddingBottom: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Runic Stone Pebble Icon */}
            <img 
              src="/assets/art/stone_pebble_button.png" 
              alt="Rune" 
              style={{
                width: '32px',
                height: '32px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
              }}
            />

            {/* Level Star Badge */}
            <span
              style={{
                background: isMaxLevel
                  ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                  : 'linear-gradient(135deg, #38bdf8, #0284c7)',
                color: '#ffffff',
                fontFamily: "'Lilita One', 'Fredoka', cursive",
                fontSize: '14px',
                fontWeight: '900',
                padding: '4px 10px',
                borderRadius: '14px',
                border: '2.5px solid #090d16',
                boxShadow: '0 3px 0 #090d16',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                letterSpacing: '0.5px'
              }}
            >
              ⭐ {isMaxLevel ? 'MAX' : `Lv.${level}`}
            </span>

            {/* Monster Name */}
            <span
              style={{
                fontFamily: "'Lilita One', 'Fredoka', cursive",
                fontSize: '18px',
                fontWeight: '900',
                color: '#ffffff',
                letterSpacing: '0.8px',
                paintOrder: 'stroke fill',
                WebkitTextStroke: '2.5px #090d16',
                textShadow: '0 2px 0 #090d16'
              }}
            >
              {monster.name || monsterId.toUpperCase()}
            </span>

            {/* Status Pill */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: '900',
                padding: '3px 8px',
                borderRadius: '10px',
                background: isSinging ? '#15803d' : '#475569',
                color: '#f8fafc',
                border: '2px solid #090d16'
              }}
            >
              {isSinging ? '🎶 SINGING' : '💤 MUTED'}
            </span>
          </div>

          {/* Close X Button */}
          <button
            type="button"
            onClick={onClose}
            className="game-btn game-btn-round game-btn-red"
            style={{
              width: '38px',
              height: '38px',
              minWidth: '38px',
              fontSize: '18px'
            }}
            title="Deselect monster"
          >
            ✖
          </button>
        </div>

        {/* Chunky Stone Buttons Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '10px'
          }}
        >
          {/* 1. MUTE / SING TOGGLE BUTTON */}
          <button
            type="button"
            onClick={onToggleSleep}
            className={`game-btn ${isSinging ? 'game-btn-green' : 'game-btn-blue'}`}
            style={{
              padding: '10px 8px',
              minHeight: '52px',
              fontSize: '13px',
              flexDirection: 'column',
              gap: '2px'
            }}
            title={isSinging ? 'Mute monster' : 'Wake monster up to sing!'}
          >
            <span style={{ fontSize: '20px' }}>{isSinging ? '🎤' : '💤'}</span>
            <span>{isSinging ? 'SINGING' : 'WAKE UP'}</span>
          </button>

          {/* 2. FEED KELP CUPCAKE (+1 LVL) */}
          <button
            type="button"
            disabled={isMaxLevel || !canAffordCupcake}
            onClick={() => onFeed?.('cupcake')}
            className="game-btn game-btn-pink"
            style={{
              padding: '10px 8px',
              minHeight: '52px',
              fontSize: '12px',
              flexDirection: 'column',
              gap: '2px',
              opacity: isMaxLevel || !canAffordCupcake ? 0.6 : 1,
              filter: isMaxLevel || !canAffordCupcake ? 'grayscale(40%)' : 'none'
            }}
            title={isMaxLevel ? 'Monster is Max Level!' : 'Feed Kelp Cake (5 coins) for +1 Level & Rush!'}
          >
            <span style={{ fontSize: '20px' }}>🧁</span>
            <span>{isMaxLevel ? 'MAXED' : 'FEED (5🪙)'}</span>
          </button>

          {/* 3. FEED SEAFOAM DONUT (+2 LVL) */}
          <button
            type="button"
            disabled={isMaxLevel || !canAffordDonut}
            onClick={() => onFeed?.('donut')}
            className="game-btn game-btn-yellow"
            style={{
              padding: '10px 8px',
              minHeight: '52px',
              fontSize: '12px',
              flexDirection: 'column',
              gap: '2px',
              opacity: isMaxLevel || !canAffordDonut ? 0.6 : 1,
              filter: isMaxLevel || !canAffordDonut ? 'grayscale(40%)' : 'none'
            }}
            title={isMaxLevel ? 'Monster is Max Level!' : 'Feed Glazed Donut (12 coins) for +2 Levels & Super Rush!'}
          >
            <span style={{ fontSize: '20px' }}>🍩</span>
            <span>{isMaxLevel ? 'MAXED' : 'DONUT (12🪙)'}</span>
          </button>

          {/* 4. SOLO BUTTON */}
          <button
            type="button"
            onClick={onToggleSolo}
            className={`game-btn ${isSoloed ? 'game-btn-gold' : 'game-btn-blue'}`}
            style={{
              padding: '10px 8px',
              minHeight: '52px',
              fontSize: '12px',
              flexDirection: 'column',
              gap: '2px'
            }}
            title={isSoloed ? 'Un-solo monster (hear full band)' : 'Solo monster (hear only this creature!)'}
          >
            <span style={{ fontSize: '20px' }}>⭐</span>
            <span>{isSoloed ? 'SOLOED!' : 'SOLO'}</span>
          </button>

          {/* 5. VOLUME BOOST / CYCLE */}
          {onCycleVolume && (
            <button
              type="button"
              onClick={onCycleVolume}
              className="game-btn game-btn-cyan"
              style={{
                padding: '10px 8px',
                minHeight: '52px',
                fontSize: '12px',
                flexDirection: 'column',
                gap: '2px'
              }}
              title="Cycle monster volume boost"
            >
              <span style={{ fontSize: '20px' }}>{volPct >= 180 ? '🔥' : '🔊'}</span>
              <span>VOL {volPct}%</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
