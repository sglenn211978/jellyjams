import { useState, useRef, useEffect, useCallback } from 'react';
import { ISLANDS } from '../constants/islands';

// Deterministic kid-friendly song charts for each island
const ISLAND_CHARTS = {
  lagoon: {
    name: 'Lagoon Electro-Pop',
    bpm: 110,
    totalBars: 16,
    accentColor: '#38bdf8',
    notes: [
      { id: 1, beat: 2, lane: 0, icon: '🫧' },
      { id: 2, beat: 4, lane: 1, icon: '🎵' },
      { id: 3, beat: 6, lane: 2, icon: '⭐' },
      { id: 4, beat: 8, lane: 1, icon: '🎵' },
      { id: 5, beat: 10, lane: 0, icon: '🫧' },
      { id: 6, beat: 12, lane: 2, icon: '⭐' },
      { id: 7, beat: 14, lane: 1, icon: '🎵' },
      { id: 8, beat: 16, lane: 0, icon: '🫧' },
      { id: 9, beat: 18, lane: 1, icon: '🎵' },
      { id: 10, beat: 20, lane: 2, icon: '⭐' },
      { id: 11, beat: 22, lane: 1, icon: '🎵' },
      { id: 12, beat: 24, lane: 0, icon: '🫧' },
      // Fun 1-2-3 run
      { id: 13, beat: 26, lane: 0, icon: '🎵' },
      { id: 14, beat: 27, lane: 1, icon: '🎵' },
      { id: 15, beat: 28, lane: 2, icon: '⭐' },
      { id: 16, beat: 30, lane: 1, icon: '🫧' },
      { id: 17, beat: 32, lane: 0, icon: '⭐' },
      { id: 18, beat: 34, lane: 2, icon: '⭐' },
      { id: 19, beat: 36, lane: 1, icon: '🎵' },
      { id: 20, beat: 38, lane: 0, icon: '🫧' },
      { id: 21, beat: 40, lane: 2, icon: '⭐' },
      { id: 22, beat: 42, lane: 1, icon: '🎵' },
      { id: 23, beat: 44, lane: 0, icon: '🫧' },
      { id: 24, beat: 46, lane: 2, icon: '⭐' },
      // Drop finale
      { id: 25, beat: 48, lane: 1, icon: '🎵' },
      { id: 26, beat: 50, lane: 0, icon: '🫧' },
      { id: 27, beat: 51, lane: 1, icon: '🎵' },
      { id: 28, beat: 52, lane: 2, icon: '⭐' },
      { id: 29, beat: 54, lane: 1, icon: '🎵' },
      { id: 30, beat: 56, lane: 0, icon: '🫧' },
      { id: 31, beat: 58, lane: 2, icon: '⭐' },
      { id: 32, beat: 60, lane: 1, icon: '🌟' }
    ]
  },
  trench: {
    name: 'Magma Dubstep Rush',
    bpm: 124,
    totalBars: 16,
    accentColor: '#f97316',
    notes: [
      { id: 1, beat: 2, lane: 1, icon: '🔥' },
      { id: 2, beat: 4, lane: 0, icon: '⚡' },
      { id: 3, beat: 6, lane: 2, icon: '💥' },
      { id: 4, beat: 8, lane: 1, icon: '🔥' },
      { id: 5, beat: 10, lane: 2, icon: '💥' },
      { id: 6, beat: 12, lane: 0, icon: '⚡' },
      { id: 7, beat: 14, lane: 1, icon: '🔥' },
      { id: 8, beat: 16, lane: 2, icon: '💥' },
      { id: 9, beat: 18, lane: 0, icon: '⚡' },
      { id: 10, beat: 20, lane: 1, icon: '🔥' },
      { id: 11, beat: 22, lane: 2, icon: '💥' },
      { id: 12, beat: 24, lane: 0, icon: '⚡' },
      { id: 13, beat: 26, lane: 1, icon: '🔥' },
      { id: 14, beat: 27, lane: 2, icon: '💥' },
      { id: 15, beat: 28, lane: 0, icon: '⚡' },
      { id: 16, beat: 30, lane: 1, icon: '🔥' },
      { id: 17, beat: 32, lane: 2, icon: '💥' },
      { id: 18, beat: 34, lane: 0, icon: '⚡' },
      { id: 19, beat: 36, lane: 1, icon: '🔥' },
      { id: 20, beat: 38, lane: 2, icon: '💥' },
      { id: 21, beat: 40, lane: 1, icon: '🔥' },
      { id: 22, beat: 42, lane: 0, icon: '⚡' },
      { id: 23, beat: 44, lane: 2, icon: '💥' },
      { id: 24, beat: 46, lane: 1, icon: '🔥' },
      { id: 25, beat: 48, lane: 0, icon: '⚡' },
      { id: 26, beat: 50, lane: 1, icon: '🔥' },
      { id: 27, beat: 52, lane: 2, icon: '💥' },
      { id: 28, beat: 54, lane: 1, icon: '🔥' },
      { id: 29, beat: 56, lane: 0, icon: '⚡' },
      { id: 30, beat: 58, lane: 2, icon: '💥' },
      { id: 31, beat: 60, lane: 1, icon: '🌟' }
    ]
  },
  cavern: {
    name: 'Crystal Lofi Groove',
    bpm: 92,
    totalBars: 16,
    accentColor: '#a855f7',
    notes: [
      { id: 1, beat: 2, lane: 0, icon: '💎' },
      { id: 2, beat: 4, lane: 1, icon: '✨' },
      { id: 3, beat: 6, lane: 2, icon: '🔮' },
      { id: 4, beat: 8, lane: 1, icon: '✨' },
      { id: 5, beat: 10, lane: 0, icon: '💎' },
      { id: 6, beat: 12, lane: 2, icon: '🔮' },
      { id: 7, beat: 14, lane: 1, icon: '✨' },
      { id: 8, beat: 16, lane: 0, icon: '💎' },
      { id: 9, beat: 18, lane: 2, icon: '🔮' },
      { id: 10, beat: 20, lane: 1, icon: '✨' },
      { id: 11, beat: 22, lane: 0, icon: '💎' },
      { id: 12, beat: 24, lane: 2, icon: '🔮' },
      { id: 13, beat: 26, lane: 1, icon: '✨' },
      { id: 14, beat: 28, lane: 0, icon: '💎' },
      { id: 15, beat: 30, lane: 2, icon: '🔮' },
      { id: 16, beat: 32, lane: 1, icon: '✨' },
      { id: 17, beat: 34, lane: 0, icon: '💎' },
      { id: 18, beat: 36, lane: 2, icon: '🔮' },
      { id: 19, beat: 38, lane: 1, icon: '✨' },
      { id: 20, beat: 40, lane: 0, icon: '💎' },
      { id: 21, beat: 42, lane: 2, icon: '🔮' },
      { id: 22, beat: 44, lane: 1, icon: '✨' },
      { id: 23, beat: 46, lane: 0, icon: '💎' },
      { id: 24, beat: 48, lane: 2, icon: '🔮' },
      { id: 25, beat: 50, lane: 1, icon: '✨' },
      { id: 26, beat: 52, lane: 0, icon: '💎' },
      { id: 27, beat: 54, lane: 2, icon: '🔮' },
      { id: 28, beat: 56, lane: 1, icon: '✨' },
      { id: 29, beat: 58, lane: 0, icon: '💎' },
      { id: 30, beat: 60, lane: 2, icon: '🌟' }
    ]
  }
};

