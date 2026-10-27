import { useRef, useState, useEffect } from 'react';
import { ISLAND_HABITAT_SLOTS } from '../constants/habitatCoordinates';

import Jellyfish from './Jellyfish';
import BoomboxBob from './BoomboxBob';
import VoltSiren from './VoltSiren';
import DJSparkPuff from './DJSparkPuff';
import QueenBeatbox from './QueenBeatbox';
import StarlightJelly from './StarlightJelly';

import { AnglerBass, MagmaMedusa, VentCracker, ObsidianSiren, PyrePuff } from './monsters/TrenchMonsters';
import { CrystalBell, LoFiSpore, EchoNautilus, PrismBloom, LapisGroove } from './monsters/CavernMonsters';
import StagePedestal from './StagePedestal';
import ReefStageLandscape from './scenery/ReefStageLandscape';
import StageFXOverlay from './StageFXOverlay';

export default function LivingHabitatWorld({
  islandId = 'lagoon',
  performers = {},
  volumes = {},
  tempoSpeed = 1.0,
  isNight = false,
  soloedPerformer = null,
  selectedParents = [],
  isSelectingParents = false,
  equippedCostumes = {},
  pokedPerformer = null,
  fameRank = 1,
  stageFXList = [],
  zoomLevel = 1.0,
  onZoomChange,
  onPerformerClick,
  onCoinCollect,
  onToggleSleep,
  onCycleVolume,
  onToggleSolo,
  onPopBubble
}) {
  const containerRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const startDragRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const touchDistanceRef = useRef(null);
  const didDragRef = useRef(false);

  const habitatSlots = ISLAND_HABITAT_SLOTS[islandId] || ISLAND_HABITAT_SLOTS.lagoon;

  // Clamping boundaries to prevent dragging completely off-screen
  const clampPan = (newX, newY, currentZoom) => {
    const maxPanX = 350 * currentZoom;
    const maxPanY = 220 * currentZoom;
    return {
      x: Math.max(-maxPanX, Math.min(maxPanX, newX)),
      y: Math.max(-maxPanY, Math.min(maxPanY, newY))
    };
  };

  // Touch Gesture Listeners (1-Finger Pan & 2-Finger Pinch Zoom)
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      didDragRef.current = false;
      startDragRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        panX: pan.x,
        panY: pan.y
      };
    } else if (e.touches.length === 2) {
      // Pinch to zoom initiation
      isDraggingRef.current = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistanceRef.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const deltaX = e.touches[0].clientX - startDragRef.current.x;
      const deltaY = e.touches[0].clientY - startDragRef.current.y;
      if (Math.hypot(deltaX, deltaY) > 8) {
        didDragRef.current = true;
      }
      const nextPan = clampPan(startDragRef.current.panX + deltaX, startDragRef.current.panY + deltaY, zoomLevel);
      setPan(nextPan);
    } else if (e.touches.length === 2 && touchDistanceRef.current) {
      // Pinch to zoom handling
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.hypot(dx, dy);
      const ratio = newDist / touchDistanceRef.current;
      touchDistanceRef.current = newDist;

      if (onZoomChange) {
        const nextZoom = Math.min(1.4, Math.max(0.75, zoomLevel * ratio));
        onZoomChange(nextZoom);
      }
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    touchDistanceRef.current = null;
  };

  // Mouse drag support for desktop testing
  const handleMouseDown = (e) => {
    // Only drag on left click and not on buttons
    if (e.button !== 0 || e.target.closest('button')) return;
    isDraggingRef.current = true;
    didDragRef.current = false;
    startDragRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startDragRef.current.x;
    const deltaY = e.clientY - startDragRef.current.y;
    if (Math.hypot(deltaX, deltaY) > 8) {
      didDragRef.current = true;
    }
    const nextPan = clampPan(startDragRef.current.panX + deltaX, startDragRef.current.panY + deltaY, zoomLevel);
    setPan(nextPan);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Wheel zoom support
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0015;
    if (onZoomChange) {
      const nextZoom = Math.min(1.4, Math.max(0.75, zoomLevel + zoomDelta));
      onZoomChange(nextZoom);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [zoomLevel, onZoomChange]);

  const renderMonster = (id, slot) => {
    const p = performers[id];
    const isUnlocked = p?.unlocked;
    const isSleeping = p?.isSleeping;
    const isSupercharged = p?.isSupercharged;
    const hasCoin = p?.hasCoin;
    const level = p?.level || 1;
    const costumeId = equippedCostumes[id];
    const isSoloed = soloedPerformer === id;
    const volume = volumes[id] ?? 1.0;
    const isPoked = pokedPerformer?.id === id;
    const isTickled = isPoked && pokedPerformer?.isTickled;
    const selectionIdx = selectedParents.indexOf(id) + 1;

    // Habitat slot depth styling
    const scale = (slot.depthScale || 1.0) * (isSleeping ? 0.92 : 1.0);

    const handleMonsterClick = (e) => {
      // If user was actively dragging the camera, do not trigger click
      if (didDragRef.current) return;
      onPerformerClick?.(id, e);
    };

    return (
      <div
        key={id}
        className={`living-habitat-perch tier-${slot.tier}`}
        style={{
          position: 'absolute',
          left: `${slot.x}%`,
          top: `${slot.y}%`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          zIndex: slot.zIndex || 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          userSelect: 'none',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {isUnlocked ? (
          <div
            className={`monster-actor-wrap ${isPoked && !isTickled ? 'monster-squish-poke' : ''} ${isTickled ? 'jelly-tickle-active' : ''}`}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* 1. Monster Sprite Component */}
            {id === 'diva' && (
              <Jellyfish
                name="Floaty Diva"
                color={isNight ? '#ec4899' : '#f472b6'}
                accentColor={isNight ? '#f43f5e' : '#db2777'}
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}

            {id === 'zap' && (
              <Jellyfish
                name="Zap Jelly"
                color={isNight ? '#eab308' : '#fde047'}
                accentColor={isNight ? '#ca8a04' : '#eab308'}
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}

            {id === 'bob' && (
              <BoomboxBob
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}

            {id === 'siren' && (
              <VoltSiren
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}

            {id === 'sparkpuff' && (
              <DJSparkPuff
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}

            {id === 'queen' && (
              <QueenBeatbox
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}

            {id === 'starlight' && (
              <StarlightJelly
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}

            {/* TRENCH ISLAND MONSTERS */}
            {id === 'angler' && (
              <AnglerBass
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}
            {id === 'magma' && (
              <MagmaMedusa
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}
            {id === 'vent' && (
              <VentCracker
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}
            {id === 'obsidian' && (
              <ObsidianSiren
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}
            {id === 'pyre' && (
              <PyrePuff
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}

            {/* CAVERN ISLAND MONSTERS */}
            {id === 'crystal_bell' && (
              <CrystalBell
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}
            {id === 'lofi_spore' && (
              <LoFiSpore
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}
            {id === 'nautilus' && (
              <EchoNautilus
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}
            {id === 'prism_bloom' && (
              <PrismBloom
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}
            {id === 'lapis_groove' && (
              <LapisGroove
                isSleeping={isSleeping}
                isSupercharged={isSupercharged}
                hasCoin={hasCoin}
                level={level}
                costumeId={costumeId}
                tempoSpeed={tempoSpeed}
                isNight={isNight}
                isSelecting={isSelectingParents}
                selectionIndex={selectionIdx}
                onCoinCollect={(e) => onCoinCollect?.(id, e)}
                onClick={handleMonsterClick}
              />
            )}

            {/* 2. Tactile Touch-Friendly Pedestal Controls */}
            <StagePedestal
              islandId={islandId}
              name={p?.name || id}
              isSleeping={isSleeping}
              isSupercharged={isSupercharged}
              level={level}
              tempoSpeed={tempoSpeed}
              volume={volume}
              isSoloed={isSoloed}
              onClick={handleMonsterClick}
              onToggleSleep={() => onToggleSleep?.(id)}
              onCycleVolume={() => onCycleVolume?.(id)}
              onToggleSolo={() => onToggleSolo?.(id)}
            />
          </div>
        ) : (
          /* Empty / Locked Natural Habitat Nest */
          <div
            className="empty-habitat-nest"
            style={{
              width: '120px',
              height: '40px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(30, 41, 59, 0.45) 0%, rgba(15, 23, 42, 0.25) 100%)',
              border: '2px dashed rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.35)',
              fontSize: '11px',
              fontWeight: '900',
              fontFamily: "'Fredoka', sans-serif"
            }}
          >
            <span>🫧 RESTING PERCH</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="living-habitat-viewport"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: isDraggingRef.current ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none'
      }}
    >
      {/* Stage FX Overlay: Spotlights & Particles */}
      <StageFXOverlay
        fameRank={fameRank}
        activeFX={stageFXList}
        onPopBubble={onPopBubble}
      />

      {/* World Canvas (Scales & Pans with Camera Gesture) */}
      <div
        className="living-habitat-canvas"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '1400px',
          height: '820px',
          transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoomLevel})`,
          transformOrigin: 'center center',
          transition: isDraggingRef.current ? 'none' : 'transform 0.15s ease-out',
          willChange: 'transform'
        }}
      >
        {/* Multi-tiered Illustrated Organic Island Shelf / Rock Landscape */}
        <ReefStageLandscape
          islandId={islandId}
          isNight={isNight}
          tempoSpeed={tempoSpeed}
        />

        {/* 2.5D Living Monsters distributed naturally across the reef */}
        {Object.keys(habitatSlots).map((id) => renderMonster(id, habitatSlots[id]))}
      </div>
    </div>
  );
}
