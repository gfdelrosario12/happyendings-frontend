'use client';

import React, { useState, useEffect } from 'react';
import {
  BaseKitId, PaletteId, FontId, HeroId, GalleryId, AnimationId,
  CompatibilityResolver, DNACodeGenerator
} from './design-system';
import { HybridRenderer } from './HybridRenderer';
import { Heart, FileText, Palette, Type, Layout, Image as ImageIcon, Sparkles } from 'lucide-react';

const PRESETS = [
  { id: 'classic', name: 'Classic Gold', base: 'RYL', pal: 'GLD', font: 'PLAY', hero: 'MON', gal: 'STB', anm: 'NON' },
  { id: 'minimal', name: 'Minimal Mono', base: 'MIN', pal: 'MON', font: 'MONT', hero: 'SPL', gal: 'CRS', anm: 'NON' },
  { id: 'vintage', name: 'Vintage Bordeaux', base: 'VIN', pal: 'VIN', font: 'ALEX', hero: 'CTR', gal: 'POL', anm: 'NON' },
  { id: 'garden', name: 'Emerald & Sage', base: 'GRD', pal: 'SGE', font: 'CORM', hero: 'SPL', gal: 'MAS', anm: 'NON' },
  { id: 'celestial', name: 'Celestial Lavender', base: 'CEL', pal: 'LAV', font: 'CINZ', hero: 'PRX', gal: 'STB', anm: 'NON' },
  { id: 'tropical', name: 'Terracotta Sunset', base: 'TRP', pal: 'TER', font: 'OUTF', hero: 'FUL', gal: 'MAS', anm: 'NON' },
] as const;

interface HybridBuilderProps {
  initialPresetId?: string;
}