const NOTE_FALL_SECONDS = 1.8; // Time in seconds for a note to travel from top to hit ring

const LANES = [
  { index: 0, keyLabel: 'A', arrow: '←', name: 'LEFT', color: 'linear-gradient(180deg, #0284c7, #0369a1)', border: '#38bdf8', glow: 'rgba(56, 189, 248, 0.6)' },
  { index: 1, keyLabel: 'S', arrow: '↓', name: 'CENTER', color: 'linear-gradient(180deg, #eab308, #ca8a04)', border: '#fde047', glow: 'rgba(250, 204, 21, 0.6)' },
  { index: 2, keyLabel: 'D', arrow: '→', name: 'RIGHT', color: 'linear-gradient(180deg, #db2777, #be123c)', border: '#f472b6', glow: 'rgba(244, 114, 182, 0.6)' }
];

export default function RhythmRushModal({
  isOpen,
  onClose,
  currentIsland = 'lagoon',
  engineRef,
  highScores = {},
  onSaveHighScore,
  onAddCoins,
  onTriggerComicPop
}) {
  const [gameState, setGameState] = useState('IDLE'); // 'IDLE' | 'PLAYING' | 'RESULTS'
  const [selectedIsland, setSelectedIsland] = useState(currentIsland);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [notesHitCount, setNotesHitCount] = useState(0);
  const [perfectHits, setPerfectHits] = useState(0);
  const [groovyHits, setGroovyHits] = useState(0);
  const [hitNoteMap, setHitNoteMap] = useState({});
  const [missedNoteMap, setMissedNoteMap] = useState({});
  const [activeLanePress, setActiveLanePress] = useState({ 0: false, 1: false, 2: false });
  const [laneRipples, setLaneRipples] = useState({ 0: null, 1: null, 2: null });
  const [activeFeedback, setActiveFeedback] = useState(null); // { text, type, id }
  const [liveElapsed, setLiveElapsed] = useState(0);
  const [songProgress, setSongProgress] = useState(0);

  const chart = ISLAND_CHARTS[selectedIsland] || ISLAND_CHARTS.lagoon;
  const totalNotes = chart.notes.length;
  const secondsPerBeat = 60 / chart.bpm;
  const songTotalDuration = chart.totalBars * 4 * secondsPerBeat;

  // Refs for animation loop & hit tracking
  const startTimeRef = useRef(0);
  const rafIdRef = useRef(null);
  const notesStateRef = useRef([]);
  const comboRef = useRef(0);
  const scoreRef = useRef(0);
  const gameStateRef = useRef('IDLE');

  const handleLaneHit = useCallback((laneIndex) => {
    if (gameStateRef.current !== 'PLAYING') return;

    const nowSec = (performance.now() / 1000) - startTimeRef.current;
    const notes = notesStateRef.current;

    // Visual press feedback
    setActiveLanePress((prev) => ({ ...prev, [laneIndex]: true }));
    setTimeout(() => {
      setActiveLanePress((prev) => ({ ...prev, [laneIndex]: false }));
    }, 120);

    // Find nearest unhit note in this lane within target window
    let closestNote = null;
    let minDiff = 999;

    for (let i = 0; i < notes.length; i++) {
      const n = notes[i];
      if (n.lane === laneIndex && !n.hit && !n.missed) {
        const diff = Math.abs(nowSec - n.targetTime);
        if (diff < minDiff && diff <= 0.22) {
          minDiff = diff;
          closestNote = n;
        }
      }
    }

    if (closestNote) {
      closestNote.hit = true;
      setHitNoteMap((prev) => ({ ...prev, [closestNote.id]: true }));
      const isPerfect = minDiff <= 0.095;
      const accuracy = isPerfect ? 'PERFECT' : 'GROOVY';

      engineRef.current?.playRhythmHit(accuracy, laneIndex);

      // Ripple ring on hit
      setLaneRipples((prev) => ({ ...prev, [laneIndex]: accuracy }));
      setTimeout(() => {
        setLaneRipples((prev) => ({ ...prev, [laneIndex]: null }));
      }, 350);

      // Combo & multiplier calculation
      comboRef.current += 1;
      const currentCombo = comboRef.current;
      setCombo(currentCombo);
      setMaxCombo((prev) => Math.max(prev, currentCombo));

      const isFever = currentCombo >= 10;
      if (currentCombo === 10) {
        engineRef.current?.playRhythmFever();
      }

      const multiplier = isFever ? 2 : 1;
      const points = (isPerfect ? 100 : 60) * multiplier;
      scoreRef.current += points;
      setScore(scoreRef.current);

      setNotesHitCount((c) => c + 1);
      if (isPerfect) setPerfectHits((p) => p + 1);
      else setGroovyHits((g) => g + 1);

      setActiveFeedback({
        text: isPerfect ? '⭐ PERFECT!' : '✨ GROOVY!',
        type: isPerfect ? 'perfect' : 'groovy',
        id: Date.now()
      });
    } else {
      // Gentle tap with no note nearby (no harsh buzzer, just gentle water touch)
      engineRef.current?.playRhythmHit('GROOVY', laneIndex);
    }
  }, [engineRef]);

  // Keyboard controls: A / S / D or ArrowLeft / ArrowDown / ArrowRight
  useEffect(() => {
    if (!isOpen || gameState !== 'PLAYING') return;

    const handleKeyDown = (e) => {
      if (e.repeat) return;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        handleLaneHit(0);
      } else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        handleLaneHit(1);
      } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        handleLaneHit(2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, gameState, handleLaneHit]);

  // Game End and Results Handler
  const finishGame = useCallback(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    gameStateRef.current = 'RESULTS';
    setGameState('RESULTS');

    const finalScore = scoreRef.current;
    const finalHits = notesStateRef.current.filter((n) => n.hit).length;
    const hitRatio = totalNotes > 0 ? finalHits / totalNotes : 0;

    let earnedStars = 1;
    if (hitRatio >= 0.85 || finalScore >= 3000) earnedStars = 3;
    else if (hitRatio >= 0.55 || finalScore >= 1800) earnedStars = 2;

    engineRef.current?.playRhythmResultsFanfare(earnedStars);

    const bonusCoins = earnedStars === 3 ? 35 : earnedStars === 2 ? 20 : 10;
    onAddCoins?.(bonusCoins);

    if (earnedStars === 3) {
      onTriggerComicPop?.('🌟 RHYTHM MASTER!', 'gold', '🏆');
    } else if (earnedStars === 2) {
      onTriggerComicPop?.('🎉 GROOVY BEAT!', 'cyan', '⭐');
    }

    onSaveHighScore?.(selectedIsland, earnedStars, finalScore);
  }, [totalNotes, engineRef, onAddCoins, onTriggerComicPop, onSaveHighScore, selectedIsland]);

  // Start round
  const startRhythmGame = () => {
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setNotesHitCount(0);
    setPerfectHits(0);
    setGroovyHits(0);
    setActiveFeedback(null);
    setLiveElapsed(0);
    setSongProgress(0);
    setHitNoteMap({});
    setMissedNoteMap({});

    comboRef.current = 0;
    scoreRef.current = 0;

    // Initialize note instances with target times
    notesStateRef.current = chart.notes.map((n) => ({
      ...n,
      targetTime: n.beat * secondsPerBeat,
      hit: false,
      missed: false
    }));

    startTimeRef.current = performance.now() / 1000;
    gameStateRef.current = 'PLAYING';
    setGameState('PLAYING');

    const updateFrame = () => {
      const elapsed = (performance.now() / 1000) - startTimeRef.current;
      setLiveElapsed(elapsed);
      setSongProgress(Math.min(100, (elapsed / songTotalDuration) * 100));

      // Check for missed notes
      const notes = notesStateRef.current;
      for (let i = 0; i < notes.length; i++) {
        const n = notes[i];
        if (!n.hit && !n.missed && elapsed > n.targetTime + 0.22) {
          n.missed = true;
          setMissedNoteMap((prev) => ({ ...prev, [n.id]: true }));
          // Kid-friendly: reset combo gently without buzzers
          if (comboRef.current > 0) {
            comboRef.current = 0;
            setCombo(0);
          }
        }
      }

      if (elapsed >= songTotalDuration + 1.2) {
        finishGame();
      } else {
        rafIdRef.current = requestAnimationFrame(updateFrame);
      }
    };

    rafIdRef.current = requestAnimationFrame(updateFrame);
  };

  const handleClose = () => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    gameStateRef.current = 'IDLE';
    setGameState('IDLE');
    setScore(0);
    setCombo(0);
    setHitNoteMap({});
    setMissedNoteMap({});
    setSelectedIsland(currentIsland);
    onClose?.();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const isFever = combo >= 10;
  const currentBest = highScores[selectedIsland] || { stars: 0, score: 0 };

  // Calculate stars for Results Screen
  const finalHits = notesHitCount;
  const hitRatio = totalNotes > 0 ? finalHits / totalNotes : 0;
  let finalStars = 1;
  if (hitRatio >= 0.85 || score >= 3000) finalStars = 3;
  else if (hitRatio >= 0.55 || score >= 1800) finalStars = 2;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 220,
        background: 'rgba(2, 6, 23, 0.90)',
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
          background: 'linear-gradient(180deg, #090d16 0%, #1e1b4b 60%, #030712 100%)',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          color: '#ffffff',
          position: 'relative',
          padding: '20px 18px',
          border: isFever ? '3px solid #f472b6' : '3px solid #38bdf8',
          boxShadow: isFever
            ? '0 0 35px rgba(244, 114, 182, 0.7), 0 20px 40px rgba(0,0,0,0.8)'
            : '0 0 30px rgba(56, 189, 248, 0.4), 0 20px 40px rgba(0,0,0,0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cartoon Red Pop Close Button */}
        <button onClick={handleClose} className="game-close-btn" title="Exit Rhythm Rush">
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <div style={{ fontSize: '26px', marginBottom: '2px' }}>🎵 🪼 ⭐</div>
          <h2 style={{
            fontFamily: "'Lilita One', cursive, sans-serif",
            fontSize: '26px',
            color: '#fef08a',
            letterSpacing: '1px',
            textShadow: '0 2px 0 #78350f, 0 4px 8px rgba(0,0,0,0.6)'
          }}>
            RHYTHM RUSH: BUBBLE BEATS
          </h2>
          <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '700' }}>
            Tap the bubbles in the target rings to the beat! Use A / S / D keys or buttons!
          </div>
        </div>

        {/* Track Selector Bar (When in IDLE state) */}
        {gameState === 'IDLE' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            alignItems: 'center',
            margin: 'auto 0'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              width: '100%'
            }}>
              {Object.keys(ISLAND_CHARTS).map((islandKey) => {
                const isSelected = selectedIsland === islandKey;
                const islandConfig = ISLANDS[islandKey];
                const best = highScores[islandKey] || { stars: 0 };

                return (
                  <button
                    key={islandKey}
                    onClick={() => setSelectedIsland(islandKey)}
                    className="game-btn"
                    style={{
                      flex: 1,
                      padding: '10px 8px',
                      fontSize: '12px',
                      fontFamily: "'Lilita One', sans-serif",
                      background: isSelected ? 'linear-gradient(180deg, #0284c7, #0369a1)' : '#1e293b',
                      color: isSelected ? '#ffffff' : '#94a3b8',
                      border: isSelected ? '2.5px solid #38bdf8' : '2px solid #334155',
                      boxShadow: isSelected ? '0 0 16px rgba(56, 189, 248, 0.5)' : 'none'
                    }}
                  >
                    <div>{islandConfig?.icon} {islandConfig?.name}</div>
                    <div style={{ fontSize: '10px', color: isSelected ? '#fef08a' : '#64748b', marginTop: '2px' }}>
                      {best.stars > 0 ? '★'.repeat(best.stars) : '☆☆☆'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Song Info Card */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '2px solid #334155',
              borderRadius: '18px',
              padding: '16px',
              width: '100%',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '16px', color: '#fef08a', fontFamily: "'Lilita One', sans-serif" }}>
                🎧 {chart.name}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', fontWeight: '800' }}>
                Tempo: {chart.bpm} BPM • Duration: ~35s • Notes: {totalNotes}
              </div>
              <div style={{
                marginTop: '10px',
                fontSize: '12px',
                color: '#38bdf8',
                fontWeight: '700'
              }}>
                🏆 Personal Best: {currentBest.stars > 0 ? '★'.repeat(currentBest.stars) : 'None yet'} ({currentBest.score || 0} pts)
              </div>
            </div>

            {/* Big Green Start Button */}
            <button
              onClick={startRhythmGame}
              className="game-btn game-btn-green"
              style={{
                padding: '14px 44px',
                fontSize: '18px',
                fontFamily: "'Lilita One', sans-serif",
                letterSpacing: '1px',
                animation: 'pulse 2s infinite'
              }}
            >
              ▶ START RHYTHM RUSH!
            </button>
          </div>
        )}

        {/* --- PLAYING GAMEPLAY HIGHWAY --- */}
        {gameState === 'PLAYING' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            position: 'relative'
          }}>
            {/* Top Game HUD (Score, Combo, Song Bar) */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '14px',
              marginBottom: '10px',
              border: '2px solid #334155'
            }}>
              {/* Score */}
              <div>
                <div style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '900', letterSpacing: '0.5px' }}>SCORE</div>
                <div style={{
                  fontFamily: "'Lilita One', sans-serif",
                  fontSize: '26px',
                  color: '#fef08a',
                  lineHeight: 1,
                  paintOrder: 'stroke fill',
                  WebkitTextStroke: '2px #78350f',
                  textShadow: '0 2px 0 #451a03'
                }}>
                  {score}
                </div>
              </div>

              {/* Combo Banner */}
              <div style={{ textAlign: 'center' }}>
                {combo > 1 ? (
                  <div style={{
                    fontFamily: "'Lilita One', sans-serif",
                    fontSize: isFever ? '20px' : '17px',
                    color: isFever ? '#f472b6' : '#38bdf8',
                    animation: isFever ? 'wiggle 0.5s infinite' : 'none',
                    paintOrder: 'stroke fill',
                    WebkitTextStroke: '2px #090d16',
                    textShadow: '0 2px 0 #090d16'
                  }}>
                    {isFever ? `🔥 ${combo}x FEVER (2x)!` : `⚡ ${combo}x COMBO`}
                  </div>
                ) : (
                  <div style={{ 
                    fontSize: '13px', 
                    color: '#94a3b8', 
                    fontWeight: '900',
                    fontFamily: "'Lilita One', sans-serif",
                    letterSpacing: '0.5px'
                  }}>
                    HIT THE BEAT!
                  </div>
                )}
              </div>

              {/* Timing Feedback Badge */}
              <div style={{ minWidth: '90px', textAlign: 'right' }}>
                {activeFeedback && (
                  <div
                    key={activeFeedback.id}
                    style={{
                      fontFamily: "'Lilita One', sans-serif",
                      fontSize: '17px',
                      color: activeFeedback.type === 'perfect' ? '#facc15' : '#38bdf8',
                      animation: 'rubberBand 0.3s ease',
                      paintOrder: 'stroke fill',
                      WebkitTextStroke: '2px #090d16',
                      textShadow: '0 2px 0 #090d16'
                    }}
                  >
                    {activeFeedback.text}
                  </div>
                )}
              </div>
            </div>

            {/* Song Progress Line */}
            <div style={{
              height: '4px',
              background: '#1e293b',
              borderRadius: '9999px',
              marginBottom: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${songProgress}%`,
                height: '100%',
                background: isFever ? '#f472b6' : '#38bdf8',
                transition: 'width 0.1s linear'
              }} />
            </div>

            {/* 3-Lane Highway Container */}
            <div
              className={isFever ? 'rhythm-highway-fever' : ''}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                height: '320px',
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.8) 100%)',
                borderRadius: '18px',
                padding: '10px',
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid rgba(56, 189, 248, 0.3)'
              }}
            >
              {/* Lane Dividers & Target Rings */}
              {LANES.map((lane) => {
                const isPressed = activeLanePress[lane.index];
                const ripple = laneRipples[lane.index];

                return (
                  <div
                    key={lane.index}
                    style={{
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      borderLeft: lane.index > 0 ? '1px dashed rgba(71, 85, 105, 0.4)' : 'none',
                      paddingBottom: '8px'
                    }}
                  >
                    {/* Falling Notes inside this lane */}
                    {chart.notes
                      .filter((n) => n.lane === lane.index && !hitNoteMap[n.id] && !missedNoteMap[n.id])
                      .map((note) => {
                        const targetTime = note.beat * secondsPerBeat;
                        const spawnTime = targetTime - NOTE_FALL_SECONDS;
                        if (liveElapsed < spawnTime || liveElapsed > targetTime + 0.25) {
                          return null;
                        }

                        const progress = (liveElapsed - spawnTime) / NOTE_FALL_SECONDS;
                        const topPos = Math.max(0, Math.min(100, progress * 82)); // 0% top to 82% at target ring

                        return (
                          <div
                            key={note.id}
                            style={{
                              position: 'absolute',
                              top: `${topPos}%`,
                              width: '46px',
                              height: '46px',
                              borderRadius: '50%',
                              background: lane.color,
                              border: `2.5px solid ${lane.border}`,
                              boxShadow: `0 0 14px ${lane.glow}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '22px',
                              zIndex: 10,
                              transform: 'scale(1.05)',
                              pointerEvents: 'none'
                            }}
                          >
                            {note.icon}
                          </div>
                        );
                      })}

                    {/* Bottom Target Ring */}
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        border: `3px solid ${isPressed ? '#ffffff' : lane.border}`,
                        background: isPressed ? lane.glow : 'rgba(15, 23, 42, 0.6)',
                        boxShadow: isPressed ? `0 0 20px ${lane.border}` : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'transform 0.08s ease',
                        transform: isPressed ? 'scale(1.12)' : 'scale(1)'
                      }}
                    >
                      <span style={{
                        fontSize: '16px',
                        color: '#fef08a',
                        fontWeight: '900',
                        fontFamily: "'Lilita One', sans-serif"
                      }}>
                        {lane.arrow}
                      </span>

                      {/* Ripple on Hit */}
                      {ripple === 'PERFECT' && <div className="hit-ring-ripple-perfect" />}
                      {ripple === 'GROOVY' && <div className="hit-ring-ripple-groovy" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom 3 Tactile Tap Buttons for Kids / Touch */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              marginTop: '12px'
            }}>
              {LANES.map((lane) => {
                const isPressed = activeLanePress[lane.index];

                return (
                  <button
                    key={lane.index}
                    onClick={() => handleLaneHit(lane.index)}
                    className={`rhythm-hit-btn ${isPressed ? 'btn-pressed' : ''}`}
                    style={{
                      background: lane.color,
                      color: '#ffffff',
                      padding: '12px 6px',
                      borderRadius: '20px'
                    }}
                  >
                    <span style={{ 
                      fontSize: '26px', 
                      lineHeight: 1, 
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' 
                    }}>
                      {lane.arrow}
                    </span>
                    <span style={{ 
                      fontSize: '13px', 
                      marginTop: '4px', 
                      color: '#fef08a', 
                      fontWeight: '900',
                      fontFamily: "'Lilita One', sans-serif",
                      background: 'rgba(0, 0, 0, 0.45)',
                      padding: '2px 10px',
                      borderRadius: '10px',
                      letterSpacing: '0.5px'
                    }}>
                      KEY {lane.keyLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* --- RESULTS SCREEN --- */}
        {gameState === 'RESULTS' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            margin: 'auto 0',
            gap: '16px'
          }}>
            <div style={{
              fontSize: '28px',
              color: '#fef08a',
              fontFamily: "'Lilita One', sans-serif"
            }}>
              🎉 RUSH COMPLETE! 🎉
            </div>

            {/* Animated 3-Star Display */}
            <div style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              fontSize: '44px'
            }}>
              {[1, 2, 3].map((starIdx) => (
                <div
                  key={starIdx}
                  className={starIdx <= finalStars ? 'star-pop-anim' : ''}
                  style={{
                    color: starIdx <= finalStars ? '#facc15' : '#334155',
                    filter: starIdx <= finalStars ? 'drop-shadow(0 0 12px #fde047)' : 'none',
                    animationDelay: `${starIdx * 0.15}s`
                  }}
                >
                  ★
                </div>
              ))}
            </div>

            {/* Score & Accuracy Stats */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '2px solid #334155',
              borderRadius: '18px',
              padding: '16px 24px',
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800' }}>FINAL SCORE</div>
                <div style={{ fontSize: '24px', color: '#fef08a', fontFamily: "'Lilita One', sans-serif" }}>
                  {score}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800' }}>MAX COMBO</div>
                <div style={{ fontSize: '24px', color: '#38bdf8', fontFamily: "'Lilita One', sans-serif" }}>
                  {maxCombo}x
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800' }}>PERFECT HITS</div>
                <div style={{ fontSize: '18px', color: '#86efac', fontWeight: '900' }}>
                  {perfectHits}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800' }}>GROOVY HITS</div>
                <div style={{ fontSize: '18px', color: '#67e8f9', fontWeight: '900' }}>
                  {groovyHits}
                </div>
              </div>
            </div>

            {/* Coin Reward Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #facc15, #eab308)',
              color: '#78350f',
              padding: '10px 24px',
              borderRadius: '9999px',
              fontFamily: "'Lilita One', sans-serif",
              fontSize: '16px',
              boxShadow: '0 4px 12px rgba(250, 204, 21, 0.4)'
            }}>
              🪙 WON +{finalStars === 3 ? 35 : finalStars === 2 ? 20 : 10} COINS!
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '8px' }}>
              <button
                onClick={startRhythmGame}
                className="game-btn game-btn-yellow"
                style={{ padding: '14px 34px', fontSize: '16.5px' }}
              >
                🔄 PLAY AGAIN
              </button>

              <button
                onClick={handleClose}
                className="game-btn game-btn-cyan"
                style={{ padding: '14px 34px', fontSize: '16.5px' }}
              >
                ✓ DONE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
