'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Heart, AlertCircle } from 'lucide-react';
import GuestRoute from '@/components/auth/GuestRoute';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { setStoredToken } from '@/lib/auth';
import { User } from '@/lib/types/auth';
import { toast } from 'sonner';

function LoginFormContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  useEffect(() => {
    if (redirect) {
      toast.warning('Authentication required. Please log in to access the requested page.');
    }
  }, [redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Authenticate user to get the JWT
      const response = await api.post<{ token: string }>('/auth/login', {
        email,
        password,
      });

      const token = response.token;
      if (!token) {
        throw new Error('No authentication token received.');
      }

      // Temporarily store the token in cookies/localStorage so the /me request is authorized
      setStoredToken(token);

      // 2. Fetch authenticated user details from /me
      const user = await api.get<User>('/auth/me');

      // 3. Hydrate state globally in AuthContext
      login(token, user);
      toast.success(`Welcome back, ${user.name || user.email}!`);

      // 4. Redirect based on user role or custom redirect query parameter
      if (redirect) {
        router.push(redirect);
      } else if (user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GuestRoute>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-background px-4">
        <Card className="w-full max-w-md border-border bg-background shadow-xl">
          <div className="p-8 space-y-8">
            {/* Logo & Heading */}
            <div className="text-center space-y-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Happy Endings</h1>
              <p className="text-muted-foreground font-light">Welcome back to your wedding planner</p>
            </div>

            {/* Redirection Warning Box */}
            {redirect && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>You need to log in to access the requested page.</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-full"
              >
                {isLoading ? 'Logging in...' : 'Log In'}
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
                Continue with Google
              </Button>
            </div>

            {/* Signup Link */}
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </GuestRoute>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground text-sm">
          Loading...
        </div>
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  );
}
