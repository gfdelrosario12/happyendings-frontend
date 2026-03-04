'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface GuestRSVPFormProps {
  guestName: string;
  coupleName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventVenue: string;
  invitationBackgroundColor: string;
  invitationAccentColor: string;
  invitationTextColor: string;
  onSubmit: (data: {
    rsvpStatus: 'accepted' | 'declined' | 'maybe';
    dietaryRestrictions?: string;
    plusOne?: string;
    message?: string;
  }) => Promise<void>;
}

export function GuestRSVPForm({
  guestName,
  coupleName,
  eventDate,
  eventTime,
  // eventLocation,
  eventVenue,
  invitationBackgroundColor,
  invitationAccentColor,
  invitationTextColor,
  onSubmit,
}: GuestRSVPFormProps) {
  const [rsvpStatus, setRsvpStatus] = useState<'accepted' | 'declined' | 'maybe' | ''>('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [plusOne, setPlusOne] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rsvpStatus) {
      setError('Please select your RSVP status');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        rsvpStatus: rsvpStatus as 'accepted' | 'declined' | 'maybe',
        dietaryRestrictions: dietaryRestrictions || undefined,
        plusOne: plusOne || undefined,
        message: message || undefined,
      });
      setIsSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit RSVP';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="p-8 border-secondary/20">
        <div className="text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Thank You!
          </h2>
          <p className="text-muted-foreground">
            Your RSVP has been received. We look forward to celebrating with you!
          </p>
          <div className="pt-6 space-y-2 text-sm">
            <p className="text-muted-foreground">
              <strong>Status:</strong> {rsvpStatus.charAt(0).toUpperCase() + rsvpStatus.slice(1)}
            </p>
            {dietaryRestrictions && (
              <p className="text-muted-foreground">
                <strong>Dietary Restrictions:</strong> {dietaryRestrictions}
              </p>
            )}
            {plusOne && (
              <p className="text-muted-foreground">
                <strong>Plus One:</strong> {plusOne}
              </p>
            )}
          </div>
        </div>
      </Card>
    );
  }

  const invitationPreviewStyle = {
    backgroundColor: invitationBackgroundColor,
    color: invitationTextColor,
  };

  return (
    <div className="space-y-6">
      {/* Invitation Preview */}
      <Card className="p-8 border-secondary/20" style={invitationPreviewStyle}>
        <div className="text-center space-y-4">
          <h1
            className="font-serif text-3xl font-bold"
            style={{ color: invitationAccentColor }}
          >
            {coupleName}
          </h1>
          <p
            className="text-sm uppercase tracking-wider"
            style={{ color: invitationAccentColor }}
          >
            Request the honour of your presence
          </p>
          <div
            className="my-4 w-12 h-0.5 mx-auto"
            style={{ backgroundColor: invitationAccentColor }}
          />
          <p className="text-lg font-serif mb-2">{eventVenue}</p>
          <p className="text-base mb-1">
            {new Date(eventDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-base">{eventTime}</p>
        </div>
      </Card>

      {/* RSVP Form */}
      <Card className="p-8 border-secondary/20">
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Dear {guestName},
            </h2>
            <p className="text-muted-foreground">
              Please let us know if you can celebrate with us
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* RSVP Status */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Will you be able to celebrate with us?
              </Label>
              <RadioGroup value={rsvpStatus} onValueChange={(value: string) => {
                setRsvpStatus(value as 'accepted' | 'declined' | 'maybe');
                setError(null);
              }}>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-muted/50 transition-all cursor-pointer">
                  <RadioGroupItem value="accepted" id="accepted" />
                  <Label
                    htmlFor="accepted"
                    className="flex-1 cursor-pointer font-medium text-base"
                  >
                    I can&apos;t wait! I&apos;m attending
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-muted/50 transition-all cursor-pointer">
                  <RadioGroupItem value="declined" id="declined" />
                  <Label
                    htmlFor="declined"
                    className="flex-1 cursor-pointer font-medium text-base"
                  >
                    I&apos;m sorry, I won&apos;t be able to attend
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-muted/50 transition-all cursor-pointer">
                  <RadioGroupItem value="maybe" id="maybe" />
                  <Label
                    htmlFor="maybe"
                    className="flex-1 cursor-pointer font-medium text-base"
                  >
                    I&apos;m still deciding
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Dietary Restrictions */}
            {rsvpStatus === 'accepted' && (
              <div className="space-y-2">
                <Label htmlFor="dietary" className="text-base font-medium">
                  Dietary Restrictions (Optional)
                </Label>
                <Input
                  id="dietary"
                  placeholder="e.g., Vegetarian, Vegan, Gluten-free, Allergies"
                  value={dietaryRestrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                />
              </div>
            )}

            {/* Plus One */}
            {rsvpStatus === 'accepted' && (
              <div className="space-y-2">
                <Label htmlFor="plusOne" className="text-base font-medium">
                  Plus One (Optional)
                </Label>
                <p className="text-sm text-muted-foreground">
                  If you&apos;d like to bring a guest, let us know their name
                </p>
                <Input
                  id="plusOne"
                  placeholder="Guest name"
                  value={plusOne}
                  onChange={(e) => setPlusOne(e.target.value)}
                />
              </div>
            )}

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-base font-medium">
                Message (Optional)
              </Label>
              <Textarea
                id="message"
                placeholder="Leave a message for the couple..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !rsvpStatus}
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            Your response will be saved and the couple will be notified
          </p>
        </div>
      </Card>
    </div>
  );
}
