'use client'

import { Card } from '@/components/ui/card'
import { HybridRenderer } from './HybridRenderer'
import { DNACodeGenerator } from './design-system'

const PREMADE_DNAS = [
  { id: 'royal-gold', name: 'Royal Gold', dna: DNACodeGenerator.generate('RYL', 'GLD', 'PLAY', 'MON', 'STB', 'NON') },
  { id: 'minimal-mono', name: 'Minimal Mono', dna: DNACodeGenerator.generate('MIN', 'MON', 'MONT', 'CTR', 'CRS', 'NON') },
  { id: 'vintage-bordeaux', name: 'Vintage Bordeaux', dna: DNACodeGenerator.generate('VIN', 'VIN', 'ALEX', 'CTR', 'POL', 'NON') },
  { id: 'garden-sage', name: 'Emerald & Sage', dna: DNACodeGenerator.generate('GRD', 'SGE', 'CORM', 'SPL', 'MAS', 'NON') },
  { id: 'celestial-lavender', name: 'Celestial Lavender', dna: DNACodeGenerator.generate('CEL', 'LAV', 'CINZ', 'PRX', 'STB', 'NON') },
  { id: 'terracotta-sunset', name: 'Terracotta Sunset', dna: DNACodeGenerator.generate('TRP', 'TER', 'OUTF', 'FUL', 'MAS', 'NON') }
];

export function TemplateShowcase() {
  const sampleContent = {
    coupleNames: 'Emma & James',
    date: 'October 15, 2026',
    location: 'San Francisco, CA',
    message: 'Join us as we celebrate our love and commitment to each other.'
  };

  return (
    <section id="templates" className="px-4 py-24 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-4">
            Curated Design Stacks
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Beautiful preset combinations from our hybrid design system. Each layer can be customized while maintaining visual harmony.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PREMADE_DNAS.map((template) => (
            <Card key={template.id} className="group overflow-hidden border border-border/60 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-3xl flex flex-col">
              {/* Template Visual Preview using the mapped Renderer */}
              <div className="relative h-[320px] w-full transition-transform duration-700 group-hover:scale-[1.02] bg-muted/20">
                {/* Scaled wrapper to fit a desktop-sized render perfectly into the thumbnail */}
                <div className="absolute inset-0 origin-top-left scale-[0.5] w-[200%] h-[200%] pointer-events-none">
                  <HybridRenderer
                    dna={template.dna}
                    content={sampleContent}
                  />
                </div>
              </div>
              {/* Assigned Code Details to showcase it's backend ready */}
              <div className="p-6 bg-card flex flex-col justify-between flex-1 relative z-10 border-t border-border/40">
                <h3 className="font-serif text-2xl font-medium text-foreground mb-4">{template.name}</h3>
                <div className="flex flex-col gap-1 text-xs text-muted-foreground font-mono bg-accent/30 p-4 rounded-xl">
                  <span className="font-semibold text-primary uppercase text-[10px] tracking-wider">DNA String</span> 
                  {template.dna}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}