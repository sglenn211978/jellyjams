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
    bio: 'A deep-sea bass specialist delivered by express Hype Dolphin. His booming baritone and heavy boombox beats anchor the lower frequencies.',
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
    parents: null,
    stemUrl: '/audio/starlight.wav',
    synthType: 'starlight',
    tag: '🌟 (Choir Chime)',
    element: 'Cosmic Light',
    icon: '🌟',
    colorScheme: '#818cf8',
    hatchBonus: 15,
    hatchToast: '🌟 HATCHED: STARLIGHT JELLY! +15🪙',
    bio: 'Born from celestial reef fusions, this luminous wonder sings angelic high-soprano vocal harmonies that shimmer like midnight stars.',
    breedingHint: 'Breed any hybrid with another hybrid in the Coral Remix Pod.'
  },

  // ==========================================
  // ISLAND 2: ABYSSAL MAGMA TRENCH (Deep Vocal / Operatic / Beatbox)
  // ==========================================
  angler: {
    id: 'angler',
    islandId: 'trench',
    name: 'Angler Bass',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/angler.wav',
    synthType: 'angler',
    tag: '🏮 (Deep Baritone)',
    element: 'Abyssal Voice',
    icon: '🏮',
    colorScheme: '#eab308',
    bio: 'Equipped with a glowing bioluminescent lure antenna, this deep-sea giant booms ultra-deep "doo-bwa-wow" vocal basslines across the volcanic trench.',
    breedingHint: 'One of the founding primary singers of the Magma Trench.'
  },
  magma: {
    id: 'magma',
    islandId: 'trench',
    name: 'Magma Medusa',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/magma.wav',
    synthType: 'magma',
    tag: '🌋 (Opera Lead)',
    element: 'Thermal Melody',
    icon: '🌋',
    colorScheme: '#f97316',
    bio: 'Translucent with glowing crimson lava veins. Belting out a haunting, operatic minor-key vocal melody that echoes through the hydrothermal depths.',
    breedingHint: 'One of the founding primary singers of the Magma Trench.'
  },
  vent: {
    id: 'vent',
    islandId: 'trench',
    name: 'Vent Cracker',
    type: 'recruit',
    recruitCost: 15,
    defaultUnlocked: false,
    stemUrl: '/audio/vent.wav',
    synthType: 'vent',
    tag: '💨 (Steam Beatbox)',
    element: 'Vocal Percussion',
    icon: '💨',
    colorScheme: '#ef4444',
    bio: 'An armored volcanic barnacle jelly perched atop a smoking chimney. Spits heavy volcanic beatbox kicks, vocal steam-pops, and rhythmic grunts.',
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
    synthType: 'obsidian',
    tag: '🖤 (Echo Siren)',
    element: 'Abyssal Echo',
    icon: '🖤',
    colorScheme: '#a855f7',
    hatchBonus: 12,
    hatchToast: '🖤 HATCHED: OBSIDIAN SIREN! +12🪙',
    bio: 'Forged from lava and deep-sea currents. Sings hypnotic dual-voice siren harmonies that echo across the obsidian canyon walls.',
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
    synthType: 'pyre',
    tag: '🔥 (Vocal Scat)',
    element: 'Fiery Scat',
    icon: '🔥',
    colorScheme: '#f43f5e',
    hatchBonus: 15,
    hatchToast: '🔥 HATCHED: PYRE PUFF! +15🪙',
    bio: 'A round, glowing ball of geothermal energy. Belts out rapid-fire, high-energy vocal scat riffs in sync with the bubbling magma fissures.',
    breedingHint: 'Breed Magma Medusa + Vent Cracker in the Trench Remix Pod.'
  },

  // ==========================================
  // ISLAND 3: BIOLUMINESCENT CAVERNS (Acapella Choir / Jazz Vocal)
  // ==========================================
  crystal_bell: {
    id: 'crystal_bell',
    islandId: 'cavern',
    name: 'Crystal Bell',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/crystal_bell.wav',
    synthType: 'crystal_bell',
    tag: '💎 (Vocal Pluck)',
    element: 'Crystal Voice',
    icon: '💎',
    colorScheme: '#06b6d4',
    bio: 'Faceted like a cyan geode, this subterranean singer rings out crisp, pentatonic acapella soprano notes that reverberate across cave pools.',
    breedingHint: 'One of the founding primary singers of the Bioluminescent Caverns.'
  },
  lofi_spore: {
    id: 'lofi_spore',
    islandId: 'cavern',
    name: 'Lo-Fi Spore',
    type: 'primary',
    defaultUnlocked: true,
    stemUrl: '/audio/lofi_spore.wav',
    synthType: 'lofi_spore',
    tag: '🍄 (Vocal Chords)',
    element: 'Warm Harmony',
    icon: '🍄',
    colorScheme: '#a78bfa',
    bio: 'A sleepy mushroom jelly with glowing spore caps. Hums lush, 4-part barbershop and lo-fi jazz vocal chords ("mmm-doo-wah") in cozy harmony.',
    breedingHint: 'One of the founding primary singers of the Bioluminescent Caverns.'
  },
  nautilus: {
    id: 'nautilus',
    islandId: 'cavern',
    name: 'Echo Nautilus',
    type: 'recruit',
    recruitCost: 15,
    defaultUnlocked: false,
    stemUrl: '/audio/nautilus.wav',
    synthType: 'nautilus',
    tag: '🐚 (Conch Beatbox)',
    element: 'Vocal Groove',
    icon: '🐚',
    colorScheme: '#10b981',
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
    hatchBonus: 15,
    hatchToast: '🫐 HATCHED: LAPIS GROOVE! +15🪙',
    bio: 'A dapper deep-blue cavern crooner that sings smooth, walking "doo-ba-doo" acapella jazz basslines with effortless underwater swagger.',
    breedingHint: 'Breed Lo-Fi Spore + Echo Nautilus in the Cavern Remix Pod.'
  }
};

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

  return 'starlight';
}
