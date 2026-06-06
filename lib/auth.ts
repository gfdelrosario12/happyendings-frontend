// Helper utilities for managing authentication tokens and user state

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

/**
 * Sets a client-side cookie
 */
export function setCookie(name: string, value: string, days = 7) {
  if (typeof window === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `; expires=${date.toUTCString()}`;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax${secure}`;
}

/**
 * Retrieves a client-side cookie
 */
export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Deletes a client-side cookie
 */
export function deleteCookie(name: string) {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure`;
}

/**
 * Gets the JWT token from cookies or localStorage
 */
export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return getCookie(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
}

/**
 * Stores the JWT token in cookies and localStorage
 */
export function setStoredToken(token: string) {
  if (typeof window === 'undefined') return;
  setCookie(TOKEN_KEY, token, 7);
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Removes the JWT token
 */
export function removeStoredToken() {
  if (typeof window === 'undefined') return;
  deleteCookie(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Gets the cached User object from localStorage
 */
export function getStoredUser<T>(): T | null {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;
  try {
    return JSON.parse(userJson) as T;
  } catch (e) {
    console.error('Failed to parse stored user:', e);
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

/**
 * Stores the User object in localStorage
 */
export function setStoredUser(user: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Removes the User object
 */
export function removeStoredUser() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_KEY);
}

/**
 * Parses JWT token without verifying signature (client-side only utility)
 */
export function decodeJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
}
