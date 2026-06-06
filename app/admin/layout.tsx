'use client';

import React from 'react';
import { AuthGuard } from '@/contexts/AuthGuard';
import { RoleGuard } from '@/contexts/RoleGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <RoleGuard allowedRoles={['ADMIN']}>
        {children}
      </RoleGuard>
    </AuthGuard>
  );
}
