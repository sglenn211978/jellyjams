import { useEffect, useRef } from 'react';
import { Application, Container, Graphics, Text, TextStyle } from 'pixi.js';
import { JELLY_SPECIES } from '../constants/jellies';
import { ISLANDS } from '../constants/islands';

// Character visual styling parameters for WebGL rendering
const CHARACTER_STYLES = {
  // --- ISLAND 1: CORAL LAGOON ---
  diva: {
    color: 0xec4899,
    accent: 0xf472b6,
    feature: 'crown',
    eyeStyle: 'lashes',
    radius: 46,
    height: 68
  },
  zap: {
    color: 0xfacc15,
    accent: 0x38bdf8,
    feature: 'headphones',
    eyeStyle: 'visor',
    radius: 44,
    height: 64
  },
  bob: {
    color: 0x38bdf8,
    accent: 0x0284c7,
    feature: 'cap',
    eyeStyle: 'cool',
    radius: 52,
    height: 72
  },
  siren: {
    color: 0xc084fc,
    accent: 0x7e22ce,
    feature: 'horns',
    eyeStyle: 'mystic',
    radius: 44,
    height: 66
  },
  sparkpuff: {
    color: 0x22c55e,
    accent: 0x16a34a,
    feature: 'headphones',
    eyeStyle: 'happy',
    radius: 48,
    height: 66
  },
  queen: {
    color: 0xfbbf24,
    accent: 0xd97706,
    feature: 'crown',
    eyeStyle: 'lashes',
    radius: 46,
    height: 68
  },
  starlight: {
    color: 0x818cf8,
    accent: 0x4f46e5,
    feature: 'star',
    eyeStyle: 'sparkle',
    radius: 42,
    height: 64
  },

  // --- ISLAND 2: ABYSSAL MAGMA TRENCH ---
  angler: {
    color: 0xeab308,
    accent: 0xa16207,
    feature: 'lure',
    eyeStyle: 'big',
    radius: 54,
    height: 74
  },
  magma: {
    color: 0xf97316,
    accent: 0xea580c,
    feature: 'lava_crown',
    eyeStyle: 'lashes',
    radius: 46,
    height: 68
  },
  vent: {
    color: 0xef4444,
    accent: 0xb91c1c,
    feature: 'chimney',
    eyeStyle: 'stern',
    radius: 50,
    height: 70
  },
  obsidian: {
    color: 0xa855f7,
    accent: 0x6b21a8,
    feature: 'horns',
    eyeStyle: 'mystic',
    radius: 45,
    height: 66
  },
  pyre: {
    color: 0xf43f5e,
    accent: 0xbe123c,
    feature: 'flame',
    eyeStyle: 'happy',
    radius: 42,
    height: 62
  },

  // --- ISLAND 3: BIOLUMINESCENT CAVERNS ---
  crystal_bell: {
    color: 0x06b6d4,
    accent: 0x0891b2,
    feature: 'crystal',
    eyeStyle: 'sparkle',
    radius: 46,
    height: 66
  },
  lofi_spore: {
    color: 0xa78bfa,
    accent: 0x6d28d9,
    feature: 'mushroom',
    eyeStyle: 'sleepy',
    radius: 52,
    height: 68
  },
  nautilus: {
    color: 0x10b981,
    accent: 0x047857,
    feature: 'shell',
    eyeStyle: 'cool',
    radius: 50,
    height: 70
  },
  prism_bloom: {
    color: 0xf472b6,
    accent: 0xdb2777,
    feature: 'petals',
    eyeStyle: 'lashes',
    radius: 48,
    height: 68
  },
  lapis_groove: {
    color: 0x3b82f6,
    accent: 0x1d4ed8,
    feature: 'bow',
    eyeStyle: 'cool',
    radius: 50,
    height: 72
  }
};

