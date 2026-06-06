'use client'

import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

type GuestRouteProps = {
  children: ReactNode
  redirectTo?: string
}

export default function GuestRoute({
  children,
  redirectTo = '/dashboard',
}: GuestRouteProps) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(redirectTo)
    }
  }, [isAuthenticated, loading, router, redirectTo])

  // Optional: loading state to prevent flicker
  if (loading || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground text-sm">
          Loading...
        </div>
      </div>
    )
  }

  return <>{children}</>
}