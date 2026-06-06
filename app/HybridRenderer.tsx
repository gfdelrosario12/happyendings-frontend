import React from 'react';
import { DNACodeParser, PaletteRegistry, FontRegistry } from './design-system';
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
    return (
      <div className="p-8 bg-destructive/10 text-destructive rounded-2xl border border-destructive/20 text-center font-sans">
        <p className="font-semibold mb-2">Invalid Design DNA String</p>
        <code className="text-xs bg-destructive/5 px-2 py-1 rounded font-mono">{dna}</code>
      </div>
    );
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

  // Customize backgrounds dynamically based on the Base Kit
  const getContainerStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      backgroundColor: palette.bg,
      color: palette.text,
      ...font.style,
    };

    if (config.base === 'CEL') {
      // Celestial: Gorgeous midnight-to-indigo gradient
      baseStyle.background = `linear-gradient(to bottom, #0f1626, #1e293b, ${palette.bg})`;
    } else if (config.base === 'TRP') {
      // Tropical: Peach/Sunset warm tint
      baseStyle.background = `linear-gradient(135deg, ${palette.bg}, #fff5eb, #fff0e0)`;
    } else if (config.base === 'VIN') {
      // Vintage: Aged parchment look
      baseStyle.background = `linear-gradient(to bottom right, #fbf7ee, #f3ebda, ${palette.bg})`;
    }

    return baseStyle;
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden transition-all duration-700 select-none ${font.className}`}
      style={getContainerStyle()}
    >
      {/* Background Ornaments */}
      {config.base === 'CEL' && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {/* Subtle glittering stars */}
          <div className="absolute top-[15%] left-[25%] h-1 w-1 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-[30%] right-[20%] h-1 w-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-[25%] left-[15%] h-1.5 w-1.5 bg-yellow-100 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-[40%] right-[30%] h-1 w-1 bg-white rounded-full animate-ping"></div>
        </div>
      )}

      {config.base === 'GRD' && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
          {/* Botanical leaf watermarks */}
          <div className="absolute -top-[10%] -left-[10%] transform rotate-45 w-72 h-72 border-4 border-foreground rounded-full" />
          <div className="absolute -bottom-[10%] -right-[10%] transform rotate-45 w-72 h-72 border-4 border-foreground rounded-full" />
        </div>
      )}

      {/* Main Content Layouts */}
      <div className={`w-full h-full ${isFull || isParallax ? 'p-0' : 'p-6 md:p-12'} flex flex-col items-center justify-center text-center relative z-10`}>
        
        {isSplit ? (
          <div className="flex flex-col md:flex-row w-full h-full items-stretch">
            {/* Split Image Panel */}
            <div className="flex-1 bg-black/5 rounded-2xl m-3 md:m-6 border border-border/40 overflow-hidden relative min-h-[200px] md:min-h-0">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                style={{ 
                  backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200")',
                }}
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Split Text Panel */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8">
              {config.base === 'GRD' && (
                <span className="text-sm font-semibold tracking-[0.2em] mb-4 text-emerald-600 block">✦ GARDEN CELEBRATION ✦</span>
              )}
              {config.base === 'TRP' && (
                <span className="text-sm font-semibold tracking-[0.2em] mb-4 text-orange-600 block">🌴 TROPICAL ESCAPE</span>
              )}
              {isMinimal && <div className="w-12 h-[2px] mb-6" style={{ backgroundColor: palette.primary }} />}
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6" style={{ color: palette.primary }}>
                {content.coupleNames}
              </h2>
              
              <p className="opacity-80 mb-8 max-w-sm text-sm leading-relaxed font-light">
                {content.message}
              </p>
              
              <div className="space-y-1">
                <span className="text-base uppercase tracking-[0.2em] font-semibold block" style={{ color: palette.primary }}>
                  {content.date}
                </span>
                <span className="text-xs uppercase tracking-widest opacity-60 block">
                  {content.location}
                </span>
              </div>
            </div>
          </div>
        ) : isFull || isParallax ? (
          <div 
            className="relative w-full h-full flex items-center justify-center p-6 sm:p-12 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200")',
              backgroundAttachment: isParallax ? 'fixed' : 'scroll' 
            }}
          >
            <div className="absolute inset-0 transition-all duration-700 bg-black/35" />
            
            {/* Elegant Floating Card */}
            <div 
              className="relative z-10 p-8 sm:p-12 border border-white/20 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full transition-all duration-500 hover:scale-[1.01]" 
              style={{ backgroundColor: `${palette.bg}F2` }}
            >
              {config.base === 'CEL' && (
                <div className="flex justify-center mb-6">
                  <span className="text-xl text-yellow-300">✨</span>
                </div>
              )}
              <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 font-normal tracking-tight" style={{ color: palette.primary }}>
                {content.coupleNames}
              </h2>
              <p className="opacity-95 text-xs sm:text-sm mb-6 leading-relaxed max-w-sm mx-auto font-light">
                {content.message}
              </p>
              <div className="h-[1px] w-16 bg-border/80 mx-auto mb-6" style={{ backgroundColor: palette.primary }} />
              <span className="text-base sm:text-lg tracking-widest font-medium uppercase block" style={{ color: palette.primary }}>
                {content.date}
              </span>
              <span className="text-xs uppercase tracking-widest opacity-70 block mt-1">
                {content.location}
              </span>
            </div>
          </div>
        ) : (
          /* Standard / Framed Layouts */
          <div 
            className={`flex flex-col items-center max-w-xl mx-auto p-8 md:p-12 h-full justify-center transition-all duration-500 w-full relative ${
              config.base === 'RYL' 
                ? 'border-[6px] border-double m-4 rounded-3xl shadow-lg' 
                : config.base === 'VIN'
                ? 'border-8 border-double m-4'
                : config.base === 'GRD'
                ? 'border border-dashed m-6 rounded-[2rem]'
                : 'border-[2px] rounded-2xl m-4'
            }`} 
            style={{ borderColor: palette.primary }}
          >
            {/* Corner flourishes for Royal / Vintage */}
            {config.base === 'RYL' && (
              <>
                <div className="absolute top-2 left-2 text-lg opacity-75" style={{ color: palette.primary }}>⚜</div>
                <div className="absolute top-2 right-2 text-lg opacity-75" style={{ color: palette.primary }}>⚜</div>
                <div className="absolute bottom-2 left-2 text-lg opacity-75" style={{ color: palette.primary }}>⚜</div>
                <div className="absolute bottom-2 right-2 text-lg opacity-75" style={{ color: palette.primary }}>⚜</div>
              </>
            )}
            
            {config.base === 'VIN' && (
              <>
                <div className="absolute top-2 left-2 text-lg opacity-60" style={{ color: palette.primary }}>❧</div>
                <div className="absolute top-2 right-2 text-lg opacity-60" style={{ color: palette.primary }}>❧</div>
                <div className="absolute bottom-2 left-2 text-lg opacity-60" style={{ color: palette.primary }}>❧</div>
                <div className="absolute bottom-2 right-2 text-lg opacity-60" style={{ color: palette.primary }}>❧</div>
              </>
            )}

            {/* Monogram crest */}
            {isMonogram && (
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-8 font-serif font-bold shadow-md ring-2 transition-transform hover:rotate-12 duration-500" 
                style={{ 
                  backgroundColor: palette.primary, 
                  color: palette.bg,
                  borderColor: palette.bg,
                  boxShadow: `0 0 0 2px ${palette.primary}`
                }}
              >
                {content.coupleNames.charAt(0)}
              </div>
            )}

            {/* Botanical icon for Garden */}
            {!isMonogram && config.base === 'GRD' && (
              <div className="text-3xl mb-6 text-emerald-600/80 animate-pulse">✿</div>
            )}

            {/* Star icon for Celestial */}
            {!isMonogram && config.base === 'CEL' && (
              <div className="text-2xl mb-6 text-yellow-300">✦</div>
            )}

            {/* Classical divider for Vintage */}
            {!isMonogram && config.base === 'VIN' && (
              <div className="text-3xl mb-6 opacity-60" style={{ color: palette.primary }}>❧</div>
            )}

            {/* Couple names heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6" style={{ color: palette.primary }}>
              {content.coupleNames}
            </h2>

            {/* Message */}
            <p className="text-xs sm:text-sm md:text-base opacity-80 leading-relaxed mb-8 max-w-sm font-light">
              {content.message}
            </p>

            {/* Divider bar */}
            <div className="h-[1px] w-20 bg-border/60 mb-6" style={{ backgroundColor: palette.primary }} />

            {/* Date and Location */}
            <div className="space-y-1">
              <span className="text-base uppercase tracking-[0.2em] font-semibold block" style={{ color: palette.primary }}>
                {content.date}
              </span>
              <span className="text-xs uppercase tracking-widest opacity-60 block">
                {content.location}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}