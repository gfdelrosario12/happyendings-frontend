'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { InvitationFormData, Guest } from '@/lib/types/invitation';
import { CSVParser } from '@/lib/utils/csvParser';
import { X, Upload, Plus, Download } from 'lucide-react';

interface GuestListStepProps {
  formData: InvitationFormData;
  onAddGuest: (guest: Guest) => void;
  onRemoveGuest: (guestId: string) => void;
  // onUpdateGuest: (guestId: string, guest: Partial<Guest>) => void;
  onAddGuestsFromCSV: (guests: Guest[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  error?: string | null;
}

export function GuestListStep({
  formData,
  onAddGuest,
  onRemoveGuest,
  // onUpdateGuest,
  onAddGuestsFromCSV,
  onNext,
  onPrevious,
  error,
}: GuestListStepProps) {
  const [manualGuestName, setManualGuestName] = useState('');
  const [manualGuestEmail, setManualGuestEmail] = useState('');
  const [manualGuestPhone, setManualGuestPhone] = useState('');
  const [manualGuestGroup, setManualGuestGroup] = useState('');
  const [csvError, setCSVError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleAddManualGuest = () => {
    if (!manualGuestName.trim() || !manualGuestEmail.trim()) {
      setCSVError('Name and email are required');
      return;
    }

    onAddGuest({
      name: manualGuestName,
      email: manualGuestEmail,
      phone: manualGuestPhone || undefined,
      group: manualGuestGroup || undefined,
    });

    setManualGuestName('');
    setManualGuestEmail('');
    setManualGuestPhone('');
    setManualGuestGroup('');
    setCSVError(null);
  };

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    setCSVError(null);

    try {
      const guests = await CSVParser.parseGuestListCSV(file);
      onAddGuestsFromCSV(guests);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to parse CSV';
      setCSVError(errorMessage);
    } finally {
      setUploadLoading(false);
      event.target.value = ''; // Reset input
    }
  };

  const handleDownloadTemplate = () => {
    const template = CSVParser.generateCSVTemplate();
    CSVParser.downloadCSV(template, 'guest-list-template.csv');
  };

  const handleExportGuests = () => {
    const csv = CSVParser.convertGuestsToCSV(formData.guests);
    CSVParser.downloadCSV(csv, `guests-${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
          Build Your Guest List
        </h2>
        <p className="text-muted-foreground">
          Add guests individually or upload a CSV file with multiple guests
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      <Card className="p-6 border-secondary/20 space-y-6">
        {/* CSV Upload Section */}
        <div className="border-b border-border pb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Upload Guest List (CSV)
          </h3>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Format: Name, Email, Phone, Group, DietaryRestrictions, Notes
            </p>

            <div className="flex gap-3">
              <Button
                onClick={handleDownloadTemplate}
                variant="outline"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download Template
              </Button>

              <label className="flex-1">
                <Button
                  asChild
                  variant="outline"
                  className="w-full gap-2 cursor-pointer"
                  disabled={uploadLoading}
                >
                  <span>
                    <Upload className="w-4 h-4" />
                    {uploadLoading ? 'Processing...' : 'Upload CSV File'}
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                  disabled={uploadLoading}
                />
              </label>
            </div>

            {csvError && (
              <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-destructive text-sm">
                {csvError}
              </div>
            )}
          </div>
        </div>

        {/* Manual Guest Addition */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Add Guests Manually
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guest-name" className="text-sm font-medium">
                  Guest Name
                </Label>
                <Input
                  id="guest-name"
                  placeholder="e.g., John Doe"
                  value={manualGuestName}
                  onChange={(e) => setManualGuestName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddManualGuest();
                  }}
                />
              </div>

              <div>
                <Label htmlFor="guest-email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="guest-email"
                  type="email"
                  placeholder="e.g., john@example.com"
                  value={manualGuestEmail}
                  onChange={(e) => setManualGuestEmail(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddManualGuest();
                  }}
                />
              </div>

              <div>
                <Label htmlFor="guest-phone" className="text-sm font-medium">
                  Phone (Optional)
                </Label>
                <Input
                  id="guest-phone"
                  placeholder="e.g., +1234567890"
                  value={manualGuestPhone}
                  onChange={(e) => setManualGuestPhone(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddManualGuest();
                  }}
                />
              </div>

              <div>
                <Label htmlFor="guest-group" className="text-sm font-medium">
                  Group/Table (Optional)
                </Label>
                <Input
                  id="guest-group"
                  placeholder="e.g., Family, Friends"
                  value={manualGuestGroup}
                  onChange={(e) => setManualGuestGroup(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddManualGuest();
                  }}
                />
              </div>
            </div>

            <Button
              onClick={handleAddManualGuest}
              className="w-full sm:w-auto gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Plus className="w-4 h-4" />
              Add Guest
            </Button>
          </div>
        </div>
      </Card>

      {/* Guest List Table */}
      {formData.guests.length > 0 && (
        <Card className="p-6 border-secondary/20 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Guest List ({formData.guests.length})
            </h3>
            {formData.guests.length > 0 && (
              <Button
                onClick={handleExportGuests}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
            )}
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.guests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium">{guest.name}</TableCell>
                    <TableCell className="text-sm">{guest.email}</TableCell>
                    <TableCell className="text-sm">{guest.phone || '-'}</TableCell>
                    <TableCell className="text-sm">
                      {guest.group ? (
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          {guest.group}
                        </span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => setShowDeleteDialog(guest.id || '')}
                        className="text-destructive hover:text-destructive/80 transition-colors p-2"
                        aria-label="Delete guest"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Remove Guest</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this guest from the list? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (showDeleteDialog) {
                  onRemoveGuest(showDeleteDialog);
                  setShowDeleteDialog(null);
                }
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="lg"
          className="px-8 font-medium"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={formData.guests.length === 0}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8"
        >
          Review & Publish
        </Button>
      </div>
    </div>
  );
}
