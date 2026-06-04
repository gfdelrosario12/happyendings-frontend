'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Search, Sun, Moon } from 'lucide-react'
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
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = document.documentElement.classList.contains('dark') || 
      (localStorage.getItem('theme') === 'dark') ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    setIsDark(isDarkMode)
    if (isDarkMode) document.documentElement.classList.add('dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle('dark', newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const filteredTemplates = templates.filter(template => {
    const categoryMatch = selectedCategory === 'All' || template.category === selectedCategory
    const themeMatch = selectedTheme === 'All' || template.theme === selectedTheme
    const searchMatch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && themeMatch && searchMatch
  })

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <Link href="/" className="font-serif text-2xl font-medium tracking-tight text-primary transition-opacity hover:opacity-80">
          Happy Endings
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full transition-transform hover:rotate-12">
            {mounted ? (isDark ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-muted-foreground hover:text-primary" />) : <div className="h-5 w-5" />}
          </Button>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="font-medium rounded-full px-6 shadow-sm">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24 bg-card border-b border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-subtle.svg')] opacity-[0.03] pointer-events-none"></div>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 lg:mb-12 relative z-10">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground mb-4 md:mb-6">
              Choose Your Perfect Invitation
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Browse our collection of elegant wedding invitation templates
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-3xl mx-auto mb-10 z-10">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/70" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-base md:text-lg border-border/80 bg-background/50 backdrop-blur-sm rounded-2xl shadow-sm focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:border-primary transition-all duration-300"
            />
          </div>

          {/* Filters */}
          <div className="space-y-6 max-w-3xl mx-auto z-10 relative">
            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground mb-3 uppercase">Style</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Badge
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-2 text-sm rounded-full transition-all duration-300 font-medium border ${
                      selectedCategory === cat
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm hover:bg-primary/90'
                        : 'bg-transparent border-border/80 text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground mb-3 uppercase">Color Palette</p>
              <div className="flex flex-wrap gap-2">
                {themes.map(theme => (
                  <Badge
                    key={theme}
                    variant={selectedTheme === theme ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-2 text-sm rounded-full transition-all duration-300 font-medium border ${
                      selectedTheme === theme
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm hover:bg-primary/90'
                        : 'bg-transparent border-border/80 text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20'
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
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          {filteredTemplates.length > 0 ? (
            <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map(template => (
                <Card
                  key={template.id}
                  className="border border-border/60 bg-card overflow-hidden rounded-3xl hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="mb-6 flex-1">
                      <h3 className="font-serif text-2xl font-medium tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {template.name}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed font-light">
                        {template.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 border-none font-medium px-3 py-1">
                        {template.category}
                      </Badge>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/80 border-none font-medium px-3 py-1">
                        {template.theme}
                      </Badge>
                    </div>

                    {/* CTA */}
                    <Link href={`/builder/${template.id}`} className="mt-auto block">
                      <Button
                        className="w-full font-medium rounded-xl py-6 shadow-sm group-hover:shadow-md transition-all duration-300"
                      >
                        Use This Template
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card rounded-3xl border border-border/50 border-dashed">
              <p className="text-xl text-muted-foreground font-light mb-4">No templates match your search criteria.</p>
              <Button variant="outline" onClick={() => { setSelectedCategory('All'); setSelectedTheme('All'); setSearchQuery(''); }} className="rounded-full">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-accent/30 border-t border-border/40">
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-6">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="mb-10 text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            Start with any template and customize every detail to match your unique wedding vision perfectly.
          </p>
          <Link href="/signup">
            <Button size="lg" className="font-medium rounded-full px-8 py-6 shadow-sm hover:shadow-md transition-all text-base">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