export default function WebGLStage({
  islandId = 'lagoon',
  performers = {},
  audioEngine = null,
  audioEngineRef: externalAudioEngineRef = null,
  volumes = {},
  tempoSpeed = 1.0,
  isNight = false,
  selectedParents = [],
  isSelectingParents = false,
  onPerformerClick = () => {}
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const appRef = useRef(null);
  const performersRef = useRef(performers);
  const volumesRef = useRef(volumes);
  const clickHandlerRef = useRef(onPerformerClick);
  const islandIdRef = useRef(islandId);
  const audioEngineRef = useRef(audioEngine);
  const isNightRef = useRef(isNight);
  const selectedParentsRef = useRef(selectedParents);
  const isSelectingParentsRef = useRef(isSelectingParents);
  const tempoSpeedRef = useRef(tempoSpeed);

  useEffect(() => {
    performersRef.current = performers;
    volumesRef.current = volumes;
    clickHandlerRef.current = onPerformerClick;
    islandIdRef.current = islandId;
    audioEngineRef.current = externalAudioEngineRef ? externalAudioEngineRef.current : audioEngine;
    isNightRef.current = isNight;
    selectedParentsRef.current = selectedParents;
    isSelectingParentsRef.current = isSelectingParents;
    tempoSpeedRef.current = tempoSpeed;
  });

  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let app = null;

    async function initPixi() {
      try {
        app = new Application();
        await app.init({
          canvas,
          resizeTo: container,
          backgroundAlpha: 0,
          antialias: false,
          preference: 'webgl',
          autoDensity: true
        });

        if (!isMounted) {
          app.destroy(true, { children: true });
          return;
        }
        appRef.current = app;

      // Master stage container
      const world = new Container();
      app.stage.addChild(world);

      // Particle container for musical notes and sparkles
      const particleContainer = new Container();
      app.stage.addChild(particleContainer);
      const particles = [];

      // Monsters map: id -> { container, body, mouth, eyes, pedestal, ... }
      const monsterSprites = new Map();

      function setupMonsterSprites() {
        world.removeChildren();
        monsterSprites.clear();

        const currentSpecies = ISLANDS[islandIdRef.current]?.species || [];
        const unlockedList = currentSpecies.filter(
          (id) => performersRef.current[id]?.unlocked
        );

        unlockedList.forEach((id, idx) => {
          const cfg = CHARACTER_STYLES[id] || CHARACTER_STYLES.diva;
          const monster = new Container();
          monster.eventMode = 'static';
          monster.cursor = 'pointer';

          // Interactive tap
          monster.on('pointerdown', (e) => {
            // Elastic squish
            monster.userData.squish = 0.65;
            monster.userData.squishX = 1.35;
            // Spawn star particles
            for (let p = 0; p < 6; p++) {
              spawnMusicParticle(
                monster.x + (Math.random() * 40 - 20),
                monster.y - 70,
                cfg.color,
                ['♪', '♫', '★', '✨'][Math.floor(Math.random() * 4)]
              );
            }
            clickHandlerRef.current(id, e);
          });

          // 1. Pedestal Glow & Platform
          const pedestal = new Graphics();
          monster.addChild(pedestal);

          // 2. Character Body Container
          const body = new Container();
          monster.addChild(body);

          // 2a. Main Jelly Bell Graphic
          const bell = new Graphics();
          body.addChild(bell);

          // 2b. Character Special Feature (Crown, Headphones, Cap, Horns, etc.)
          const feature = new Graphics();
          body.addChild(feature);

          // 2c. Eyes Graphic
          const eyes = new Graphics();
          body.addChild(eyes);

          // 2d. Audio-Reactive Mouth Graphic
          const mouth = new Graphics();
          body.addChild(mouth);

          // 2e. Level & Status Text
          const nameStyle = new TextStyle({
            fontFamily: 'Fredoka, Lilita One, sans-serif',
            fontSize: 13,
            fontWeight: 'bold',
            fill: 0xffffff,
            stroke: { color: 0x090d16, width: 3 },
            dropShadow: {
              alpha: 0.5,
              angle: Math.PI / 2,
              blur: 2,
              color: 0x000000,
              distance: 2
            }
          });
          const nameText = new Text({
            text: JELLY_SPECIES[id]?.name || id,
            style: nameStyle
          });
          nameText.anchor.set(0.5, 0);
          nameText.y = 48;
          monster.addChild(nameText);

          // Selection highlight ring
          const selectRing = new Graphics();
          monster.addChild(selectRing);

          // Floating Coin ready indicator
          const coinBadge = new Container();
          coinBadge.visible = false;
          const coinHalo = new Graphics();
          coinHalo.circle(0, 0, 16);
          coinHalo.fill({ color: 0xfacc15, alpha: 0.9 });
          coinHalo.stroke({ color: 0xffffff, width: 2.5 });
          coinBadge.addChild(coinHalo);
          const coinText = new Text({
            text: '🪙',
            style: new TextStyle({ fontSize: 16 })
          });
          coinText.anchor.set(0.5, 0.5);
          coinBadge.addChild(coinText);
          monster.addChild(coinBadge);

          monster.userData = {
            id,
            cfg,
            body,
            bell,
            feature,
            eyes,
            mouth,
            pedestal,
            nameText,
            selectRing,
            coinBadge,
            baseX: 0,
            baseY: 0,
            squish: 1.0,
            squishX: 1.0,
            blinkTimer: Math.random() * 200,
            blinkState: 0,
            floatPhase: idx * 0.9,
            vocalMouthSize: 0
          };

          world.addChild(monster);
          monsterSprites.set(id, monster);
        });

        layoutMonsters();
      }

      function layoutMonsters() {
        const width = app.renderer.width;
        const height = app.renderer.height;
        const monsters = Array.from(monsterSprites.values());
        const count = monsters.length;
        if (count === 0) return;

        const stageY = height * 0.72;
        const spacing = Math.min(180, (width * 0.88) / Math.max(1, count));
        const startX = width / 2 - ((count - 1) * spacing) / 2;

        monsters.forEach((monster, i) => {
          // Slight natural curve across the stage
          const arcOffset = Math.sin((i / Math.max(1, count - 1)) * Math.PI) * -18;
          monster.userData.baseX = startX + i * spacing;
          monster.userData.baseY = stageY + arcOffset;
          monster.x = monster.userData.baseX;
          monster.y = monster.userData.baseY;
        });
      }

      function spawnMusicParticle(x, y, colorHex, symbol) {
        const style = new TextStyle({
          fontFamily: 'Fredoka, Lilita One, sans-serif',
          fontSize: 18 + Math.random() * 10,
          fontWeight: '900',
          fill: colorHex,
          stroke: { color: 0x090d16, width: 3 }
        });
        const pText = new Text({ text: symbol, style });
        pText.anchor.set(0.5, 0.5);
        pText.x = x;
        pText.y = y;
        pText.userData = {
          vx: (Math.random() - 0.5) * 1.8,
          vy: -2.2 - Math.random() * 2.2,
          alpha: 1.0,
          scale: 0.8 + Math.random() * 0.5,
          rot: (Math.random() - 0.5) * 0.08
        };
        particleContainer.addChild(pText);
        particles.push(pText);
      }

      setupMonsterSprites();

      // Render Ticker Loop: 60-120 FPS WebGL Animation & Real-Time Lip-Sync
      let tickerTime = 0;
      app.ticker.add((ticker) => {
        const delta = ticker.deltaTime;
        tickerTime += delta * 0.04;

        // Current musical beat on 140 BPM grid
        const bpm = 140;
        const beatProgress = (Date.now() / 1000) * (bpm / 60) * tempoSpeedRef.current;
        const quarterBeat = Math.sin(beatProgress * Math.PI * 2);
        const bounce = Math.abs(quarterBeat);

        // Update active monsters
        monsterSprites.forEach((monster, id) => {
          const u = monster.userData;
          const cfg = u.cfg;
          const perf = performersRef.current[id] || {};
          const isSleeping = Boolean(perf.isSleeping);
          const level = perf.level || 1;
          const isSupercharged = Boolean(perf.isSupercharged);

          // 1. Audio-Reactive Lip-Sync Metering
          // Queries exact WebAudio RMS amplitude for this monster's vocal track
          const vocalEnergy = audioEngineRef.current?.getVocalEnergy
            ? audioEngineRef.current.getVocalEnergy(id)
            : 0;

          // Smooth vocal mouth envelope
          const targetMouth = isSleeping ? 0 : vocalEnergy;
          u.vocalMouthSize += (targetMouth - u.vocalMouthSize) * 0.35;

          // 2. Body Floating & Beat Bounce
          // Bounces on musical quarter notes when awake, gentle breathing when sleeping
          const idleFloat = Math.sin(tickerTime + u.floatPhase) * 6;
          const rhythmicBounce = isSleeping ? 0 : (bounce * 12 + u.vocalMouthSize * 10);
          monster.y = u.baseY - idleFloat - rhythmicBounce;

          // Elastic squish recovery after tap
          u.squish += (1.0 - u.squish) * 0.14;
          u.squishX += (1.0 - u.squishX) * 0.14;
          const scaleBase = (1.0 + (level - 1) * 0.04) * (isSupercharged ? 1.08 : 1.0);
          u.body.scale.set(u.squishX * scaleBase, u.squish * scaleBase);

          // 3. Draw Pedestal
          const ped = u.pedestal;
          ped.clear();
          const pedColor =
            islandIdRef.current === 'trench'
              ? 0xea580c
              : islandIdRef.current === 'cavern'
              ? 0x10b981
              : 0x0284c7;

          // Outer glowing base
          ped.ellipse(0, 36, cfg.radius * 1.35, 18);
          ped.fill({ color: pedColor, alpha: isSleeping ? 0.3 : 0.65 });
          ped.stroke({ color: 0x090d16, width: 3.5 });

          // Inner pulsing ring on beat
          if (!isSleeping) {
            ped.ellipse(0, 36, cfg.radius * (1.0 + bounce * 0.22), 12 + bounce * 3);
            ped.stroke({ color: 0xffffff, width: 2, alpha: 0.65 + bounce * 0.35 });
          }

          // 4. Draw Jelly Bell & Tentacles
          const bell = u.bell;
          bell.clear();
          const bodyColor = isSleeping ? 0x64748b : cfg.color;
          const accentColor = isSleeping ? 0x475569 : cfg.accent;

          // Tentacles
          const tentacleCount = 4;
          const tentSpacing = (cfg.radius * 1.4) / (tentacleCount - 1);
          for (let t = 0; t < tentacleCount; t++) {
            const tx = -cfg.radius * 0.7 + t * tentSpacing;
            const wave = Math.sin(tickerTime * 2.5 + t + u.floatPhase) * (isSleeping ? 3 : 9);
            bell.moveTo(tx, 14);
            bell.bezierCurveTo(
              tx + wave, 32,
              tx - wave, 52,
              tx + wave * 0.6, 68
            );
            bell.stroke({ color: 0x090d16, width: 4.5, cap: 'round' });
            bell.moveTo(tx, 14);
            bell.bezierCurveTo(
              tx + wave, 32,
              tx - wave, 52,
              tx + wave * 0.6, 68
            );
            bell.stroke({ color: accentColor, width: 2.8, cap: 'round' });
          }

          // Main Jelly Bell Cap
          bell.ellipse(0, -6, cfg.radius, cfg.height * 0.62);
          bell.fill({ color: bodyColor, alpha: isSleeping ? 0.75 : 0.95 });
          bell.stroke({ color: 0x090d16, width: 4.5 });

          // Shiny highlight arc
          bell.ellipse(-cfg.radius * 0.32, -cfg.height * 0.28, cfg.radius * 0.45, cfg.height * 0.22);
          bell.fill({ color: 0xffffff, alpha: 0.42 });

          // 5. Draw Special Character Features (Crown, Headphones, Cap, etc.)
          const feat = u.feature;
          feat.clear();
          if (cfg.feature === 'crown' && !isSleeping) {
            feat.poly([
              -26, -cfg.height * 0.58,
              -16, -cfg.height * 0.85,
              -6,  -cfg.height * 0.68,
              0,   -cfg.height * 0.92,
              6,   -cfg.height * 0.68,
              16,  -cfg.height * 0.85,
              26,  -cfg.height * 0.58
            ]);
            feat.fill({ color: 0xfacc15 });
            feat.stroke({ color: 0x090d16, width: 3.5 });
            feat.circle(0, -cfg.height * 0.92, 4);
            feat.fill({ color: 0xf43f5e });
          } else if (cfg.feature === 'headphones' && !isSleeping) {
            feat.arc(0, -cfg.height * 0.15, cfg.radius + 6, Math.PI, 0);
            feat.stroke({ color: 0x090d16, width: 7 });
            feat.arc(0, -cfg.height * 0.15, cfg.radius + 6, Math.PI, 0);
            feat.stroke({ color: 0x38bdf8, width: 4 });
            // Earcups
            feat.roundRect(-cfg.radius - 9, -cfg.height * 0.22, 12, 26, 6);
            feat.fill({ color: 0x0284c7 });
            feat.stroke({ color: 0x090d16, width: 3 });
            feat.roundRect(cfg.radius - 3, -cfg.height * 0.22, 12, 26, 6);
            feat.fill({ color: 0x0284c7 });
            feat.stroke({ color: 0x090d16, width: 3 });
          }

          // 6. Draw Eyes (With Natural Blinking & Sleeping States)
          const eyes = u.eyes;
          eyes.clear();
          u.blinkTimer -= delta;
          if (u.blinkTimer <= 0) {
            u.blinkState = 1;
            if (u.blinkTimer <= -8) {
              u.blinkTimer = 180 + Math.random() * 220;
              u.blinkState = 0;
            }
          }

          const eyeSpacing = cfg.radius * 0.44;
          const eyeY = -cfg.height * 0.08;

          if (isSleeping) {
            // Sleeping closed eye curves: (-_-)
            eyes.moveTo(-eyeSpacing - 10, eyeY);
            eyes.quadraticCurveTo(-eyeSpacing, eyeY + 6, -eyeSpacing + 10, eyeY);
            eyes.stroke({ color: 0x090d16, width: 3.5, cap: 'round' });
            eyes.moveTo(eyeSpacing - 10, eyeY);
            eyes.quadraticCurveTo(eyeSpacing, eyeY + 6, eyeSpacing + 10, eyeY);
            eyes.stroke({ color: 0x090d16, width: 3.5, cap: 'round' });
          } else if (u.blinkState === 1) {
            // Happy blinking slits: (^_^)
            eyes.moveTo(-eyeSpacing - 9, eyeY);
            eyes.quadraticCurveTo(-eyeSpacing, eyeY - 7, -eyeSpacing + 9, eyeY);
            eyes.stroke({ color: 0x090d16, width: 3.5, cap: 'round' });
            eyes.moveTo(eyeSpacing - 9, eyeY);
            eyes.quadraticCurveTo(eyeSpacing, eyeY - 7, eyeSpacing + 9, eyeY);
            eyes.stroke({ color: 0x090d16, width: 3.5, cap: 'round' });
          } else {
            // Wide cartoon eyes
            // Left Eye
            eyes.ellipse(-eyeSpacing, eyeY, 9, 13);
            eyes.fill({ color: 0xffffff });
            eyes.stroke({ color: 0x090d16, width: 3 });
            eyes.ellipse(-eyeSpacing + 1.5, eyeY + 1.5, 6, 8.5);
            eyes.fill({ color: 0x1e1b4b });
            eyes.circle(-eyeSpacing - 1, eyeY - 2.5, 3);
            eyes.fill({ color: 0xffffff });

            // Right Eye
            eyes.ellipse(eyeSpacing, eyeY, 9, 13);
            eyes.fill({ color: 0xffffff });
            eyes.stroke({ color: 0x090d16, width: 3 });
            eyes.ellipse(eyeSpacing - 1.5, eyeY + 1.5, 6, 8.5);
            eyes.fill({ color: 0x1e1b4b });
            eyes.circle(eyeSpacing - 3, eyeY - 2.5, 3);
            eyes.fill({ color: 0xffffff });

            // Rosy Blushes
            eyes.ellipse(-eyeSpacing - 11, eyeY + 14, 6.5, 3.8);
            eyes.fill({ color: 0xfb7185, alpha: 0.75 });
            eyes.ellipse(eyeSpacing + 11, eyeY + 14, 6.5, 3.8);
            eyes.fill({ color: 0xfb7185, alpha: 0.75 });
          }

          // 7. 🔥 REAL-TIME AUDIO-REACTIVE MOUTH LIP-SYNC 🔥
          // When vocalEnergy is low: closed smile curve (resting between phrases).
          // When vocalEnergy hits: expands into wide singing oval with teeth & tongue!
          const mouth = u.mouth;
          mouth.clear();
          const mouthY = cfg.height * 0.14;
          const energy = u.vocalMouthSize;

          if (isSleeping || energy < 0.06) {
            // Closed Resting Smile Curve: ‿
            mouth.moveTo(-9, mouthY);
            mouth.quadraticCurveTo(0, mouthY + 7, 9, mouthY);
            mouth.stroke({ color: 0x090d16, width: 3.2, cap: 'round' });
          } else {
            // Active Singing Mouth: Dynamically shaped by real vocal amplitude!
            const mouthWidth = 10 + energy * 18;
            const mouthHeight = 7 + energy * 26;

            // Deep vocal throat cavity
            mouth.ellipse(0, mouthY + mouthHeight * 0.35, mouthWidth, mouthHeight);
            mouth.fill({ color: 0x881337 });
            mouth.stroke({ color: 0x090d16, width: 3.5 });

            // White top teeth
            mouth.roundRect(-mouthWidth * 0.6, mouthY - 1, mouthWidth * 1.2, 4 + energy * 2, 2);
            mouth.fill({ color: 0xffffff });

            // Bouncy singing tongue
            mouth.ellipse(0, mouthY + mouthHeight * 0.82, mouthWidth * 0.65, mouthHeight * 0.35);
            mouth.fill({ color: 0xf43f5e });

            // Periodically emit musical notes while belting out high energy!
            if (energy > 0.45 && Math.random() < 0.08) {
              spawnMusicParticle(
                monster.x + (Math.random() * 30 - 15),
                monster.y - cfg.height * 0.6,
                cfg.color,
                ['♪', '♫', '★'][Math.floor(Math.random() * 3)]
              );
            }
          }

          // Selection Highlight Ring for breeding
          const sRing = u.selectRing;
          sRing.clear();
          if (isSelectingParentsRef.current && selectedParentsRef.current.includes(id)) {
            sRing.ellipse(0, 36, cfg.radius * 1.4, 20);
            sRing.stroke({ color: 0xc084fc, width: 4.5 });
          }

          // Floating Coin Drop Animation
          const coinBadge = u.coinBadge;
          if (perf.hasCoin) {
            coinBadge.visible = true;
            coinBadge.y = -cfg.height * 0.82 - Math.sin(tickerTime * 4 + u.floatPhase) * 6;
            const popScale = 1.0 + Math.sin(tickerTime * 6) * 0.12;
            coinBadge.scale.set(popScale, popScale);
          } else {
            coinBadge.visible = false;
          }
        });

        // 8. Update Flying Musical Note Particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          const pu = p.userData;
          p.x += pu.vx;
          p.y += pu.vy;
          p.rotation += pu.rot;
          pu.alpha -= 0.022;
          p.alpha = Math.max(0, pu.alpha);
          if (pu.alpha <= 0) {
            particleContainer.removeChild(p);
            p.destroy();
            particles.splice(i, 1);
          }
        }
      });

      function onResize() {
        if (!app?.renderer) return;
        layoutMonsters();
      }
      window.addEventListener('resize', onResize);
      resizeCleanup = () => window.removeEventListener('resize', onResize);
    } catch (err) {
      console.warn('PixiJS WebGL initialization error:', err);
    }
  }

    let resizeCleanup = null;
    initPixi();

    return () => {
      isMounted = false;
      if (resizeCleanup) resizeCleanup();
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, [islandId]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '460px',
        overflow: 'hidden',
        touchAction: 'none'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
}
