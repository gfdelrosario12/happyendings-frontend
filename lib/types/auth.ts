export type Role = 'USER' | 'ADMIN' | 'ORGANIZER';

export interface UserPayload {
  userId: string;
  email: string;
  role: Role;
  exp: number; // Expiration time
}

export interface AuthContextType {
  user: UserPayload | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}