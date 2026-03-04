'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const templates = [
  {
    id: 'classic',
    name: 'Classic Elegance',
    category: 'Classic',
    theme: 'Ivory & Gold',
    image: '/template-classic.jpg',
    description: 'Timeless and sophisticated wedding invitation'
  },
  {
    id: 'modern',
    name: 'Modern Minimal',
    category: 'Modern',
    theme: 'Blush & Cream',
    image: '/template-modern.jpg',
    description: 'Contemporary design with clean lines'
  },
  {
    id: 'floral',
    name: 'Romantic Florals',
    category: 'Floral',
    theme: 'Blush & Peach',
    image: '/template-floral.jpg',
    description: 'Beautiful floral accents and watercolor art'
  },
  {
    id: 'minimal',
    name: 'Pure Minimal',
    category: 'Minimal',
    theme: 'Ivory & Gold',
    image: '/template-minimal.jpg',
    description: 'Subtle elegance with ample whitespace'
  },
  {
    id: 'gold',
    name: 'Gold Luxe',
    category: 'Modern',
    theme: 'Gold & Ivory',
    image: '/template-gold.jpg',
    description: 'Art deco inspired with luxurious touches'
  },
  {
    id: 'romantic',
    name: 'Vintage Romance',
    category: 'Classic',
    theme: 'Rose & Gold',
    image: '/template-romantic.jpg',
    description: 'Vintage-inspired with timeless appeal'
  }
]

const categories = ['All', 'Classic', 'Modern', 'Floral', 'Minimal']
const themes = ['All', 'Ivory & Gold', 'Blush & Cream', 'Blush & Peach', 'Gold & Ivory', 'Rose & Gold']

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTheme, setSelectedTheme] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTemplates = templates.filter(template => {
    const categoryMatch = selectedCategory === 'All' || template.category === selectedCategory
    const themeMatch = selectedTheme === 'All' || template.theme === selectedTheme
    const searchMatch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && themeMatch && searchMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8 border-b border-border">
        <Link href="/" className="font-serif text-2xl font-bold text-primary">
          Happy Endings
        </Link>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-card">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              Choose Your Perfect Invitation
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse our collection of elegant wedding invitation templates
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border bg-background"
            />
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Style</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Badge
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    className={`cursor-pointer transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border-border text-foreground hover:bg-secondary/50'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Color Palette</p>
              <div className="flex flex-wrap gap-2">
                {themes.map(theme => (
                  <Badge
                    key={theme}
                    variant={selectedTheme === theme ? 'default' : 'outline'}
                    className={`cursor-pointer transition-colors ${
                      selectedTheme === theme
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border-border text-foreground hover:bg-secondary/50'
                    }`}
                    onClick={() => setSelectedTheme(theme)}
                  >
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {filteredTemplates.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map(template => (
                <Card
                  key={template.id}
                  className="border-border bg-background overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                        {template.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-secondary/50 text-foreground border-none">
                        {template.category}
                      </Badge>
                      <Badge variant="secondary" className="bg-secondary/50 text-foreground border-none">
                        {template.theme}
                      </Badge>
                    </div>

                    {/* CTA */}
                    <Link href={`/builder/${template.id}`}>
                      <Button
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Use This Template
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No templates match your search. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            All templates are fully customizable. Start with any template and make it your own.
          </p>
          <Link href="/signup">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
