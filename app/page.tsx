'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, Share2, BarChart3, Mail, ArrowRight, Sun, Moon } from 'lucide-react'

export default function Home() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/50 selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="font-serif text-2xl font-bold text-primary">Happy Endings</div>
        <div className="hidden gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium text-foreground hover:text-primary">
            Features
          </Link>
          <Link href="#how" className="text-sm font-medium text-foreground hover:text-primary">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-foreground hover:text-primary">
            Testimonials
          </Link>
        </div>
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
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-sm">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="font-serif text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                  Create Beautiful Wedding Invitations & Collect RSVPs Effortlessly
                </h1>
                <p className="text-lg text-muted-foreground">
                  Design elegant digital invitations, track guest responses in real-time, and manage your guest list with ease. Everything you need for the perfect wedding celebration.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/templates">
                  <Button
                    size="lg"
                    className="font-medium rounded-full px-8 py-6 shadow-sm hover:shadow-md transition-all text-base w-full sm:w-auto group"
                  >
                    Create Your Invitation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-6 shadow-sm hover:shadow-md transition-all text-base w-full sm:w-auto bg-transparent border-border/80 hover:bg-accent/50"
                  >
                    View Templates
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative space-y-6">
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/invitation-preview.jpg"
                  alt="Elegant wedding invitation with ivory and blush design"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="px-4 py-24 sm:px-6 lg:px-8 bg-card border-y border-border/40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-4">
              Everything You Need for the Perfect Wedding
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Streamline your wedding planning with our powerful tools
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border border-border/60 bg-background p-8 text-center hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 rounded-3xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
                Custom Templates
              </h3>
              <p className="text-muted-foreground">
                Choose from our collection of elegant, professionally-designed wedding invitation templates
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="border border-border/60 bg-background p-8 text-center hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 rounded-3xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
                Easy RSVP Forms
              </h3>
              <p className="text-muted-foreground">
                Built-in RSVP functionality with meal preferences, plus-one options, and custom questions
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="border border-border/60 bg-background p-8 text-center hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 rounded-3xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
                Real-Time Tracking
              </h3>
              <p className="text-muted-foreground">
                View live guest list updates, attendance statistics, and meal preference breakdowns
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Three simple steps to your perfect wedding invitations
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-lg font-bold">
                1
              </div>
              <h3 className="font-serif text-2xl font-medium text-foreground">
                Choose a Template
              </h3>
              <p className="text-muted-foreground">
                Browse our curated collection of elegant wedding invitation templates and select your favorite design
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-lg font-bold">
                2
              </div>
              <h3 className="font-serif text-2xl font-medium text-foreground">
                Customize Your Invitation
              </h3>
              <p className="text-muted-foreground">
                Add your names, wedding date, venue details, and personal touches with our easy-to-use editor
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-lg font-bold">
                3
              </div>
              <h3 className="font-serif text-2xl font-medium text-foreground">
                Share & Track RSVPs
              </h3>
              <p className="text-muted-foreground">
                Generate a unique link, share with your guests, and watch RSVPs roll in with real-time updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-4 py-24 sm:px-6 lg:px-8 bg-accent/30 border-y border-border/40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-4">
              Loved by Happy Couples
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Join hundreds of couples who&apos;ve created the perfect invitations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <Card className="border border-border/60 bg-background p-8 rounded-3xl">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground">
                Happy Endings made creating our wedding invitations so easy! The templates are absolutely stunning and our guests loved the elegant design.
              </p>
              <div>
                <p className="font-serif font-bold text-foreground">Sarah & Michael</p>
                <p className="text-sm text-muted-foreground">Married June 2024</p>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="border border-border/60 bg-background p-8 rounded-3xl">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground">
                {"Tracking RSVPs was a breeze. We could see responses in real-time and organize our guest list without any hassle. Highly recommend!"}
              </p>
              <div>
                <p className="font-serif font-bold text-foreground">Jessica & David</p>
                <p className="text-sm text-muted-foreground">Married May 2024</p>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="border border-border/60 bg-background p-8 rounded-3xl">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground">
                {"The customization options were incredible. We felt like we created something truly personal for our special day."}
              </p>
              <div>
                <p className="font-serif font-bold text-foreground">Emily & James</p>
                <p className="text-sm text-muted-foreground">Married August 2024</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-6">
            Start Your Happy Ending Today
          </h2>
          <p className="mb-10 text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            Create your beautiful wedding invitations in minutes and collect RSVPs effortlessly
          </p>
          <Link href="/templates">
            <Button
              size="lg"
              className="font-medium rounded-full px-8 py-6 shadow-sm hover:shadow-md transition-all text-base group"
            >
              Create Your Invitation Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 mb-8">
            <div>
              <p className="font-serif text-lg font-bold text-foreground mb-4">Happy Endings</p>
              <p className="text-sm text-muted-foreground">
                Beautiful wedding invitations made simple
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-4">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/templates" className="hover:text-primary">Templates</Link></li>
                <li><Link href="/features" className="hover:text-primary">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-4">Company</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary">About</Link></li>
                <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-4">Legal</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              &copy; 2024 Happy Endings. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
