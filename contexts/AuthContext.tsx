'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { User, AuthContextType } from '@/lib/types/auth';
import { api } from '@/lib/api';
import {
  getStoredToken,
  setStoredToken,
  removeStoredToken,
  getStoredUser,
  setStoredUser,
  removeStoredUser,
} from '@/lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Hydrate authentication state on initial load
  useEffect(() => {
    async function hydrateAuth() {
      try {
        const storedToken = getStoredToken();
        const cachedUser = getStoredUser<User>();

        if (storedToken) {
          setTokenState(storedToken);
          if (cachedUser) {
            setUserState(cachedUser);
          }

          // Verify token against backend and fetch fresh user details
          try {
            const freshUser = await api.get<User>('/auth/me');
            setUserState(freshUser);
            setStoredUser(freshUser);
          } catch (err: any) {
            console.error('Failed to validate token on mount:', err.message);
            // If API reports 401 or network error, it will clean up token or throw
            if (err.status === 401) {
              handleCleanup();
            }
          }
        }
      } catch (err) {
        console.error('Auth hydration error:', err);
        handleCleanup();
      } finally {
        setLoading(false);
      }
    }

    hydrateAuth();

    // Listen for unauthorized events from the API client (auto-logout)
    const handleUnauthorized = () => {
      handleCleanup();
      router.push('/login');
    };

    window.addEventListener('auth-unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth-unauthorized', handleUnauthorized);
    };
  }, [router]);

  const handleCleanup = () => {
    setTokenState(null);
    setUserState(null);
    removeStoredToken();
    removeStoredUser();
  };

  const login = (newToken: string, newUser: User) => {
    setTokenState(newToken);
    setUserState(newUser);
    setStoredToken(newToken);
    setStoredUser(newUser);
  };

  const logout = async () => {
    try {
      // Best-effort backend call to log action (ignoring failure so client clean up still completes)
      await api.post('/auth/logout').catch(() => {});
    } finally {
      handleCleanup();
      router.push('/login');
    }
  };

  const updateUser = (updatedUser: User) => {
    setUserState(updatedUser);
    setStoredUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading: loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}