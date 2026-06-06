'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains('dark') || 
      (localStorage.getItem('theme') === 'dark') ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkMode);
    if (isDarkMode) document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border/40 flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-serif text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
          Happy Endings
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full transition-transform hover:rotate-12">
          {mounted ? (isDark ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-muted-foreground hover:text-primary" />) : <div className="h-5 w-5" />}
        </Button>

        {!isLoading && (
          isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex text-sm text-muted-foreground">
                {user?.email}
              </span>
              {user?.role && (
                <span className="hidden md:inline-flex text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                  {user.role}
                </span>
              )}
              <Link href={user?.role === 'ADMIN' ? '/admin' : '/dashboard'}>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                  <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                </Button>
              </Link>
              <Button size="sm" onClick={logout} variant="outline" className="rounded-full px-4 shadow-sm border-border/80 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors">
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <>
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
            </>
          )
        )}
      </div>
    </nav>
  );
}