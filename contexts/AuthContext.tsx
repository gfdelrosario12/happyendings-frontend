'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

export type Role = 'USER' | 'ADMIN' | 'ORGANIZER'

export type User = {
  id: string
  email: string
  name?: string
  role: Role
}

type AuthContextType = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  isLoading: boolean
  login: (data: { token: string; user: User }) => void
  logout: () => void
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Hydrate auth state on load
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY)
      const storedUser = localStorage.getItem(USER_KEY)

      if (storedToken && storedUser) {
        setToken(storedToken)
        setUserState(JSON.parse(storedUser))
      }
    } catch (err) {
      console.error('Auth hydration failed:', err)
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = ({ token, user }: { token: string; user: User }) => {
    setToken(token)
    setUserState(user)

    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  const logout = () => {
    setToken(null)
    setUserState(null)

    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  const setUser = (user: User | null) => {
    setUserState(user)

    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    isLoading: loading,
    login,
    logout,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}