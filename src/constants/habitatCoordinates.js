// 2.5D Organic Habitat Spatial Coordinates for Living Island Worlds
// x: percentage across the island habitat (0% - 100%)
// y: percentage down the island habitat (0% - 100%)
// tier: 'high' (back coral terrace), 'mid' (central reef plateau), 'low' (foreground tide pool)
// scale: slight natural depth scaling based on distance

export const ISLAND_HABITAT_SLOTS = {
  // ISLAND 1: CORAL LAGOON (Tropical Sunlit Reef Atoll)
  lagoon: {
    // High Tier (Back Elevated Coral Spire & Terrace)
    queen: { x: 36, y: 32, tier: 'high', depthScale: 0.95, perchType: 'royal_coral', zIndex: 12 },
    starlight: { x: 64, y: 30, tier: 'high', depthScale: 0.95, perchType: 'star_spire', zIndex: 12 },
    diva: { x: 22, y: 44, tier: 'high', depthScale: 1.0, perchType: 'coral_terrace', zIndex: 14 },

    // Mid Tier (Central Bouncy Rhythm Reef Plateau)
    bob: { x: 50, y: 56, tier: 'mid', depthScale: 1.15, perchType: 'rhythm_rock', zIndex: 18 },
    zap: { x: 76, y: 50, tier: 'mid', depthScale: 1.05, perchType: 'kelp_arch', zIndex: 16 },

    // Low Tier (Foreground Shimmering Tide Pools & Sandy Knolls)
    siren: { x: 18, y: 72, tier: 'low', depthScale: 1.05, perchType: 'crystal_pool', zIndex: 22 },
    sparkpuff: { x: 82, y: 70, tier: 'low', depthScale: 1.05, perchType: 'anemone_knoll', zIndex: 22 }
  },

  // ISLAND 2: ABYSSAL MAGMA TRENCH (Deep Volcanic Smoker Ridge)
  trench: {
    // High Tier (Volcanic Hydrothermal Chimneys)
    magma: { x: 28, y: 36, tier: 'high', depthScale: 0.98, perchType: 'basalt_column', zIndex: 12 },
    vent: { x: 72, y: 38, tier: 'high', depthScale: 1.02, perchType: 'smoker_spire', zIndex: 12 },

    // Mid Tier (Molten Obsidian Plateau)
    angler: { x: 50, y: 56, tier: 'mid', depthScale: 1.15, perchType: 'lava_pedestal', zIndex: 18 },

    // Low Tier (Foreground Geothermal Geysers)
    obsidian: { x: 20, y: 72, tier: 'low', depthScale: 1.05, perchType: 'obsidian_shelf', zIndex: 22 },
    pyre: { x: 80, y: 70, tier: 'low', depthScale: 1.05, perchType: 'pyre_pool', zIndex: 22 }
  },

  // ISLAND 3: BIOLUMINESCENT CAVERN (Deep Crystal Cave & Neon Spores)
  cavern: {
    // High Tier (Glowing Crystal Stalagmites)
    lofi_spore: { x: 26, y: 36, tier: 'high', depthScale: 0.98, perchType: 'neon_shroom', zIndex: 12 },
    nautilus: { x: 74, y: 38, tier: 'high', depthScale: 1.02, perchType: 'spiral_spire', zIndex: 12 },

    // Mid Tier (Central Resonant Geode Ledge)
    crystal_bell: { x: 50, y: 55, tier: 'mid', depthScale: 1.15, perchType: 'geode_altar', zIndex: 18 },

    // Low Tier (Foreground Lapis Lagoon)
    prism_bloom: { x: 20, y: 72, tier: 'low', depthScale: 1.05, perchType: 'prism_reef', zIndex: 22 },
    lapis_groove: { x: 80, y: 70, tier: 'low', depthScale: 1.05, perchType: 'lapis_ledge', zIndex: 22 }
  }
};
