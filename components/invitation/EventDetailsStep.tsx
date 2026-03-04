'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InvitationFormData } from '@/lib/types/invitation';

interface EventDetailsStepProps {
  formData: InvitationFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: keyof InvitationFormData, value: any) => void;
  onNext: () => void;
  error?: string | null;
}

export function EventDetailsStep({
  formData,
  onUpdate,
  onNext,
  error,
}: EventDetailsStepProps) {
  const isComplete =
    formData.coupleName.trim() &&
    formData.eventDate &&
    formData.eventTime &&
    formData.eventLocation.trim() &&
    formData.eventVenue.trim();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
          Let&apos;s Start with Your Wedding Details
        </h2>
        <p className="text-muted-foreground">
          Tell us about your special day so we can create the perfect invitation
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      <Card className="p-6 border-secondary/20">
        <div className="space-y-6">
          {/* Couple Names */}
          <div>
            <Label htmlFor="coupleName" className="text-base font-medium">
              Couple&apos;s Names
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              e.g., &quot;Emma & James&quot; or &quot;The Smith Family&quot;
            </p>
            <Input
              id="coupleName"
              placeholder="Enter couple's names"
              onChange={(e) => onUpdate('coupleName', e.target.value)}
              className="text-base"
            />
          </div>

          {/* Event Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventDate" className="text-base font-medium">
                Wedding Date
              </Label>
              <Input
                id="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={(e) => onUpdate('eventDate', e.target.value)}
                className="text-base"
              />
            </div>

            <div>
              <Label htmlFor="eventTime" className="text-base font-medium">
                Ceremony Time
              </Label>
              <Input
                id="eventTime"
                type="time"
                value={formData.eventTime}
                onChange={(e) => onUpdate('eventTime', e.target.value)}
                className="text-base"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="eventLocation" className="text-base font-medium">
              City & State
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Where will the wedding be held?
            </p>
            <Input
              id="eventLocation"
              placeholder="e.g., San Francisco, California"
              value={formData.eventLocation}
              onChange={(e) => onUpdate('eventLocation', e.target.value)}
              className="text-base"
            />
          </div>

          {/* Venue */}
          <div>
            <Label htmlFor="eventVenue" className="text-base font-medium">
              Venue Name
            </Label>
            <Input
              id="eventVenue"
              placeholder="e.g., The Grand Ballroom, 123 Main St"
              value={formData.eventVenue}
              onChange={(e) => onUpdate('eventVenue', e.target.value)}
              className="text-base"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="eventDescription" className="text-base font-medium">
              Event Description (Optional)
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Add any special details about your wedding
            </p>
            <Textarea
              id="eventDescription"
              placeholder="Share any special details, theme, or dress code..."
              value={formData.eventDescription || ''}
              onChange={(e) => onUpdate('eventDescription', e.target.value)}
              rows={4}
              className="text-base resize-none"
            />
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={onNext}
          disabled={!isComplete}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8"
        >
          Continue to Customization
        </Button>
      </div>
    </div>
  );
}
