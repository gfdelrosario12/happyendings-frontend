'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserAPI, UserAccount, ActionLog } from '@/lib/api/user';
import { 
  Users, 
  Settings, 
  ShieldCheck, 
  Activity, 
  FileText, 
  LogOut, 
  UserCheck, 
  Trash2,
  Calendar,
  Layers,
  UserX
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'settings' | 'logs'>('users');
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [logs, setLogs] = useState<ActionLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load live data from backend
  useEffect(() => {
    async function loadAdminData() {
      setIsLoading(true);
      try {
        const userList = await UserAPI.listUsers();
        setUsers(userList);
        const logList = await UserAPI.getAuditLogs();
        setLogs(logList);
      } catch (err) {
        console.error('Failed to load admin data:', err);
        toast.error('Failed to load system admin data');
      } finally {
        setIsLoading(false);
      }
    }
    loadAdminData();
  }, []);

  const handleToggleStatus = async (userId: number, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await UserAPI.changeUserStatus(userId, nextStatus);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, accountStatus: nextStatus } : u));
      toast.success(`User status changed to ${nextStatus}`);
    } catch (err) {
      console.error('Failed to update user status:', err);
      toast.error('Failed to update user status');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (confirm('Are you sure you want to suspend/delete this user?')) {
      try {
        await UserAPI.changeUserStatus(userId, 'DELETED');
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, accountStatus: 'DELETED' } : u));
        toast.success('User account marked as DELETED');
      } catch (err) {
        console.error('Failed to delete user:', err);
        toast.error('Failed to delete user');
      }
    }
  };

  const handleExportLogsCSV = () => {
    try {
      const headers = ['Timestamp', 'Action Type', 'Details', 'User ID'];
      const csvRows = [headers.join(',')];
      for (const log of logs) {
        const row = [
          JSON.stringify(new Date(log.timestamp).toLocaleString()),
          JSON.stringify(log.actionType || ''),
          JSON.stringify(log.details || ''),
          JSON.stringify(log.userId || '')
        ];
        csvRows.push(row.join(','));
      }
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('System action logs exported successfully.');
    } catch (error) {
      console.error('Failed to export responses:', error);
      toast.error('Failed to export responses');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background text-foreground">
      {/* Admin Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <span className="font-serif text-lg font-bold tracking-tight">Happy Endings <span className="text-primary text-xs font-sans align-super font-semibold px-2 py-0.5 rounded-full bg-primary/10 ml-1">Admin</span></span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline-block">
              Logged in as <strong className="text-foreground">{user?.email}</strong>
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-muted-foreground hover:text-foreground rounded-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Hero */}
        <div className="p-8 rounded-3xl border border-primary/10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-[0.05] pointer-events-none">
            <Layers className="h-48 w-48 text-primary" />
          </div>
          <div className="relative z-10 space-y-2 max-w-xl">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Administrator Dashboard
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed">
              Welcome back, {user?.name || 'Administrator'}. Manage site-wide users, oversee published wedding templates, inspect server action logs, and modify system settings.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-border/50 bg-background/50 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Total Users</p>
              <h3 className="text-2xl font-bold font-mono">{isLoading ? '...' : users.length}</h3>
            </div>
          </Card>

          <Card className="border border-border/50 bg-background/50 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">System Action Logs</p>
              <h3 className="text-2xl font-bold font-mono">{isLoading ? '...' : logs.length}</h3>
            </div>
          </Card>

          <Card className="border border-border/50 bg-background/50 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20 text-green-500">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Server Health</p>
              <h3 className="text-2xl font-bold font-mono text-green-500">99.9%</h3>
            </div>
          </Card>

          <Card className="border border-border/50 bg-background/50 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">System Role</p>
              <h3 className="text-2xl font-bold text-primary">{user?.role}</h3>
            </div>
          </Card>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-border/40 gap-4">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 relative -bottom-[2px] ${
              activeTab === 'users' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            User Accounts
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 relative -bottom-[2px] ${
              activeTab === 'logs' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Action Logs
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 relative -bottom-[2px] ${
              activeTab === 'settings' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            System Settings
          </button>
        </div>

        {/* Tab Contents */}
        <div className="min-h-[300px]">
          {isLoading ? (
            <Card className="p-12 text-center border-secondary/20">
              <p className="text-muted-foreground">Loading admin resources...</p>
            </Card>
          ) : activeTab === 'users' ? (
            <Card className="border border-border/50 bg-background/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-300">
              <div className="p-6 border-b border-border/40 flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold">Registered Accounts</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/40 bg-secondary/20 text-muted-foreground">
                      <th className="p-4 font-semibold">User</th>
                      <th className="p-4 font-semibold">Email</th>
                      <th className="p-4 font-semibold">Role</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-secondary/10 transition-colors">
                        <td className="p-4 font-medium">{u.name || `${u.firstName || ''} ${u.lastName || ''}`}</td>
                        <td className="p-4 text-muted-foreground">{u.email}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${
                            u.role === 'ADMIN' 
                              ? 'bg-purple-400/10 text-purple-400 ring-purple-400/20' 
                              : u.role === 'ORGANIZER'
                              ? 'bg-blue-400/10 text-blue-400 ring-blue-400/20'
                              : 'bg-emerald-400/10 text-emerald-400 ring-emerald-400/20'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                            <span className={`h-1.5 w-1.5 rounded-full ${u.accountStatus === 'ACTIVE' ? 'bg-green-500' : 'bg-amber-500'}`} />
                            {u.accountStatus}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleToggleStatus(u.id, u.accountStatus)}
                              title="Toggle Active/Suspended Status"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              {u.accountStatus === 'ACTIVE' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteUser(u.id)}
                              title="Suspend and delete user account"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : activeTab === 'logs' ? (
            <Card className="border border-border/50 bg-background/40 backdrop-blur-md rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold">System Action Logs</h3>
                <Button variant="outline" size="sm" onClick={handleExportLogsCSV} className="rounded-full">Export CSV</Button>
              </div>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {logs.map((log, index) => (
                  <div key={log.id || index} className="flex gap-4 p-4 rounded-xl bg-secondary/20 border border-border/20 items-start">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mt-0.5 shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</span>
                        <span className="text-xs font-mono uppercase bg-background px-1.5 py-0.5 rounded border border-border/40">{log.actionType}</span>
                      </div>
                      <p className="text-sm text-foreground">{log.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="border border-border/50 bg-background/40 backdrop-blur-md rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <h3 className="font-serif text-lg font-bold">Global Application Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-background/50">
                  <div>
                    <h4 className="text-sm font-semibold">Allow Public Registrations</h4>
                    <p className="text-xs text-muted-foreground">New couples can register accounts from the landing page</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer">
                    <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-background transition-transform" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-background/50">
                  <div>
                    <h4 className="text-sm font-semibold">Enable Invitation Template Limits</h4>
                    <p className="text-xs text-muted-foreground">Restrict free-tier accounts to one active invitation</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-secondary/80 relative cursor-pointer">
                    <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background transition-transform" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-border/30 bg-background/50">
                  <div>
                    <h4 className="text-sm font-semibold">Maintenance Mode</h4>
                    <p className="text-xs text-muted-foreground">Show temporary maintenance page to public users</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-secondary/80 relative cursor-pointer">
                    <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background transition-transform" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/40 flex justify-end gap-4">
                <Button variant="ghost" className="rounded-full">Discard Changes</Button>
                <Button className="rounded-full bg-primary hover:bg-primary/90">Save Settings</Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
