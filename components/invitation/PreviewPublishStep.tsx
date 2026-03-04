'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InvitationFormData } from '@/lib/types/invitation';
import { Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface PreviewPublishStepProps {
  formData: InvitationFormData;
  isLoading: boolean;
  error?: string | null;
  successMessage?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPublish: () => Promise<any>;
  onSaveDraft: () => Promise<void>;
  onPrevious: () => void;
}

export function PreviewPublishStep({
  formData,
  isLoading,
  error,
  successMessage,
  onPublish,
  onSaveDraft,
  onPrevious,
}: PreviewPublishStepProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [publishedData, setPublishedData] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handlePublish = async () => {
    const result = await onPublish();
    if (result) {
      setPublishedData(result);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  // Preview rendering
  const previewStyle = {
    backgroundColor: formData.backgroundColor,
    color: formData.textColor,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
          Review & Publish
        </h2>
        <p className="text-muted-foreground">
          Review your invitation details before publishing
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Details Summary */}
        <Card className="p-6 border-secondary/20 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Wedding Details
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Couple Names</dt>
                <dd className="font-medium text-foreground">{formData.coupleName}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Date & Time</dt>
                <dd className="font-medium text-foreground">
                  {new Date(formData.eventDate).toLocaleDateString()} at{' '}
                  {formData.eventTime}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Location</dt>
                <dd className="font-medium text-foreground">{formData.eventLocation}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Venue</dt>
                <dd className="font-medium text-foreground">{formData.eventVenue}</dd>
              </div>
              {formData.eventDescription && (
                <div>
                  <dt className="text-muted-foreground">Description</dt>
                  <dd className="font-medium text-foreground">
                    {formData.eventDescription}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Customization
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Template</dt>
                <dd className="font-medium text-foreground capitalize">
                  {formData.templateId}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Font Style</dt>
                <dd className="font-medium text-foreground capitalize">
                  {formData.fontStyle}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Colors</dt>
                <dd className="flex gap-2 mt-1">
                  <div
                    className="w-6 h-6 rounded border border-border"
                    style={{ backgroundColor: formData.backgroundColor }}
                    title="Background"
                  />
                  <div
                    className="w-6 h-6 rounded border border-border"
                    style={{ backgroundColor: formData.accentColor }}
                    title="Accent"
                  />
                  <div
                    className="w-6 h-6 rounded border border-border"
                    style={{ backgroundColor: formData.textColor }}
                    title="Text"
                  />
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Guest List
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Total Guests: <span className="font-bold">{formData.guests.length}</span>
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {formData.guests.map((guest) => (
                <div key={guest.id} className="text-xs text-foreground p-2 bg-muted/30 rounded">
                  <div className="font-medium">{guest.name}</div>
                  <div className="text-muted-foreground">{guest.email}</div>
                  {guest.group && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      {guest.group}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Invitation Preview */}
        <Card className="p-6 border-secondary/20 flex flex-col">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Invitation Preview
          </h3>

          {/* Mock Invitation */}
          <div
            className="flex-1 rounded-lg p-8 flex flex-col items-center justify-center text-center mb-4"
            style={previewStyle}
          >
            <h1
              className="font-serif text-4xl font-bold mb-2"
              style={{ color: formData.accentColor }}
            >
              {formData.coupleName}
            </h1>
            <p
              className="text-sm uppercase tracking-wider mb-4"
              style={{ color: formData.accentColor }}
            >
              Request the honour of your presence
            </p>
            <div className="my-6 w-12 h-0.5" style={{ backgroundColor: formData.accentColor }} />
            <p className="text-lg font-serif mb-4">{formData.eventVenue}</p>
            <p className="text-base mb-2">
              {new Date(formData.eventDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-base">{formData.eventTime}</p>
            {formData.customMessage && (
              <p className="text-sm italic mt-6 max-w-xs">{formData.customMessage}</p>
            )}
          </div>

          <Button
            onClick={onSaveDraft}
            variant="outline"
            size="sm"
            className="w-full mb-2"
            disabled={isLoading}
          >
            Save as Draft
          </Button>
        </Card>
      </div>

      {/* Published Results */}
      {publishedData && (
        <Card className="p-6 border-green-200 bg-green-50">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            Invitation Published Successfully!
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-green-900">
                Invitation Link
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={publishedData.invitationLink || `${window.location.origin}/invitations/${publishedData.id}`}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-green-200 rounded text-sm"
                />
                <Button
                  onClick={() =>
                    copyToClipboard(
                      publishedData.invitationLink || `${window.location.origin}/invitations/${publishedData.id}`,
                      'main'
                    )
                  }
                  size="sm"
                  variant="outline"
                >
                  <Copy className="w-4 h-4" />
                  {copiedLink === 'main' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            {publishedData.guestLinks && publishedData.guestLinks.length > 0 && (
              <div>
                <label className="text-sm font-medium text-green-900">
                  Guest Links ({publishedData.guestLinks.length})
                </label>
                <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {publishedData.guestLinks.map((link: any) => (
                    <div
                      key={link.guestId}
                      className="flex gap-2 p-2 bg-white rounded border border-green-200"
                    >
                      <div className="flex-1 text-sm">
                        <div className="font-medium text-green-900">{link.guestEmail}</div>
                        <code className="text-xs text-green-700 break-all">
                          {link.guestLink}
                        </code>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(link.guestLink, link.guestId)}
                        size="sm"
                        variant="ghost"
                      >
                        <Copy className="w-4 h-4" />
                        {copiedLink === link.guestId ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="lg"
          className="px-8 font-medium"
          disabled={isLoading || !!publishedData}
        >
          Back
        </Button>
        <Button
          onClick={handlePublish}
          disabled={isLoading || !!publishedData}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8"
        >
          {isLoading ? 'Publishing...' : 'Publish Invitation'}
        </Button>
      </div>
    </div>
  );
}
