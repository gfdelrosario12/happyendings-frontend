'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { HybridBuilder } from '../../../HybridBuilder';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DynamicBuilderPage() {
  const params = useParams();
  const templateId = params?.templateId as string;

  return (
    <div className="relative min-h-screen">
      {/* Floating navigation button back to templates selection */}
      <div className="absolute top-4 right-4 z-50">
        <Link 
          href="/templates" 
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border/60 bg-background/85 backdrop-blur-md text-xs font-medium hover:bg-primary/5 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Templates
        </Link>
      </div>

      <HybridBuilder initialPresetId={templateId} />
    </div>
  );
}
