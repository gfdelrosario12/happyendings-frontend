import React from 'react';
import { LAYOUT_STYLES, COLOR_STYLES, FONT_STYLES, TEMPLATE_CODES } from './template-config';
import { DNACodeParser } from './design-system';

export interface Content {
  coupleNames: string;
  date: string;
  location: string;
  message: string;
}

interface TemplateRendererProps {
  dna: string;
  content: Content;
  className?: string;
}

export function TemplateRenderer({ dna, content, className = '' }: TemplateRendererProps) {
  const config = DNACodeParser.parse(dna);

  const layoutCode = config.hero;
  const colorCode = config.pal;
  const fontCode = config.font;

  const layoutClass = LAYOUT_STYLES[layoutCode] || LAYOUT_STYLES[TEMPLATE_CODES.LAYOUT.CENTERED];
  const colorStyle = COLOR_STYLES[colorCode] || COLOR_STYLES[TEMPLATE_CODES.COLORS.IVORY_GOLD];
  const fontClass = FONT_STYLES[fontCode] || FONT_STYLES[TEMPLATE_CODES.FONTS.SERIF_PLAYFAIR];

  const isBordered = (layoutCode as string) === TEMPLATE_CODES.LAYOUT.BORDERED || layoutCode === 'FUL';
  const isMinimalLeft = (layoutCode as string) === TEMPLATE_CODES.LAYOUT.MINIMAL_LEFT || layoutCode === 'MON';
  const isSplit = (layoutCode as string) === TEMPLATE_CODES.LAYOUT.ELEGANT_SPLIT || layoutCode === 'SPL';

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${fontClass} ${className}`}
      style={{ backgroundColor: colorStyle.bg, color: colorStyle.text }}
    >
      {/* Inner Layout Container */}
      <div
        className={`w-full h-full ${layoutClass}`}
        style={{
          border: isBordered ? `4px solid ${colorStyle.primary}` : 'none',
          boxShadow: isBordered ? `inset 0 0 0 4px ${colorStyle.bg}, inset 0 0 0 5px ${colorStyle.primary}` : 'none',
        }}
      >
        {isSplit ? (
           <>
             <div className="w-full flex justify-center mb-8">
                <span style={{ color: colorStyle.primary }} className="text-[10px] md:text-xs uppercase tracking-[0.3em]">
                  Together with their families
                </span>
             </div>
             <div className="flex-1 flex flex-col justify-center items-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-center">{content.coupleNames}</h2>
                <p className="text-sm md:text-base max-w-md opacity-90 leading-relaxed mb-6 text-center">
                  {content.message}
                </p>
             </div>
             <div className="w-full pt-8 mt-auto flex flex-col items-center" style={{ borderTop: `1px solid ${colorStyle.primary}`}}>
                <span className="text-lg md:text-xl tracking-widest">{content.date}</span>
                <span className="text-xs mt-2 opacity-80 uppercase tracking-wider">{content.location}</span>
             </div>
           </>
        ) : isMinimalLeft ? (
           <>
             <div className="mb-auto">
                <span style={{ color: colorStyle.primary }} className="text-xs font-bold uppercase tracking-[0.2em] block mb-4">
                  Save the Date
                </span>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6 whitespace-pre-line">
                  {content.coupleNames.replace(' & ', '\n&\n')}
                </h2>
             </div>
             <div className="mt-8 flex flex-col gap-2 border-l-4 pl-6 py-2" style={{ borderColor: colorStyle.primary }}>
                <span className="text-lg md:text-xl tracking-tight font-medium">{content.date}</span>
                <span className="text-sm opacity-75">{content.location}</span>
             </div>
           </>
        ) : (
          // Default Centered & Bordered
           <>
             <span style={{ color: colorStyle.primary }} className="text-[10px] md:text-xs uppercase tracking-[0.2em] mb-8">
               You are invited
             </span>
             <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">{content.coupleNames}</h2>
             <p className="text-sm md:text-base max-w-md opacity-90 leading-relaxed mb-8">
               {content.message}
             </p>
             <div className="mt-auto flex flex-col items-center gap-2">
                <span className="text-xl tracking-widest" style={{ color: colorStyle.primary }}>{content.date}</span>
                <span className="text-xs md:text-sm uppercase tracking-widest opacity-80">{content.location}</span>
             </div>
           </>
        )}
      </div>
    </div>
  );
}