import {
  InvitationPublishPayload,
  PublishedInvitation,
  InvitationAnalytics,
} from '@/lib/types/invitation';

// Configure your Spring Boot backend URL here
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const apiHeaders = {
  'Content-Type': 'application/json',
};

export class InvitationAPI {
  /**
   * Publish invitation and create guest links
   */
  static async publishInvitation(
    payload: InvitationPublishPayload
  ): Promise<PublishedInvitation> {
    try {
      const response = await fetch(`${API_BASE_URL}/invitations/publish`, {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to publish invitation: ${response.statusText}`);
      }

      return response.json();
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
      const response = await fetch(`${API_BASE_URL}/invitations/${invitationId}`, {
        method: 'GET',
        headers: apiHeaders,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch invitation: ${response.statusText}`);
      }

      return response.json();
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
      const response = await fetch(`${API_BASE_URL}/invitations/${invitationId}/analytics`, {
        method: 'GET',
        headers: apiHeaders,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.statusText}`);
      }

      return response.json();
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
      const response = await fetch(
        `${API_BASE_URL}/invitations/${invitationId}/guests/${guestId}`,
        {
          method: 'GET',
          headers: apiHeaders,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch guest invitation: ${response.statusText}`);
      }

      return response.json();
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
      const responseData = await fetch(
        `${API_BASE_URL}/invitations/${invitationId}/guests/${guestId}/rsvp`,
        {
          method: 'POST',
          headers: apiHeaders,
          body: JSON.stringify(response),
        }
      );

      if (!responseData.ok) {
        throw new Error(`Failed to submit RSVP: ${responseData.statusText}`);
      }

      return responseData.json();
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    guestData: any
  ): Promise<{ success: boolean }> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/invitations/${invitationId}/guests/${guestId}`,
        {
          method: 'PUT',
          headers: apiHeaders,
          body: JSON.stringify(guestData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update guest: ${response.statusText}`);
      }

      return response.json();
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
      const response = await fetch(`${API_BASE_URL}/invitations/${invitationId}`, {
        method: 'DELETE',
        headers: apiHeaders,
      });

      if (!response.ok) {
        throw new Error(`Failed to delete invitation: ${response.statusText}`);
      }

      return response.json();
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
      const response = await fetch(`${API_BASE_URL}/invitations`, {
        method: 'GET',
        headers: apiHeaders,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch invitations: ${response.statusText}`);
      }

      return response.json();
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
      const response = await fetch(`${API_BASE_URL}/invitations/${invitationId}/export/csv`, {
        method: 'GET',
        headers: apiHeaders,
      });

      if (!response.ok) {
        throw new Error(`Failed to export responses: ${response.statusText}`);
      }

      return response.blob();
    } catch (error) {
      console.error('Error exporting responses:', error);
      throw error;
    }
  }
}
