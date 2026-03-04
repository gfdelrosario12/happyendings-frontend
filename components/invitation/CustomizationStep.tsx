'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InvitationFormData } from '@/lib/types/invitation';

interface CustomizationStepProps {
  formData: InvitationFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: keyof InvitationFormData, value: any) => void;
  onUpdateColors: (colors: {
    backgroundColor?: string;
    accentColor?: string;
    textColor?: string;
  }) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const TEMPLATES = [
  { id: 'classic', name: 'Classic', image: '/template-classic.jpg' },
  { id: 'modern', name: 'Modern', image: '/template-modern.jpg' },
  { id: 'floral', name: 'Floral', image: '/template-floral.jpg' },
  { id: 'minimal', name: 'Minimal', image: '/template-minimal.jpg' },
  { id: 'gold', name: 'Gold', image: '/template-gold.jpg' },
  { id: 'romantic', name: 'Romantic', image: '/template-romantic.jpg' },
];

export function CustomizationStep({
  formData,
  onUpdate,
  onUpdateColors,
  onNext,
  onPrevious,
}: CustomizationStepProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
          Customize Your Invitation
        </h2>
        <p className="text-muted-foreground">
          Choose a template and personalize the colors and message
        </p>
      </div>

      <Card className="p-6 border-secondary/20">
        <div className="space-y-8">
          {/* Template Selection */}
          <div>
            <Label className="text-base font-medium mb-4 block">
              Select a Template
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => onUpdate('templateId', template.id)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                    formData.templateId === template.id
                      ? 'border-accent ring-2 ring-accent/50'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="aspect-square bg-muted relative">
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">{template.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Font Style */}
          <div>
            <Label htmlFor="fontStyle" className="text-base font-medium">
              Font Style
            </Label>
            <Select
              value={formData.fontStyle}
              onValueChange={(value) =>
                onUpdate('fontStyle', value as 'classic' | 'modern' | 'romantic')
              }
            >
              <SelectTrigger id="fontStyle" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Classic Serif</SelectItem>
                <SelectItem value="modern">Modern Sans-Serif</SelectItem>
                <SelectItem value="romantic">Romantic Script</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Color Customization */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-medium">Colors</Label>
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="text-sm text-accent hover:text-accent/80 font-medium"
              >
                {showColorPicker ? 'Hide' : 'Customize'}
              </button>
            </div>

            {showColorPicker && (
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                {/* Background Color */}
                <div className="flex items-center gap-4">
                  <Label htmlFor="bg-color" className="w-32">
                    Background
                  </Label>
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      id="bg-color"
                      type="color"
                      value={formData.backgroundColor}
                      onChange={(e) =>
                        onUpdateColors({ backgroundColor: e.target.value })
                      }
                      className="w-12 h-12 rounded cursor-pointer border border-border"
                    />
                    <Input
                      type="text"
                      value={formData.backgroundColor}
                      onChange={(e) =>
                        onUpdateColors({ backgroundColor: e.target.value })
                      }
                      className="flex-1"
                      placeholder="#f5f1ee"
                    />
                  </div>
                </div>

                {/* Accent Color */}
                <div className="flex items-center gap-4">
                  <Label htmlFor="accent-color" className="w-32">
                    Accent
                  </Label>
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      id="accent-color"
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) =>
                        onUpdateColors({ accentColor: e.target.value })
                      }
                      className="w-12 h-12 rounded cursor-pointer border border-border"
                    />
                    <Input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) =>
                        onUpdateColors({ accentColor: e.target.value })
                      }
                      className="flex-1"
                      placeholder="#d4a574"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div className="flex items-center gap-4">
                  <Label htmlFor="text-color" className="w-32">
                    Text
                  </Label>
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      id="text-color"
                      type="color"
                      value={formData.textColor}
                      onChange={(e) =>
                        onUpdateColors({ textColor: e.target.value })
                      }
                      className="w-12 h-12 rounded cursor-pointer border border-border"
                    />
                    <Input
                      type="text"
                      value={formData.textColor}
                      onChange={(e) =>
                        onUpdateColors({ textColor: e.target.value })
                      }
                      className="flex-1"
                      placeholder="#3d3d3d"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Custom Message */}
          <div>
            <Label htmlFor="customMessage" className="text-base font-medium">
              Custom Message (Optional)
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Add a personal message to your invitation
            </p>
            <Textarea
              id="customMessage"
              placeholder="Together with their parents..."
              value={formData.customMessage || ''}
              onChange={(e) => onUpdate('customMessage', e.target.value)}
              rows={4}
              className="text-base resize-none"
            />
          </div>
        </div>
      </Card>

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
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8"
        >
          Add Guests
        </Button>
      </div>
    </div>
  );
}
