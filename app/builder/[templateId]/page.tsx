'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Share2, Eye, Save, Download } from 'lucide-react'

interface InvitationData {
  coupleName: string
  eventDate: string
  eventTime: string
  venue: string
  address: string
  dressCode: string
  rsvpDeadline: string
  notes: string
  primaryColor: string
  fontStyle: 'serif' | 'sans-serif'
}

export default function InvitationBuilder() {
  const [showPreview, setShowPreview] = useState(true)
  const [invitationData, setInvitationData] = useState<InvitationData>({
    coupleName: 'Sarah & Michael',
    eventDate: 'April 15, 2024',
    eventTime: '6:00 PM',
    venue: 'The Grand Ballroom',
    address: 'San Francisco, California',
    dressCode: 'Black Tie',
    rsvpDeadline: 'April 1, 2024',
    notes: 'Dinner and dancing to follow',
    primaryColor: '#d4a574',
    fontStyle: 'serif'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInvitationData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // Save to draft
    console.log('Saved draft:', invitationData)
  }

  const handlePublish = () => {
    // Publish and get shareable link
    console.log('Published:', invitationData)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/templates" className="flex items-center gap-2 text-primary hover:text-primary/80">
              <ArrowLeft className="h-5 w-5" />
              Back to Templates
            </Link>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleSave} className="border-border bg-transparent">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handlePublish} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Share2 className="h-4 w-4 mr-2" />
                Publish & Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Form Panel - Left */}
        <div className="w-full lg:w-1/2 border-r border-border bg-background p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-70px)]">
          <div className="max-w-md mx-auto space-y-8">
            {/* Couple Info */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-foreground">Couple Information</h3>
              <div className="space-y-2">
                <Label htmlFor="coupleName" className="text-foreground font-medium">
                  Couple Names
                </Label>
                <Input
                  id="coupleName"
                  name="coupleName"
                  value={invitationData.coupleName}
                  onChange={handleInputChange}
                  placeholder="e.g., Sarah & Michael"
                  className="border-border bg-background text-foreground"
                />
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-foreground">Event Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventDate" className="text-foreground font-medium text-sm">
                    Date
                  </Label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    value={invitationData.eventDate}
                    onChange={handleInputChange}
                    placeholder="April 15, 2024"
                    className="border-border bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventTime" className="text-foreground font-medium text-sm">
                    Time
                  </Label>
                  <Input
                    id="eventTime"
                    name="eventTime"
                    value={invitationData.eventTime}
                    onChange={handleInputChange}
                    placeholder="6:00 PM"
                    className="border-border bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue" className="text-foreground font-medium">
                  Venue Name
                </Label>
                <Input
                  id="venue"
                  name="venue"
                  value={invitationData.venue}
                  onChange={handleInputChange}
                  placeholder="The Grand Ballroom"
                  className="border-border bg-background text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground font-medium">
                  Venue Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={invitationData.address}
                  onChange={handleInputChange}
                  placeholder="San Francisco, California"
                  className="border-border bg-background text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dressCode" className="text-foreground font-medium">
                  Dress Code
                </Label>
                <Input
                  id="dressCode"
                  name="dressCode"
                  value={invitationData.dressCode}
                  onChange={handleInputChange}
                  placeholder="Black Tie"
                  className="border-border bg-background text-foreground"
                />
              </div>
            </div>

            {/* RSVP & Additional Info */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-foreground">RSVP & Additional</h3>
              <div className="space-y-2">
                <Label htmlFor="rsvpDeadline" className="text-foreground font-medium">
                  RSVP Deadline
                </Label>
                <Input
                  id="rsvpDeadline"
                  name="rsvpDeadline"
                  value={invitationData.rsvpDeadline}
                  onChange={handleInputChange}
                  placeholder="April 1, 2024"
                  className="border-border bg-background text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-foreground font-medium">
                  Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={invitationData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional information for your guests"
                  className="border-border bg-background text-foreground"
                  rows={4}
                />
              </div>
            </div>

            {/* Design Options */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-foreground">Design</h3>
              <div className="space-y-2">
                <Label htmlFor="primaryColor" className="text-foreground font-medium">
                  Accent Color
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    name="primaryColor"
                    type="color"
                    value={invitationData.primaryColor}
                    onChange={handleInputChange}
                    className="w-16 h-10 border-border bg-background cursor-pointer"
                  />
                  <Input
                    value={invitationData.primaryColor}
                    onChange={handleInputChange}
                    name="primaryColor"
                    placeholder="#000000"
                    className="flex-1 border-border bg-background text-foreground font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium">Font Style</Label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setInvitationData(prev => ({ ...prev, fontStyle: 'serif' }))}
                    className={`flex-1 px-4 py-2 rounded border transition-colors ${
                      invitationData.fontStyle === 'serif'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border bg-background text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    Serif
                  </button>
                  <button
                    onClick={() => setInvitationData(prev => ({ ...prev, fontStyle: 'sans-serif' }))}
                    className={`flex-1 px-4 py-2 rounded border transition-colors ${
                      invitationData.fontStyle === 'sans-serif'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border bg-background text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    Sans-Serif
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel - Right */}
        <div className="w-full lg:w-1/2 bg-secondary/20 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-70px)]">
          <div className="max-w-md mx-auto">
            {/* Toggle Preview Mobile */}
            <div className="mb-6 lg:hidden flex gap-2">
              <Button
                variant={showPreview ? 'default' : 'outline'}
                onClick={() => setShowPreview(true)}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button
                variant={!showPreview ? 'default' : 'outline'}
                onClick={() => setShowPreview(false)}
                className="flex-1"
              >
                Edit
              </Button>
            </div>

            {/* Invitation Preview */}
            <Card className="border-border bg-background shadow-2xl overflow-hidden" style={{
              aspectRatio: '4/5'
            }}>
              <div
                className={`w-full h-full p-8 flex flex-col justify-center items-center text-center ${
                  invitationData.fontStyle === 'serif' ? 'font-serif' : 'font-sans'
                }`}
                style={{
                  backgroundColor: '#faf8f3',
                  color: '#3d2817'
                }}
              >
                {/* Decorative Top */}
                <div className="mb-6" style={{ color: invitationData.primaryColor }}>
                  <div className="text-4xl">✦</div>
                </div>

                {/* Main Content */}
                <div className="space-y-4 flex-1 flex flex-col justify-center">
                  {/* Couple Name */}
                  <h1 className={`text-4xl font-bold mb-4 ${
                    invitationData.fontStyle === 'serif' ? 'font-serif' : 'font-sans'
                  }`}
                    style={{ color: invitationData.primaryColor }}
                  >
                    {invitationData.coupleName}
                  </h1>

                  {/* Together With */}
                  <p className="text-sm tracking-widest uppercase mb-6" style={{ color: invitationData.primaryColor }}>
                    Together with their families
                  </p>

                  {/* Request pleasure */}
                  <p className="text-sm mb-6">
                    request the pleasure of your company
                    <br />
                    at the marriage of
                  </p>

                  {/* Event Details */}
                  <div className="my-6 space-y-3">
                    <p className="text-sm font-semibold">{invitationData.eventDate}</p>
                    <p className="text-sm">{invitationData.eventTime}</p>
                    <p className="text-sm font-semibold">{invitationData.venue}</p>
                    <p className="text-xs">{invitationData.address}</p>
                  </div>

                  {/* Dress Code */}
                  <p className="text-xs uppercase tracking-wider mt-6" style={{ color: invitationData.primaryColor }}>
                    {invitationData.dressCode}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-gray-300 text-xs text-gray-600">
                  <p>RSVP by {invitationData.rsvpDeadline}</p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Share2 className="h-4 w-4 mr-2" />
                Get Share Link
              </Button>
              <Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary/50 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download Preview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
