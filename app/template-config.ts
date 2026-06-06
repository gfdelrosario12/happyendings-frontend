export const TEMPLATE_CODES = {
  LAYOUT: {
    CENTERED: 'LYT_CENTERED',
    BORDERED: 'LYT_BORDERED',
    MINIMAL_LEFT: 'LYT_MINIMAL_LEFT',
    ELEGANT_SPLIT: 'LYT_ELEGANT_SPLIT',
  },
  COLORS: {
    IVORY_GOLD: 'CLR_IVORY_GOLD',
    BLUSH_ROSE: 'CLR_BLUSH_ROSE',
    NAVY_SILVER: 'CLR_NAVY_SILVER',
    EMERALD_GOLD: 'CLR_EMERALD_GOLD',
    MODERN_MONO: 'CLR_MODERN_MONO',
  },
  FONTS: {
    SERIF_PLAYFAIR: 'FNT_SERIF_PLAYFAIR',
    SANS_GEIST: 'FNT_SANS_GEIST',
    SERIF_ROMANTIC: 'FNT_SERIF_ROMANTIC',
  }
} as const;

export const LAYOUT_STYLES: Record<string, string> = {
  [TEMPLATE_CODES.LAYOUT.CENTERED]: 'flex flex-col items-center justify-center text-center p-8 md:p-12',
  [TEMPLATE_CODES.LAYOUT.BORDERED]: 'flex flex-col items-center justify-center text-center p-8 md:p-12 border-4 m-4 md:m-6',
  [TEMPLATE_CODES.LAYOUT.MINIMAL_LEFT]: 'flex flex-col items-start justify-end text-left p-8 md:p-12',
  [TEMPLATE_CODES.LAYOUT.ELEGANT_SPLIT]: 'flex flex-col justify-between items-center text-center p-8 md:p-12',
};

export const COLOR_STYLES: Record<string, { bg: string, primary: string, text: string, accentBg: string }> = {
  [TEMPLATE_CODES.COLORS.IVORY_GOLD]: { bg: '#f5f1ee', primary: '#d4a574', text: '#3d3d3d', accentBg: '#f0e9e4' },
  [TEMPLATE_CODES.COLORS.BLUSH_ROSE]: { bg: '#fdf8f5', primary: '#e5b2b9', text: '#4a4042', accentBg: '#faeee8' },
  [TEMPLATE_CODES.COLORS.NAVY_SILVER]: { bg: '#0b1d3a', primary: '#e0e0e0', text: '#fbfbfb', accentBg: '#152b52' },
  [TEMPLATE_CODES.COLORS.EMERALD_GOLD]: { bg: '#05472a', primary: '#d4a574', text: '#fbfbfb', accentBg: '#085e38' },
  [TEMPLATE_CODES.COLORS.MODERN_MONO]: { bg: '#ffffff', primary: '#000000', text: '#1a1a1a', accentBg: '#f5f5f5' },
};

export const FONT_STYLES: Record<string, string> = {
  [TEMPLATE_CODES.FONTS.SERIF_PLAYFAIR]: 'font-serif',
  [TEMPLATE_CODES.FONTS.SANS_GEIST]: 'font-sans',
  [TEMPLATE_CODES.FONTS.SERIF_ROMANTIC]: 'font-serif italic',
};

export const PREMADE_TEMPLATES = [
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    codes: {
      layout: TEMPLATE_CODES.LAYOUT.BORDERED,
      color: TEMPLATE_CODES.COLORS.IVORY_GOLD,
      font: TEMPLATE_CODES.FONTS.SERIF_PLAYFAIR,
    }
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    codes: {
      layout: TEMPLATE_CODES.LAYOUT.MINIMAL_LEFT,
      color: TEMPLATE_CODES.COLORS.MODERN_MONO,
      font: TEMPLATE_CODES.FONTS.SANS_GEIST,
    }
  },
  {
    id: 'midnight-romance',
    name: 'Midnight Romance',
    codes: {
      layout: TEMPLATE_CODES.LAYOUT.ELEGANT_SPLIT,
      color: TEMPLATE_CODES.COLORS.NAVY_SILVER,
      font: TEMPLATE_CODES.FONTS.SERIF_ROMANTIC,
    }
  },
  {
    id: 'emerald-garden',
    name: 'Emerald Garden',
    codes: {
      layout: TEMPLATE_CODES.LAYOUT.CENTERED,
      color: TEMPLATE_CODES.COLORS.EMERALD_GOLD,
      font: TEMPLATE_CODES.FONTS.SERIF_PLAYFAIR,
    }
  }
];