'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldAlert, ArrowLeft, Heart } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-destructive/5 to-background text-center px-4 relative overflow-hidden">
      {/* Decorative Hearts background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-[20%] left-[10%] animate-pulse">
          <Heart className="h-24 w-24 fill-destructive text-destructive" />
        </div>
        <div className="absolute bottom-[20%] right-[10%] animate-pulse delay-1000">
          <Heart className="h-32 w-32 fill-destructive text-destructive" />
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full p-8 rounded-3xl border border-destructive/20 bg-background/60 backdrop-blur-md shadow-2xl flex flex-col items-center">
        {/* Shield Icon container */}
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mb-6 border border-destructive/20 animate-bounce">
          <ShieldAlert className="h-10 w-10 text-destructive" />
        </div>
        
        <h1 className="font-serif text-3xl font-bold text-foreground mb-3 tracking-tight">
          Restricted Access
        </h1>
        
        <p className="text-muted-foreground mb-8 font-light leading-relaxed">
          You don&apos;t have the permission required to view this section. 
          Please log in with an authorized account or contact support if you believe this is an error.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full rounded-full border-border/80 text-foreground hover:bg-secondary/50">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go to Dashboard
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Switch Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
