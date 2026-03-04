'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { InvitationAPI } from '@/lib/api/invitation';
import { GuestRSVPForm } from '@/components/invitation/GuestRSVPForm';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function GuestRSVPPage() {
  const params = useParams();
  const invitationId = params.invitationId as string;
  const guestId = params.guestId as string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [invitation, setInvitation] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [guest, setGuest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInvitationData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch invitation details
      const invitationData = await InvitationAPI.getInvitation(invitationId);
      setInvitation(invitationData);

      // Fetch guest-specific data
      const guestData = await InvitationAPI.getGuestInvitation(invitationId, guestId);
      setGuest(guestData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load invitation';
      setError(errorMessage);
      console.error('Error loading invitation data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [invitationId, guestId]);

  useEffect(() => {
    loadInvitationData();
  }, [loadInvitationData]);

  const handleRSVPSubmit = async (data: {
    rsvpStatus: 'accepted' | 'declined' | 'maybe';
    dietaryRestrictions?: string;
    plusOne?: string;
    message?: string;
  }) => {
    try {
      await InvitationAPI.submitRSVP(invitationId, guestId, data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit RSVP';
      throw new Error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 border-secondary/20">
          <p className="text-muted-foreground text-center">Loading invitation...</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-md mx-auto w-full">
          <Card className="p-8 border-secondary/20">
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription>
                <p className="font-semibold mb-2">Unable to Load Invitation</p>
                <p>{error}</p>
              </AlertDescription>
            </Alert>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Please check the invitation link and try again
            </p>
          </Card>
        </div>
      </div>
    );
  }

  if (!invitation || !guest) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-md mx-auto w-full">
          <Card className="p-8 border-secondary/20 text-center">
            <p className="text-muted-foreground">Invitation not found</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Greeting */}
        <div className="mb-8 text-center">
          <p className="text-muted-foreground mb-2">You&apos;re invited to</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground text-balance">
            {invitation.coupleName}&apos;s Wedding
          </h1>
        </div>

        {/* RSVP Form */}
        <GuestRSVPForm
          guestName={guest.name || guest.guestName || 'Guest'}
          coupleName={invitation.coupleName}
          eventDate={invitation.eventDate}
          eventTime={invitation.eventTime}
          eventLocation={invitation.eventLocation}
          eventVenue={invitation.eventVenue}
          invitationBackgroundColor={invitation.backgroundColor}
          invitationAccentColor={invitation.accentColor}
          invitationTextColor={invitation.textColor}
          onSubmit={handleRSVPSubmit}
        />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>We can&apos;t wait to celebrate with you!</p>
          {invitation.eventDescription && (
            <p className="mt-2 italic">{invitation.eventDescription}</p>
          )}
        </div>
      </div>
    </div>
  );
}
