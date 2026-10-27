export const RARITY_TIERS = {
  common: {
    id: 'common',
    label: 'COMMON',
    stars: 1,
    icon: '★',
    color: '#38bdf8',
    badgeBg: 'linear-gradient(135deg, #0284c7, #0369a1)',
    coinMultiplier: 1.0,
    aura: 'none'
  },
  rare: {
    id: 'rare',
    label: 'RARE',
    stars: 2,
    icon: '★★',
    color: '#facc15',
    badgeBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
    coinMultiplier: 1.5,
    aura: '0 0 18px rgba(250, 204, 21, 0.8)'
  },
  epic: {
    id: 'epic',
    label: 'EPIC',
    stars: 3,
    icon: '★★★',
    color: '#ec4899',
    badgeBg: 'linear-gradient(135deg, #a855f7, #ec4899)',
    coinMultiplier: 2.0,
    aura: '0 0 26px rgba(236, 72, 153, 0.95)'
  }
};

export const JELLY_SPECIES = {
  // ==========================================
  // ISLAND 1: CORAL LAGOON (Tropical Pop / House)
  // ==========================================
  diva: {
    id: 'diva',
    islandId: 'lagoon',
    name: 'Floaty Diva',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/diva.wav',
    tag: '🎵 (Singing)',
    element: 'Vocal Wave',
    icon: '🌸',
    colorScheme: '#ec4899',
    rareColor: '#f43f5e',
    epicColor: '#a855f7',
    bio: 'The original diva of the sunlit shallows. Her hypnotic, soaring soprano keeps the entire reef in harmony and draws curious sea creatures from miles away.',
    breedingHint: 'One of the founding primary singers of the reef.'
  },
  zap: {
    id: 'zap',
    islandId: 'lagoon',
    name: 'Zap Jelly',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/zap.wav',
    tag: '🎵 (Singing)',
    element: 'Electric Spark',
    icon: '⚡',
    colorScheme: '#facc15',
    rareColor: '#38bdf8',
    epicColor: '#22c55e',
    bio: 'Infused with bio-electric static, this bubbly creature provides the high-energy rhythmic pulse of the reef with glowing neon pulses.',
    breedingHint: 'One of the founding primary singers of the reef.'
  },
  bob: {
    id: 'bob',
    islandId: 'lagoon',
    name: 'Boombox Bob',
    type: 'recruit',
    recruitCost: 15,
    defaultUnlocked: false,
    stemUrl: '/audio/bob.wav',
    tag: '🎤 (Beatbox)',
    element: 'Sub Sonic',
    icon: '📦',
    colorScheme: '#38bdf8',
    rareColor: '#f97316',
    epicColor: '#ec4899',
    bio: 'A deep-sea bass specialist delivered by express supply. His booming baritone and heavy boombox beats anchor the lower frequencies.',
    breedingHint: 'Recruit him via the Bakery Cruiser truck when you have 15 Coins.'
  },
  siren: {
    id: 'siren',
    islandId: 'lagoon',
    name: 'Volt Siren',
    type: 'hybrid',
    defaultUnlocked: false,
    parents: ['diva', 'zap'],
    stemUrl: '/audio/siren.wav',
    synthType: 'siren',
    tag: '🔮 (Siren Duet)',
    element: 'Electro-Melody',
    icon: '🔮',
    colorScheme: '#c084fc',
    rareColor: '#06b6d4',
    epicColor: '#fbbf24',
    hatchBonus: 10,
    hatchToast: '🎉 HATCHED: VOLT SIREN! +10🪙',
    bio: 'An acoustic marvel born from soaring vocal melody and electric scatting. Sings a shimmering two-voice siren duet that glides through the kelp forest.',
    breedingHint: 'Breed Floaty Diva + Zap Jelly in the Coral Remix Pod.'
  },
  sparkpuff: {
    id: 'sparkpuff',
    islandId: 'lagoon',
    name: 'DJ Spark-Puff',
    type: 'hybrid',
    defaultUnlocked: false,
    parents: ['zap', 'bob'],
    stemUrl: '/audio/sparkpuff.wav',
    synthType: 'sparkpuff',
    tag: '🎧 (Vocal Funk)',
    element: 'Funk Pulse',
    icon: '🎧',
    colorScheme: '#22c55e',
    rareColor: '#ec4899',
    epicColor: '#eab308',
    hatchBonus: 10,
    hatchToast: '⚡ HATCHED: DJ SPARK-PUFF! +10🪙',
    bio: 'The funkiest hybrid in the seven seas. Bounces happily on the seafloor while scatting talkbox-style "doo-bwa-wow" vocal bass grooves.',
    breedingHint: 'Breed Zap Jelly + Boombox Bob in the Coral Remix Pod.'
  },
  queen: {
    id: 'queen',
    islandId: 'lagoon',
    name: 'Queen Beatbox',
    type: 'hybrid',
    defaultUnlocked: false,
    parents: ['diva', 'bob'],
    stemUrl: '/audio/queen.wav',
    synthType: 'queen',
    tag: '👑 (Royal Beatbox)',
    element: 'Crown Rhythm',
    icon: '👑',
    colorScheme: '#fbbf24',
    rareColor: '#c084fc',
    epicColor: '#ef4444',
    hatchBonus: 10,
    hatchToast: '👑 HATCHED: QUEEN BEATBOX! +10🪙',
    bio: 'Regal vocal percussion master. Drops rapid-fire human beatbox kicks, vocal rim-pops, and sassy soprano ad-libs with her royal tentacles.',
    breedingHint: 'Breed Floaty Diva + Boombox Bob in the Coral Remix Pod.'
  },
  starlight: {
    id: 'starlight',
    islandId: 'lagoon',
    name: 'Starlight Jelly',
    type: 'hybrid',
    defaultUnlocked: false,
    parents: ['siren', 'sparkpuff'],
    stemUrl: '/audio/starlight.wav',
    synthType: 'starlight',
    tag: '✨ (Galaxy Chime)',
    element: 'Cosmic Chime',
    icon: '✨',
    colorScheme: '#38bdf8',
    rareColor: '#f43f5e',
    epicColor: '#facc15',
    hatchBonus: 15,
    hatchToast: '✨ LEGENDARY HATCH: STARLIGHT JELLY! +15🪙',
    bio: 'Floating celestial jelly crowned with glowing miniature stars. Plays ethereal high-frequency crystal bell harmonies that echo like shooting stars.',
    breedingHint: 'Breed any two Hybrids (Siren, Spark-Puff, or Queen) in the Remix Pod.'
  },

  // ==========================================
  // ISLAND 2: ABYSSAL MAGMA TRENCH (Dubstep / Industrial)
  // ==========================================
  angler: {
    id: 'angler',
    islandId: 'trench',
    name: 'Angler Bass',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/angler.wav',
    synthType: 'sub_bass',
    tag: '💡 (Saw Bass)',
    element: 'Sub Hydro',
    icon: '💡',
    colorScheme: '#f97316',
    rareColor: '#e11d48',
    epicColor: '#facc15',
    bio: 'A rugged deep-sea prowler whose bioluminescent lure pulses in sync with chest-thumping analog saw-bass wobbles.',
    breedingHint: 'Founding resident of the Magma Trench.'
  },
  magma: {
    id: 'magma',
    islandId: 'trench',
    name: 'Magma Medusa',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/magma.wav',
    synthType: 'distorted_lead',
    tag: '🌋 (Lead Synth)',
    element: 'Liquid Magma',
    icon: '🌋',
    colorScheme: '#ef4444',
    rareColor: '#f59e0b',
    epicColor: '#8b5cf6',
    bio: 'Born from geothermal magma chambers. Traverses volcanic trenches singing fiery screaming lead synth lines.',
    breedingHint: 'Founding resident of the Magma Trench.'
  },
  vent: {
    id: 'vent',
    islandId: 'trench',
    name: 'Vent Cracker',
    type: 'recruit',
    recruitCost: 15,
    defaultUnlocked: false,
    stemUrl: '/audio/vent.wav',
    synthType: 'steam_hiss',
    tag: '💨 (Industrial Beat)',
    element: 'Thermal Pressure',
    icon: '💨',
    colorScheme: '#78716c',
    rareColor: '#0ea5e9',
    epicColor: '#ef4444',
    bio: 'Anchored around bubbling hydrothermal smokers, Vent Cracker expels pressurized bursts of volcanic steam and heavy industrial clatter.',
    breedingHint: 'Recruit him via the Seafloor Supply Depot for 15 Coins.'
  },
  obsidian: {
    id: 'obsidian',
    islandId: 'trench',
    name: 'Obsidian Siren',
    type: 'hybrid',
    defaultUnlocked: false,
    parents: ['magma', 'angler'],
    stemUrl: '/audio/obsidian.wav',
    synthType: 'acid_chords',
    tag: '🖤 (Acid Wobble)',
    element: 'Volcanic Glass',
    icon: '🖤',
    colorScheme: '#7c3aed',
    rareColor: '#f43f5e',
    epicColor: '#38bdf8',
    hatchBonus: 12,
    hatchToast: '🔥 HATCHED: OBSIDIAN SIREN! +12🪙',
    bio: 'Forged where red-hot lava collides with icy abyssal water. Emits dark, sweeping acid synth arpeggios that shimmer like glossy volcanic glass.',
    breedingHint: 'Breed Magma Medusa + Angler Bass in the Trench Remix Pod.'
  },
  pyre: {
    id: 'pyre',
    islandId: 'trench',
    name: 'Pyre Puff',
    type: 'hybrid',
    defaultUnlocked: false,
    parents: ['magma', 'vent'],
    stemUrl: '/audio/pyre.wav',
    synthType: 'fire_bell',
    tag: '🔥 (Thermal Bell)',
    element: 'Geothermal Glow',
    icon: '🔥',
    colorScheme: '#f59e0b',
    rareColor: '#a855f7',
    epicColor: '#10b981',
    hatchBonus: 12,
    hatchToast: '💥 HATCHED: PYRE PUFF! +12🪙',
    bio: 'A spherical pufferfish glowing with inner thermal flames. Emits warm chiming harmonic bells with every rhythmic bounce.',
    breedingHint: 'Breed Magma Medusa + Vent Cracker in the Trench Remix Pod.'
  },

  // ==========================================
  // ISLAND 3: BIOLUMINESCENT CAVERNS (Lo-Fi / Water Harp)
  // ==========================================
  crystal_bell: {
    id: 'crystal_bell',
    islandId: 'cavern',
    name: 'Crystal Bell',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/crystal_bell.wav',
    synthType: 'crystal_bell',
    tag: '🔔 (Crystal Chime)',
    element: 'Resonant Quartz',
    icon: '🔔',
    colorScheme: '#10b981',
    rareColor: '#c084fc',
    epicColor: '#f59e0b',
    bio: 'Chimes like a pure glass marimba as cave drops fall upon its quartz shell.',
    breedingHint: 'Founding resident of the Bioluminescent Caverns.'
  },
  lofi_spore: {
    id: 'lofi_spore',
    islandId: 'cavern',
    name: 'Lo-Fi Spore',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/lofi_spore.wav',
    synthType: 'lofi_keys',
    tag: '🍄 (Rhodes Keys)',
    element: 'Neon Spore',
    icon: '🍄',
    colorScheme: '#34d399',
    rareColor: '#ec4899',
    epicColor: '#38bdf8',
    bio: 'Floating mushroom jelly that pulses mellow lo-fi Rhodes electric piano chords across tranquil underground pools.',
    breedingHint: 'Founding resident of the Bioluminescent Caverns.'
  },
  nautilus: {
    id: 'nautilus',
    islandId: 'cavern',
    name: 'Echo Nautilus',
    type: 'recruit',
    recruitCost: 15,
    defaultUnlocked: false,
    stemUrl: '/audio/nautilus.wav',
    synthType: 'spiral_echo',
    tag: '🐚 (Vocal Echo)',
    element: 'Vocal Groove',
    icon: '🐚',
    colorScheme: '#0ea5e9',
    rareColor: '#f97316',
    epicColor: '#a855f7',
    bio: 'Curled in an iridescent spiral shell, this laid-back beatboxer puffs warm boom-bap vocal kicks and crisp conch-shell rim pops.',
    breedingHint: 'Recruit him via the Seafloor Supply Depot for 15 Coins.'
  },
  prism_bloom: {
    id: 'prism_bloom',
    islandId: 'cavern',
    name: 'Prism Bloom',
    type: 'hybrid',
    defaultUnlocked: false,
    parents: ['crystal_bell', 'lofi_spore'],
    stemUrl: '/audio/prism_bloom.wav',
    synthType: 'prism_bloom',
    tag: '🌸 (Soprano Choir)',
    element: 'Celestial Choir',
    icon: '🌸',
    colorScheme: '#f472b6',
    rareColor: '#22d3ee',
    epicColor: '#facc15',
    hatchBonus: 12,
    hatchToast: '🌸 HATCHED: PRISM BLOOM! +12🪙',
    bio: 'A radiant floral crystal hybrid whose petals open wide as it sings 3-part angelic soprano choir swells across the glowing cavern.',
    breedingHint: 'Breed Crystal Bell + Lo-Fi Spore in the Cavern Remix Pod.'
  },
  lapis_groove: {
    id: 'lapis_groove',
    islandId: 'cavern',
    name: 'Lapis Groove',
    type: 'hybrid',
    defaultUnlocked: false,
    parents: ['lofi_spore', 'nautilus'],
    stemUrl: '/audio/lapis_groove.wav',
    synthType: 'lapis_groove',
    tag: '🫐 (Acapella Bass)',
    element: 'Walking Vocal',
    icon: '🫐',
    colorScheme: '#3b82f6',
    rareColor: '#e11d48',
    epicColor: '#10b981',
    hatchBonus: 15,
    hatchToast: '🫐 HATCHED: LAPIS GROOVE! +15🪙',
    bio: 'A dapper deep-blue cavern crooner that sings smooth, walking "doo-ba-doo" acapella jazz basslines with effortless underwater swagger.',
    breedingHint: 'Breed Lo-Fi Spore + Echo Nautilus in the Cavern Remix Pod.'
  },

  // ==========================================
  // ISLAND 4: SUNKEN SUN TEMPLE (Marimba Brass / Caribbean)
  // ==========================================
  sol_clam: {
    id: 'sol_clam',
    islandId: 'sun_temple',
    name: 'Sol Clam',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/diva.wav',
    synthType: 'sun_marimba',
    tag: '☀️ (Sun Marimba)',
    element: 'Golden Amber',
    icon: '🦪',
    colorScheme: '#eab308',
    rareColor: '#ef4444',
    epicColor: '#38bdf8',
    bio: 'Radiant golden bivalve that strikes buoyant sun-baked wooden marimba bars with golden pearls.',
    breedingHint: 'Founding singer of the Sunken Sun Temple.'
  },
  conch_horn: {
    id: 'conch_horn',
    islandId: 'sun_temple',
    name: 'Conch Horn',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/zap.wav',
    synthType: 'brass_conch',
    tag: '🎺 (Brass Conch)',
    element: 'Solar Fanfare',
    icon: '🎺',
    colorScheme: '#f97316',
    rareColor: '#10b981',
    epicColor: '#a855f7',
    bio: 'Blows rich, festive Caribbean brass horn fanfares through its coiled spiraled sun shell.',
    breedingHint: 'Founding singer of the Sunken Sun Temple.'
  },
  marimba_manta: {
    id: 'marimba_manta',
    islandId: 'sun_temple',
    name: 'Marimba Manta',
    type: 'recruit',
    recruitCost: 20,
    defaultUnlocked: false,
    stemUrl: '/audio/bob.wav',
    synthType: 'manta_bass',
    tag: '🪁 (Acoustic Upright)',
    element: 'Sunken Wood',
    icon: '🪁',
    colorScheme: '#d97706',
    rareColor: '#3b82f6',
    epicColor: '#ec4899',
    bio: 'Glides over golden ruins plucking resonant wooden acoustic bass strings with its winged fins.',
    breedingHint: 'Recruit via the Temple Outpost for 20 Coins.'
  },
  solar_siren: {
    id: 'solar_siren',
    islandId: 'sun_temple',
    name: 'Solar Siren',
    type: 'hybrid',
    defaultUnlocked: false,
    parents: ['sol_clam', 'conch_horn'],
    stemUrl: '/audio/siren.wav',
    synthType: 'solar_siren',
    tag: '👑 (Golden Vocal)',
    element: 'Sunbeam Voice',
    icon: '🔱',
    colorScheme: '#f59e0b',
    rareColor: '#a855f7',
    epicColor: '#22c55e',
    hatchBonus: 15,
    hatchToast: '☀️ HATCHED: SOLAR SIREN! +15🪙',
    bio: 'Her golden voice channels the warmth of the sun into shimmering acoustic melodies.',
    breedingHint: 'Breed Sol Clam + Conch Horn in the Sun Temple Remix Pod.'
  },
  sun_coral: {
    id: 'sun_coral',
    islandId: 'sun_temple',
    name: 'Sun Coral',
    type: 'hybrid',
    defaultUnlocked: false,
    parents: ['conch_horn', 'marimba_manta'],
    stemUrl: '/audio/sparkpuff.wav',
    synthType: 'sun_calypso',
    tag: '🪘 (Calypso Percussion)',
    element: 'Coral Steelpan',
    icon: '🪘',
    colorScheme: '#ec4899',
    rareColor: '#06b6d4',
    epicColor: '#facc15',
    hatchBonus: 15,
    hatchToast: '🪘 HATCHED: SUN CORAL! +15🪙',
    bio: 'Plays infectious Caribbean steelpan calypso rhythms with its coral branch mallets.',
    breedingHint: 'Breed Conch Horn + Marimba Manta in the Sun Temple Remix Pod.'
  },

  // ==========================================
  // ISLAND 5: GLACIAL CRYO REEF (Arctic Lo-Fi / Glass Chime)
  // ==========================================
  cryo_jelly: {
    id: 'cryo_jelly',
    islandId: 'cryo_reef',
    name: 'Cryo Jelly',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/diva.wav',
    synthType: 'ice_bell',
    tag: '🧊 (Glass Bell)',
    element: 'Frost Crystalline',
    icon: '🧊',
    colorScheme: '#38bdf8',
    rareColor: '#a855f7',
    epicColor: '#facc15',
    bio: 'A crystalline translucent jellyfish with frost-coated bell that rings like delicate icicles.',
    breedingHint: 'Founding resident of the Glacial Cryo Reef.'
  },
  frost_fin: {
    id: 'frost_fin',
    islandId: 'cryo_reef',
    name: 'Frost Fin',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/zap.wav',
    synthType: 'frost_sub',
    tag: '🐋 (Deep Cryo Bass)',
    element: 'Sub-Zero Pulse',
    icon: '🐋',
    colorScheme: '#0284c7',
    rareColor: '#10b981',
    epicColor: '#f43f5e',
    bio: 'Pulses ultra-low sub-bass sine waves through arctic ice shelves with its frozen caudal tail.',
    breedingHint: 'Founding resident of the Glacial Cryo Reef.'
  },
  glacier_chime: {
    id: 'glacier_chime',
    islandId: 'cryo_reef',
    name: 'Glacier Chime',
    type: 'recruit',
    recruitCost: 25,
    defaultUnlocked: false,
    stemUrl: '/audio/bob.wav',
    synthType: 'glacier_chime',
    tag: '🎐 (Wind Chime)',
    element: 'Aurora Glass',
    icon: '🎐',
    colorScheme: '#67e8f9',
    rareColor: '#ec4899',
    epicColor: '#fbbf24',
    bio: 'Strung with musical icicle flutes that tinkle in the chilly underwater polar currents.',
    breedingHint: 'Recruit via the Ice Expedition post for 25 Coins.'
  },
  ice_walrus: {
    id: 'ice_walrus',
    islandId: 'cryo_reef',
    name: 'Ice Walrus',
    type: 'hybrid',
    defaultUnlocked: false,
    parents: ['cryo_jelly', 'frost_fin'],
    stemUrl: '/audio/siren.wav',
    synthType: 'ice_drone',
    tag: '🦭 (Tusk Harmonium)',
    element: 'Polar Drone',
    icon: '🦭',
    colorScheme: '#0ea5e9',
    rareColor: '#f59e0b',
    epicColor: '#8b5cf6',
    hatchBonus: 18,
    hatchToast: '❄️ HATCHED: ICE WALRUS! +18🪙',
    bio: 'Plays deep bellows-blown arctic harmonium chords using its crystalline hollow tusks.',
    breedingHint: 'Breed Cryo Jelly + Frost Fin in the Cryo Remix Pod.'
  },
  aurora_nautilus: {
    id: 'aurora_nautilus',
    islandId: 'cryo_reef',
    name: 'Aurora Nautilus',
    type: 'hybrid',
    defaultUnlocked: false,
    parents: ['frost_fin', 'glacier_chime'],
    stemUrl: '/audio/sparkpuff.wav',
    synthType: 'aurora_arp',
    tag: '🌌 (Aurora Arp)',
    element: 'Polar Light',
    icon: '🌌',
    colorScheme: '#a855f7',
    rareColor: '#22c55e',
    epicColor: '#f43f5e',
    hatchBonus: 20,
    hatchToast: '🌌 LEGENDARY HATCH: AURORA NAUTILUS! +20🪙',
    bio: 'Shell glows with shimmering polar green and purple ribbons, playing mesmerizing hypnotic synth arpeggios.',
    breedingHint: 'Breed Frost Fin + Glacier Chime in the Cryo Remix Pod.'
  }
};

