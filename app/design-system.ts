// 1. LAYER IDENTIFIERS
export type BaseKitId = 'RYL' | 'GRD' | 'CEL' | 'MIN' | 'VIN' | 'TRP';
export type PaletteId = 'GLD' | 'MID' | 'BLU' | 'EMR' | 'PNK' | 'MON' | 'LAV' | 'SUN';
export type FontId = 'PLAY' | 'CORM' | 'MONT' | 'INTR' | 'POPP' | 'GVIB';
export type HeroId = 'MON' | 'CTR' | 'SPL' | 'FUL' | 'PRX';
export type GalleryId = 'STB' | 'CRS' | 'MAS' | 'POL' | 'TML';
export type AnimationId = 'NON' | 'FAD' | 'SLD' | 'FLT' | 'PTC' | 'CFT';

export type AnimationLevel = 0 | 1 | 2; // LOW, MEDIUM, HIGH

// 2. STRUCTURAL INTERFACES
export interface BaseKit {
  id: BaseKitId;
  name: string;
  allowedPalettes: PaletteId[];
  allowedFonts: FontId[];
  allowedHeroes: HeroId[];
  allowedGalleries: GalleryId[];
  maxAnimationLevel: AnimationLevel;
}

// 3. REGISTRIES
export const BaseKitRegistry: Record<BaseKitId, BaseKit> = {
  RYL: {
    id: 'RYL',
    name: 'Royal',
    allowedPalettes: ['GLD', 'MID', 'BLU'],
    allowedFonts: ['PLAY', 'CORM'],
    allowedHeroes: ['MON', 'CTR'],
    allowedGalleries: ['STB', 'CRS'],
    maxAnimationLevel: 1,
  },
  MIN: {
    id: 'MIN',
    name: 'Minimal',
    allowedPalettes: ['MON', 'GLD', 'MID'],
    allowedFonts: ['MONT', 'INTR', 'POPP'],
    allowedHeroes: ['CTR', 'SPL'],
    allowedGalleries: ['CRS', 'TML'],
    maxAnimationLevel: 0,
  },
  VIN: {
    id: 'VIN',
    name: 'Vintage',
    allowedPalettes: ['PNK', 'GLD', 'MID'],
    allowedFonts: ['CORM', 'PLAY', 'GVIB'],
    allowedHeroes: ['CTR', 'FUL'],
    allowedGalleries: ['POL', 'MAS'],
    maxAnimationLevel: 1,
  },
  GRD: {
    id: 'GRD',
    name: 'Garden',
    allowedPalettes: ['EMR', 'PNK', 'SUN'],
    allowedFonts: ['PLAY', 'CORM', 'MONT'],
    allowedHeroes: ['SPL', 'FUL', 'PRX'],
    allowedGalleries: ['MAS', 'CRS'],
    maxAnimationLevel: 2,
  },
  CEL: {
    id: 'CEL',
    name: 'Celestial',
    allowedPalettes: ['MID', 'LAV', 'BLU'],
    allowedFonts: ['CORM', 'INTR', 'PLAY'],
    allowedHeroes: ['PRX', 'FUL', 'MON'],
    allowedGalleries: ['MAS', 'STB'],
    maxAnimationLevel: 2,
  },
  TRP: {
    id: 'TRP',
    name: 'Tropical',
    allowedPalettes: ['SUN', 'EMR', 'PNK'],
    allowedFonts: ['MONT', 'POPP', 'PLAY'],
    allowedHeroes: ['SPL', 'FUL'],
    allowedGalleries: ['CRS', 'MAS'],
    maxAnimationLevel: 1,
  }
};

export const PaletteRegistry: Record<PaletteId, { name: string, bg: string, primary: string, text: string }> = {
  GLD: { name: 'Gold Elegance', bg: '#f9f8f6', primary: '#d4af37', text: '#333333' },
  MID: { name: 'Midnight', bg: '#0f172a', primary: '#e2e8f0', text: '#f8fafc' },
  BLU: { name: 'Royal Blue', bg: '#1e3a8a', primary: '#bfdbfe', text: '#eff6ff' },
  EMR: { name: 'Emerald', bg: '#064e3b', primary: '#d1fae5', text: '#ecfdf5' },
  PNK: { name: 'Pink Romance', bg: '#fdf2f8', primary: '#db2777', text: '#831843' },
  MON: { name: 'Monochrome', bg: '#ffffff', primary: '#000000', text: '#000000' },
  LAV: { name: 'Lavender', bg: '#f3e8ff', primary: '#7e22ce', text: '#3b0764' },
  SUN: { name: 'Sunset', bg: '#fff7ed', primary: '#ea580c', text: '#7c2d12' },
};

