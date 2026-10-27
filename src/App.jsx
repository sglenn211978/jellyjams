import { useState, useRef, useEffect } from 'react';
import { JellyAudioEngine } from './audioEngine';
import { JELLY_SPECIES, resolveBreedingOffspring } from './constants/jellies';
import { ISLANDS } from './constants/islands';

import Jellyfish from './components/Jellyfish';
import BoomboxBob from './components/BoomboxBob';
import VoltSiren from './components/VoltSiren';
import DJSparkPuff from './components/DJSparkPuff';
import QueenBeatbox from './components/QueenBeatbox';
import StarlightJelly from './components/StarlightJelly';
import CoralRemixPod from './components/CoralRemixPod';
import PearlClam from './components/PearlClam';
import KelpForestWings from './components/KelpForestWings';
import DJConsole from './components/DJConsole';
import ReefFanClub from './components/ReefFanClub';
import BakeryTruck from './components/BakeryTruck';
import HypeDolphin from './components/HypeDolphin';
import TreasureCrate from './components/TreasureCrate';
import HatchModal from './components/HatchModal';
import JellyDexModal from './components/JellyDexModal';
import MixerConsoleModal from './components/MixerConsoleModal';
import WardrobeModal from './components/WardrobeModal';
import DecorationsModal from './components/DecorationsModal';
import SeafloorDecorations from './components/SeafloorDecorations';

import MagmaTrenchScenery from './components/scenery/MagmaTrenchScenery';
import BioluminescentCavernScenery from './components/scenery/BioluminescentCavernScenery';
import { AnglerBass, MagmaMedusa, VentCracker, ObsidianSiren, PyrePuff } from './components/monsters/TrenchMonsters';
import { CrystalBell, LoFiSpore, EchoNautilus, PrismBloom, LapisGroove } from './components/monsters/CavernMonsters';
import IslandMapModal from './components/IslandMapModal';
import SubmarineTravelDock from './components/SubmarineTravelDock';
import DiveTransition from './components/DiveTransition';
import GameTitleScreen from './components/GameTitleScreen';
import StagePedestal from './components/StagePedestal';
import WebGLStage from './components/WebGLStage';
import LivingHabitatWorld from './components/LivingHabitatWorld';
import CartoonTouchControls from './components/CartoonTouchControls';
import CartoonSeafloor from './components/scenery/CartoonSeafloor';
import AnimatedOceanLife from './components/scenery/AnimatedOceanLife';
import InteractiveReefCritters from './components/scenery/InteractiveReefCritters';
import ReefStageLandscape from './components/scenery/ReefStageLandscape';
import ReefEchoJamModal from './components/ReefEchoJamModal';
import ComicPopText from './components/ComicPopText';
import DJBoothModal from './components/DJBoothModal';
import RhythmRushModal from './components/RhythmRushModal';
import FlyingCoinOverlay from './components/FlyingCoinOverlay';
import RainbowAnemones from './components/RainbowAnemones';
import LuckyStarfishWheelModal from './components/LuckyStarfishWheelModal';
import StageFXOverlay from './components/StageFXOverlay';
import QuestsModal from './components/QuestsModal';
import { calculateSquadSynergy } from './constants/uniforms';
import { generateDailyQuests, getFameRank } from './constants/quests';

function PerformerStageSlot({ id, pokedPerformer, children }) {
  const isPoked = pokedPerformer?.id === id;
  const isTickled = isPoked && pokedPerformer?.isTickled;
  const tickleClass = isTickled ? `jelly-tickle-${id} jelly-tickle-active` : '';
  return (
    <div 
      className={`performer-column ${isPoked && !isTickled ? 'monster-squish-poke' : ''} ${tickleClass}`}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
    >
      {children}
    </div>
  );
}

const STORAGE_KEY = 'jellyjams_save_v2';
const LEGACY_STORAGE_KEY = 'jellyjams_save_v1';

const INITIAL_VOLUMES = {
  diva: 1.0, zap: 1.0, bob: 1.0,
  siren: 1.25, sparkpuff: 1.25, queen: 1.25, starlight: 1.25,
  angler: 1.3, magma: 1.3, vent: 1.3, obsidian: 1.3, pyre: 1.3,
  crystal_bell: 1.3, lofi_spore: 1.3, nautilus: 1.3, prism_bloom: 1.3, lapis_groove: 1.3
};

const EMPTY_DECORATIONS = [];

function normalizeVolumeMap(volMap) {
  const res = { ...INITIAL_VOLUMES, ...volMap };
  Object.keys(res).forEach((k) => {
    const v = Number(res[k]);
    if (Number.isNaN(v) || v <= 0) {
      res[k] = INITIAL_VOLUMES[k] || 1.0;
    } else if (v > 2.5) {
      res[k] = Math.min(2.0, v / 100);
    } else {
      res[k] = Math.min(2.0, v);
    }
  });
  return res;
}

function loadSavedState() {
  try {
    const rawV2 = localStorage.getItem(STORAGE_KEY);
    if (rawV2) return JSON.parse(rawV2);

    const rawV1 = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (rawV1) {
      const v1 = JSON.parse(rawV1);
      return {
        coins: typeof v1.coins === 'number' ? v1.coins : 25,
        totalBreedsCount: typeof v1.totalBreedsCount === 'number' ? v1.totalBreedsCount : 0,
        currentIsland: 'lagoon',
        unlockedIslands: ['lagoon'],
        islandsData: {
          lagoon: {
            performers: v1.performers ?? ISLANDS.lagoon.defaultPerformers,
            ownedDecorations: Array.isArray(v1.ownedDecorations) ? v1.ownedDecorations : [],
            volumes: normalizeVolumeMap(v1.volumes ?? INITIAL_VOLUMES)
          },
          trench: {
            performers: { ...ISLANDS.trench.defaultPerformers },
            ownedDecorations: [],
            volumes: { ...INITIAL_VOLUMES }
          },
          cavern: {
            performers: { ...ISLANDS.cavern.defaultPerformers },
            ownedDecorations: [],
            volumes: { ...INITIAL_VOLUMES }
          }
        },
        ownedCostumes: Array.isArray(v1.ownedCostumes) ? v1.ownedCostumes : [],
        equippedCostumes: typeof v1.equippedCostumes === 'object' && v1.equippedCostumes !== null ? v1.equippedCostumes : {}
      };
    }
    return null;
  } catch (e) {
    console.warn('Could not parse saved state:', e);
    return null;
  }
}

function getInitialGameState() {
  const saved = loadSavedState();
  const defaultIslandsData = {
    lagoon: {
      performers: { ...ISLANDS.lagoon.defaultPerformers },
      ownedDecorations: [],
      volumes: { ...INITIAL_VOLUMES }
    },
    trench: {
      performers: { ...ISLANDS.trench.defaultPerformers },
      ownedDecorations: [],
      volumes: { ...INITIAL_VOLUMES }
    },
    cavern: {
      performers: { ...ISLANDS.cavern.defaultPerformers },
      ownedDecorations: [],
      volumes: { ...INITIAL_VOLUMES }
    }
  };

  const wakeUnlockedPerformers = (perfMap) => {
    const res = { ...perfMap };
    Object.keys(res).forEach((k) => {
      if (res[k]?.unlocked && res[k]?.isSleeping) {
        res[k] = { ...res[k], isSleeping: false };
      }
    });
    return res;
  };

  const islandsData = saved?.islandsData ? {
    lagoon: {
      performers: wakeUnlockedPerformers({ ...defaultIslandsData.lagoon.performers, ...saved.islandsData.lagoon?.performers }),
      ownedDecorations: saved.islandsData.lagoon?.ownedDecorations ?? [],
      volumes: normalizeVolumeMap({ ...defaultIslandsData.lagoon.volumes, ...saved.islandsData.lagoon?.volumes })
    },
    trench: {
      performers: wakeUnlockedPerformers({ ...defaultIslandsData.trench.performers, ...saved.islandsData.trench?.performers }),
      ownedDecorations: saved.islandsData.trench?.ownedDecorations ?? [],
      volumes: normalizeVolumeMap({ ...defaultIslandsData.trench.volumes, ...saved.islandsData.trench?.volumes })
    },
    cavern: {
      performers: wakeUnlockedPerformers({ ...defaultIslandsData.cavern.performers, ...saved.islandsData.cavern?.performers }),
      ownedDecorations: saved.islandsData.cavern?.ownedDecorations ?? [],
      volumes: normalizeVolumeMap({ ...defaultIslandsData.cavern.volumes, ...saved.islandsData.cavern?.volumes })
    }
  } : defaultIslandsData;

  return {
    coins: typeof saved?.coins === 'number' ? saved.coins : 25,
    totalBreedsCount: typeof saved?.totalBreedsCount === 'number' ? saved.totalBreedsCount : 0,
    currentIsland: saved?.currentIsland && ISLANDS[saved.currentIsland] ? saved.currentIsland : 'lagoon',
    unlockedIslands: Array.isArray(saved?.unlockedIslands) && saved.unlockedIslands.length > 0 ? saved.unlockedIslands : ['lagoon'],
    islandsData,
    ownedCostumes: Array.isArray(saved?.ownedCostumes) ? saved.ownedCostumes : [],
    equippedCostumes: typeof saved?.equippedCostumes === 'object' && saved?.equippedCostumes !== null ? saved.equippedCostumes : {},
    rhythmHighScores: typeof saved?.rhythmHighScores === 'object' && saved?.rhythmHighScores !== null ? saved.rhythmHighScores : {},
    bandFameXP: typeof saved?.bandFameXP === 'number' ? saved.bandFameXP : 0,
    unlockedStickers: Array.isArray(saved?.unlockedStickers) && saved.unlockedStickers.length > 0 ? saved.unlockedStickers : ['sticker_diva', 'sticker_bob'],
    dailyQuests: Array.isArray(saved?.dailyQuests) && saved.dailyQuests.length > 0 ? saved.dailyQuests : generateDailyQuests(),
    completedQuestIds: Array.isArray(saved?.completedQuestIds) ? saved.completedQuestIds : []
  };
}

