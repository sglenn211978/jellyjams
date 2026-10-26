// =========================================
// HUDSON'S DAILY STAR QUESTS & STICKER BOOK
// =========================================

export const COLLECTIBLE_STICKERS = [
  {
    id: 'sticker_diva',
    title: 'Sparkle Diva',
    emoji: '🪼',
    color: '#f472b6',
    border: '#ec4899',
    desc: 'The pink pop queen of Sunlit Lagoon!'
  },
  {
    id: 'sticker_bob',
    title: 'Boombox Bob',
    emoji: '📻',
    color: '#fb923c',
    border: '#ea580c',
    desc: 'Dropping heavy 808 bass beats on the reef.'
  },
  {
    id: 'sticker_zap',
    title: 'Electric Zap',
    emoji: '⚡',
    color: '#facc15',
    border: '#eab308',
    desc: 'Fast arpeggios that shock the dance floor!'
  },
  {
    id: 'sticker_pirate',
    title: 'Pirate Captain',
    emoji: '🏴‍☠️',
    color: '#38bdf8',
    border: '#0284c7',
    desc: 'Sailing the seven seas in search of golden coins!'
  },
  {
    id: 'sticker_rocker',
    title: 'Neon Rocker',
    emoji: '🎸',
    color: '#c084fc',
    border: '#9333ea',
    desc: 'Loud guitar distortion underwater!'
  },
  {
    id: 'sticker_astronaut',
    title: 'Space Cadet',
    emoji: '🚀',
    color: '#67e8f9',
    border: '#0891b2',
    desc: 'Floating in zero-gravity bubble orbit.'
  },
  {
    id: 'sticker_queen',
    title: 'Royal Queen',
    emoji: '👑',
    color: '#fde047',
    border: '#ca8a04',
    desc: 'Ruler of the deep ocean choir arena.'
  },
  {
    id: 'sticker_cupcake',
    title: 'Golden Treat',
    emoji: '🧁',
    color: '#fbcfe8',
    border: '#db2777',
    desc: 'Sugar Rush booster baked fresh from the truck.'
  },
  {
    id: 'sticker_crab',
    title: 'Snappy DJ Crab',
    emoji: '🦀',
    color: '#f87171',
    border: '#dc2626',
    desc: 'Clacking claws to the syncopated tempo!'
  },
  {
    id: 'sticker_dolphin',
    title: 'Hype Dolphin',
    emoji: '🐬',
    color: '#60a5fa',
    border: '#2563eb',
    desc: 'Flipping through the water to hype the crowd!'
  },
  {
    id: 'sticker_crystal',
    title: 'Crystal Bloom',
    emoji: '💎',
    color: '#e879f9',
    border: '#a21caf',
    desc: 'Bioluminescent magic from the deep caverns.'
  },
  {
    id: 'sticker_superstar',
    title: 'Galaxy Superstar',
    emoji: '🌟',
    color: '#fde047',
    border: '#eab308',
    desc: 'Mastered all 3 islands and earned ultimate fame!'
  }
];

