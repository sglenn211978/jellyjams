// =========================================
// THEMED BAND UNIFORMS & SQUAD SET BONUSES
// =========================================

export const REEF_UNIFORMS = [
  // Classic Accessories
  {
    id: 'shades',
    name: 'Neon Shades',
    icon: '🕶️',
    cost: 8,
    theme: 'shades',
    themeName: 'Cool Club',
    squadBonus: '+1 Bonus Coin per drop',
    desc: 'Retro sunglasses with neon frame reflections. Cool festival swag!'
  },
  {
    id: 'snorkel',
    name: 'Snorkel Mask',
    icon: '🤿',
    cost: 10,
    theme: 'snorkel',
    themeName: 'Deep Divers',
    squadBonus: 'Sugar Rush lasts 3s longer',
    desc: 'Deep-sea diving mask with a yellow bubble snorkel tube.'
  },
  {
    id: 'tophat',
    name: 'Tiny Top Hat',
    icon: '🎩',
    cost: 12,
    theme: 'gentleman',
    themeName: 'Fancy Gentlemen',
    squadBonus: '+10% chance of double coins',
    desc: 'Jaunty, gentlemanly mini top hat with a vibrant satin ribbon.'
  },
  {
    id: 'headphones',
    name: 'DJ Headphones',
    icon: '🎧',
    cost: 15,
    theme: 'dj',
    themeName: 'DJ Collective',
    squadBonus: '+2 Extra coins on every drop',
    desc: 'Heavy-duty cushioned stereo cans for dropping underwater beats.'
  },
  {
    id: 'crown',
    name: 'Coral Crown',
    icon: '👑',
    cost: 20,
    theme: 'royal',
    themeName: 'Royal Court',
    squadBonus: '+2 Fame XP on every coin collected',
    desc: 'Sparkling royal gold tiara studded with precious pink coral pearls.'
  },

  // 🏴‍☠️ Brand New Full Uniform Sets!
  {
    id: 'pirate',
    name: 'Pirate Captain',
    icon: '🏴‍☠️',
    cost: 18,
    theme: 'pirate',
    themeName: 'Pirate Crew',
    squadBonus: '🏴‍☠️ Pirate Plunder: +2 Extra Coins on all drops!',
    desc: 'Tricorne captain hat with gold anchor, skull eyepatch, and red bandana.'
  },
  {
    id: 'rocker',
    name: 'Neon Rocker',
    icon: '🎸',
    cost: 18,
    theme: 'rocker',
    themeName: 'Rock Band',
    squadBonus: '🎸 Electric Surge: Band members dance with electric spark auras!',
    desc: 'Spiky neon electric punk mohawk with lightning bolt face makeup.'
  },
  {
    id: 'astronaut',
    name: 'Space Cadet',
    icon: '🚀',
    cost: 22,
    theme: 'astronaut',
    themeName: 'Space Patrol',
    squadBonus: '🚀 Anti-Gravity: Supercharged Sugar Rush gives 4x coins!',
    desc: 'Glass cosmic space helmet with glowing iridescent reflection & radio antenna.'
  },
  {
    id: 'superhero',
    name: 'Superhero Squad',
    icon: '🦸',
    cost: 22,
    theme: 'superhero',
    themeName: 'Superheroes',
    squadBonus: '🦸 Hero Power: Treats give double level boost (+2 Levels per cake)!',
    desc: 'Bold hero domino eye mask with glowing emblem and flowing hero cape.'
  },
  {
    id: 'chef',
    name: 'Master Chef',
    icon: '👨‍🍳',
    cost: 16,
    theme: 'chef',
    themeName: 'Bakery Crew',
    squadBonus: '🧁 Sugar Bakers: All Bakery Treats cost -2 Coins!',
    desc: 'Puffy tall pleated white chef toque hat and red gingham neckerchief.'
  },
  {
    id: 'marching',
    name: 'Marching Band',
    icon: '💂',
    cost: 24,
    theme: 'marching',
    themeName: 'Marching Band',
    squadBonus: '🥁 Grand Parade: Collects +3 Fame XP on every musical beat!',
    desc: 'Tall military shako hat with brass chain and magnificent golden feather plume.'
  }
];

// Calculate active squad synergy if 2 or more performers on the current island wear the same uniform theme
export function calculateSquadSynergy(equippedCostumes = {}, activePerformers = null) {
  const counts = {};
  for (const [perfId, costumeId] of Object.entries(equippedCostumes)) {
    if (!costumeId) continue;
    if (activePerformers && !activePerformers[perfId]?.unlocked) continue;
    const uniform = REEF_UNIFORMS.find(u => u.id === costumeId);
    if (!uniform) continue;
    counts[uniform.id] = (counts[uniform.id] || 0) + 1;
  }

  // Find the uniform with the highest matching count >= 2
  let topUniform = null;
  let topCount = 0;
  for (const [id, count] of Object.entries(counts)) {
    if (count >= 2 && count > topCount) {
      topCount = count;
      topUniform = REEF_UNIFORMS.find(u => u.id === id);
    }
  }

  const shortBonusMap = {
    shades: '+1 COIN!',
    snorkel: '+3s RUSH!',
    tophat: '2X LUCK!',
    headphones: '+2 COINS!',
    crown: '+2 FAME!',
    pirate: '+2 COINS!',
    rocker: 'SPARK FX!',
    astronaut: '4X RUSH!',
    superhero: '2X LEVEL!',
    chef: 'CHEAP TREATS!',
    marching: '+3 FAME!'
  };

  if (topUniform && topCount >= 2) {
    return {
      active: true,
      uniformId: topUniform.id,
      themeName: topUniform.themeName,
      icon: topUniform.icon,
      count: topCount,
      bonusText: topUniform.squadBonus,
      shortBonus: shortBonusMap[topUniform.id] || 'BONUS!',
      extraCoins: topUniform.id === 'pirate' ? 2 : topUniform.id === 'headphones' ? 2 : topUniform.id === 'shades' ? 1 : 0,
      extraFameXP: topUniform.id === 'crown' ? 2 : topUniform.id === 'marching' ? 3 : 1
    };
  }

  return { active: false, count: 0 };
}
