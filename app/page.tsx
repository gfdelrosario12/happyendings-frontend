'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, Share2, BarChart3, Mail, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
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
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
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
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                  >
                    Create Your Invitation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary text-primary hover:bg-primary/5 bg-transparent"
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
      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8 bg-card">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Everything You Need for the Perfect Wedding
            </h2>
            <p className="text-lg text-muted-foreground">
              Streamline your wedding planning with our powerful tools
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border-border bg-background p-8 text-center hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Custom Templates
              </h3>
              <p className="text-muted-foreground">
                Choose from our collection of elegant, professionally-designed wedding invitation templates
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="border-border bg-background p-8 text-center hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                Easy RSVP Forms
              </h3>
              <p className="text-muted-foreground">
                Built-in RSVP functionality with meal preferences, plus-one options, and custom questions
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="border-border bg-background p-8 text-center hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
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
      <section id="how" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to your perfect wedding invitations
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-lg font-bold">
                1
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">
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
              <h3 className="font-serif text-2xl font-bold text-foreground">
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
              <h3 className="font-serif text-2xl font-bold text-foreground">
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
      <section id="testimonials" className="px-4 py-20 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Loved by Happy Couples
            </h2>
            <p className="text-lg text-muted-foreground">
              Join hundreds of couples who&apos;ve created the perfect invitations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <Card className="border-border bg-background p-8">
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
            <Card className="border-border bg-background p-8">
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
            <Card className="border-border bg-background p-8">
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
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-bold mb-4">
            Start Your Happy Ending Today
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Create your beautiful wedding invitations in minutes and collect RSVPs effortlessly
          </p>
          <Link href="/templates">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Create Your Invitation Now
              <ArrowRight className="ml-2 h-5 w-5" />
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