export const FontRegistry: Record<FontId, { name: string, className: string }> = {
  PLAY: { name: 'Playfair Display', className: 'font-serif' },
  CORM: { name: 'Cormorant', className: 'font-serif' },
  MONT: { name: 'Montserrat', className: 'font-sans' },
  INTR: { name: 'Inter', className: 'font-sans' },
  POPP: { name: 'Poppins', className: 'font-sans' },
  GVIB: { name: 'Great Vibes', className: 'font-serif italic' },
};

export const HeroRegistry: Record<HeroId, { name: string, description: string }> = {
  MON: { name: 'Monogram', description: 'Elegant centered monogram' },
  CTR: { name: 'Centered', description: 'Classic centered focus' },
  SPL: { name: 'Split Screen', description: 'Modern 50/50 balance' },
  FUL: { name: 'Full Bleed', description: 'Immersive edge-to-edge' },
  PRX: { name: 'Parallax', description: 'Dynamic depth scrolling' },
};

export const GalleryRegistry: Record<GalleryId, { name: string }> = {
  STB: { name: 'Storybook' },
  CRS: { name: 'Carousel' },
  MAS: { name: 'Masonry' },
  POL: { name: 'Polaroid' },
  TML: { name: 'Timeline' },
};

export const AnimationRegistry: Record<AnimationId, { name: string, level: AnimationLevel }> = {
  NON: { name: 'None', level: 0 },
  FAD: { name: 'Fade In', level: 0 },
  SLD: { name: 'Slide Up', level: 1 },
  FLT: { name: 'Float', level: 1 },
  PTC: { name: 'Particles', level: 2 },
  CFT: { name: 'Confetti', level: 2 },
};

// 4. LOGIC ENGINES

export class ConstraintEngine {
  static getAllowed(base: BaseKitId) {
    return BaseKitRegistry[base];
  }

  static filterPalettes(base: BaseKitId, palettes: PaletteId[]) {
    const allowed = this.getAllowed(base).allowedPalettes;
    return palettes.filter(p => allowed.includes(p));
  }

  static filterFonts(base: BaseKitId, fonts: FontId[]) {
    const allowed = this.getAllowed(base).allowedFonts;
    return fonts.filter(f => allowed.includes(f));
  }

  static filterHeroes(base: BaseKitId, heroes: HeroId[]) {
    const allowed = this.getAllowed(base).allowedHeroes;
    return heroes.filter(h => allowed.includes(h));
  }

  static filterGalleries(base: BaseKitId, galleries: GalleryId[]) {
    const allowed = this.getAllowed(base).allowedGalleries;
    return galleries.filter(g => allowed.includes(g));
  }

  static filterAnimations(base: BaseKitId, animations: AnimationId[]) {
    const maxLevel = this.getAllowed(base).maxAnimationLevel;
    return animations.filter(a => AnimationRegistry[a].level <= maxLevel);
  }
}

export class CompatibilityResolver {
  // Filters options down to ONLY what the selected Base Kit supports
  static getValidOptions(base: BaseKitId) {
    const kit = BaseKitRegistry[base];
    return {
      kits: Object.values(BaseKitRegistry).map(k => ({
        id: k.id,
        name: k.name,
      })),
      palettes: kit.allowedPalettes.map(id => ({ id, ...PaletteRegistry[id] })),
      fonts: kit.allowedFonts.map(id => ({ id, ...FontRegistry[id] })),
      heroes: kit.allowedHeroes.map(id => ({ id, ...HeroRegistry[id] })),
      galleries: kit.allowedGalleries.map(id => ({ id, ...GalleryRegistry[id] })),
      animations: Object.entries(AnimationRegistry)
        .filter(([_, a]) => a.level <= kit.maxAnimationLevel)
        .map(([id, a]) => ({ id: id as AnimationId, ...a }))
    };
  }
}

export class DNACodeGenerator {
  static generate(base: BaseKitId, pal: PaletteId, font: FontId, hero: HeroId, gal: GalleryId, anm: AnimationId): string {
    return `DNA-1:${base}:${pal}:${font}:${hero}:${gal}:${anm}`;
  }
}

export class DNACodeParser {
  static parse(dna: string) {
    if (!dna.startsWith('DNA-1')) {
      throw new Error('Invalid DNA version');
    }

    const parts = dna.replace('DNA-1-', '').split('-');
    
    const [_, base, pal, font, hero, gal, anm] = parts as [string, BaseKitId, PaletteId, FontId, HeroId, GalleryId, AnimationId];

    return { base, pal, font, hero, gal, anm };
  }
}