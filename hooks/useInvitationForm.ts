'use client';

import { useState, useCallback } from 'react';
import {
  InvitationFormData,
  InvitationPublishPayload,
  Guest,
} from '@/lib/types/invitation';
import { InvitationAPI } from '@/lib/api/invitation';

const INITIAL_FORM_STATE: InvitationFormData = {
  coupleName: '',
  eventDate: '',
  eventTime: '',
  eventLocation: '',
  eventVenue: '',
  eventDescription: '',
  templateId: 'classic',
  backgroundColor: '#f5f1ee',
  accentColor: '#d4a574',
  textColor: '#3d3d3d',
  fontStyle: 'classic',
  customMessage: '',
  guests: [],
};

export function useInvitationForm() {
  const [formData, setFormData] = useState<InvitationFormData>(INITIAL_FORM_STATE);
  const [currentStep, setCurrentStep] = useState<
    'details' | 'customization' | 'guests' | 'preview'
  >('details');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Update form field
  const updateField = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (field: keyof InvitationFormData, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setError(null);
    },
    []
  );

  // Update nested color or font styles
  const updateColors = useCallback(
    (colors: { backgroundColor?: string; accentColor?: string; textColor?: string }) => {
      setFormData((prev) => ({
        ...prev,
        ...colors,
      }));
    },
    []
  );

  // Add guest
  const addGuest = useCallback((guest: Guest) => {
    setFormData((prev) => ({
      ...prev,
      guests: [...prev.guests, { ...guest, id: `guest-${Date.now()}-${Math.random()}` }],
    }));
  }, []);

  // Remove guest
  const removeGuest = useCallback((guestId: string) => {
    setFormData((prev) => ({
      ...prev,
      guests: prev.guests.filter((g) => g.id !== guestId),
    }));
  }, []);

  // Update guest
  const updateGuest = useCallback((guestId: string, updatedGuest: Partial<Guest>) => {
    setFormData((prev) => ({
      ...prev,
      guests: prev.guests.map((g) => (g.id === guestId ? { ...g, ...updatedGuest } : g)),
    }));
  }, []);

  // Bulk add guests from CSV
  const addGuestsFromCSV = useCallback((guests: Guest[]) => {
    setFormData((prev) => ({
      ...prev,
      guests: [
        ...prev.guests,
        ...guests.map((g) => ({
          ...g,
          id: `guest-${Date.now()}-${Math.random()}`,
        })),
      ],
    }));
  }, []);

  // Validate form
  const validateForm = useCallback((): boolean => {
    if (!formData.coupleName.trim()) {
      setError('Couple name is required');
      return false;
    }
    if (!formData.eventDate) {
      setError('Event date is required');
      return false;
    }
    if (!formData.eventLocation.trim()) {
      setError('Event location is required');
      return false;
    }
    if (formData.guests.length === 0) {
      setError('At least one guest is required');
      return false;
    }
    return true;
  }, [formData]);

  // Move to next step
  const nextStep = useCallback(() => {
    const steps: Array<'details' | 'customization' | 'guests' | 'preview'> = [
      'details',
      'customization',
      'guests',
      'preview',
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      window.scrollTo(0, 0);
    }
  }, [currentStep]);

  // Move to previous step
  const previousStep = useCallback(() => {
    const steps: Array<'details' | 'customization' | 'guests' | 'preview'> = [
      'details',
      'customization',
      'guests',
      'preview',
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      window.scrollTo(0, 0);
    }
  }, [currentStep]);

  // Publish invitation
  const publishInvitation = useCallback(async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const payload: InvitationPublishPayload = {
        ...formData,
        status: 'published',
      };

      const result = await InvitationAPI.publishInvitation(payload);

      setSuccessMessage('Invitation published successfully!');
      setFormData(INITIAL_FORM_STATE);
      setCurrentStep('details');

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to publish invitation';
      setError(errorMessage);
      console.error('Publish error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm]);

  // Save as draft
  const saveDraft = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const payload: InvitationPublishPayload = {
        ...formData,
        status: 'draft',
      };

      // You can implement draft saving to your backend
      // For now, we'll just store in localStorage
      localStorage.setItem('invitation_draft', JSON.stringify(payload));

      setSuccessMessage('Draft saved successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save draft';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  // Load draft
  const loadDraft = useCallback(() => {
    try {
      const draft = localStorage.getItem('invitation_draft');
      if (draft) {
        const draftData = JSON.parse(draft);
        setFormData(draftData);
        setSuccessMessage('Draft loaded successfully!');
      }
    } catch (err) {
      console.error('Error loading draft:', err);
      setError('Failed to load draft');
    }
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setCurrentStep('details');
    setError(null);
    setSuccessMessage(null);
  }, []);

  return {
    formData,
    currentStep,
    isLoading,
    error,
    successMessage,
    updateField,
    updateColors,
    addGuest,
    removeGuest,
    updateGuest,
    addGuestsFromCSV,
    nextStep,
    previousStep,
    publishInvitation,
    saveDraft,
    loadDraft,
    resetForm,
    validateForm,
    setCurrentStep,
  };
}
