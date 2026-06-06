'use client'

import React, { useState, useEffect } from 'react';
import {
  BaseKitId, PaletteId, FontId, HeroId, GalleryId, AnimationId,
  CompatibilityResolver, DNACodeGenerator
} from './design-system';
import { HybridRenderer } from './HybridRenderer';

export function HybridBuilder() {
  const [base, setBase] = useState<BaseKitId>('RYL');
  const [pal, setPal] = useState<PaletteId>('GLD');
  const [font, setFont] = useState<FontId>('PLAY');
  const [hero, setHero] = useState<HeroId>('MON');
  const [gal, setGal] = useState<GalleryId>('STB');
  const [anm, setAnm] = useState<AnimationId>('NON');

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
  }, [base, pal, font, hero, gal, anm, options]);

  const currentDNA = DNACodeGenerator.generate(base, pal, font, hero, gal, anm);

  const sampleContent = {
    coupleNames: 'Emma & James',
    date: 'October 15, 2026',
    location: 'San Francisco, CA',
    message: 'Join us as we celebrate our love and commitment to each other.'
  };

  return (
    <div className="grid lg:grid-cols-12 gap-0 h-screen bg-background text-foreground">
      {/* Sidebar: Constraint-Driven Selection */}
      <div className="lg:col-span-4 flex flex-col p-8 overflow-y-auto border-r border-border/40 bg-card">
        <div className="mb-10">
          <h2 className="text-2xl font-serif mb-2 font-medium">Design Composer</h2>
          <p className="text-sm text-muted-foreground">Select a Base Kit anchor, then safely customize layers within professional constraints.</p>
        </div>

        <div className="flex flex-col gap-8">

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary">1. Base Kit Anchor</label>
            <div className="grid grid-cols-2 gap-3">
              {options.kits.map(k => (
                <button
                  key={k.id}
                  onClick={() => setBase(k.id as BaseKitId)}
                  className={`p-3 text-sm rounded-xl border text-left font-medium transition-all ${base === k.id ? 'border-primary bg-primary/10 ring-1 ring-primary text-primary' : 'border-border hover:border-primary/30 text-muted-foreground'}`}
                >
                  {k.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary">2. Palette</label>
            <div className="grid grid-cols-3 gap-3">
              {options.palettes.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPal(p.id)}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-2 transition-all ${pal === p.id ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                >
                  <div className="w-full h-8 rounded-md shadow-sm" style={{ background: `linear-gradient(135deg, ${p.bg} 50%, ${p.primary} 50%)` }} />
                  <span className="text-[10px] text-center font-medium truncate w-full">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary">3. Typography</label>
            <div className="grid grid-cols-2 gap-3">
              {options.fonts.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFont(f.id)}
                  className={`p-3 text-sm rounded-xl border text-left transition-all ${f.className} ${font === f.id ? 'border-primary bg-primary/5 ring-1 ring-primary text-primary' : 'border-border hover:border-primary/50 text-muted-foreground'}`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary">4. Hero Structure</label>
            <div className="grid grid-cols-2 gap-3">
              {options.heroes.map(h => (
                <button
                  key={h.id}
                  onClick={() => setHero(h.id)}
                  className={`p-3 text-sm rounded-xl border text-left transition-all flex flex-col gap-1 ${hero === h.id ? 'border-primary bg-primary/5 ring-1 ring-primary text-primary' : 'border-border hover:border-primary/50 text-muted-foreground'}`}
                >
                  <span className="font-semibold">{h.name}</span>
                  <span className="text-[10px] leading-tight opacity-80">{h.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary">5. Gallery</label>
            <div className="grid grid-cols-2 gap-3">
              {options.galleries?.map(g => (
                <button
                  key={g.id}
                  onClick={() => setGal(g.id as GalleryId)}
                  className={`p-3 text-sm rounded-xl border text-left transition-all ${gal === g.id ? 'border-primary bg-primary/5 ring-1 ring-primary text-primary' : 'border-border hover:border-primary/50 text-muted-foreground'}`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary">6. Animation</label>
            <div className="grid grid-cols-2 gap-3">
              {options.animations?.map(a => (
                <button
                  key={a.id}
                  onClick={() => setAnm(a.id as AnimationId)}
                  className={`p-3 text-sm rounded-xl border text-left transition-all ${anm === a.id ? 'border-primary bg-primary/5 ring-1 ring-primary text-primary' : 'border-border hover:border-primary/50 text-muted-foreground'}`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main View: DNA Readout & Preview */}
      <div className="lg:col-span-8 p-8 flex flex-col h-full bg-accent/20">
        <div className="flex justify-between items-center mb-6 bg-background p-4 rounded-2xl border border-border/50 shadow-sm">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Generated DNA String</span>
            <code className="text-xs md:text-sm font-mono text-muted-foreground bg-accent/50 px-2 py-1 rounded">{currentDNA || 'Recomputing constraints...'}</code>
          </div>
        </div>

        <div className="flex-1 rounded-3xl overflow-hidden shadow-2xl border border-border/40 bg-background relative max-h-[800px]">
          {currentDNA && <HybridRenderer dna={currentDNA} content={sampleContent} />}
        </div>
      </div>
    </div>
  );
}