export default function App() {
  const [initialData] = useState(getInitialGameState);

  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Archipelago & Island Travel State
  const [currentIsland, setCurrentIsland] = useState(initialData.currentIsland);
  const [unlockedIslands, setUnlockedIslands] = useState(initialData.unlockedIslands);
  const [islandsData, setIslandsData] = useState(initialData.islandsData);
  const [isDiving, setIsDiving] = useState(false);
  const [diveDestination, setDiveDestination] = useState('');
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Active Island Config & Computed Properties
  const currentIslandConfig = ISLANDS[currentIsland] || ISLANDS.lagoon;
  const performers = islandsData[currentIsland]?.performers || currentIslandConfig.defaultPerformers;
  const ownedDecorations = islandsData[currentIsland]?.ownedDecorations || EMPTY_DECORATIONS;
  const volumes = islandsData[currentIsland]?.volumes || INITIAL_VOLUMES;

  // Global Economy & Shared Wardrobe
  const [coins, setCoins] = useState(initialData.coins);
  const [activeTreat, setActiveTreat] = useState(null);
  const [ownedCostumes, setOwnedCostumes] = useState(initialData.ownedCostumes);
  const [equippedCostumes, setEquippedCostumes] = useState(initialData.equippedCostumes);
  const [rhythmHighScores, setRhythmHighScores] = useState(initialData.rhythmHighScores || {});

  // Hudson's Band Fame, Quests, Stickers & Stage FX Progression
  const [bandFameXP, setBandFameXP] = useState(initialData.bandFameXP || 0);
  const [unlockedStickers, setUnlockedStickers] = useState(initialData.unlockedStickers || ['sticker_diva', 'sticker_bob']);
  const [dailyQuests, setDailyQuests] = useState(initialData.dailyQuests || generateDailyQuests());
  const [completedQuestIds, setCompletedQuestIds] = useState(initialData.completedQuestIds || []);
  const [stageFXList, setStageFXList] = useState([]);

  // Computed Fame Rank & Squad Synergy (filtered to current island's unlocked monsters)
  const currentFameRank = getFameRank(bandFameXP);
  const squadSynergy = calculateSquadSynergy(equippedCostumes, performers);

  // Audio & Mixing State
  const [soloedPerformer, setSoloedPerformer] = useState(null);

  // Modals Visibility
  const [isDexOpen, setIsDexOpen] = useState(false);
  const [isMixerOpen, setIsMixerOpen] = useState(false);
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [isDecorationsOpen, setIsDecorationsOpen] = useState(false);
  const [isEchoJamOpen, setIsEchoJamOpen] = useState(false);
  const [isDJBoothOpen, setIsDJBoothOpen] = useState(false);
  const [isRhythmRushOpen, setIsRhythmRushOpen] = useState(false);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);

  // Breeding & Nursery State
  const [isSelectingParents, setIsSelectingParents] = useState(false);
  const [selectedParents, setSelectedParents] = useState([]);
  const [incubatingEgg, setIncubatingEgg] = useState(null);
  const [totalBreedsCount, setTotalBreedsCount] = useState(initialData.totalBreedsCount);

  // DJ Tempo & Venue Modes
  const [tempoSpeed, setTempoSpeed] = useState(1.0);
  const [isNightRave, setIsNightRave] = useState(false);
  const [useWebGLStage, setUseWebGLStage] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(1.4, Number((z + 0.15).toFixed(2))));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.75, Number((z - 0.15).toFixed(2))));
  const handleResetZoom = () => setZoomLevel(1.0);

  // Hype Dolphin & Drops
  const [dolphinActive, setDolphinActive] = useState(false);
  const [dolphinKey, setDolphinKey] = useState(0);
  const [dolphinFlipping, setDolphinFlipping] = useState(false);
  const [mysteryCrate, setMysteryCrate] = useState(null);

  // Alerts, Modals & Toasts
  const [bonusToast, setBonusToast] = useState(null);
  const [comicPopItem, setComicPopItem] = useState(null);
  const [bankPulsing, setBankPulsing] = useState(false);
  const [hatchModal, setHatchModal] = useState(null);
  const [audioEngineState, setAudioEngineState] = useState(null);

  const engineRef = useRef(null);
  const bankBadgeRef = useRef(null);
  const flyingCoinRef = useRef(null);
  const [pokedPerformer, setPokedPerformer] = useState(null);

  const launchFlyingCoins = ({ count = 1, startX, startY, totalAmount = 1 }) => {
    flyingCoinRef.current?.spawnCoins({ count, startX, startY, totalAmount });
  };

  const handleCoinArrived = (amount, step = 0) => {
    engineRef.current?.playCoinChime(step);
    setCoins((c) => c + amount);
    setBankPulsing(true);
    setTimeout(() => setBankPulsing(false), 350);
  };

  const triggerComicPop = (text, type = 'gold', icon = '⭐') => {
    setComicPopItem({ id: Date.now(), text, type, icon });
  };

  const triggerCoinBonusToast = (text) => {
    setBonusToast({ id: Date.now(), text });
    setBankPulsing(true);
    setTimeout(() => setBankPulsing(false), 400);
    setTimeout(() => setBonusToast(null), 1800);
  };

  const addFameXP = (amount) => {
    setBandFameXP((prevXP) => {
      const oldRank = getFameRank(prevXP);
      const newXP = prevXP + amount;
      const newRank = getFameRank(newXP);
      if (newRank.level > oldRank.level) {
        engineRef.current?.playJackpotSound();
        triggerComicPop(`FAME UPGRADE! LV.${newRank.level}`, 'gold', '🌟');
        triggerCoinBonusToast(`🏆 FAME RANK UP: ${newRank.title.toUpperCase()}! ${newRank.perk}`);
      }
      return newXP;
    });
  };

  const advanceQuest = (questType, amount = 1) => {
    setDailyQuests((prevQuests) => {
      let updated = false;
      const next = prevQuests.map((q) => {
        if (q.id === questType && !q.claimed) {
          const newProg = Math.min(q.target, (q.progress || 0) + amount);
          if (newProg !== q.progress) {
            updated = true;
            if (newProg >= q.target && (q.progress || 0) < q.target) {
              engineRef.current?.playQuestComplete?.();
              triggerComicPop('QUEST READY!', 'gold', '⭐');
              triggerCoinBonusToast(`⭐ QUEST COMPLETE: ${q.title}! TAP QUESTS TO CLAIM!`);
            }
            return { ...q, progress: newProg };
          }
        }
        return q;
      });
      return updated ? next : prevQuests;
    });
  };

  const handleClaimQuest = (questId) => {
    const quest = dailyQuests.find(q => q.id === questId);
    if (!quest || (quest.progress || 0) < quest.target || quest.claimed) return;

    engineRef.current?.playJackpotSound();
    engineRef.current?.playQuestComplete?.();

    // Launch flying reward coins
    launchFlyingCoins({
      count: Math.min(quest.rewardCoins, 10),
      startX: window.innerWidth / 2,
      startY: window.innerHeight / 2,
      totalAmount: quest.rewardCoins
    });

    // Award Fame XP
    addFameXP(quest.rewardXP);

    // Award Holographic Sticker
    if (quest.stickerRewardId && !unlockedStickers.includes(quest.stickerRewardId)) {
      setUnlockedStickers((prev) => [...prev, quest.stickerRewardId]);
      engineRef.current?.playStickerSlap?.();
      triggerComicPop('NEW STICKER!', 'pink', '📒');
    }

    triggerCoinBonusToast(`🎁 CLAIMED: ${quest.title}! +${quest.rewardCoins} 🪙 & +${quest.rewardXP} XP!`);

    setDailyQuests((prev) =>
      prev.map(q => q.id === questId ? { ...q, claimed: true } : q)
    );
    setCompletedQuestIds((prev) => [...new Set([...prev, questId])]);
  };

  const handleTriggerLiveFX = (type) => {
    if (type === 'confetti') {
      engineRef.current?.playConfettiCannon?.();
    } else if (type === 'bubbles') {
      engineRef.current?.playBubbleBlaster?.();
    } else if (type === 'sparks') {
      engineRef.current?.playSparksBurst?.();
    }

    const newFX = {
      id: Date.now() + Math.random(),
      type,
      x: 20 + Math.random() * 60
    };
    setStageFXList((prev) => [...prev, newFX]);
    setTimeout(() => {
      setStageFXList((prev) => prev.filter(f => f.id !== newFX.id));
    }, 3200);

    advanceQuest('pet_creatures', 1);
  };

  const handlePopStageFXBubble = () => {
    engineRef.current?.playClamPop?.();
    setCoins((c) => c + 1);
    triggerComicPop('+1 COIN!', 'cyan', '🫧');
  };

  const handleEquipAllCostume = (costumeId) => {
    setEquippedCostumes((prev) => {
      const next = { ...prev };
      Object.keys(performers).forEach((id) => {
        if (performers[id]?.unlocked) {
          next[id] = costumeId;
        }
      });
      return next;
    });
    engineRef.current?.playJackpotSound();
    triggerComicPop('SQUAD UNIFORM SET!', 'gold', '👗');
    triggerCoinBonusToast('✨ WHOLE BAND DRESSED IN UNIFORM! SQUAD SYNERGY ACTIVATED!');
    advanceQuest('dress_uniform', 1);
    addFameXP(20);
  };

  // Auto-Save to LocalStorage
  useEffect(() => {
    try {
      const dataToSave = {
        coins,
        totalBreedsCount,
        ownedCostumes,
        equippedCostumes,
        currentIsland,
        unlockedIslands,
        islandsData,
        rhythmHighScores,
        bandFameXP,
        unlockedStickers,
        dailyQuests,
        completedQuestIds
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn('Could not save progress to localStorage:', e);
    }
  }, [coins, totalBreedsCount, ownedCostumes, equippedCostumes, currentIsland, unlockedIslands, islandsData, rhythmHighScores, bandFameXP, unlockedStickers, dailyQuests, completedQuestIds]);

  // Set performers helper for active island
  const setPerformers = (updater) => {
    setIslandsData((prev) => {
      const currentPerfs = prev[currentIsland]?.performers || currentIslandConfig.defaultPerformers;
      const nextPerfs = typeof updater === 'function' ? updater(currentPerfs) : updater;
      return {
        ...prev,
        [currentIsland]: {
          ...prev[currentIsland],
          performers: nextPerfs
        }
      };
    });
  };

  const allPerformersAcrossIslands = {
    ...(islandsData.lagoon?.performers || {}),
    ...(islandsData.trench?.performers || {}),
    ...(islandsData.cavern?.performers || {})
  };
  const totalDiscoveredAcrossIslands = Object.values(allPerformersAcrossIslands).filter(p => p?.unlocked).length;

  // Periodic Hype Dolphin Spawner
  useEffect(() => {
    if (!hasStarted) return;

    const spawnDolphin = () => {
      setDolphinKey((k) => k + 1);
      setDolphinActive(true);
      engineRef.current?.playDolphinChirp();

      setTimeout(() => {
        setDolphinActive(false);
      }, 11000);
    };

    const interval = setInterval(spawnDolphin, 16000);
    return () => clearInterval(interval);
  }, [hasStarted]);

  // Periodic Coin Drop Generator
  useEffect(() => {
    if (!hasStarted) return;
    const interval = setInterval(() => {
      setIslandsData((prev) => {
        const islandKey = currentIsland;
        const currentPerfs = prev[islandKey]?.performers || ISLANDS[islandKey]?.defaultPerformers || {};
        let changed = false;
        const nextPerfs = { ...currentPerfs };
        Object.keys(nextPerfs).forEach((id) => {
          if (nextPerfs[id]?.unlocked && !nextPerfs[id]?.isSleeping && !nextPerfs[id]?.hasCoin) {
            nextPerfs[id] = { ...nextPerfs[id], hasCoin: true };
            changed = true;
          }
        });
        if (!changed) return prev;
        return {
          ...prev,
          [islandKey]: {
            ...prev[islandKey],
            performers: nextPerfs
          }
        };
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [hasStarted, currentIsland]);

  // Passive coin generation from Neon Anemone relic (+2 coins every 30s)
  useEffect(() => {
    if (!hasStarted || !ownedDecorations.includes('neon_anemone')) return;
    const interval = setInterval(() => {
      setCoins((c) => c + 2);
      triggerCoinBonusToast('🌸 +2 🪙 ANEMONE REEF DRIFT!');
    }, 30000);
    return () => clearInterval(interval);
  }, [hasStarted, ownedDecorations]);

  // Cleanup audio engine on component unmount
  useEffect(() => {
    return () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  const startConcert = async () => {
    if (engineRef.current && engineRef.current.ctx?.state !== 'closed') {
      if (engineRef.current.ctx?.state === 'suspended') {
        try {
          await engineRef.current.ctx.resume();
        } catch (e) {
          console.warn('Audio resume deferred:', e);
        }
      }
      setHasStarted(true);
      return;
    }

    setIsLoading(true);
    try {
      const engine = new JellyAudioEngine();
      await engine.init(allPerformersAcrossIslands, volumes, currentIsland);

      // Apply sleep states across performers
      Object.keys(allPerformersAcrossIslands).forEach((id) => {
        if (allPerformersAcrossIslands[id]?.isSleeping) {
          engine.setMute(id, true);
        }
      });

      // Apply saved channel volume faders
      Object.keys(volumes).forEach((id) => {
        if (allPerformersAcrossIslands[id]?.unlocked) {
          engine.setPerformerVolume(id, volumes[id]);
        }
      });

      // Switch to active island acoustics
      engine.switchIsland(currentIsland);

      engineRef.current = engine;
      setAudioEngineState(engine);
    } catch (err) {
      console.warn('Audio engine start notice:', err);
    } finally {
      setIsLoading(false);
      setHasStarted(true);
    }
  };

  // Recover audio engine automatically if HMR remounted while hasStarted is true
  useEffect(() => {
    if (hasStarted && (!engineRef.current || engineRef.current.ctx?.state === 'closed')) {
      startConcert();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted]);

  const togglePerformerSleep = (id) => {
    setPerformers((prev) => {
      const nextSleep = !prev[id].isSleeping;
      if (soloedPerformer && soloedPerformer !== id) {
        engineRef.current?.setMute(id, true);
      } else {
        engineRef.current?.setMute(id, nextSleep);
      }
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isSleeping: nextSleep,
          hasCoin: nextSleep ? false : prev[id].hasCoin
        }
      };
    });
  };

  const feedPerformer = (id, treatType) => {
    const levelsToAdd = treatType === 'donut' ? 2 : 1;
    const subBonus = ownedDecorations.includes('sunken_sub') ? 5000 : 0;
    const rushDuration = (treatType === 'donut' ? 20000 : 15000) + subBonus;

    let targetLevel = 1;
    setPerformers((prev) => {
      const currentLevel = prev[id]?.level || 1;
      targetLevel = Math.min(5, currentLevel + levelsToAdd);
      return {
        ...prev,
        [id]: {
          ...prev[id],
          level: targetLevel,
          isSupercharged: true,
          isSleeping: false
        }
      };
    });

    if (!soloedPerformer || soloedPerformer === id) {
      engineRef.current?.setMute(id, false);
    }
    const spec = JELLY_SPECIES[id];

    if (targetLevel >= 5) {
      triggerCoinBonusToast(`⭐ ${spec?.name || 'MONSTER'} IS NOW MAX LEVEL 5! 3x COINS!`);
      triggerComicPop('MAX LEVEL 5!', 'gold', '🌟');
    } else {
      triggerCoinBonusToast(`🧁 ${spec?.name || 'MONSTER'} LEVELED UP TO Lv.${targetLevel}! (+${targetLevel} COIN RATE)`);
      triggerComicPop('LEVEL UP!', 'green', '🧁');
    }

    setTimeout(() => {
      setPerformers((prev) => ({
        ...prev,
        [id]: { ...prev[id], isSupercharged: false }
      }));
    }, rushDuration);

    advanceQuest('feed_treats', 1);
    addFameXP(15);
  };

  const handleBandMemberClick = (member, e) => {
    if (!engineRef.current || engineRef.current.ctx?.state === 'closed') {
      startConcert();
    } else if (engineRef.current.ctx?.state === 'suspended') {
      engineRef.current.ctx.resume();
    }

    // Auto-collect monster coins when clicked/tapped
    if (performers[member]?.hasCoin) {
      collectCoin(member, e);
    }

    // 1. Breeding parent selection mode
    if (isSelectingParents) {
      if (selectedParents.includes(member)) return;
      const updated = [...selectedParents, member];
      setSelectedParents(updated);
      engineRef.current?.playMonsterSolo(member);

      if (updated.length === 2) {
        setCoins((c) => c - 10);
        setIsSelectingParents(false);
        setSelectedParents([]);
        setIncubatingEgg({ islandId: currentIsland, parents: updated, tapsRemaining: 3 });
        engineRef.current?.playClamPop();
        triggerCoinBonusToast('🔮 EGG LAID IN REMIX POD!');
      }
      return;
    }

    // 2. Feeding treats / Level Up & Sugar Rush mode
    if (activeTreat) {
      engineRef.current?.playNomSound();
      const treat = activeTreat;
      setActiveTreat(null);
      feedPerformer(member, treat);
      return;
    }

    // 3. DIRECT TAP TOGGLES SINGING / MUTED (SLEEP)
    const wasSleeping = performers[member]?.isSleeping;
    togglePerformerSleep(member);

    if (wasSleeping) {
      engineRef.current?.playMonsterSolo(member);
      triggerCoinBonusToast(`🎤 ${performers[member]?.name || member.toUpperCase()} IS SINGING!`);
    } else {
      triggerCoinBonusToast(`💤 ${performers[member]?.name || member.toUpperCase()} MUTED (TAP TO SING)`);
    }

    setPokedPerformer({
      id: member,
      timestamp: Date.now(),
      isTickled: true
    });

    setTimeout(() => {
      setPokedPerformer((prev) => prev?.id === member ? null : prev);
    }, 1350);

    advanceQuest('pet_creatures', 1);
  };

  const getCoinDropAmount = (id) => {
    const p = performers[id];
    if (!p) return 1;
    const discoBonus = ownedDecorations.includes('disco_coral') ? 1 : 0;
    return ((p.isSupercharged ? 3 : 1) * (p.level || 1)) + discoBonus;
  };

  const collectCoin = (id, e) => {
    const p = performers[id];
    const level = p?.level || 1;
    const isSuper = p?.isSupercharged;
    const baseAmount = getCoinDropAmount(id);
    const synergyExtra = squadSynergy.active ? (squadSynergy.extraCoins || 0) : 0;
    const totalAmount = baseAmount + synergyExtra;

    // Launch flying coin arc
    const startX = e?.clientX;
    const startY = e?.clientY;
    launchFlyingCoins({ count: Math.min(totalAmount, 6), startX, startY, totalAmount });

    // Award Fame XP and advance quest
    const fameXPToAdd = squadSynergy.active ? (squadSynergy.extraFameXP || 1) : 1;
    addFameXP(fameXPToAdd);
    advanceQuest('collect_coins', 1);

    if (squadSynergy.active && synergyExtra > 0) {
      triggerCoinBonusToast(`+${totalAmount} 🪙 SQUAD BONUS! (${squadSynergy.themeName})`);
    } else if (isSuper) {
      triggerCoinBonusToast(`+${totalAmount} 🪙 TRIPLE SUGAR DROP! (Lv.${level})`);
    } else if (level > 1) {
      triggerCoinBonusToast(`+${totalAmount} 🪙 DROP! (Lv.${level})`);
    }

    setPerformers((prev) => ({
      ...prev,
      [id]: { ...prev[id], hasCoin: false }
    }));
  };

  const buyTreat = (item, cost) => {
    if (coins < cost) return;
    setCoins((c) => c - cost);
    setActiveTreat(item);
  };

  const recruitInfo = {
    lagoon: { id: 'bob', name: 'BOB', icon: '📦', fullName: 'Boombox Bob', bonusMsg: '⭐ BOOMBOX BOB DELIVERED! +5 🪙' },
    trench: { id: 'vent', name: 'VENT', icon: '💨', fullName: 'Vent Cracker', bonusMsg: '🔥 VENT CRACKER DELIVERED! +5 🪙' },
    cavern: { id: 'nautilus', name: 'NAUTILUS', icon: '🐚', fullName: 'Echo Nautilus', bonusMsg: '🐚 ECHO NAUTILUS DELIVERED! +5 🪙' }
  }[currentIsland] || { id: 'bob', name: 'BOB', icon: '📦', fullName: 'Boombox Bob', bonusMsg: '⭐ DELIVERED! +5 🪙' };

  const handleRecruitPerformer = () => {
    const targetId = recruitInfo.id;
    if (coins < 15 || performers[targetId]?.unlocked) return;
    setCoins((c) => c - 15);

    setDolphinKey((k) => k + 1);
    setDolphinActive(true);
    engineRef.current?.playDolphinChirp();

    setTimeout(() => {
      setPerformers((prev) => ({
        ...prev,
        [targetId]: { ...prev[targetId], unlocked: true }
      }));
      engineRef.current?.playJackpotSound();
      engineRef.current?.unlockPerformer(targetId);
      engineRef.current?.setPerformerVolume(targetId, volumes[targetId] ?? 100);
      triggerCoinBonusToast(recruitInfo.bonusMsg);
      setCoins((c) => c + 5);
    }, 1800);

    setTimeout(() => {
      setDolphinActive(false);
    }, 11000);
  };

  const handleCrackEgg = () => {
    if (!incubatingEgg) return;
    const remaining = incubatingEgg.tapsRemaining - 1;

    if (remaining > 0) {
      engineRef.current?.playEggCrackSound(3 - remaining);
      setIncubatingEgg((prev) => ({ ...prev, tapsRemaining: remaining }));
    } else {
      const parents = incubatingEgg.parents;
      setIncubatingEgg(null);
      setTotalBreedsCount((c) => c + 1);
      engineRef.current?.playJackpotSound();

      // Resolve offspring deterministically based on parents recipe
      const targetSpecies = resolveBreedingOffspring(parents[0], parents[1]);
      const spec = JELLY_SPECIES[targetSpecies];
      const targetIsland = spec?.islandId || currentIsland;
      const targetPerfs = islandsData[targetIsland]?.performers || ISLANDS[targetIsland]?.defaultPerformers || {};
      const isAlreadyUnlocked = targetPerfs[targetSpecies]?.unlocked;
      const obeliskActive = ownedDecorations.includes('crystal_obelisk');

      if (!isAlreadyUnlocked) {
        // --- 1. BRAND NEW DISCOVERY ---
        const startLevel = obeliskActive ? 2 : 1;
        setIslandsData((prev) => ({
          ...prev,
          [targetIsland]: {
            ...prev[targetIsland],
            performers: {
              ...(prev[targetIsland]?.performers || {}),
              [targetSpecies]: {
                ...(prev[targetIsland]?.performers?.[targetSpecies] || {}),
                unlocked: true,
                level: startLevel
              }
            }
          }
        }));
        engineRef.current?.startHybridSynth(targetSpecies);
        engineRef.current?.setPerformerVolume(targetSpecies, volumes[targetSpecies] ?? 100);
        setCoins((c) => c + (spec?.hatchBonus || 10));
        triggerComicPop('NEW DISCOVERY!', 'cyan', '✨');

        setHatchModal({
          isNew: true,
          speciesName: spec?.name || 'Hybrid Monster',
          message: `Congratulations! Your parents (${JELLY_SPECIES[parents[0]]?.name} + ${JELLY_SPECIES[parents[1]]?.name}) created a brand-new hybrid species! It is now living on ${ISLANDS[targetIsland]?.name || 'the reef'}.${obeliskActive ? ' ✨ Sea Crystal Obelisk empowered this hatchling with +1 Bonus Level!' : ''}`,
          rewardText: `🎉 DISCOVERED: ${spec?.name || 'New Monster'}! (Lv.${startLevel}) +${spec?.hatchBonus || 10} 🪙 Discovery Bonus & New Musical Stem!`
        });
      } else {
        // --- 2. DUPLICATE BREEDING FUSION ---
        const currentLevel = targetPerfs[targetSpecies]?.level || 1;
        const canLevelUp = currentLevel < 5;
        const levelBoost = obeliskActive ? 2 : 1;
        const newLevel = canLevelUp ? Math.min(5, currentLevel + levelBoost) : 5;
        const bonusCoins = canLevelUp ? 15 : 30;

        setIslandsData((prev) => ({
          ...prev,
          [targetIsland]: {
            ...prev[targetIsland],
            performers: {
              ...(prev[targetIsland]?.performers || {}),
              [targetSpecies]: {
                ...(prev[targetIsland]?.performers?.[targetSpecies] || {}),
                level: newLevel,
                isSupercharged: true,
                isSleeping: false
              }
            }
          }
        }));
        if (!soloedPerformer || soloedPerformer === targetSpecies) {
          engineRef.current?.setMute(targetSpecies, false);
        }
        setCoins((c) => c + bonusCoins);
        triggerComicPop('FUSION LEVEL UP!', 'gold', '🧬');

        setHatchModal({
          isNew: false,
          speciesName: spec?.name || 'Hybrid Monster',
          message: canLevelUp
            ? `You already have ${spec?.name} in your band! The newly hatched duplicate fused with your performer, leveling it up to Lv. ${newLevel}! Its coin generation rate has increased to +${newLevel} per drop!${obeliskActive ? ' (Crystal Obelisk bonus +1 Lv applied!)' : ''}`
            : `You already have ${spec?.name} at MAX LEVEL 5! The egg exploded into a golden coin shower and gave your band member a Supercharged Sugar Rush!`,
          rewardText: canLevelUp
            ? `⭐ FUSION LEVEL UP: ${spec?.name} is now Lv.${newLevel}! +${bonusCoins} 🪙 & Sugar Rush!`
            : `🌟 MAX LEVEL SUPER JACKPOT: +${bonusCoins} 🪙 & 3x Sugar Rush!`
        });
      }

      advanceQuest('remix_breed', 1);
      addFameXP(40);
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setTempoSpeed(newSpeed);
    engineRef.current?.setPlaybackRate(newSpeed);
  };

  const toggleNightRave = () => {
    const nextNight = !isNightRave;
    setIsNightRave(nextNight);
    engineRef.current?.setNightRaveAcoustics(nextNight);
    triggerCoinBonusToast(nextNight ? '🌙 MIDNIGHT RAVE ACTIVATED!' : '☀️ SUNLIT REEF RESTORED!');
  };

  const buyCostume = (costumeId, cost) => {
    if (coins < cost || ownedCostumes.includes(costumeId)) return;
    setCoins((c) => c - cost);
    setOwnedCostumes((prev) => [...prev, costumeId]);
    engineRef.current?.playJackpotSound();
    triggerCoinBonusToast('🎩 UNLOCKED REEF ACCESSORY!');
    addFameXP(25);
  };

  const equipCostume = (performerId, costumeId) => {
    setEquippedCostumes((prev) => {
      const next = { ...prev };
      if (next[performerId] === costumeId) {
        delete next[performerId];
      } else {
        next[performerId] = costumeId;
      }
      return next;
    });
    engineRef.current?.playClamPop();
    advanceQuest('dress_uniform', 1);
    addFameXP(10);
  };

  const buyDecoration = (decorId, cost) => {
    if (coins < cost || ownedDecorations.includes(decorId)) return;
    setCoins((c) => c - cost);
    setIslandsData((prev) => ({
      ...prev,
      [currentIsland]: {
        ...prev[currentIsland],
        ownedDecorations: [...(prev[currentIsland]?.ownedDecorations || []), decorId]
      }
    }));
    engineRef.current?.playJackpotSound();
    triggerCoinBonusToast('🪸 MONUMENT PLACED ON SEAFLOOR!');
  };

  const handleVolumeChange = (id, vol) => {
    setIslandsData((prev) => ({
      ...prev,
      [currentIsland]: {
        ...prev[currentIsland],
        volumes: {
          ...(prev[currentIsland]?.volumes || {}),
          [id]: vol
        }
      }
    }));
    engineRef.current?.setPerformerVolume(id, vol);
  };

  const cyclePerformerVolume = (id) => {
    const cur = volumes[id] ?? 1.0;
    const next = cur < 0.9 ? 1.0 : cur < 1.4 ? 1.5 : cur < 1.9 ? 2.0 : 0.5;

    handleVolumeChange(id, next);
    if (performers[id]?.isSleeping) {
      togglePerformerSleep(id);
    }
    engineRef.current?.playMonsterSolo(id);
  };

  const handleToggleSolo = (id) => {
    setSoloedPerformer((prev) => {
      const nextSolo = prev === id ? null : id;
      if (nextSolo) {
        Object.keys(performers).forEach((name) => {
          if (name === nextSolo) {
            engineRef.current?.setMute(name, false);
          } else {
            engineRef.current?.setMute(name, true);
          }
        });
      } else {
        Object.keys(performers).forEach((name) => {
          engineRef.current?.setMute(name, performers[name]?.isSleeping ?? false);
        });
      }
      return nextSolo;
    });
  };

  const handleTravelToIsland = (targetIslandId) => {
    if (targetIslandId === currentIsland || !unlockedIslands.includes(targetIslandId)) return;
    setIsMapOpen(false);
    setIsDiving(true);
    setDiveDestination(ISLANDS[targetIslandId]?.name || '');
    engineRef.current?.playClamPop();
    engineRef.current?.switchIsland(targetIslandId);

    // Apply destination island channel volumes & mute states & synths
    const destVolumes = islandsData[targetIslandId]?.volumes || {};
    const destPerfs = islandsData[targetIslandId]?.performers || ISLANDS[targetIslandId]?.defaultPerformers || {};
    Object.keys(destPerfs).forEach((id) => {
      if (destPerfs[id]?.unlocked) {
        if (targetIslandId !== 'lagoon' || !['diva', 'zap', 'bob'].includes(id)) {
          engineRef.current?.startHybridSynth(id);
        }
        if (destPerfs[id]?.isSleeping) {
          engineRef.current?.setMute(id, true);
        } else {
          engineRef.current?.setMute(id, false);
        }
      }
    });

    Object.keys(destVolumes).forEach((id) => {
      engineRef.current?.setPerformerVolume(id, destVolumes[id]);
    });

    setTimeout(() => {
      setCurrentIsland(targetIslandId);
      setIsDiving(false);
      triggerCoinBonusToast(`🚢 WELCOME TO ${ISLANDS[targetIslandId].name.toUpperCase()}!`);
    }, 700);
  };

  const handleUnlockIsland = (targetIslandId, cost) => {
    if (coins < cost || unlockedIslands.includes(targetIslandId)) return;
    setCoins((c) => c - cost);
    setUnlockedIslands((prev) => [...prev, targetIslandId]);
    engineRef.current?.playJackpotSound();
    triggerCoinBonusToast(`🎉 UNLOCKED ${ISLANDS[targetIslandId].name.toUpperCase()}!`);
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all game progress? Unlocked jellies across all islands, levels, costumes, and relics will be restored to defaults.')) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      setCoins(25);
      setTotalBreedsCount(0);
      setCurrentIsland('lagoon');
      setUnlockedIslands(['lagoon']);
      setIslandsData({
        lagoon: { performers: { ...ISLANDS.lagoon.defaultPerformers }, ownedDecorations: [], volumes: INITIAL_VOLUMES },
        trench: { performers: { ...ISLANDS.trench.defaultPerformers }, ownedDecorations: [], volumes: INITIAL_VOLUMES },
        cavern: { performers: { ...ISLANDS.cavern.defaultPerformers }, ownedDecorations: [], volumes: INITIAL_VOLUMES }
      });
      setOwnedCostumes([]);
      setEquippedCostumes({});
      setRhythmHighScores({});
      setSoloedPerformer(null);
      setBandFameXP(0);
      setUnlockedStickers(['sticker_diva', 'sticker_bob']);
      setDailyQuests(generateDailyQuests());
      setCompletedQuestIds([]);
      engineRef.current?.switchIsland('lagoon');
      triggerCoinBonusToast('🔄 Save Progress Reset');
    }
  };

  const handleSaveRhythmHighScore = (islandId, stars, newScore) => {
    setRhythmHighScores((prev) => {
      const prevRecord = prev[islandId] || { stars: 0, score: 0 };
      return {
        ...prev,
        [islandId]: {
          stars: Math.max(prevRecord.stars || 0, stars),
          score: Math.max(prevRecord.score || 0, newScore)
        }
      };
    });
    advanceQuest('rhythm_combo', 1);
    addFameXP(25);
  };

  const triggerDolphinFlip = (e) => {
    e.stopPropagation();
    if (dolphinFlipping) return;

    setDolphinFlipping(true);
    engineRef.current?.playDolphinChirp();

    const rect = e.currentTarget.getBoundingClientRect();
    setMysteryCrate({
      x: Math.max(80, Math.min(window.innerWidth - 120, rect.left + 50)),
      y: rect.top + 70
    });

    setTimeout(() => {
      setDolphinFlipping(false);
    }, 750);
  };

  const collectMysteryCrate = (e) => {
    engineRef.current?.playJackpotSound();
    launchFlyingCoins({ count: 5, startX: e?.clientX || window.innerWidth / 2, startY: e?.clientY || window.innerHeight / 2, totalAmount: 5 });
    setMysteryCrate(null);
    triggerCoinBonusToast('🎁 +5 🪙 CRATE JACKPOT!');
    triggerComicPop('+5 COINS!', 'gold', '🎁');
  };

  const handleClamCollect = (e) => {
    engineRef.current?.playClamPop();
    launchFlyingCoins({ count: 3, startX: e?.clientX || window.innerWidth * 0.55, startY: e?.clientY || window.innerHeight * 0.88, totalAmount: 3 });
    triggerCoinBonusToast('✨ +3 🪙 RAINBOW PEARL!');
    triggerComicPop('+3 COINS!', 'gold', '🦪');
  };

  const handleFanClubTap = (e) => {
    engineRef.current?.playCheerPop();
    launchFlyingCoins({ count: 1, startX: e?.clientX || window.innerWidth * 0.88, startY: e?.clientY || window.innerHeight * 0.88, totalAmount: 1 });
    triggerCoinBonusToast('+1 🪙 FAN LOVE!');
  };

  const handleBubblePop = (e) => {
    e.stopPropagation();
    engineRef.current?.playClamPop();
    launchFlyingCoins({ count: 1, startX: e.clientX, startY: e.clientY, totalAmount: 1 });
    triggerCoinBonusToast('🫧 POP! +1 🪙');
  };

  const activeSingersCount = Object.values(performers).filter((p) => p.unlocked && !p.isSleeping).length;

  return (
    <div 
      className="ocean-stage"
      style={{
        width: '100vw',
        height: '100vh',
        background: isNightRave
          ? currentIslandConfig.bgGradientNight
          : currentIslandConfig.bgGradientDay,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Cartoon Rippling Water Surface at Ocean Top */}
      <div className="cartoon-water-surface" />

      {!isNightRave ? (
        <>
          <div className="day-sunbeam-1" />
          <div className="day-sunbeam-2" />
        </>
      ) : (
        <>
          <div className="night-laser-cyan" />
          <div className="night-laser-magenta" />
        </>
      )}

      {/* 🌊 Living Animated Ocean Fauna: Schools of Fish, Swimming Turtle, Floating Notes */}
      <AnimatedOceanLife 
        islandId={currentIsland} 
        isNight={isNightRave} 
        isAnySinging={activeSingersCount > 0} 
      />

      {currentIsland === 'lagoon' && (
        <KelpForestWings tempoSpeed={tempoSpeed} isNight={isNightRave} />
      )}
      {currentIsland === 'trench' && (
        <MagmaTrenchScenery isNight={isNightRave} />
      )}
      {currentIsland === 'cavern' && (
        <BioluminescentCavernScenery isNight={isNightRave} />
      )}

      {bonusToast && (
        <div key={bonusToast.id} className="bonus-toast-anim">
          {bonusToast.text}
        </div>
      )}

      {/* Interactive Clickable Popping Bubbles */}
      <div onClick={handleBubblePop} title="Pop the bubble! +1 🪙" className="ambient-bubble clickable-bubble" style={{ left: '10%', width: '22px', height: '22px', animationDuration: '9s', animationDelay: '0s' }} />
      <div onClick={handleBubblePop} title="Pop the bubble! +1 🪙" className="ambient-bubble clickable-bubble" style={{ left: '25%', width: '32px', height: '32px', animationDuration: '14s', animationDelay: '3s' }} />
      <div onClick={handleBubblePop} title="Pop the bubble! +1 🪙" className="ambient-bubble clickable-bubble" style={{ left: '72%', width: '18px', height: '18px', animationDuration: '11s', animationDelay: '1.5s' }} />
      <div onClick={handleBubblePop} title="Pop the bubble! +1 🪙" className="ambient-bubble clickable-bubble" style={{ left: '88%', width: '26px', height: '26px', animationDuration: '13s', animationDelay: '5s' }} />

      {/* Responsive Top Header Bar */}
      <header className="game-header-bar">
        {/* Top Left: Plaque & Compact Single-Row Action Toolbar */}
        <div className="header-hud-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
            {/* Carved Wooden Island Signpost (MSM Style) */}
            <div 
              onClick={() => setIsMapOpen(true)}
              className="cartoon-hud-token"
              style={{
                background: 'linear-gradient(180deg, #92400e 0%, #78350f 40%, #451a03 100%)',
                color: '#fef08a',
                padding: '6px 14px',
                minHeight: '48px',
                gap: '9px',
                cursor: 'pointer'
              }}
              title="Jelly Jams: Musical Monster Reef — Tap for Island Map"
            >
              <span style={{ fontSize: '26px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>🪼</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: "'Lilita One', 'Fredoka', cursive, sans-serif",
                  fontSize: '15px',
                  fontWeight: '900',
                  color: '#fef08a',
                  lineHeight: 1,
                  letterSpacing: '0.6px'
                }}>
                  JELLY JAMS
                </span>
                <span style={{
                  fontSize: '10.5px',
                  fontWeight: '900',
                  color: '#bae6fd',
                  marginTop: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}>
                  🏝️ {currentIslandConfig.name.toUpperCase()} ▾
                </span>
              </div>
            </div>

            {hasStarted && (
              <>
                {/* 1. DEX ALMANAC */}
                <button
                  type="button"
                  onClick={() => setIsDexOpen(true)}
                  className="cartoon-hud-token game-btn-yellow"
                  title="Open Jelly Dex Almanac"
                >
                  <span style={{ fontSize: '22px' }}>📖</span>
                  <span>DEX</span>
                </button>

                {/* 2. DAILY QUESTS & STICKERS */}
                <button
                  type="button"
                  onClick={() => setIsQuestsOpen(true)}
                  className="cartoon-hud-token game-btn-purple"
                  style={{ position: 'relative' }}
                  title="Open Daily Quests & Sticker Album"
                >
                  <span style={{ fontSize: '22px' }}>⭐</span>
                  <span>QUESTS</span>
                  {dailyQuests.filter(q => (q.progress || 0) >= q.target && !q.claimed).length > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      background: '#ef4444',
                      color: '#ffffff',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      fontSize: '12px',
                      fontWeight: '900',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
                    }}>!</span>
                  )}
                </button>

                {/* 3. LUCKY WHEEL */}
                <button
                  type="button"
                  onClick={() => setIsWheelOpen(true)}
                  className="cartoon-hud-token game-btn-pink"
                  title="Spin the Prize Wheel"
                >
                  <span style={{ fontSize: '22px' }}>🎡</span>
                  <span>WHEEL</span>
                </button>

                {/* 4. ECHO JAM MEMORY GAME */}
                <button
                  type="button"
                  onClick={() => setIsEchoJamOpen(true)}
                  className="cartoon-hud-token game-btn-cyan"
                  title="Play Reef Echo Jam Memory Game"
                >
                  <span style={{ fontSize: '22px' }}>🎮</span>
                  <span>ECHO</span>
                </button>

                {/* 5. RHYTHM RUSH BEATS GAME */}
                <button
                  type="button"
                  onClick={() => setIsRhythmRushOpen(true)}
                  className="cartoon-hud-token game-btn-green"
                  title="Play Rhythm Rush Beats Mini-Game"
                >
                  <span style={{ fontSize: '22px' }}>🎵</span>
                  <span>RUSH</span>
                </button>

                {/* 6. DAY / NIGHT RAVE TOGGLE */}
                <button
                  type="button"
                  onClick={toggleNightRave}
                  className={`cartoon-hud-token ${isNightRave ? 'game-btn-purple' : 'game-btn-yellow'}`}
                  title="Toggle Day / Night Rave"
                >
                  <span style={{ fontSize: '22px' }}>{isNightRave ? '🌙' : '☀️'}</span>
                  <span>{isNightRave ? 'RAVE' : 'DAY'}</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Top Center: DJ Console & Action Banner */}
        <div className="header-hud-center">
          {hasStarted && (
            <DJConsole
              currentSpeed={tempoSpeed}
              onSpeedChange={handleSpeedChange}
              onOpenMixer={() => setIsMixerOpen(true)}
              onOpenDJBooth={() => setIsDJBoothOpen(true)}
              onTriggerConfetti={() => handleTriggerLiveFX('confetti')}
              onTriggerBubbles={() => handleTriggerLiveFX('bubbles')}
              onTriggerSparks={() => handleTriggerLiveFX('sparks')}
            />
          )}

          {isSelectingParents ? (
            <div style={{
              background: 'linear-gradient(180deg, #d8b4fe 0%, #a855f7 40%, #7e22ce 100%)',
              color: '#ffffff',
              padding: '8px 22px',
              borderRadius: '9999px',
              fontFamily: "'Fredoka', 'Lilita One', sans-serif",
              fontSize: '18px',
              fontWeight: '900',
              letterSpacing: '0.8px',
              boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.8), inset 0 -4px 0 rgba(0,0,0,0.3), 0 6px 0 #090d16, 0 12px 24px rgba(0,0,0,0.5)',
              border: '4px solid #090d16',
              whiteSpace: 'nowrap',
              paintOrder: 'stroke fill',
              WebkitTextStroke: '3.5px #090d16',
              textShadow: '0 3px 0 #090d16'
            }}>
              🧬 TAP 2 MONSTERS TO REMIX! ({selectedParents.length}/2)
            </div>
          ) : activeTreat && (
            <div style={{
              background: activeTreat === 'donut' 
                ? 'linear-gradient(180deg, #f472b6 0%, #ec4899 40%, #db2777 100%)' 
                : 'linear-gradient(180deg, #fff066 0%, #facc15 40%, #ca8a04 100%)',
              color: '#ffffff',
              padding: '8px 22px',
              borderRadius: '9999px',
              fontFamily: "'Fredoka', 'Lilita One', sans-serif",
              fontSize: '18px',
              fontWeight: '900',
              letterSpacing: '0.8px',
              boxShadow: 'inset 0 3px 0 rgba(255,255,255,0.8), inset 0 -4px 0 rgba(0,0,0,0.3), 0 6px 0 #090d16, 0 12px 24px rgba(0,0,0,0.5)',
              border: '4px solid #090d16',
              whiteSpace: 'nowrap',
              paintOrder: 'stroke fill',
              WebkitTextStroke: '3.5px #090d16',
              textShadow: '0 3px 0 #090d16'
            }}>
              {activeTreat === 'donut' 
                ? '🍩 TAP A MONSTER TO FEED! (+2 LV)'
                : '🧁 TAP A MONSTER TO FEED! (+1 LV)'}
            </div>
          )}
        </div>

        {/* Top Right: Squad Badge, Bank HUD & Settings */}
        <div className="header-hud-right">
          {hasStarted && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {squadSynergy.active && (
                <button
                  type="button"
                  onClick={() => setIsWardrobeOpen(true)}
                  className="cartoon-hud-token game-btn-yellow"
                  title={`${squadSynergy.themeName} Squad (${squadSynergy.count} Match): ${squadSynergy.bonusText}`}
                >
                  <span style={{ fontSize: '22px' }}>{squadSynergy.icon}</span>
                  <span>SQUAD x{squadSynergy.count}</span>
                </button>
              )}

              {/* MSM Style Carved Level & Fame Progress Bar */}
              <button
                onClick={() => setIsQuestsOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                  border: '3px solid #090d16',
                  borderRadius: '20px',
                  padding: '4px 12px 4px 6px',
                  boxShadow: '0 4px 0 #090d16, inset 0 2px 0 rgba(255,255,255,0.2)',
                  cursor: 'pointer'
                }}
                title={`Band Fame: ${currentFameRank.title} (Level ${currentFameRank.level}) - ${currentFameRank.currentLevelXP}/${currentFameRank.neededXP} XP • ${currentFameRank.perk}`}
              >
                <span style={{
                  background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                  color: '#ffffff',
                  borderRadius: '12px',
                  padding: '3px 8px',
                  fontSize: '12px',
                  fontWeight: '900',
                  border: '2px solid #090d16',
                  fontFamily: "'Lilita One', 'Fredoka', cursive",
                  letterSpacing: '0.5px'
                }}>
                  ⭐ Lv.{currentFameRank.level}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '68px' }}>
                  <div style={{
                    width: '100%',
                    height: '10px',
                    background: '#090d16',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1.5px solid #334155',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: `${currentFameRank.progressPercent}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #22c55e, #86efac)',
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: '900', color: '#94a3b8', textAlign: 'center', lineHeight: 1 }}>
                    {currentFameRank.progressPercent}% FAME
                  </span>
                </div>
              </button>

              <div 
                ref={bankBadgeRef}
                className={`game-coin-badge ${bankPulsing ? 'bank-pulse-active bank-impact-active' : ''}`}
                style={{
                  padding: '8px 20px',
                  gap: '10px'
                }}
              >
                <span style={{ fontSize: '32px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>🪙</span>
                <span style={{
                  color: '#fef08a',
                  fontSize: '28px',
                  fontFamily: "'Fredoka', 'Lilita One', sans-serif",
                  fontWeight: '900',
                  letterSpacing: '1px',
                  paintOrder: 'stroke fill',
                  WebkitTextStroke: '3px #78350f',
                  textShadow: '0 3px 0 #451a03'
                }}>
                  {coins}
                </span>
              </div>

              <button
                onClick={handleResetProgress}
                className="game-btn game-btn-round game-btn-red"
                title="Reset saved progress back to default"
              >
                <span style={{ fontSize: '22px' }}>🔄</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hype Dolphin */}
      {hasStarted && dolphinActive && (
        <HypeDolphin
          key={dolphinKey}
          isFlipping={dolphinFlipping}
          onClick={triggerDolphinFlip}
        />
      )}

      {/* Dropped Crate */}
      {mysteryCrate && (
        <TreasureCrate
          position={mysteryCrate}
          onCollect={collectMysteryCrate}
        />
      )}

      {/* Main Stage */}
      {!hasStarted ? (
        <GameTitleScreen
          onStart={startConcert}
          isLoading={isLoading}
        />
      ) : (
        <div className="performers-stage-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
          {useWebGLStage ? (
            <WebGLStage
              islandId={currentIsland}
              performers={performers}
              audioEngineRef={engineRef}
              volumes={volumes}
              tempoSpeed={tempoSpeed}
              isNight={isNightRave}
              selectedParents={selectedParents}
              isSelectingParents={isSelectingParents}
              onPerformerClick={handleBandMemberClick}
            />
          ) : (
            <LivingHabitatWorld
              islandId={currentIsland}
              performers={performers}
              volumes={volumes}
              tempoSpeed={tempoSpeed}
              isNight={isNightRave}
              soloedPerformer={soloedPerformer}
              selectedParents={selectedParents}
              isSelectingParents={isSelectingParents}
              equippedCostumes={equippedCostumes}
              pokedPerformer={pokedPerformer}
              fameRank={currentFameRank.level}
              stageFXList={stageFXList}
              zoomLevel={zoomLevel}
              onZoomChange={setZoomLevel}
              onPerformerClick={handleBandMemberClick}
              onCoinCollect={collectCoin}
              onToggleSleep={togglePerformerSleep}
              onCycleVolume={cyclePerformerVolume}
              onToggleSolo={handleToggleSolo}
              onPopBubble={handlePopStageFXBubble}
              coins={coins}
              onFeedMonster={(id, treatType) => {
                const cost = treatType === 'donut' ? 12 : 5;
                if (coins >= cost) {
                  setCoins((c) => Math.max(0, c - cost));
                  engineRef.current?.playNomSound();
                  feedPerformer(id, treatType);
                }
              }}
            />
          )}

          {/* Touch-First Floating 3D Cartoon Zoom Controls */}
          <CartoonTouchControls
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetView={handleResetZoom}
          />
        </div>
      )}

      {/* Seafloor Activity Bar: Relative Responsive Flex Slots */}
      {hasStarted && (
        <div className="seafloor-activity-bar">
          <div className="seafloor-slot seafloor-slot-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BakeryTruck
              coins={coins}
              onBuyTreat={buyTreat}
              onUnlockBob={handleRecruitPerformer}
              bobUnlocked={performers[recruitInfo.id]?.unlocked}
              activeTreat={activeTreat}
              isNight={isNightRave}
              onOpenWardrobe={() => setIsWardrobeOpen(true)}
              onOpenDecorations={() => setIsDecorationsOpen(true)}
              recruitName={recruitInfo.name}
              recruitIcon={recruitInfo.icon}
              recruitUnlocked={performers[recruitInfo.id]?.unlocked}
              onRecruit={handleRecruitPerformer}
            />

            <SubmarineTravelDock
              onOpenMap={() => setIsMapOpen(true)}
              currentIslandName={currentIslandConfig.name}
            />
          </div>

          <div className="seafloor-slot seafloor-slot-center">
            <CoralRemixPod
              coins={coins}
              egg={incubatingEgg}
              isSelecting={isSelectingParents}
              onStartSelect={() => {
                setIsSelectingParents(true);
                setSelectedParents([]);
              }}
              onCancelSelect={() => {
                setIsSelectingParents(false);
                setSelectedParents([]);
              }}
              onCrackEgg={handleCrackEgg}
              isNight={isNightRave}
            />

            <PearlClam
              onPearlCollect={handleClamCollect}
              isNight={isNightRave}
            />

            <RainbowAnemones
              islandId={currentIsland}
              engineRef={engineRef}
              onAddCoin={(amt, e) => {
                launchFlyingCoins({ count: amt, startX: e?.clientX, startY: e?.clientY, totalAmount: amt });
              }}
              onTriggerToast={triggerCoinBonusToast}
            />
          </div>

          <div className="seafloor-slot seafloor-slot-right">
            <ReefFanClub
              activeCount={activeSingersCount}
              isNight={isNightRave}
              onFanTap={handleFanClubTap}
            />
          </div>
        </div>
      )}

      {/* 🦀 Interactive Cartoon Reef Critters: Snappy the DJ Crab, Wiggle Eel Trio & Puffy */}
      {hasStarted && (
        <InteractiveReefCritters
          engineRef={engineRef}
          onAddCoin={(amt, e) => {
            launchFlyingCoins({ count: amt, startX: e?.clientX, startY: e?.clientY, totalAmount: amt });
          }}
          onTriggerToast={triggerCoinBonusToast}
        />
      )}

      {/* Seafloor Relic Monuments */}
      {hasStarted && (
        <SeafloorDecorations 
          ownedDecorations={ownedDecorations} 
          isNight={isNightRave} 
        />
      )}

      {/* Cartoon Wavy Sand Dunes & Seafloor Marine Life */}
      <CartoonSeafloor islandId={currentIsland} isNight={isNightRave} />

      {/* Prominent Hatch Celebration & Duplicate Notice Modal */}
      <HatchModal 
        data={hatchModal} 
        onClose={() => setHatchModal(null)} 
      />

      {/* 📖 The Jelly Dex: Collection Almanac & Breeding Lab Guide */}
      <JellyDexModal
        isOpen={isDexOpen}
        onClose={() => setIsDexOpen(false)}
        performers={allPerformersAcrossIslands}
        totalBreedsCount={totalBreedsCount}
      />

      {/* 🎛️ Studio Mixing Console */}
      <MixerConsoleModal
        isOpen={isMixerOpen}
        onClose={() => setIsMixerOpen(false)}
        performers={performers}
        volumes={volumes}
        onVolumeChange={handleVolumeChange}
        onToggleMute={togglePerformerSleep}
        soloedPerformer={soloedPerformer}
        onToggleSolo={handleToggleSolo}
        isNight={isNightRave}
        onToggleNight={toggleNightRave}
        tempoSpeed={tempoSpeed}
        onSpeedChange={handleSpeedChange}
      />

      {/* 🎩 Reef Wardrobe & Cosmetics Boutique */}
      <WardrobeModal
        isOpen={isWardrobeOpen}
        onClose={() => setIsWardrobeOpen(false)}
        coins={coins}
        ownedCostumes={ownedCostumes}
        equippedCostumes={equippedCostumes}
        performers={allPerformersAcrossIslands}
        onBuyCostume={buyCostume}
        onEquipCostume={equipCostume}
        onEquipAllCostume={handleEquipAllCostume}
      />

      {/* 🌟 Hudson's Daily Star Quests & Holographic Sticker Album */}
      <QuestsModal
        isOpen={isQuestsOpen}
        onClose={() => setIsQuestsOpen(false)}
        quests={dailyQuests}
        unlockedStickers={unlockedStickers}
        onClaimQuest={handleClaimQuest}
        engineRef={engineRef}
      />

      {/* 🪸 Seafloor Decorations & Happiness Multipliers Shop */}
      <DecorationsModal
        isOpen={isDecorationsOpen}
        onClose={() => setIsDecorationsOpen(false)}
        coins={coins}
        ownedDecorations={ownedDecorations}
        onBuyDecoration={buyDecoration}
      />

      {/* 🗺️ Island Archipelago World Map Modal */}
      <IslandMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        currentIsland={currentIsland}
        unlockedIslands={unlockedIslands}
        coins={coins}
        islandPerformers={{
          lagoon: islandsData.lagoon?.performers,
          trench: islandsData.trench?.performers,
          cavern: islandsData.cavern?.performers
        }}
        onSelectIsland={handleTravelToIsland}
        onUnlockIsland={handleUnlockIsland}
      />

      {/* 🚢 Deep Dive Submarine Transition Overlay */}
      <DiveTransition
        isDiving={isDiving}
        destinationName={diveDestination}
      />

      {/* 🎮 Simon Says Musical Memory: Reef Echo Jam */}
      <ReefEchoJamModal
        isOpen={isEchoJamOpen}
        onClose={() => setIsEchoJamOpen(false)}
        performers={performers}
        currentIsland={currentIsland}
        onWinJackpot={(amount) => {
          launchFlyingCoins({ count: 8, startX: window.innerWidth / 2, startY: window.innerHeight / 2, totalAmount: amount });
          triggerCoinBonusToast(`🎉 ECHO JAM JACKPOT! +${amount} 🪙`);
          advanceQuest('echo_jam_win', 1);
          addFameXP(30);
        }}
        onTriggerComicPop={triggerComicPop}
        engineRef={engineRef}
      />

      {/* 🎧 Live DJ Booth & Scratch Turntable */}
      <DJBoothModal
        isOpen={isDJBoothOpen}
        onClose={() => setIsDJBoothOpen(false)}
        engineRef={engineRef}
        onAddCoins={(amount) => {
          launchFlyingCoins({ count: 6, startX: window.innerWidth / 2, startY: window.innerHeight / 2, totalAmount: amount });
          triggerCoinBonusToast(`🎉 DJ FEVER BONUS! +${amount} 🪙`);
        }}
        onTriggerComicPop={triggerComicPop}
      />

      {/* 🎵 Rhythm Rush: Bubble Beats Arcade Mini-Game */}
      <RhythmRushModal
        isOpen={isRhythmRushOpen}
        onClose={() => setIsRhythmRushOpen(false)}
        currentIsland={currentIsland}
        engineRef={engineRef}
        highScores={rhythmHighScores}
        onSaveHighScore={handleSaveRhythmHighScore}
        onAddCoins={(amount) => {
          launchFlyingCoins({ count: 8, startX: window.innerWidth / 2, startY: window.innerHeight / 2, totalAmount: amount });
          triggerCoinBonusToast(`🎉 RHYTHM JACKPOT! +${amount} 🪙`);
        }}
        onTriggerComicPop={triggerComicPop}
      />

      {/* 🎡 Lucky Starfish Daily Carnival Prize Wheel */}
      <LuckyStarfishWheelModal
        isOpen={isWheelOpen}
        onClose={() => setIsWheelOpen(false)}
        coins={coins}
        engineRef={engineRef}
        onAwardCoins={(amt) => {
          advanceQuest('lucky_spin', 1);
          addFameXP(15);
          if (amt > 0) {
            launchFlyingCoins({ count: Math.min(amt, 8), startX: window.innerWidth / 2, startY: window.innerHeight / 2, totalAmount: amt });
          } else {
            setCoins((c) => Math.max(0, c + amt));
          }
        }}
        onAwardTreat={(treatType) => {
          advanceQuest('lucky_spin', 1);
          addFameXP(15);
          setActiveTreat(treatType);
          triggerComicPop('WON TREAT!', 'pink', '🍩');
        }}
        onAwardEgg={() => {
          advanceQuest('lucky_spin', 1);
          addFameXP(15);
          setIncubatingEgg({ islandId: currentIsland, parents: ['diva', 'zap'], tapsRemaining: 3 });
          triggerComicPop('MYSTERY EGG!', 'purple', '🔮');
        }}
        onAwardCostume={(costumeId) => {
          advanceQuest('lucky_spin', 1);
          addFameXP(15);
          if (!ownedCostumes.includes(costumeId)) {
            setOwnedCostumes((prev) => [...prev, costumeId]);
          }
          triggerComicPop('PARTY HAT!', 'gold', '🎩');
        }}
        onTriggerToast={triggerCoinBonusToast}
      />

      {/* 💥 Floating Comic Pop-Up Text FX */}
      <ComicPopText
        item={comicPopItem}
        onDone={() => setComicPopItem(null)}
      />

      {/* 🪙 60fps Quadratic Bézier Flying Coin Arc & Magnet Juice Overlay */}
      <FlyingCoinOverlay
        ref={flyingCoinRef}
        targetRef={bankBadgeRef}
        onCoinArrived={handleCoinArrived}
      />
    </div>
  );
}