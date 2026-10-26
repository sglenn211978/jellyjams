import { useState, useEffect, useRef } from 'react';
import { JELLY_SPECIES } from '../constants/jellies';

const PRAISES = [
  { text: 'PERFECT!', type: 'gold' },
  { text: 'GROOVY!', type: 'cyan' },
  { text: 'AWESOME!', type: 'pink' },
  { text: 'SWEET BEAT!', type: 'green' }
];

function getRandomPraise() {
  const chosen = Math.floor(Math.random() * PRAISES.length);
  return PRAISES[chosen];
}

function generateRiffSequence(pool, count = 3) {
  if (!pool || pool.length === 0) return [];
  const seq = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    seq.push(pool[idx].id);
  }
  return seq;
}

export default function ReefEchoJamModal({
  isOpen,
  onClose,
  performers = {},
  currentIsland = 'lagoon',
  onWinJackpot,
  onTriggerComicPop,
  engineRef
}) {
  const [gameState, setGameState] = useState('IDLE'); // 'IDLE' | 'PLAYING_RIFF' | 'PLAYER_TURN' | 'SUCCESS' | 'MISSED'
  const [sequence, setSequence] = useState([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [roundsWon, setRoundsWon] = useState(0);
  const playTimerRef = useRef(null);

  // Filter available unlocked monsters for this island
  const availableMonsters = Object.values(JELLY_SPECIES).filter(
    s => s.island === currentIsland && performers[s.id]?.unlocked
  );

  // Fallback to basic starters if active island has very few unlocked
  const playablePool = availableMonsters.length >= 2 
    ? availableMonsters 
    : Object.values(JELLY_SPECIES).filter(s => performers[s.id]?.unlocked).slice(0, 4);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, []);

  const handleClose = () => {
    if (playTimerRef.current) clearTimeout(playTimerRef.current);
    setGameState('IDLE');
    setSequence([]);
    setPlayerStep(0);
    setActiveHighlight(null);
    onClose?.();
  };

  if (!isOpen) return null;

  const playSequenceRiff = (seq) => {
    setGameState('PLAYING_RIFF');
    setActiveHighlight(null);

    let step = 0;
    const playNext = () => {
      if (step < seq.length) {
        const monsterId = seq[step];
        setActiveHighlight(monsterId);
        engineRef.current?.playMonsterRiff(monsterId);

        step++;
        playTimerRef.current = setTimeout(() => {
          setActiveHighlight(null);
          playTimerRef.current = setTimeout(playNext, 250);
        }, 550);
      } else {
        // Demonstration finished; hand over to kid
        setActiveHighlight(null);
        setPlayerStep(0);
        setGameState('PLAYER_TURN');
      }
    };

    playTimerRef.current = setTimeout(playNext, 400);
  };

  const startNewRound = () => {
    if (playablePool.length === 0) return;

    // Pick 3 random monsters for the riff
    const newSeq = generateRiffSequence(playablePool, 3);

    setSequence(newSeq);
    setPlayerStep(0);
    playSequenceRiff(newSeq);
  };

  const handleReplayRiff = () => {
    if (sequence.length === 3) {
      playSequenceRiff(sequence);
    } else {
      startNewRound();
    }
  };

  const handleMonsterClick = (monsterId) => {
    if (gameState !== 'PLAYER_TURN') return;

    // Play monster's tone
    engineRef.current?.playMonsterRiff(monsterId);
    setActiveHighlight(monsterId);
    setTimeout(() => setActiveHighlight(null), 350);

    const targetId = sequence[playerStep];

    if (monsterId === targetId) {
      // Correct note hit!
      const nextStep = playerStep + 1;

      if (nextStep >= 3) {
        // Complete 3-note riff matched!
        setGameState('SUCCESS');
        engineRef.current?.playSuccessFanfare();
        setRoundsWon(r => r + 1);

        const praise = getRandomPraise();
        onTriggerComicPop?.(praise.text, praise.type, '⭐');
        onWinJackpot?.(25);
      } else {
        setPlayerStep(nextStep);
      }
    } else {
      // Gentle mismatch - kid friendly!
      setGameState('MISSED');
      engineRef.current?.playFriendlyMiss();
    }
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
      onClick={handleClose}
    >
      <div
        className="game-modal-frame"
        style={{
          background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          color: '#ffffff',
          position: 'relative',
          padding: '24px 20px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cartoon Red Pop Close Button */}
        <button onClick={handleClose} className="game-close-btn" title="Exit Echo Jam">
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>🎧 🎵 🪼</div>
          <h2 style={{
            fontFamily: "'Lilita One', cursive, sans-serif",
            fontSize: '28px',
            color: '#fef08a',
            letterSpacing: '1px',
            textShadow: '0 2px 0 #78350f, 0 4px 8px rgba(0,0,0,0.5)'
          }}>
            REEF ECHO JAM
          </h2>
          <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '700' }}>
            Listen to your band's 3-note riff, then repeat it back for coin jackpots!
          </div>
        </div>

        {/* 3-Step Progress Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px'
        }}>
          {[0, 1, 2].map(idx => {
            const isCompleted = gameState === 'SUCCESS' || playerStep > idx;
            const isCurrent = gameState === 'PLAYER_TURN' && playerStep === idx;
            const isDemoHighlight = gameState === 'PLAYING_RIFF' && sequence[idx] === activeHighlight;

            return (
              <div
                key={idx}
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: isCompleted
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : isCurrent
                      ? 'linear-gradient(135deg, #facc15, #eab308)'
                      : isDemoHighlight
                        ? 'linear-gradient(135deg, #38bdf8, #0284c7)'
                        : 'rgba(30, 41, 59, 0.8)',
                  border: isCompleted
                    ? '3px solid #86efac'
                    : isCurrent
                      ? '3px solid #ffffff'
                      : isDemoHighlight
                        ? '3px solid #bae6fd'
                        : '2px solid rgba(71, 85, 105, 0.6)',
                  boxShadow: (isCompleted || isCurrent || isDemoHighlight)
                    ? '0 0 16px rgba(250, 204, 21, 0.5)'
                    : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: '900',
                  color: isCompleted ? '#ffffff' : '#f8fafc',
                  transition: 'all 0.25s ease',
                  transform: (isCurrent || isDemoHighlight) ? 'scale(1.15)' : 'scale(1)'
                }}
              >
                {isCompleted ? '✓' : isDemoHighlight ? '♪' : `${idx + 1}`}
              </div>
            );
          })}
        </div>

        {/* Status Prompt Banner */}
        <div style={{
          textAlign: 'center',
          padding: '10px 16px',
          borderRadius: '18px',
          background: gameState === 'PLAYING_RIFF'
            ? 'rgba(56, 189, 248, 0.2)'
            : gameState === 'PLAYER_TURN'
              ? 'rgba(250, 204, 21, 0.2)'
              : gameState === 'SUCCESS'
                ? 'rgba(34, 197, 94, 0.25)'
                : gameState === 'MISSED'
                  ? 'rgba(244, 63, 94, 0.2)'
                  : 'rgba(15, 23, 42, 0.6)',
          border: gameState === 'SUCCESS' ? '2px solid #22c55e' : '1.5px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '20px'
        }}>
          <div style={{
            fontFamily: "'Lilita One', sans-serif",
            fontSize: '18px',
            color: gameState === 'SUCCESS' ? '#86efac' : gameState === 'PLAYER_TURN' ? '#fef08a' : '#f0f9ff',
            letterSpacing: '0.5px'
          }}>
            {gameState === 'IDLE' && '🎶 Ready to jam? Tap Start to hear the riff!'}
            {gameState === 'PLAYING_RIFF' && '🎧 LISTEN CLOSELY! Band is singing...'}
            {gameState === 'PLAYER_TURN' && `👉 YOUR TURN! Tap note ${playerStep + 1} of 3!`}
            {gameState === 'SUCCESS' && '🎉 PERFECT MATCH! +25 🪙 Coin Jackpot!'}
            {gameState === 'MISSED' && '🫧 Close one! Tap "Hear Again" to listen once more!'}
          </div>
        </div>

        {/* Monster Band Jam Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '14px',
          marginBottom: '24px'
        }}>
          {playablePool.map((monster) => {
            const isTargetHighlight = activeHighlight === monster.id;
            const isClickable = gameState === 'PLAYER_TURN';

            return (
              <div
                key={monster.id}
                onClick={() => handleMonsterClick(monster.id)}
                style={{
                  background: isTargetHighlight
                    ? 'linear-gradient(180deg, #0284c7 0%, #0369a1 100%)'
                    : 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                  border: isTargetHighlight
                    ? '3px solid #facc15'
                    : '2px solid rgba(71, 85, 105, 0.6)',
                  borderRadius: '22px',
                  padding: '16px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: isClickable ? 'pointer' : 'default',
                  boxShadow: isTargetHighlight
                    ? '0 0 24px rgba(250, 204, 21, 0.7), 0 8px 16px rgba(0,0,0,0.5)'
                    : '0 6px 14px rgba(0,0,0,0.4)',
                  transform: isTargetHighlight ? 'scale(1.08)' : 'scale(1)',
                  transition: 'all 0.18s ease'
                }}
              >
                <div style={{
                  fontSize: '40px',
                  lineHeight: 1,
                  filter: isTargetHighlight ? 'drop-shadow(0 0 10px #fde047)' : 'none',
                  animation: isTargetHighlight ? 'wiggle 0.4s ease infinite' : 'none'
                }}>
                  {monster.icon}
                </div>

                <div style={{
                  fontFamily: "'Lilita One', sans-serif",
                  fontSize: '15px',
                  color: isTargetHighlight ? '#fef08a' : '#f0f9ff',
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  paintOrder: 'stroke fill',
                  WebkitTextStroke: '2px #090d16',
                  textShadow: '0 2px 0 #090d16'
                }}>
                  {monster.name.replace('Floaty ', '')}
                </div>

                <div style={{
                  fontSize: '11px',
                  color: '#e2e8f0',
                  fontWeight: '800',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {monster.element}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '14px',
          marginTop: 'auto'
        }}>
          {gameState === 'IDLE' && (
            <button
              onClick={startNewRound}
              className="game-btn game-btn-green"
              style={{ padding: '14px 36px', fontSize: '16px' }}
            >
              ▶ START 3-NOTE RIFF!
            </button>
          )}

          {gameState === 'SUCCESS' && (
            <button
              onClick={startNewRound}
              className="game-btn game-btn-yellow"
              style={{ padding: '14px 36px', fontSize: '16px' }}
            >
              🎉 PLAY NEXT RIFF (+25 🪙)!
            </button>
          )}

          {gameState === 'MISSED' && (
            <button
              onClick={handleReplayRiff}
              className="game-btn game-btn-cyan"
              style={{ padding: '14px 36px', fontSize: '16px' }}
            >
              🔄 HEAR RIFF AGAIN
            </button>
          )}

          {gameState === 'PLAYER_TURN' && (
            <button
              onClick={handleReplayRiff}
              className="game-btn game-btn-cyan"
              style={{
                padding: '12px 32px',
                fontSize: '16px'
              }}
            >
              👂 HEAR AGAIN
            </button>
          )}
        </div>

        {roundsWon > 0 && (
          <div style={{
            textAlign: 'center',
            marginTop: '12px',
            fontSize: '12px',
            color: '#facc15',
            fontWeight: '900'
          }}>
            ⭐ Jam Score: {roundsWon} Riffs Mastered!
          </div>
        )}
      </div>
    </div>
  );
}
