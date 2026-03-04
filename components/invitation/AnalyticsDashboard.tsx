'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InvitationAnalytics } from '@/lib/types/invitation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Download, Search, Filter } from 'lucide-react';

interface AnalyticsDashboardProps {
  analytics: InvitationAnalytics | null;
  isLoading: boolean;
  onExport?: () => Promise<void>;
}

export function AnalyticsDashboard({
  analytics,
  isLoading,
  onExport,
}: AnalyticsDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredResponses = useMemo(() => {
    if (!analytics?.responses) return [];

    let filtered = analytics.responses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (response) =>
          response.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          response.guestEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((response) => response.rsvpStatus === filterStatus);
    }

    return filtered;
  }, [analytics?.responses, searchTerm, filterStatus]);

  if (isLoading || !analytics) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  // Chart data
  const statusChartData = [
    { name: 'Accepted', value: analytics.accepted, color: '#10b981' },
    { name: 'Declined', value: analytics.declined, color: '#ef4444' },
    { name: 'Maybe', value: analytics.pending, color: '#f59e0b' },
  ];

  const responseMetrics = [
    {
      label: 'Total Guests',
      value: analytics.totalGuests,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Responded',
      value: analytics.responded,
      color: 'bg-green-100 text-green-700',
    },
    {
      label: 'Pending',
      value: analytics.pending,
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      label: 'Response Rate',
      value: `${Math.round(analytics.responseRate * 100)}%`,
      color: 'bg-blue-100 text-blue-700',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {responseMetrics.map((metric) => (
          <Card key={metric.label} className="p-6 border-secondary/20">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {metric.label}
            </p>
            <p className={`text-3xl font-bold ${metric.color} p-2 rounded`}>
              {metric.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Response Overview */}
        <Card className="p-6 border-secondary/20">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Response Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-background)',
                  border: `1px solid var(--color-border)`,
                }}
              />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart - Response Distribution */}
        {statusChartData.some((item) => item.value > 0) && (
          <Card className="p-6 border-secondary/20 flex flex-col">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Response Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusChartData.filter((item) => item.value > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) =>
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusChartData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>

      {/* Guest Responses Table */}
      <Card className="p-6 border-secondary/20">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">Guest Responses</h3>
          {onExport && (
            <Button
              onClick={onExport}
              variant="outline"
              size="sm"
              className="gap-2 w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Responses</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
              <SelectItem value="maybe">Maybe</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dietary</TableHead>
                <TableHead>Responded</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResponses.length > 0 ? (
                filteredResponses.map((response) => (
                  <TableRow key={response.guestId}>
                    <TableCell className="font-medium">{response.guestName}</TableCell>
                    <TableCell className="text-sm">{response.guestEmail}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          response.rsvpStatus === 'accepted'
                            ? 'default'
                            : response.rsvpStatus === 'declined'
                              ? 'destructive'
                              : 'secondary'
                        }
                      >
                        {response.rsvpStatus === 'pending'
                          ? 'No Response'
                          : response.rsvpStatus.charAt(0).toUpperCase() +
                            response.rsvpStatus.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {response.dietaryRestrictions || '-'}
                    </TableCell>
                    <TableCell className="text-sm">
                      {response.respondedAt
                        ? new Date(response.respondedAt).toLocaleDateString()
                        : 'Pending'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No responses found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