export function rollBreedingRarity(hasSugarBoost = false) {
  const roll = Math.random() * 100;
  if (hasSugarBoost) {
    if (roll < 12) return 'epic';
    if (roll < 35) return 'rare';
    return 'common';
  }
  if (roll < 5) return 'epic';
  if (roll < 20) return 'rare';
  return 'common';
}

export function resolveBreedingOffspring(parentA, parentB) {
  const parents = [parentA, parentB];

  // 1. Coral Lagoon Island Recipes
  if (parents.includes('diva') && parents.includes('zap')) return 'siren';
  if (parents.includes('zap') && parents.includes('bob')) return 'sparkpuff';
  if (parents.includes('diva') && parents.includes('bob')) return 'queen';
  if (parents.includes('siren') || parents.includes('sparkpuff') || parents.includes('queen')) return 'starlight';

  // 2. Abyssal Magma Trench Recipes
  if (parents.includes('magma') && parents.includes('angler')) return 'obsidian';
  if (parents.includes('magma') && parents.includes('vent')) return 'pyre';
  if (parents.includes('angler') && parents.includes('vent')) return 'obsidian';
  if (parents.includes('obsidian') || parents.includes('pyre')) return 'pyre';

  // 3. Bioluminescent Caverns Recipes
  if (parents.includes('crystal_bell') && parents.includes('lofi_spore')) return 'prism_bloom';
  if (parents.includes('lofi_spore') && parents.includes('nautilus')) return 'lapis_groove';
  if (parents.includes('crystal_bell') && parents.includes('nautilus')) return 'prism_bloom';
  if (parents.includes('prism_bloom') || parents.includes('lapis_groove')) return 'lapis_groove';

  // 4. Sunken Sun Temple Recipes
  if (parents.includes('sol_clam') && parents.includes('conch_horn')) return 'solar_siren';
  if (parents.includes('conch_horn') && parents.includes('marimba_manta')) return 'sun_coral';
  if (parents.includes('sol_clam') && parents.includes('marimba_manta')) return 'solar_siren';
  if (parents.includes('solar_siren') || parents.includes('sun_coral')) return 'sun_coral';

  // 5. Glacial Cryo Reef Recipes
  if (parents.includes('cryo_jelly') && parents.includes('frost_fin')) return 'ice_walrus';
  if (parents.includes('frost_fin') && parents.includes('glacier_chime')) return 'aurora_nautilus';
  if (parents.includes('cryo_jelly') && parents.includes('glacier_chime')) return 'ice_walrus';
  if (parents.includes('ice_walrus') || parents.includes('aurora_nautilus')) return 'aurora_nautilus';

  return 'starlight';
}
