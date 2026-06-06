import React from 'react';

// 1. LAYER IDENTIFIERS
export type BaseKitId = 'RYL' | 'GRD' | 'CEL' | 'MIN' | 'VIN' | 'TRP';
export type PaletteId = 'GLD' | 'MID' | 'BLU' | 'EMR' | 'PNK' | 'MON' | 'LAV' | 'SUN' | 'SGE' | 'PRL' | 'TER' | 'VIN' | 'PLT';
export type FontId = 'PLAY' | 'CORM' | 'MONT' | 'INTR' | 'POPP' | 'GVIB' | 'CINZ' | 'SACR' | 'BORM' | 'ALEX' | 'OUTF';
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
    allowedPalettes: ['GLD', 'MID', 'BLU', 'PRL', 'VIN'],
    allowedFonts: ['PLAY', 'CORM', 'CINZ', 'BORM'],
    allowedHeroes: ['MON', 'CTR'],
    allowedGalleries: ['STB', 'CRS'],
    maxAnimationLevel: 1,
  },
  MIN: {
    id: 'MIN',
    name: 'Minimal',
    allowedPalettes: ['MON', 'GLD', 'MID', 'PLT'],
    allowedFonts: ['MONT', 'INTR', 'POPP', 'OUTF'],
    allowedHeroes: ['CTR', 'SPL'],
    allowedGalleries: ['CRS', 'TML'],
    maxAnimationLevel: 0,
  },
  VIN: {
    id: 'VIN',
    name: 'Vintage',
    allowedPalettes: ['PNK', 'GLD', 'MID', 'VIN', 'PRL'],
    allowedFonts: ['CORM', 'PLAY', 'GVIB', 'ALEX', 'SACR'],
    allowedHeroes: ['CTR', 'FUL'],
    allowedGalleries: ['POL', 'MAS'],
    maxAnimationLevel: 1,
  },
  GRD: {
    id: 'GRD',
    name: 'Garden',
    allowedPalettes: ['EMR', 'PNK', 'SUN', 'SGE', 'TER'],
    allowedFonts: ['PLAY', 'CORM', 'MONT', 'SACR'],
    allowedHeroes: ['SPL', 'FUL', 'PRX'],
    allowedGalleries: ['MAS', 'CRS'],
    maxAnimationLevel: 2,
  },
  CEL: {
    id: 'CEL',
    name: 'Celestial',
    allowedPalettes: ['MID', 'LAV', 'BLU', 'PLT'],
    allowedFonts: ['CORM', 'INTR', 'PLAY', 'CINZ'],
    allowedHeroes: ['PRX', 'FUL', 'MON'],
    allowedGalleries: ['MAS', 'STB'],
    maxAnimationLevel: 2,
  },
  TRP: {
    id: 'TRP',
    name: 'Tropical',
    allowedPalettes: ['SUN', 'EMR', 'PNK', 'TER'],
    allowedFonts: ['MONT', 'POPP', 'PLAY', 'OUTF'],
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
  SGE: { name: 'Sage Green', bg: '#f4f7f4', primary: '#708238', text: '#2f3b2f' },
  PRL: { name: 'Pearl Rose', bg: '#fffafa', primary: '#e6c280', text: '#4a3c31' },
  TER: { name: 'Terracotta', bg: '#fbf5f2', primary: '#c97a62', text: '#4e2a1e' },
  VIN: { name: 'Bordeaux', bg: '#f5efe6', primary: '#5c1d24', text: '#2c221e' },
  PLT: { name: 'Platinum', bg: '#fafafa', primary: '#7f8c8d', text: '#2c3e50' },
};

export const FontRegistry: Record<FontId, { name: string, className: string, style?: React.CSSProperties }> = {
  PLAY: { name: 'Playfair Display', className: 'font-serif' },
  CORM: { name: 'Cormorant', className: 'font-serif', style: { fontFamily: "'Cormorant Garamond', serif" } },
  MONT: { name: 'Montserrat', className: 'font-sans', style: { fontFamily: "'Montserrat', sans-serif" } },
  INTR: { name: 'Inter', className: 'font-sans', style: { fontFamily: "'Inter', sans-serif" } },
  POPP: { name: 'Poppins', className: 'font-sans', style: { fontFamily: "'Poppins', sans-serif" } },
  GVIB: { name: 'Great Vibes', className: 'font-serif italic', style: { fontFamily: "'Great Vibes', cursive" } },
  CINZ: { name: 'Cinzel', className: 'font-serif', style: { fontFamily: "'Cinzel', serif", letterSpacing: '0.1em' } },
  SACR: { name: 'Sacramento', className: 'font-serif', style: { fontFamily: "'Sacramento', cursive" } },
  BORM: { name: 'Bodoni Moda', className: 'font-serif', style: { fontFamily: "'Bodoni Moda', serif" } },
  ALEX: { name: 'Alex Brush', className: 'font-serif', style: { fontFamily: "'Alex Brush', cursive" } },
  OUTF: { name: 'Outfit', className: 'font-sans', style: { fontFamily: "'Outfit', sans-serif" } },
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
    if (!dna.startsWith('DNA-1:')) {
      throw new Error('Invalid DNA version');
    }

    const parts = dna.split(':');
    
    const [_, base, pal, font, hero, gal, anm] = parts as [string, BaseKitId, PaletteId, FontId, HeroId, GalleryId, AnimationId];

    return { base, pal, font, hero, gal, anm };
  }
}