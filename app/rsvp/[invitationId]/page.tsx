'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Heart } from 'lucide-react'
import { InvitationAPI } from '@/lib/api/invitation'
import { PublishedInvitation } from '@/lib/types/invitation'

export default function RSVPPage() {
  const params = useParams()
  const invitationId = params.invitationId as string

  const [invitation, setInvitation] = useState<PublishedInvitation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadInvitation() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await InvitationAPI.getInvitation(invitationId)
        setInvitation(data)
      } catch (err) {
        console.error('Failed to load public invitation details:', err)
        setError('Could not load invitation details')
      } finally {
        setIsLoading(false)
      }
    }
    loadInvitation()
  }, [invitationId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 border-secondary/20">
          <p className="text-muted-foreground text-center">Loading invitation preview...</p>
        </Card>
      </div>
    )
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="p-8 border-secondary/20 max-w-md text-center space-y-4">
          <p className="text-destructive font-semibold">Invitation Preview Unavailable</p>
          <p className="text-muted-foreground text-sm">Please verify the link or contact the wedding hosts.</p>
        </Card>
      </div>
    )
  }

  const customizationStyle = {
    backgroundColor: invitation.backgroundColor || '#f5f1ee',
    color: invitation.textColor || '#3d3d3d'
  }

  return (
    <div 
      className="min-h-screen transition-colors duration-500 flex flex-col"
      style={{ backgroundColor: customizationStyle.backgroundColor }}
    >
      {/* Invitation Header */}
      <section className="border-b border-border/20 px-4 py-16 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h1 
            className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-2 text-balance"
            style={{ color: customizationStyle.color }}
          >
            {invitation.coupleName || 'Wedding Invitation'}
          </h1>
          <p className="opacity-80 max-w-md mx-auto leading-relaxed">
            Together with their families
            <br />
            request the pleasure of your company
          </p>
          <div className="space-y-2 text-sm border-t border-b border-border/10 py-6 max-w-sm mx-auto">
            <p className="font-semibold" style={{ color: invitation.accentColor || '#d4a574' }}>
              {invitation.eventDate ? new Date(invitation.eventDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Date TBA'}
            </p>
            {invitation.eventTime && (
              <p className="font-medium opacity-90">
                at {invitation.eventTime}
              </p>
            )}
            <p className="opacity-75">
              {invitation.eventVenue ? `${invitation.eventVenue}, ` : ''}{invitation.eventLocation || 'Location TBA'}
            </p>
          </div>
          {invitation.eventDescription && (
            <p className="italic opacity-70 max-w-md mx-auto text-sm">
              &ldquo;{invitation.eventDescription}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* RSVP Guidance Notice */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 border-t border-border/10 bg-black/5">
        <Card className="mx-auto max-w-2xl border-border/40 bg-background/60 backdrop-blur-md shadow-lg p-8 text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            RSVP Information
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            To submit your RSVP response, dietary preferences, and guest details, please use the personalized invitation link sent to you by the wedding hosts.
          </p>
          <div className="text-xs text-muted-foreground border-t border-border/40 pt-4 max-w-sm mx-auto">
            If you did not receive a link or token, please verify with the wedding coordinator.
          </div>
        </Card>
      </section>
    </div>
  )
}
