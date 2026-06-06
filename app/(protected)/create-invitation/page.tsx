'use client';

import { useEffect } from 'react';
import { useInvitationForm } from '@/hooks/useInvitationForm';
import { EventDetailsStep } from '@/components/invitation/EventDetailsStep';
import { CustomizationStep } from '@/components/invitation/CustomizationStep';
import { GuestListStep } from '@/components/invitation/GuestListStep';
import { PreviewPublishStep } from '@/components/invitation/PreviewPublishStep';
import { Card } from '@/components/ui/card';

export default function CreateInvitationPage() {
  const {
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
    setCurrentStep,
  } = useInvitationForm();

  // Load draft on component mount
  useEffect(() => {
    const hasDraft = localStorage.getItem('invitation_draft');
    if (hasDraft) {
      loadDraft();
    }
  }, [loadDraft]);

  // Step indicator
  const steps = [
    { id: 'details', label: 'Event Details', number: 1 },
    { id: 'customization', label: 'Customize', number: 2 },
    { id: 'guests', label: 'Guests', number: 3 },
    { id: 'preview', label: 'Review', number: 4 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Create Your Wedding Invitation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Design a beautiful invitation and generate unique links for your guests
          </p>
        </div>

        {/* Step Indicator */}
        <Card className="mb-12 p-6 border-secondary/20">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => {
                    if (index <= currentStepIndex) {
                      setCurrentStep(step.id as 'details' | 'customization' | 'guests' | 'preview');
                    }
                  }}
                  disabled={index > currentStepIndex}
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium transition-all ${
                    index < currentStepIndex
                      ? 'bg-accent border-accent text-accent-foreground'
                      : index === currentStepIndex
                        ? 'bg-accent border-accent text-accent-foreground'
                        : 'bg-background border-border text-muted-foreground'
                  } ${index <= currentStepIndex ? 'cursor-pointer hover:border-accent' : 'cursor-not-allowed'}`}
                >
                  {index < currentStepIndex ? '✓' : step.number}
                </button>

                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 transition-all ${
                      index < currentStepIndex ? 'bg-accent' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="flex items-center justify-between mt-4 text-sm">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`text-xs sm:text-sm font-medium transition-colors ${
                  currentStep === step.id
                    ? 'text-accent'
                    : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </div>
            ))}
          </div>
        </Card>

        {/* Step Content */}
        <Card className="p-8 border-secondary/20">
          {currentStep === 'details' && (
            <EventDetailsStep
              formData={formData}
              onUpdate={updateField}
              onNext={nextStep}
              error={error}
            />
          )}

          {currentStep === 'customization' && (
            <CustomizationStep
              formData={formData}
              onUpdate={updateField}
              onUpdateColors={updateColors}
              onNext={nextStep}
              onPrevious={previousStep}
            />
          )}

          {currentStep === 'guests' && (
            <GuestListStep
              formData={formData}
              onAddGuest={addGuest}
              onRemoveGuest={removeGuest}
              onUpdateGuest={updateGuest}
              onAddGuestsFromCSV={addGuestsFromCSV}
              onNext={nextStep}
              onPrevious={previousStep}
              error={error}
            />
          )}

          {currentStep === 'preview' && (
            <PreviewPublishStep
              formData={formData}
              isLoading={isLoading}
              error={error}
              successMessage={successMessage}
              onPublish={publishInvitation}
              onSaveDraft={saveDraft}
              onPrevious={previousStep}
            />
          )}
        </Card>

        {/* Draft Save Indicator */}
        {currentStep !== 'preview' && (
          <div className="text-center mt-8">
            <button
              onClick={saveDraft}
              disabled={isLoading}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLoading ? 'Saving...' : 'Save current progress as draft'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
