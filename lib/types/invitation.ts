export interface Guest {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  group?: string;
  dietaryRestrictions?: string;
  notes?: string;
}

export interface InvitationFormData {
  // Event Details
  coupleName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventVenue: string;
  eventDescription?: string;

  // Customization
  templateId: string;
  backgroundColor: string;
  accentColor: string;
  textColor: string;
  fontStyle: 'classic' | 'modern' | 'romantic';
  customMessage?: string;

  // Guest List
  guests: Guest[];
}

export interface InvitationPublishPayload {
  id?: string;
  coupleName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventVenue: string;
  eventDescription?: string;
  templateId: string;
  backgroundColor: string;
  accentColor: string;
  textColor: string;
  fontStyle: 'classic' | 'modern' | 'romantic';
  customMessage?: string;
  guests: Guest[];
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
}

export interface PublishedInvitation extends InvitationPublishPayload {
  id: string;
  invitationLink: string;
  guestLinks: GuestLink[];
}

export interface GuestLink {
  guestId: string;
  guestEmail: string;
  invitationId: string;
  guestLink: string;
  status: 'pending' | 'responded';
  rsvpStatus?: 'accepted' | 'declined' | 'maybe' | null;
  respondedAt?: string;
}

export interface InvitationAnalytics {
  invitationId: string;
  totalGuests: number;
  responded: number;
  pending: number;
  accepted: number;
  declined: number;
  responseRate: number;
  responses: GuestResponse[];
}

export interface GuestResponse {
  guestId: string;
  guestName: string;
  guestEmail: string;
  rsvpStatus: 'accepted' | 'declined' | 'maybe' | 'pending';
  dietaryRestrictions?: string;
  plusOne?: string;
  message?: string;
  respondedAt?: string;
}

export interface Template {
  id: string;
  name: string;
  category: 'classic' | 'modern' | 'floral' | 'minimal' | 'gold' | 'romantic';
  image: string;
  description: string;
  defaultColors: {
    background: string;
    accent: string;
    text: string;
  };
}
