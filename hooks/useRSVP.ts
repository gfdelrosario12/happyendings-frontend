import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export interface Guest {
  id: number;
  name: string;
  email: string;
  rsvpStatus: 'ATTENDING' | 'DECLINED' | 'PENDING';
  additionalNotes?: string;
  plusOneAllowance: boolean;
}

export function useInvitationGuests(invitationId: string | number) {
  return useQuery<Guest[]>({
    queryKey: ['invitation', invitationId, 'guests'],
    queryFn: () => api.get<Guest[]>(`/invitations/${invitationId}/guests`),
    enabled: !!invitationId,
  });
}

interface RsvpUpdatePayload {
  guestId: number;
  status: 'ATTENDING' | 'DECLINED' | 'PENDING';
  additionalNotes?: string;
}

export function useRSVPMutation(invitationId: string | number) {
  const queryClient = useQueryClient();
  const queryKey = ['invitation', invitationId, 'guests'];

  return useMutation({
    mutationFn: (payload: RsvpUpdatePayload) =>
      api.post<Guest>(`/invitations/${invitationId}/rsvp`, payload),

    // 1. Optimistic UI update logic
    onMutate: async (newRsvp) => {
      // Cancel outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous guest list state
      const previousGuests = queryClient.getQueryData<Guest[]>(queryKey);

      // Optimistically update the guest in the cache
      if (previousGuests) {
        queryClient.setQueryData<Guest[]>(
          queryKey,
          previousGuests.map((guest) =>
            guest.id === newRsvp.guestId
              ? { ...guest, rsvpStatus: newRsvp.status, additionalNotes: newRsvp.additionalNotes }
              : guest
          )
        );
      }

      // Return context with snapshot to rollback on failure
      return { previousGuests };
    },

    // 2. Rollback logic on error
    onError: (err, newRsvp, context) => {
      if (context?.previousGuests) {
        queryClient.setQueryData(queryKey, context.previousGuests);
      }
      toast.error('Failed to submit RSVP. Please try again.');
    },

    // 3. Complete and sync on success
    onSuccess: (data) => {
      toast.success(`RSVP status updated to ${data.rsvpStatus}!`);
    },

    // Always refetch after error or success to sync with server truth
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
