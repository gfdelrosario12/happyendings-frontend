import { api } from '@/lib/api';

export interface UserAccount {
  id: number;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePhoto?: string;
  role: string;
  accountStatus: string;
}

export interface ActionLog {
  id: number;
  userId?: number;
  actionType: string;
  details: string;
  timestamp: string;
}

export class UserAPI {
  static async listUsers(): Promise<UserAccount[]> {
    return api.get<UserAccount[]>('/users');
  }

  static async changeUserStatus(userId: number, status: 'ACTIVE' | 'SUSPENDED' | 'DELETED'): Promise<string> {
    return api.put<string>(`/users/${userId}/status`, { status });
  }

  static async getAuditLogs(): Promise<ActionLog[]> {
    return api.get<ActionLog[]>('/users/audit-logs');
  }
}
