import { getStoredToken, removeStoredToken, removeStoredUser } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export class APIError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'APIError';
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers);

  // Automatically set application/json unless body is FormData
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Inject Bearer token if available
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let url = `${API_BASE_URL}${endpoint}`;
  if (options.params) {
    const searchParams = new URLSearchParams(options.params);
    url += `?${searchParams.toString()}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        removeStoredToken();
        removeStoredUser();
        // Dispatch event so the AuthProvider context can listen and reset state
        window.dispatchEvent(new Event('auth-unauthorized'));
      }
      throw new APIError('Session expired. Please log in again.', 401);
    }

    if (!response.ok) {
      let errorMessage = response.statusText;
      try {
        const errorData = await response.text();
        if (errorData) errorMessage = errorData;
      } catch (e) {
        // Ignore parsing errors
      }
      throw new APIError(errorMessage, response.status);
    }

    // Try parsing as JSON first, fallback to text
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json() as Promise<T>;
    }
    
    const textData = await response.text();
    return textData as unknown as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    console.error(`API Request failed for ${endpoint}:`, error);
    throw new APIError('Network error or server unavailable', 500);
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T>(endpoint: string, body?: any, options?: RequestOptions) => 
    request<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: body ? JSON.stringify(body) : undefined 
    }),
    
  put: <T>(endpoint: string, body?: any, options?: RequestOptions) => 
    request<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: body ? JSON.stringify(body) : undefined 
    }),
    
  delete: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
