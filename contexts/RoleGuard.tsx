'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { Role } from '@/lib/types/auth';
import { Shield } from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const isAuthorized = user && allowedRoles.includes(user.role);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (!isAuthorized) {
        router.replace('/unauthorized');
      }
    }
  }, [isLoading, isAuthenticated, isAuthorized, router]);

  // Show premium loading indicator while authorization is verified
  if (isLoading || !isAuthenticated || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-destructive/5 to-background">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative flex items-center justify-center">
            {/* Spinning ring */}
            <div className="h-16 w-16 animate-spin rounded-full border-2 border-primary/20 border-t-primary"></div>
            {/* Pulsing center shield */}
            <Shield className="absolute h-6 w-6 text-primary animate-pulse" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-medium text-foreground">Happy Endings</h2>
            <p className="text-xs text-muted-foreground tracking-wider uppercase animate-pulse">
              Verifying credentials...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}