'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AnalyticsDashboard } from '@/components/invitation/AnalyticsDashboard';
import { InvitationAPI } from '@/lib/api/invitation';
import { PublishedInvitation, InvitationAnalytics } from '@/lib/types/invitation';
import { Plus, Eye, Copy, Trash2, BarChart3 } from 'lucide-react';

export default function InvitationsPage() {
  const router = useRouter();
  const [invitations, setInvitations] = useState<PublishedInvitation[]>([]);
  const [selectedInvitation, setSelectedInvitation] = useState<PublishedInvitation | null>(
    null
  );
  const [analytics, setAnalytics] = useState<InvitationAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Load invitations on mount
  useEffect(() => {
    loadInvitations();
  }, []);

  const loadInvitations = async () => {
    setIsLoading(true);
    try {
      const data = await InvitationAPI.listInvitations();
      setInvitations(data);
    } catch (error) {
      console.error('Failed to load invitations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAnalytics = async (invitationId: string) => {
    setIsLoadingAnalytics(true);
    try {
      const data = await InvitationAPI.getInvitationAnalytics(invitationId);
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  const handleViewAnalytics = (invitation: PublishedInvitation) => {
    setSelectedInvitation(invitation);
    loadAnalytics(invitation.id);
  };

  const copyToClipboard = (text: string, invitationId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(invitationId);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleDeleteInvitation = async (invitationId: string) => {
    if (confirm('Are you sure you want to delete this invitation?')) {
      try {
        await InvitationAPI.deleteInvitation(invitationId);
        setInvitations(invitations.filter((inv) => inv.id !== invitationId));
      } catch (error) {
        console.error('Failed to delete invitation:', error);
      }
    }
  };

  const handleExportAnalytics = async (invitationId: string) => {
    try {
      const blob = await InvitationAPI.exportGuestResponses(invitationId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `responses-${invitationId}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export analytics:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
              My Invitations
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your wedding invitations and track RSVPs
            </p>
          </div>

          <Button
            onClick={() => router.push('/create-invitation')}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium gap-2 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            Create Invitation
          </Button>
        </div>

        {/* Empty State */}
        {isLoading ? (
          <Card className="p-12 text-center border-secondary/20">
            <p className="text-muted-foreground">Loading invitations...</p>
          </Card>
        ) : invitations.length === 0 ? (
          <Card className="p-12 text-center border-secondary/20 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              No invitations yet
            </h3>
            <p className="text-muted-foreground">
              Create your first wedding invitation to get started
            </p>
            <Button
              onClick={() => router.push('/create-invitation')}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Create Your First Invitation
            </Button>
          </Card>
        ) : (
          <>
            {/* Invitations List */}
            <Card className="p-6 border-secondary/20 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Couple Name</TableHead>
                      <TableHead>Event Date</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invitations.map((invitation) => (
                      <TableRow key={invitation.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {invitation.coupleName}
                        </TableCell>
                        <TableCell>
                          {new Date(invitation.eventDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{invitation.guests.length} guests</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              invitation.status === 'published' ? 'default' : 'secondary'
                            }
                          >
                            {invitation.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewAnalytics(invitation)}
                                  className="gap-2"
                                >
                                  <BarChart3 className="w-4 h-4" />
                                  <span className="hidden sm:inline">Analytics</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-5xl max-h-screen overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>
                                    {selectedInvitation?.coupleName} - Analytics
                                  </DialogTitle>
                                  <DialogDescription>
                                    RSVP tracking and guest responses
                                  </DialogDescription>
                                </DialogHeader>

                                {selectedInvitation && (
                                  <AnalyticsDashboard
                                    analytics={analytics}
                                    isLoading={isLoadingAnalytics}
                                    onExport={() =>
                                      handleExportAnalytics(selectedInvitation.id)
                                    }
                                  />
                                )}
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const link =
                                  invitation.invitationLink ||
                                  `${window.location.origin}/rsvp/${invitation.id}`;
                                copyToClipboard(link, invitation.id);
                              }}
                              className="gap-2"
                            >
                              <Copy className="w-4 h-4" />
                              <span className="hidden sm:inline">
                                {copiedLink === invitation.id ? 'Copied!' : 'Copy'}
                              </span>
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                window.open(
                                  invitation.invitationLink ||
                                    `${window.location.origin}/rsvp/${invitation.id}`,
                                  '_blank'
                                )
                              }
                              className="gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              <span className="hidden sm:inline">Preview</span>
                            </Button>

                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteInvitation(invitation.id)}
                              className="gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="hidden sm:inline">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Guest Links Reference */}
            <Card className="p-6 border-secondary/20">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                How to Send Invitations
              </h3>
              <ol className="space-y-3 text-sm text-foreground">
                <li className="flex gap-3">
                  <span className="font-bold text-accent min-w-fit">1.</span>
                  <span>
                    Click &quot;Analytics&quot; on any invitation to view guest list and generate
                    links
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent min-w-fit">2.</span>
                  <span>
                    Share the individual guest links via email or your preferred method
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent min-w-fit">3.</span>
                  <span>
                    Track responses in real-time through the analytics dashboard
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-accent min-w-fit">4.</span>
                  <span>
                    Export guest responses to CSV for planning purposes
                  </span>
                </li>
              </ol>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