export function HybridBuilder({ initialPresetId }: HybridBuilderProps) {
  const [base, setBase] = useState<BaseKitId>('RYL');
  const [pal, setPal] = useState<PaletteId>('GLD');
  const [font, setFont] = useState<FontId>('PLAY');
  const [hero, setHero] = useState<HeroId>('MON');
  const [gal, setGal] = useState<GalleryId>('STB');
  const [anm, setAnm] = useState<AnimationId>('NON');

  // Invitation Content State
  const [coupleNames, setCoupleNames] = useState('Emma & James');
  const [date, setDate] = useState('October 15, 2026');
  const [location, setLocation] = useState('San Francisco, CA');
  const [message, setMessage] = useState('Join us as we celebrate our love and commitment to each other.');

  // Pre-load from URL / prop initialPresetId if provided
  useEffect(() => {
    if (initialPresetId) {
      const match = PRESETS.find(p => p.id === initialPresetId);
      if (match) {
        setBase(match.base as BaseKitId);
        setPal(match.pal as PaletteId);
        setFont(match.font as FontId);
        setHero(match.hero as HeroId);
        setGal(match.gal as GalleryId);
        setAnm(match.anm as AnimationId);
      }
    }
  }, [initialPresetId]);

  // Get only the legal options allowed by the chosen Base Kit
  const options = CompatibilityResolver.getValidOptions(base);

  // Ensure active selections remain valid when the Base Kit anchor changes
  useEffect(() => {
    if (options.palettes && !options.palettes.some(p => p.id === pal)) {
      setPal(options.palettes[0].id as PaletteId);
    }
    if (options.fonts && !options.fonts.some(f => f.id === font)) {
      setFont(options.fonts[0].id as FontId);
    }
    if (options.heroes && !options.heroes.some(h => h.id === hero)) {
      setHero(options.heroes[0].id as HeroId);
    }
    if (options.galleries && !options.galleries.some(g => g.id === gal)) {
      setGal(options.galleries[0].id as GalleryId);
    }
    if (options.animations && !options.animations.some(a => a.id === anm)) {
      setAnm(options.animations[0].id as AnimationId);
    }
  }, [base, options, pal, font, hero, gal, anm]);

  const currentDNA = DNACodeGenerator.generate(base, pal, font, hero, gal, anm);

  const loadPreset = (preset: typeof PRESETS[number]) => {
    setBase(preset.base as BaseKitId);
    setPal(preset.pal as PaletteId);
    setFont(preset.font as FontId);
    setHero(preset.hero as HeroId);
    setGal(preset.gal as GalleryId);
    setAnm(preset.anm as AnimationId);
  };

  const inviteContent = {
    coupleNames,
    date,
    location,
    message
  };

  return (
    <div className="grid lg:grid-cols-12 gap-0 h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar: Customizer */}
      <div className="lg:col-span-4 flex flex-col h-full overflow-y-auto border-r border-border/45 bg-card">
        {/* Header */}
        <div className="p-6 border-b border-border/40 bg-secondary/5">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            <h2 className="text-xl font-serif font-bold tracking-tight">Design & Content</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Diversify design parameters and insert invitation details dynamically.
          </p>
        </div>

        {/* Content Tabs / Scroll area */}
        <div className="p-6 space-y-8 flex-1">
          {/* Preset Selector */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Start From A Preset
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => loadPreset(preset)}
                  className="px-3 py-2 text-left rounded-xl border border-border/70 hover:border-primary/50 hover:bg-primary/5 transition-all text-xs font-medium"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Invitation Content Fields */}
          <div className="space-y-4 pt-4 border-t border-border/30">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" /> Invitation Text
            </label>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-muted-foreground font-semibold uppercase block mb-1">Couple Names</label>
                <input
                  type="text"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="Couple Names"
                />
              </div>

              <div>
                <label className="text-[10px] text-muted-foreground font-semibold uppercase block mb-1">Wedding Date</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="Date & Time"
                />
              </div>

              <div>
                <label className="text-[10px] text-muted-foreground font-semibold uppercase block mb-1">Location / Venue</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="Venue & Address"
                />
              </div>

              <div>
                <label className="text-[10px] text-muted-foreground font-semibold uppercase block mb-1">Invitation Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-1 focus:ring-primary focus:outline-none resize-none"
                  placeholder="Invitation message..."
                />
              </div>
            </div>
          </div>

          {/* DNA Anchors */}
          <div className="space-y-6 pt-6 border-t border-border/30">
            {/* Base Kit */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Layout className="h-3.5 w-3.5" /> 1. Base Kit Anchor
              </label>
              <div className="grid grid-cols-2 gap-2">
                {options.kits.map(k => (
                  <button
                    key={k.id}
                    onClick={() => setBase(k.id as BaseKitId)}
                    className={`p-2.5 text-xs rounded-xl border text-left font-medium transition-all ${base === k.id ? 'border-primary bg-primary/10 ring-1 ring-primary text-primary' : 'border-border hover:border-primary/30 text-muted-foreground'}`}
                  >
                    {k.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Palette */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5" /> 2. Palette
              </label>
              <div className="grid grid-cols-3 gap-2">
                {options.palettes.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPal(p.id)}
                    className={`p-1.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${pal === p.id ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                  >
                    <div className="w-full h-6 rounded-md shadow-sm" style={{ background: `linear-gradient(135deg, ${p.bg} 50%, ${p.primary} 50%)` }} />
                    <span className="text-[9px] text-center font-medium truncate w-full">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fonts */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Type className="h-3.5 w-3.5" /> 3. Typography
              </label>
              <div className="grid grid-cols-2 gap-2">
                {options.fonts.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFont(f.id)}
                    className={`p-2 text-xs rounded-xl border text-left transition-all ${f.className} ${font === f.id ? 'border-primary bg-primary/5 ring-1 ring-primary text-primary' : 'border-border hover:border-primary/50 text-muted-foreground'}`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Layout */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Layout className="h-3.5 w-3.5" /> 4. Hero Structure
              </label>
              <div className="grid grid-cols-2 gap-2">
                {options.heroes.map(h => (
                  <button
                    key={h.id}
                    onClick={() => setHero(h.id)}
                    className={`p-2.5 text-xs rounded-xl border text-left transition-all flex flex-col gap-0.5 ${hero === h.id ? 'border-primary bg-primary/5 ring-1 ring-primary text-primary' : 'border-border hover:border-primary/50 text-muted-foreground'}`}
                  >
                    <span className="font-semibold">{h.name}</span>
                    <span className="text-[9px] leading-tight opacity-75">{h.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5" /> 5. Gallery
              </label>
              <div className="grid grid-cols-2 gap-2">
                {options.galleries.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setGal(g.id as GalleryId)}
                    className={`p-2 text-xs rounded-xl border text-left transition-all ${gal === g.id ? 'border-primary bg-primary/5 ring-1 ring-primary text-primary' : 'border-border hover:border-primary/50 text-muted-foreground'}`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Animations */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> 6. Animation
              </label>
              <div className="grid grid-cols-2 gap-2">
                {options.animations.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setAnm(a.id as AnimationId)}
                    className={`p-2 text-xs rounded-xl border text-left transition-all ${anm === a.id ? 'border-primary bg-primary/5 ring-1 ring-primary text-primary' : 'border-border hover:border-primary/50 text-muted-foreground'}`}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main View: DNA Readout & Preview */}
      <div className="lg:col-span-8 p-6 flex flex-col h-full bg-accent/15 overflow-hidden">
        {/* DNA Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 bg-background p-4 rounded-2xl border border-border/40 shadow-sm">
          <div className="flex flex-col w-full sm:w-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Generated Template DNA</span>
            <code className="text-xs md:text-sm font-mono text-muted-foreground bg-accent/60 px-3 py-1.5 rounded select-all break-all">{currentDNA || 'Recomputing constraints...'}</code>
          </div>
        </div>

        {/* Live Invitation Canvas Wrapper */}
        <div className="flex-1 rounded-3xl overflow-hidden shadow-2xl border border-border/40 bg-background relative max-h-[85vh] aspect-[4/5] mx-auto w-full max-w-xl">
          {currentDNA && <HybridRenderer dna={currentDNA} content={inviteContent} />}
        </div>
      </div>
    </div>
  );
}