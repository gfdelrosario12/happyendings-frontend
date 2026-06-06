'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Not specified');
  const [age, setAge] = useState(25);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/auth/register', {
        name,
        gender,
        email,
        password,
        age: Number(age),
      });

      toast.success('Account created successfully! Please log in.');
      router.push('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-background px-4 py-8">
      <Card className="w-full max-w-md border-border bg-background shadow-xl">
        <div className="p-8 space-y-6">
          {/* Logo & Heading */}
          <div className="text-center space-y-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Happy Endings</h1>
            <p className="text-muted-foreground font-light">Create your wedding account to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="couple-names" className="text-foreground text-sm font-medium">
                Couple Name / Full Name
              </Label>
              <Input
                id="couple-names"
                placeholder="e.g., Sarah & Michael"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="gender" className="text-foreground text-sm font-medium">
                  Gender (Optional)
                </Label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Not specified">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="age" className="text-foreground text-sm font-medium">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="120"
                  required
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="border-border bg-background text-foreground"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-foreground text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-foreground text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirm-password" className="text-foreground text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 h-4 w-4 rounded border-border bg-background text-primary"
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground leading-snug">
                I agree to the{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-full mt-4"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full border-border text-foreground hover:bg-secondary/50 bg-transparent rounded-full"
              onClick={() => toast.info('OAuth integrations coming soon!')}
            >
              Sign up with Google
            </Button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
