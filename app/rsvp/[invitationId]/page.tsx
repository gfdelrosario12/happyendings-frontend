'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckCircle2, Heart } from 'lucide-react'

interface RSVPFormData {
  guestName: string
  email: string
  attending: 'yes' | 'no' | ''
  numGuests: string
  mealPreference: 'chicken' | 'fish' | 'vegetarian' | ''
  plusOne: boolean
  message: string
}

export default function RSVPPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<RSVPFormData>({
    guestName: '',
    email: '',
    attending: '',
    numGuests: '1',
    mealPreference: '',
    plusOne: false,
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAttendingChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      attending: value as 'yes' | 'no'
    }))
  }

  const handleMealChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      mealPreference: value as 'chicken' | 'fish' | 'vegetarian'
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      plusOne: checked,
      numGuests: checked ? '2' : '1'
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    console.log('RSVP Submitted:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-border bg-background shadow-xl">
          <div className="p-8 text-center space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Thank You Message */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl font-bold text-foreground">
                Thank You!
              </h1>
              <p className="text-muted-foreground">
                Your RSVP has been received.
              </p>
            </div>

            {/* Confirmation Details */}
            <Card className="bg-secondary/20 border-border p-4 space-y-2">
              <div className="text-sm">
                <p className="text-muted-foreground">Guest Name</p>
                <p className="font-semibold text-foreground">{formData.guestName}</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Response</p>
                <p className="font-semibold text-foreground capitalize">
                  {formData.attending === 'yes' ? '✓ Attending' : '✗ Not Attending'}
                </p>
              </div>
              {formData.attending === 'yes' && formData.mealPreference && (
                <div className="text-sm">
                  <p className="text-muted-foreground">Meal Preference</p>
                  <p className="font-semibold text-foreground capitalize">
                    {formData.mealPreference}
                  </p>
                </div>
              )}
            </Card>

            {/* Additional Message */}
            <p className="text-muted-foreground text-sm">
              A confirmation email has been sent to <span className="font-semibold text-foreground">{formData.email}</span>
            </p>

            {/* Footer Message */}
            <div className="text-center py-4 border-t border-border">
              <p className="text-muted-foreground text-sm">
                We can&apos;t wait to celebrate with you!
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Invitation Header */}
      <section className="bg-card border-b border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
            Sarah & Michael
          </h1>
          <p className="text-muted-foreground mb-6">
            Together with their families
            <br />
            request the pleasure of your company
          </p>
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-foreground">April 15, 2024 at 6:00 PM</p>
            <p className="text-muted-foreground">The Grand Ballroom, San Francisco</p>
          </div>
        </div>
      </section>

      {/* RSVP Form */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-2xl border-border bg-background shadow-lg">
          <div className="p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
              Please Respond By April 1
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Guest Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Your Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="guestName" className="text-foreground font-medium">
                      Name *
                    </Label>
                    <Input
                      id="guestName"
                      name="guestName"
                      value={formData.guestName}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Attendance */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Will you be attending? *</h3>
                <RadioGroup value={formData.attending} onValueChange={handleAttendingChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="attending-yes" />
                    <Label htmlFor="attending-yes" className="text-foreground cursor-pointer font-normal">
                      Yes, I&apos;ll be there!
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="attending-no" />
                    <Label htmlFor="attending-no" className="text-foreground cursor-pointer font-normal">
                      Sorry, I can&apos;t make it
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Plus One */}
              {formData.attending === 'yes' && (
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="plusOne"
                      checked={formData.plusOne}
                      onCheckedChange={handleCheckboxChange}
                      className="mt-1 border-border bg-background"
                    />
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="plusOne" className="text-foreground cursor-pointer font-medium">
                        Will you be bringing a guest?
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        One additional guest is welcome
                      </p>
                    </div>
                  </div>
                  {formData.plusOne && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="plusOneName" className="text-foreground font-medium text-sm">
                        Guest Name
                      </Label>
                      <Input
                        id="plusOneName"
                        placeholder="Guest's name"
                        className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Meal Preference */}
              {formData.attending === 'yes' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Meal Preference *</h3>
                  <RadioGroup value={formData.mealPreference} onValueChange={handleMealChange}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="chicken" id="meal-chicken" />
                        <Label htmlFor="meal-chicken" className="text-foreground cursor-pointer font-normal">
                          Chicken
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fish" id="meal-fish" />
                        <Label htmlFor="meal-fish" className="text-foreground cursor-pointer font-normal">
                          Fish
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vegetarian" id="meal-vegetarian" />
                        <Label htmlFor="meal-vegetarian" className="text-foreground cursor-pointer font-normal">
                          Vegetarian
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Message */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Message for the Couple</h3>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share your well-wishes..."
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!formData.guestName || !formData.email || !formData.attending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10"
              >
                Submit RSVP
              </Button>
            </form>
          </div>
        </Card>
      </section>
    </div>
  )
}
