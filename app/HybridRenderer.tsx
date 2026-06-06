import React from 'react';
import { DNACodeParser, PaletteRegistry, FontRegistry, HeroRegistry } from './design-system';
import { LayoutStrategyResolver } from './LayoutStrategyResolver';

interface HybridRendererProps {
  dna: string;
  content: {
    coupleNames: string;
    date: string;
    location: string;
    message: string;
  };
}

export function HybridRenderer({ dna, content }: HybridRendererProps) {
  let config;
  try {
    config = DNACodeParser.parse(dna);
  } catch (err) {
    return <div className="p-4 bg-red-50 text-red-600 rounded">Invalid DNA Configuration</div>;
  }

  const palette = PaletteRegistry[config.pal] || { bg: '#ffffff', text: '#000000', primary: '#cccccc' };
  const font = FontRegistry[config.font] || { className: 'font-serif' };
  
  const layout = LayoutStrategyResolver.getLayout(config) || {};
  
  const isSplit = layout.type === 'split';
  const isMonogram = layout.type === 'monogram';
  const isFull = layout.type === 'full';
  const isParallax = layout.type === 'parallax';
  
  const isMinimal = layout.variant === 'minimal';
  const isVintage = layout.variant === 'vintage';
  
  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${font.className} transition-colors duration-700`}
      style={{ backgroundColor: palette.bg, color: palette.text }}
    >
      <div className={`w-full h-full ${isFull || isParallax ? 'p-0' : 'p-8 md:p-12'} flex flex-col items-center justify-center text-center relative z-10`}>
         {isSplit ? (
           <div className="flex flex-col md:flex-row w-full h-full">
             <div className="flex-1 bg-black/5 rounded-2xl m-4 md:m-8 border border-black/10" style={{ backgroundImage: 'url("https://raw.githubusercontent.com/gfdelrosario12/happyendings-frontend/main/public/assets/wedding_hands.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }} /> 
             <div className="flex-1 flex flex-col items-center justify-center p-8">
                {isMinimal && <div className="w-12 h-1 mb-8" style={{ backgroundColor: palette.primary }}></div>}
                <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">{content.coupleNames}</h2>
                <p className="opacity-80 mb-8 max-w-sm">{content.message}</p>
                <span style={{ color: palette.primary }} className="text-lg uppercase tracking-widest font-semibold">{content.date}</span>
             </div>
           </div>
         ) : isFull || isParallax ? (
           <div className="relative w-full h-full flex items-center justify-center p-8" style={{ backgroundImage: 'url("https://raw.githubusercontent.com/gfdelrosario12/happyendings-frontend/main/public/assets/wedding_hands.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: isParallax ? 'fixed' : 'scroll' }}>
             <div className="absolute inset-0 bg-black/40 transition-colors duration-700" style={{ backgroundColor: `${palette.bg}B3` }} />
             <div className="relative z-10 p-12 border border-white/20 backdrop-blur-sm rounded-2xl" style={{ backgroundColor: `${palette.bg}E6` }}>
               <h2 className="text-4xl md:text-5xl lg:text-7xl mb-6">{content.coupleNames}</h2>
               <p className="opacity-90 mb-8 max-w-md mx-auto">{content.message}</p>
               <span className="text-xl tracking-widest font-medium" style={{ color: palette.primary }}>{content.date}</span>
             </div>
           </div>
         ) : (
           <div className={`flex flex-col items-center max-w-lg mx-auto p-8 md:p-12 h-full justify-center transition-all duration-500 w-full ${isVintage ? 'border-double border-8' : 'border-[3px]'}`} style={{ borderColor: palette.primary }}>
             {isMonogram && (
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-8 font-bold shadow-sm" style={{ backgroundColor: palette.primary, color: palette.bg }}>
                  {content.coupleNames.charAt(0)}
                </div>
             )}
             {!isMonogram && isVintage && (
                <div className="text-4xl mb-6" style={{ color: palette.primary }}>❧</div>
             )}
             <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">{content.coupleNames}</h2>
             <p className="text-sm md:text-base opacity-90 leading-relaxed mb-8">{content.message}</p>
             <div className="mt-8 flex flex-col items-center gap-2">
                <span className="text-xl tracking-widest font-medium" style={{ color: palette.primary }}>{content.date}</span>
             </div>
           </div>
         )}
      </div>
    </div>
  );
}