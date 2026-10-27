// 2.5D Organic Habitat Spatial Coordinates for Living Island Worlds
// 5-Tier Natural Depth Grid supporting up to 21 Monsters Per Island with Zero Overlap!
// Tier 1: Far Spires (y: ~24%)
// Tier 2: High Mountain Ridge (y: ~38%)
// Tier 3: Central Rhythm Plateau (y: ~56%)
// Tier 4: Foreground Coral Ledge (y: ~72%)
// Tier 5: Tide Pool Shoreline (y: ~84%)

export const ISLAND_HABITAT_SLOTS = {
  // ISLAND 1: CORAL LAGOON (Tropical Sunlit Reef Atoll)
  lagoon: {
    // Tier 1: Back Spires
    queen: { x: 26, y: 24, tier: 'high', depthScale: 0.90, perchType: 'royal_coral', zIndex: 12 },
    starlight: { x: 74, y: 24, tier: 'high', depthScale: 0.90, perchType: 'star_spire', zIndex: 12 },

    // Tier 2: High Ridge
    diva: { x: 18, y: 38, tier: 'high', depthScale: 0.95, perchType: 'coral_terrace', zIndex: 14 },
    zap: { x: 82, y: 38, tier: 'high', depthScale: 0.95, perchType: 'kelp_arch', zIndex: 14 },

    // Tier 3: Mid Stage Plateau
    bob: { x: 50, y: 56, tier: 'mid', depthScale: 1.15, perchType: 'rhythm_rock', zIndex: 18 },

    // Tier 4: Foreground Shelf
    siren: { x: 22, y: 72, tier: 'low', depthScale: 1.05, perchType: 'crystal_pool', zIndex: 22 },
    sparkpuff: { x: 78, y: 72, tier: 'low', depthScale: 1.05, perchType: 'anemone_knoll', zIndex: 22 }
  },

  // ISLAND 2: ABYSSAL MAGMA TRENCH (Deep Volcanic Smoker Ridge)
  trench: {
    // Tier 1 & 2: Basalt Chimneys
    magma: { x: 24, y: 32, tier: 'high', depthScale: 0.95, perchType: 'basalt_column', zIndex: 12 },
    vent: { x: 76, y: 32, tier: 'high', depthScale: 0.95, perchType: 'smoker_spire', zIndex: 12 },

    // Tier 3: Mid Lava Plateau
    angler: { x: 50, y: 56, tier: 'mid', depthScale: 1.15, perchType: 'lava_pedestal', zIndex: 18 },

    // Tier 4: Low Volcanic Ledge
    obsidian: { x: 22, y: 72, tier: 'low', depthScale: 1.05, perchType: 'obsidian_shelf', zIndex: 22 },
    pyre: { x: 78, y: 72, tier: 'low', depthScale: 1.05, perchType: 'pyre_pool', zIndex: 22 }
  },

  // ISLAND 3: BIOLUMINESCENT CAVERN (Deep Crystal Cave & Neon Spores)
  cavern: {
    // Tier 1 & 2: Crystal Stalagmites
    lofi_spore: { x: 24, y: 32, tier: 'high', depthScale: 0.95, perchType: 'neon_shroom', zIndex: 12 },
    nautilus: { x: 76, y: 32, tier: 'high', depthScale: 0.95, perchType: 'spiral_spire', zIndex: 12 },

    // Tier 3: Central Resonant Geode Ledge
    crystal_bell: { x: 50, y: 56, tier: 'mid', depthScale: 1.15, perchType: 'geode_altar', zIndex: 18 },

    // Tier 4: Lapis Water Margin
    prism_bloom: { x: 22, y: 72, tier: 'low', depthScale: 1.05, perchType: 'prism_reef', zIndex: 22 },
    lapis_groove: { x: 78, y: 72, tier: 'low', depthScale: 1.05, perchType: 'lapis_ledge', zIndex: 22 }
  },

  // ISLAND 4: SUNKEN SUN TEMPLE (Golden Atlantis)
  sun_temple: {
    sol_clam: { x: 24, y: 32, tier: 'high', depthScale: 0.95, perchType: 'sun_column', zIndex: 12 },
    conch_horn: { x: 76, y: 32, tier: 'high', depthScale: 0.95, perchType: 'brass_spire', zIndex: 12 },
    marimba_manta: { x: 50, y: 56, tier: 'mid', depthScale: 1.15, perchType: 'temple_altar', zIndex: 18 },
    solar_siren: { x: 22, y: 72, tier: 'low', depthScale: 1.05, perchType: 'golden_pool', zIndex: 22 },
    sun_coral: { x: 78, y: 72, tier: 'low', depthScale: 1.05, perchType: 'sun_terrace', zIndex: 22 }
  },

  // ISLAND 5: GLACIAL CRYO REEF (Sub-Zero Ice Abyss)
  cryo_reef: {
    cryo_jelly: { x: 24, y: 32, tier: 'high', depthScale: 0.95, perchType: 'frost_spire', zIndex: 12 },
    frost_fin: { x: 76, y: 32, tier: 'high', depthScale: 0.95, perchType: 'ice_ridge', zIndex: 12 },
    glacier_chime: { x: 50, y: 56, tier: 'mid', depthScale: 1.15, perchType: 'crystal_shelf', zIndex: 18 },
    ice_walrus: { x: 22, y: 72, tier: 'low', depthScale: 1.05, perchType: 'floe_pool', zIndex: 22 },
    aurora_nautilus: { x: 78, y: 72, tier: 'low', depthScale: 1.05, perchType: 'aurora_ledge', zIndex: 22 }
  }
};
