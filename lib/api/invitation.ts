import {
  InvitationPublishPayload,
  PublishedInvitation,
  InvitationAnalytics,
} from '@/lib/types/invitation';
import { api } from '@/lib/api';

function mapBackendToFrontend(inv: any): PublishedInvitation {
  let customization = {
    backgroundColor: '#f5f1ee',
    accentColor: '#d4a574',
    textColor: '#3d3d3d',
    fontStyle: 'classic' as const
  };
  try {
    if (inv.theme) {
      const parsed = JSON.parse(inv.theme);
      customization = { ...customization, ...parsed };
    }
  } catch (e) {
    if (inv.theme && inv.theme.includes(',')) {
      const parts = inv.theme.split(',');
      customization.backgroundColor = parts[0] || customization.backgroundColor;
      customization.accentColor = parts[1] || customization.accentColor;
      customization.textColor = parts[2] || customization.textColor;
    }
  }

  const guestsMapped = (inv.guests || []).map((g: any) => ({
    id: g.id ? g.id.toString() : '',
    name: g.name || '',
    email: g.email || '',
    phone: g.phoneNumber || '',
    group: g.roleGroupId ? g.roleGroupId.toString() : '',
    dietaryRestrictions: g.dietaryRestrictions || '',
    notes: g.additionalNotes || ''
  }));

  const guestLinksMapped = (inv.guests || []).map((g: any) => ({
    guestId: g.id ? g.id.toString() : '',
    guestEmail: g.email || '',
    invitationId: inv.id ? inv.id.toString() : '',
    guestLink: typeof window !== 'undefined' ? `${window.location.origin}/rsvp/${inv.id}/${g.id}` : `/rsvp/${inv.id}/${g.id}`,
    status: g.rsvpStatus === 'PENDING' ? 'pending' : 'responded',
    rsvpStatus: g.rsvpStatus && g.rsvpStatus !== 'PENDING' ? g.rsvpStatus.toLowerCase() : null,
    respondedAt: inv.publishedAt
  }));

  let eventDate = '';
  let eventTime = '';
  if (inv.weddingDate) {
    const parts = inv.weddingDate.split('T');
    eventDate = parts[0];
    if (parts[1]) {
      eventTime = parts[1].substring(0, 5);
    }
  } else if (inv.ceremonyDetails?.dateTime) {
    const parts = inv.ceremonyDetails.dateTime.split('T');
    eventDate = parts[0];
    if (parts[1]) {
      eventTime = parts[1].substring(0, 5);
    }
  }

  return {
    id: inv.id ? inv.id.toString() : '',
    coupleName: inv.title ? inv.title.replace("'s Wedding", "") : '',
    eventDate,
    eventTime,
    eventLocation: inv.ceremonyDetails?.address || '',
    eventVenue: inv.ceremonyDetails?.venueName || '',
    eventDescription: inv.ceremonyDetails?.officiant || inv.receptionDetails?.additionalInstructions || '',
    templateId: inv.template || 'classic',
    backgroundColor: customization.backgroundColor,
    accentColor: customization.accentColor,
    textColor: customization.textColor,
    fontStyle: customization.fontStyle,
    customMessage: inv.title || '',
    guests: guestsMapped,
    status: inv.status ? inv.status.toLowerCase() as 'draft' | 'published' : 'draft',
    invitationLink: typeof window !== 'undefined' ? `${window.location.origin}/rsvp/${inv.id}` : `/rsvp/${inv.id}`,
    guestLinks: guestLinksMapped
  };
}

function mapFrontendToBackend(payload: InvitationPublishPayload): any {
  const guestsMapped = (payload.guests || []).map((g: any) => {
    const isTempId = !g.id || g.id.startsWith('guest-');
    return {
      id: isTempId ? null : Number(g.id),
      name: g.name,
      email: g.email,
      phoneNumber: g.phone || null,
      dietaryRestrictions: g.dietaryRestrictions || null,
      additionalNotes: g.notes || null,
      plusOneAllowed: true,
      rsvpStatus: 'PENDING'
    };
  });

  const weddingDateStr = payload.eventDate && payload.eventTime 
    ? `${payload.eventDate}T${payload.eventTime}:00` 
    : payload.eventDate 
      ? `${payload.eventDate}T12:00:00` 
      : null;

  return {
    id: payload.id ? Number(payload.id) : null,
    title: payload.coupleName ? `${payload.coupleName}'s Wedding` : 'Wedding Invitation',
    slug: payload.coupleName ? `wedding-${payload.coupleName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}` : `wedding-${Date.now()}`,
    status: payload.status === 'published' ? 'PUBLISHED' : 'DRAFT',
    visibility: 'PUBLIC',
    weddingDate: weddingDateStr,
    timezone: 'UTC',
    language: 'en',
    theme: JSON.stringify({
      backgroundColor: payload.backgroundColor,
      accentColor: payload.accentColor,
      textColor: payload.textColor,
      fontStyle: payload.fontStyle
    }),
    template: payload.templateId,
    ceremonyDetails: {
      venueName: payload.eventVenue,
      address: payload.eventLocation,
      dateTime: weddingDateStr
    },
    receptionDetails: {
      venueName: payload.eventVenue,
      address: payload.eventLocation,
      dateTime: weddingDateStr
    },
    guests: guestsMapped
  };
}

