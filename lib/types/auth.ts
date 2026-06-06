export type Role = 'ADMIN' | 'REGISTERED_USER';

export interface User {
  id: number;
  email: string;
  name?: string;
  gender?: string;
  age?: number;
  role: Role;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}