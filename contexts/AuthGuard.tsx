'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { Heart } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Show a premium loading screen while verifying auth state
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-background">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative flex items-center justify-center">
            {/* Spinning ring */}
            <div className="h-16 w-16 animate-spin rounded-full border-2 border-primary/20 border-t-primary"></div>
            {/* Pulsing center heart */}
            <Heart className="absolute h-6 w-6 text-primary fill-primary animate-pulse" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-medium text-foreground">Happy Endings</h2>
            <p className="text-xs text-muted-foreground tracking-wider uppercase animate-pulse">
              Verifying secure session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}