export class InvitationAPI {
  /**
   * Publish invitation and create guest links
   */
  static async publishInvitation(
    payload: InvitationPublishPayload
  ): Promise<PublishedInvitation> {
    try {
      const backendPayload = mapFrontendToBackend(payload);
      const savedInvitation = await api.post<any>('/invitations', backendPayload);
      
      if (payload.status === 'published' && savedInvitation.id) {
        await api.post<any>(`/invitations/${savedInvitation.id}/publish`);
      }
      
      const finalInvitation = await api.get<any>(`/invitations/${savedInvitation.id}`);
      return mapBackendToFrontend(finalInvitation);
    } catch (error) {
      console.error('Error publishing invitation:', error);
      throw error;
    }
  }

  /**
   * Get invitation details with guest list
   */
  static async getInvitation(invitationId: string): Promise<PublishedInvitation> {
    try {
      const inv = await api.get<any>(`/invitations/${invitationId}`);
      return mapBackendToFrontend(inv);
    } catch (error) {
      console.error('Error fetching invitation:', error);
      throw error;
    }
  }

  /**
   * Get invitation analytics and RSVP data
   */
  static async getInvitationAnalytics(invitationId: string): Promise<InvitationAnalytics> {
    try {
      const metrics = await api.get<any>(`/invitations/${invitationId}/analytics`);
      const guests = await api.get<any[]>(`/guests/${invitationId}`);
      
      const responded = metrics.totalRsvp || 0;
      const totalGuests = metrics.totalGuests || 0;
      
      const responses = guests.map((g: any) => ({
        guestId: g.id ? g.id.toString() : '',
        guestName: g.name || '',
        guestEmail: g.email || '',
        rsvpStatus: g.rsvpStatus ? g.rsvpStatus.toLowerCase() as any : 'pending',
        dietaryRestrictions: g.dietaryRestrictions || undefined,
        plusOne: g.plusOneName || undefined,
        message: g.additionalNotes || undefined,
        respondedAt: g.rsvpDate
      }));

      return {
        invitationId,
        totalGuests,
        responded,
        pending: totalGuests - responded,
        accepted: metrics.accepted || 0,
        declined: metrics.declined || 0,
        responseRate: metrics.rsvpConversionPercent || 0,
        responses
      };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }

  /**
   * Get guest response for RSVP page
   */
  static async getGuestInvitation(invitationId: string, guestId: string) {
    try {
      const invitation = await this.getInvitation(invitationId);
      if (!invitation || !invitation.guests) {
        throw new Error('Invitation or guests list not found');
      }
      const guest = invitation.guests.find((g: any) => g.id === guestId);
      if (!guest) {
        throw new Error('Guest not found on this invitation');
      }
      return guest;
    } catch (error) {
      console.error('Error fetching guest invitation:', error);
      throw error;
    }
  }

  /**
   * Submit RSVP response
   */
  static async submitRSVP(
    invitationId: string,
    guestId: string,
    response: {
      rsvpStatus: 'accepted' | 'declined' | 'maybe';
      dietaryRestrictions?: string;
      plusOne?: string;
      message?: string;
    }
  ): Promise<{ success: boolean; message: string }> {
    try {
      const rsvpRequest = {
        guestId: Number(guestId),
        status: response.rsvpStatus.toUpperCase(),
        additionalNotes: response.message || null,
        attendanceCount: response.rsvpStatus === 'accepted' ? (response.plusOne ? 2 : 1) : 0,
        plusOneName: response.plusOne || null,
        dietaryRestrictions: response.dietaryRestrictions || null
      };

      await api.post<any>(`/invitations/${invitationId}/rsvp`, rsvpRequest);
      return { success: true, message: 'RSVP submitted successfully' };
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      throw error;
    }
  }

  /**
   * Update guest information
   */
  static async updateGuest(
    invitationId: string,
    guestId: string,
    guestData: any
  ): Promise<{ success: boolean }> {
    try {
      await api.put<any>(`/guests/${invitationId}/${guestId}`, guestData);
      return { success: true };
    } catch (error) {
      console.error('Error updating guest:', error);
      throw error;
    }
  }

  /**
   * Delete invitation (draft only)
   */
  static async deleteInvitation(invitationId: string): Promise<{ success: boolean }> {
    try {
      await api.delete<any>(`/invitations/${invitationId}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting invitation:', error);
      throw error;
    }
  }

  /**
   * List user's invitations
   */
  static async listInvitations(): Promise<PublishedInvitation[]> {
    try {
      const list = await api.get<any[]>('/invitations/user');
      return list.map(mapBackendToFrontend);
    } catch (error) {
      console.error('Error fetching invitations:', error);
      throw error;
    }
  }

  /**
   * Export guest responses as CSV
   */
  static async exportGuestResponses(invitationId: string): Promise<Blob> {
    try {
      const guests = await api.get<any[]>(`/guests/${invitationId}`);
      const headers = ['Name', 'Email', 'Phone', 'Status', 'Dietary Restrictions', 'Plus One Name', 'Notes'];
      const csvRows = [headers.join(',')];
      for (const g of guests) {
        const row = [
          JSON.stringify(g.name || ''),
          JSON.stringify(g.email || ''),
          JSON.stringify(g.phoneNumber || ''),
          JSON.stringify(g.rsvpStatus || ''),
          JSON.stringify(g.dietaryRestrictions || ''),
          JSON.stringify(g.plusOneName || ''),
          JSON.stringify(g.additionalNotes || '')
        ];
        csvRows.push(row.join(','));
      }
      const csvContent = csvRows.join('\n');
      return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    } catch (error) {
      console.error('Error exporting responses:', error);
      throw error;
    }
  }
}
