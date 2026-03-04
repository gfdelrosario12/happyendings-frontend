'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  LogOut,
  Users,
  Check,
  Clock,
  X,
  Download,
  Edit,
  Share2,
  Settings,
} from 'lucide-react'

interface Guest {
  id: string
  name: string
  email: string
  status: 'attending' | 'not-attending' | 'pending'
  numGuests: number
  mealPreference?: string
  rsvpDate?: string
}

const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma@example.com',
    status: 'attending',
    numGuests: 2,
    mealPreference: 'Chicken',
    rsvpDate: '2024-03-20'
  },
  {
    id: '2',
    name: 'James Smith',
    email: 'james@example.com',
    status: 'attending',
    numGuests: 1,
    mealPreference: 'Fish',
    rsvpDate: '2024-03-18'
  },
  {
    id: '3',
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    status: 'pending',
    numGuests: 1,
    rsvpDate: undefined
  },
  {
    id: '4',
    name: 'Michael Brown',
    email: 'michael@example.com',
    status: 'not-attending',
    numGuests: 0,
    rsvpDate: '2024-03-15'
  },
  {
    id: '5',
    name: 'Lisa Wilson',
    email: 'lisa@example.com',
    status: 'attending',
    numGuests: 1,
    mealPreference: 'Vegetarian',
    rsvpDate: '2024-03-22'
  }
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [guestFilter, setGuestFilter] = useState<'all' | 'attending' | 'pending' | 'not-attending'>('all')

  // Calculate statistics
  const totalInvited = mockGuests.length
  const attending = mockGuests.filter(g => g.status === 'attending').length
  const notAttending = mockGuests.filter(g => g.status === 'not-attending').length
  const pending = mockGuests.filter(g => g.status === 'pending').length
  const totalGuests = mockGuests.reduce((sum, g) => sum + g.numGuests, 0)

  // Filter guests
  const filteredGuests = mockGuests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = guestFilter === 'all' || guest.status === guestFilter
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'attending':
        return 'text-green-600 bg-green-50'
      case 'not-attending':
        return 'text-red-600 bg-red-50'
      case 'pending':
        return 'text-amber-600 bg-amber-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'attending':
        return <Check className="h-4 w-4" />
      case 'not-attending':
        return <X className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="font-serif text-2xl font-bold text-primary">
                Happy Endings
              </Link>
              <p className="text-sm text-muted-foreground mt-1">Sarah & Michael&apos;s Wedding</p>
            </div>
            <div className="flex gap-4 items-center">
              <Button variant="outline" size="sm" className="border-border text-foreground bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground">
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Overview Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
            {/* Total Invited */}
            <Card className="border-border bg-background p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Invited</p>
                <p className="font-serif text-3xl font-bold text-foreground">{totalInvited}</p>
                <p className="text-xs text-muted-foreground">guests</p>
              </div>
            </Card>

            {/* Attending */}
            <Card className="border-border bg-background p-6 border-l-4 border-l-green-500">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Attending</p>
                <p className="font-serif text-3xl font-bold text-green-600">{attending}</p>
                <p className="text-xs text-muted-foreground">{Math.round((attending/totalInvited)*100)}% confirmed</p>
              </div>
            </Card>

            {/* Pending */}
            <Card className="border-border bg-background p-6 border-l-4 border-l-amber-500">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="font-serif text-3xl font-bold text-amber-600">{pending}</p>
                <p className="text-xs text-muted-foreground">awaiting response</p>
              </div>
            </Card>

            {/* Not Attending */}
            <Card className="border-border bg-background p-6 border-l-4 border-l-red-500">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Not Attending</p>
                <p className="font-serif text-3xl font-bold text-red-600">{notAttending}</p>
                <p className="text-xs text-muted-foreground">declined</p>
              </div>
            </Card>

            {/* Total Guests */}
            <Card className="border-border bg-background p-6 border-l-4 border-l-primary">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Guests</p>
                <p className="font-serif text-3xl font-bold text-primary">{totalGuests}</p>
                <p className="text-xs text-muted-foreground">including plus-ones</p>
              </div>
            </Card>
          </div>

          {/* Guest List Section */}
          <div className="space-y-6">
            {/* Header & Actions */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">Guest List</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage and track all your RSVPs</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-border text-foreground bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Invitation
                </Button>
              </div>
            </div>

            {/* Filters & Search */}
            <Card className="border-border bg-background p-6 space-y-4">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">Search</p>
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">Filter by Status</p>
                <div className="flex flex-wrap gap-2">
                  {['all', 'attending', 'pending', 'not-attending'].map(status => (
                    <button
                      key={status}
                      onClick={() => setGuestFilter(status as 'all' | 'attending' | 'pending' | 'not-attending')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        guestFilter === status
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary/50 text-foreground border border-border hover:bg-secondary'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Table */}
            <Card className="border-border bg-background overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-secondary/50 border-b border-border">
                    <TableRow>
                      <TableHead className="text-foreground font-semibold">Name</TableHead>
                      <TableHead className="text-foreground font-semibold">Email</TableHead>
                      <TableHead className="text-foreground font-semibold">Status</TableHead>
                      <TableHead className="text-foreground font-semibold text-center">Guests</TableHead>
                      <TableHead className="text-foreground font-semibold">Meal</TableHead>
                      <TableHead className="text-foreground font-semibold">RSVP Date</TableHead>
                      <TableHead className="text-foreground font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGuests.map(guest => (
                      <TableRow key={guest.id} className="border-b border-border hover:bg-secondary/30">
                        <TableCell className="font-medium text-foreground">{guest.name}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{guest.email}</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(guest.status)}`}>
                            {getStatusIcon(guest.status)}
                            {guest.status.charAt(0).toUpperCase() + guest.status.slice(1).replace('-', ' ')}
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-foreground font-semibold">
                          {guest.numGuests}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {guest.mealPreference || '—'}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {guest.rsvpDate ? new Date(guest.rsvpDate).toLocaleDateString() : '—'}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:bg-primary/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {filteredGuests.length === 0 && (
              <Card className="border-border bg-background p-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg mb-2">No guests found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