export const QUEST_DEFINITIONS = [
  {
    id: 'feed_treats',
    title: 'Bakery Snack Time',
    desc: 'Feed 2 bakery treats (cake or donut) to any singing jelly',
    target: 2,
    icon: '🧁',
    rewardCoins: 15,
    rewardXP: 30,
    stickerRewardId: 'sticker_cupcake'
  },
  {
    id: 'collect_coins',
    title: 'Treasure Diver',
    desc: 'Collect 12 musical coins from singing performers',
    target: 12,
    icon: '🪙',
    rewardCoins: 15,
    rewardXP: 25,
    stickerRewardId: 'sticker_bob'
  },
  {
    id: 'dress_uniform',
    title: 'Fashion Stylist',
    desc: 'Equip any uniform or costume in the Wardrobe',
    target: 1,
    icon: '🎩',
    rewardCoins: 20,
    rewardXP: 35,
    stickerRewardId: 'sticker_pirate'
  },
  {
    id: 'rhythm_combo',
    title: 'Rhythm Rush Beat',
    desc: 'Score a 10x Combo in Rhythm Rush minigame',
    target: 1,
    icon: '🎵',
    rewardCoins: 20,
    rewardXP: 40,
    stickerRewardId: 'sticker_rocker'
  },
  {
    id: 'echo_jam_win',
    title: 'Echo Jam Maestro',
    desc: 'Repeat a 3-note riff sequence in Reef Echo Jam',
    target: 1,
    icon: '🎮',
    rewardCoins: 20,
    rewardXP: 35,
    stickerRewardId: 'sticker_diva'
  },
  {
    id: 'lucky_spin',
    title: 'Lucky Starfish',
    desc: 'Spin the Lucky Prize Wheel for a daily reward',
    target: 1,
    icon: '🎡',
    rewardCoins: 15,
    rewardXP: 25,
    stickerRewardId: 'sticker_dolphin'
  },
  {
    id: 'pet_creatures',
    title: 'Jelly Tickles & Hugs',
    desc: 'Tickle or poke singing jellies 4 times to hear them giggle',
    target: 4,
    icon: '💖',
    rewardCoins: 15,
    rewardXP: 25,
    stickerRewardId: 'sticker_crab'
  },
  {
    id: 'remix_breed',
    title: 'Remix Lab Hatch',
    desc: 'Incubate and tap an egg to hatch in the Remix Pod',
    target: 1,
    icon: '🧬',
    rewardCoins: 25,
    rewardXP: 50,
    stickerRewardId: 'sticker_crystal'
  }
];

// Generate 4 active daily quests
export function generateDailyQuests(completedIds = []) {
  const available = QUEST_DEFINITIONS.filter(q => !completedIds.includes(q.id));
  const pool = available.length >= 4 ? available : QUEST_DEFINITIONS;
  // Deterministic shuffle
  const selected = [];
  const copied = [...pool];
  while (selected.length < 4 && copied.length > 0) {
    const idx = Math.floor(Math.random() * copied.length);
    selected.push({
      ...copied[idx],
      progress: 0,
      claimed: false
    });
    copied.splice(idx, 1);
  }
  return selected;
}

// Band Fame Level Configuration
export const FAME_RANKS = [
  { level: 1, title: 'Garage Jam', icon: '🫧', minXP: 0, nextXP: 80, perk: 'Starter beach concert' },
  { level: 2, title: 'Coral Beach Club', icon: '🪸', minXP: 80, nextXP: 200, perk: 'Unlocks Sweeping Stage Spotlights!' },
  { level: 3, title: 'Neon Lagoon Stage', icon: '⚡', minXP: 200, nextXP: 400, perk: 'Unlocks Live DJ Bubble Blaster Cannons!' },
  { level: 4, title: 'Ocean Headliners', icon: '🌟', minXP: 400, nextXP: 750, perk: 'Unlocks Disco Laser Beams & Strobe FX!' },
  { level: 5, title: 'Galaxy Superstars', icon: '👑', minXP: 750, nextXP: 1200, perk: 'Unlocks Golden Fountain Fireworks & +3x Coins!' }
];

export function getFameRank(xp = 0) {
  let currentRank = FAME_RANKS[0];
  for (let i = FAME_RANKS.length - 1; i >= 0; i--) {
    if (xp >= FAME_RANKS[i].minXP) {
      currentRank = FAME_RANKS[i];
      break;
    }
  }
  const nextRank = FAME_RANKS.find(r => r.level === currentRank.level + 1);
  const currentLevelXP = xp - currentRank.minXP;
  const neededXP = nextRank ? (nextRank.minXP - currentRank.minXP) : 100;
  const progressPercent = nextRank ? Math.min(100, Math.round((currentLevelXP / neededXP) * 100)) : 100;

  return {
    ...currentRank,
    xp,
    nextRank,
    progressPercent,
    currentLevelXP,
    neededXP
  };
}
