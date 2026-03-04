# 💒 Happy Endings - Wedding Invitation & RSVP Platform

<div align="center">

**A beautifully designed, fully functional wedding invitation management system built with Next.js 16**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Architecture](#-system-architecture)

</div>

---

## 📖 Table of Contents

- [Project Brief](#-project-brief)
- [System Overview & Architecture](#-system-overview--architecture)
- [Key Features](#-key-features)
- [Quick Start](#-quick-start)
- [Technology Stack](#-technology-stack)
- [Documentation](#-comprehensive-documentation)
  - [Setup & Configuration](#1-setup--configuration-guide)
  - [Feature Documentation](#2-feature-documentation)
  - [API Specification](#3-api-specification)
  - [Developer Guide](#4-developer-guide)
- [Deployment](#-deployment)
- [Support](#-support)

---

## 🎯 Project Brief

**Happy Endings** is a comprehensive wedding invitation and RSVP management platform that empowers couples and wedding coordinators to:

- **Create** beautiful, customizable wedding invitations
- **Manage** guest lists with ease (CSV upload or manual entry)
- **Generate** unique RSVP links for each guest
- **Track** responses in real-time with analytics
- **Export** guest data for event planning

### The Problem
Planning a wedding involves managing hundreds of details, with guest RSVPs being one of the most time-consuming tasks. Traditional methods (paper invitations, email chains, phone calls) are inefficient and prone to errors.

### Our Solution
A modern, digital-first platform that streamlines the entire invitation and RSVP process from creation to tracking, saving couples dozens of hours and reducing stress during wedding planning.

### Target Users
- **Couples** planning their wedding
- **Wedding Coordinators** managing multiple events
- **Event Planners** seeking efficient RSVP management
- **Guests** receiving beautiful, easy-to-respond invitations

---

## 🏗️ System Overview & Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Layer                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Next.js 16 (App Router)                      │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │  Pages       │  │  Components  │  │  Hooks      │ │ │
│  │  │  - Create    │  │  - Steps     │  │  - Form     │ │ │
│  │  │  - RSVP      │  │  - Analytics │  │  - State    │ │ │
│  │  │  - Dashboard │  │  - Forms     │  │             │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  │                                                        │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  API Client (InvitationAPI)                      │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      Backend Layer                           │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Spring Boot REST API                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │  Controllers │  │  Services    │  │  Entities   │ │ │
│  │  │  - Invitation│  │  - Business  │  │  - Models   │ │ │
│  │  │  - Guest     │  │    Logic     │  │  - DTOs     │ │ │
│  │  │  - RSVP      │  │  - Validation│  │             │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  │                                                        │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  Spring Data JPA                                 │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ JPA/Hibernate
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    Database Layer                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                 PostgreSQL                             │ │
│  │  Tables: invitations, guests, rsvp_responses          │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Key Workflows

#### 1. Invitation Creation Flow
```
Admin Login → Create Invitation
              ↓
        Event Details (Step 1)
              ↓
        Customization (Step 2)
              ↓
        Guest List (Step 3)
              ↓
        Preview & Publish (Step 4)
              ↓
        Generate Unique Links
              ↓
        Share with Guests
```

#### 2. Guest RSVP Flow
```
Guest Receives Link → Click Link
                      ↓
                View Invitation
                      ↓
                Fill RSVP Form
                      ↓
                Submit Response
                      ↓
          Backend Saves Response
                      ↓
          Confirmation Displayed
                      ↓
          Admin Sees in Analytics
```

#### 3. Analytics Flow
```
Admin → View Invitations
        ↓
    Click Analytics
        ↓
    Load Dashboard
        ↓
    Display Metrics & Charts
        ↓
    Export to CSV (optional)
```

### Project Structure

```
frontend/
├── app/                              # Next.js App Router
│   ├── create-invitation/            # 4-step invitation builder
│   │   └── page.tsx                  # Main creation page
│   ├── invitations/                  # Invitations dashboard
│   │   └── page.tsx                  # List & manage invitations
│   ├── rsvp/
│   │   └── [invitationId]/
│   │       └── [guestId]/
│   │           └── page.tsx          # Guest RSVP page
│   ├── layout.tsx                    # Root layout with metadata
│   ├── page.tsx                      # Landing page
│   └── globals.css                   # Design system & tokens
│
├── components/
│   ├── invitation/                   # Business logic components
│   │   ├── EventDetailsStep.tsx     # Step 1: Event details form
│   │   ├── CustomizationStep.tsx    # Step 2: Design customization
│   │   ├── GuestListStep.tsx        # Step 3: Guest management
│   │   ├── PreviewPublishStep.tsx   # Step 4: Preview & publish
│   │   ├── AnalyticsDashboard.tsx   # Analytics with charts
│   │   └── GuestRSVPForm.tsx        # Guest response form
│   └── ui/                           # Shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── [20+ more components]
│
├── hooks/
│   └── useInvitationForm.ts          # Form state management hook
│
├── lib/
│   ├── api/
│   │   └── invitation.ts             # API client wrapper
│   ├── types/
│   │   └── invitation.ts             # TypeScript interfaces
│   └── utils/
│       └── csvParser.ts              # CSV parsing utilities
│
└── public/                           # Static assets
    ├── template-classic.jpg
    ├── template-modern.jpg
    └── [template images]
```

---

## ✨ Key Features

### 🎨 **Invitation Creator**
- **4-Step Guided Process**: Intuitive wizard from event details to publishing
- **6 Premium Templates**: Classic, Modern, Floral, Minimal, Gold, Romantic
- **Full Customization**: Colors (background, accent, text), fonts, custom messages
- **Live Preview**: See changes in real-time before publishing
- **Draft Saving**: Auto-save progress to continue later

### 📋 **Guest Management**
- **CSV Import**: Bulk upload up to 500+ guests with validation
- **Manual Entry**: Add guests individually with full details
- **Edit/Delete**: Full CRUD operations on guest list
- **Smart Validation**: Email format checking and duplicate detection
- **Template Download**: Pre-formatted CSV template for easy import
- **Export**: Download current guest list anytime

### 🔗 **Unique Guest Links**
- **Automatic Generation**: UUID-based secure, unique links
- **Format**: `/rsvp/[invitationId]/[guestId]`
- **Easy Sharing**: Copy-to-clipboard functionality per guest
- **Bulk Export**: Download all links in one CSV file
- **No Authentication**: Public links for easy guest access

### 📊 **Analytics Dashboard**
- **Real-time Tracking**: See responses as they arrive
- **Visual Charts**: 
  - Bar chart: Response breakdown
  - Pie chart: Status distribution
- **Response Metrics**: 
  - Total guests invited
  - Responded count
  - Pending count
  - Response rate percentage
- **Guest Table**: 
  - Search by name/email
  - Filter by RSVP status
  - Sort by any column
- **CSV Export**: Download all response data

### 🎯 **Guest RSVP Form**
- **Beautiful Design**: Mobile-responsive, elegant UI matching invitation style
- **Simple Process**: 
  - Attendance status (Accept/Decline/Maybe)
  - Dietary restrictions
  - Plus-one details
  - Personal message for couple
- **Confirmation**: Thank you page with response summary
- **No Account Needed**: Public access via unique link

### 🎨 **Design System**
- **Romantic Color Palette**: 
  - Ivory (#f5f1ee) - Background
  - Blush Pink (#e8d5cc) - Secondary
  - Champagne Gold (#d4a574) - Primary accent
  - Warm Gray (#3d3d3d) - Text
- **Typography**: 
  - Playfair Display (serif) for headings
  - Geist (sans-serif) for body text
- **Responsive**: Mobile-first, tablet-optimized, desktop-enhanced
- **Accessibility**: WCAG AA compliant color contrast

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn**
- Spring Boot backend (optional for frontend development)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local

# 4. Run development server
npm run dev
```

Visit **http://localhost:3000** in your browser.

### Development Commands

```bash
npm run dev        # Start development server on port 3000
npm run build      # Build for production
npm run start      # Run production build
npm run lint       # Run ESLint with auto-fix
```

### Environment Variables

Create `.env.local` file in the project root:

```env
# Backend API URL (required)
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Optional: Analytics tracking
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

---

## 🛠️ Technology Stack

### Frontend Core
| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with App Router | 16.0.10 |
| **React** | UI library | 19.2.0 |
| **TypeScript** | Type safety & developer experience | 5.x |
| **Tailwind CSS** | Utility-first styling | 4.1.9 |

### UI & Components
| Technology | Purpose | Version |
|------------|---------|---------|
| **Shadcn/ui** | Component library | Latest |
| **Radix UI** | Unstyled accessible components | Various |
| **Lucide React** | Icon library | 0.454.0 |
| **Recharts** | Data visualization & charts | 2.15.4 |

### Form & Data
| Technology | Purpose | Version |
|------------|---------|---------|
| **React Hook Form** | Form state management | 7.60.0 |
| **Zod** | Schema validation | 3.25.76 |
| **date-fns** | Date manipulation | 4.1.0 |

### Development Tools
| Technology | Purpose | Version |
|------------|---------|---------|
| **ESLint** | Code linting | 9.33.0 |
| **PostCSS** | CSS processing | 8.5.x |
| **Vercel Analytics** | Performance monitoring | 1.3.1 |

### Backend (To Be Implemented)
- **Spring Boot** 3.x - RESTful API
- **PostgreSQL** 14+ - Database
- **Spring Data JPA** - ORM
- **Spring Security** - Authentication (future)

---

## 📚 Comprehensive Documentation

### 1. Setup & Configuration Guide

#### Initial Setup

**Step 1: Clone and Install**
```bash
git clone <repository-url>
cd frontend
npm install
```

**Step 2: Environment Configuration**
```bash
# Create environment file
cp .env.example .env.local

# Edit with your settings
nano .env.local
```

**Step 3: Start Development**
```bash
npm run dev
```

#### Configuration Files

**`next.config.ts`** - Next.js configuration
```typescript
const nextConfig = {
  images: {
    domains: ['yourdomain.com'],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
```

**`app/globals.css`** - Design tokens
```css
:root {
  /* Colors */
  --primary: oklch(0.64 0.12 45);     /* Champagne Gold */
  --secondary: oklch(0.92 0.04 20);   /* Blush Pink */
  --background: oklch(0.98 0.01 60);  /* Ivory */
  --foreground: oklch(0.29 0.01 60);  /* Warm Gray */
  --accent: oklch(0.64 0.12 45);      /* Gold accent */
  
  /* Spacing */
  --radius: 0.5rem;
}
```

#### Component Integration

**Using the Form Hook**
```typescript
'use client';

import { useInvitationForm } from '@/hooks/useInvitationForm';

export default function MyPage() {
  const {
    formData,           // Current form state
    currentStep,        // Current wizard step
    isLoading,          // Loading state
    error,              // Error message
    successMessage,     // Success message
    updateField,        // Update single field
    updateColors,       // Update color scheme
    addGuest,           // Add guest to list
    removeGuest,        // Remove guest
    addGuestsFromCSV,   // Bulk import from CSV
    nextStep,           // Navigate to next step
    previousStep,       // Navigate to previous step
    publishInvitation,  // Publish and send to backend
    saveDraft,          // Save progress locally
    loadDraft,          // Load saved draft
    setCurrentStep,     // Jump to specific step
  } = useInvitationForm();

  return (/* Your component JSX */);
}
```

**Making API Calls**
```typescript
import { InvitationAPI } from '@/lib/api/invitation';

// Publish invitation
try {
  const result = await InvitationAPI.publishInvitation(payload);
  console.log('Published:', result);
} catch (error) {
  console.error('Failed to publish:', error);
}

// Get analytics
const analytics = await InvitationAPI.getInvitationAnalytics(invitationId);

// Submit RSVP
await InvitationAPI.submitRSVP(invitationId, guestId, {
  rsvpStatus: 'accepted',
  dietaryRestrictions: 'Vegetarian',
  plusOne: 'Jane Doe',
  message: 'Excited to attend!'
});
```

**CSV Operations**
```typescript
import { CSVParser } from '@/lib/utils/csvParser';

// Parse uploaded CSV file
const handleFileUpload = async (file: File) => {
  try {
    const guests = await CSVParser.parseGuestListCSV(file);
    onAddGuestsFromCSV(guests);
  } catch (error) {
    console.error('CSV parse error:', error);
  }
};

// Export guests to CSV
const exportGuests = () => {
  const csv = CSVParser.convertGuestsToCSV(guests);
  CSVParser.downloadCSV(csv, 'guest-list.csv');
};

// Download CSV template
const downloadTemplate = () => {
  const template = CSVParser.generateCSVTemplate();
  CSVParser.downloadCSV(template, 'guest-list-template.csv');
};
```

#### Customization Guide

**Adding New Templates**

1. Add template image to `/public/`
```bash
# Add your template image
cp my-template.jpg public/template-elegant.jpg
```

2. Update template list in `CustomizationStep.tsx`
```typescript
const TEMPLATES = [
  // ... existing templates
  { 
    id: 'elegant', 
    name: 'Elegant', 
    image: '/template-elegant.jpg' 
  },
];
```

3. Update TypeScript types if needed
```typescript
// In /lib/types/invitation.ts
type TemplateId = 'classic' | 'modern' | 'floral' | 'minimal' | 'gold' | 'romantic' | 'elegant';
```

**Modifying Color Scheme**

Edit design tokens in `app/globals.css`:
```css
:root {
  --primary: oklch(0.70 0.15 50);      /* Your new primary color */
  --secondary: oklch(0.90 0.05 180);   /* Your new secondary color */
  --accent: oklch(0.65 0.18 45);       /* Your new accent color */
}
```

**Adding Form Fields**

1. **Update Type Definition** (`/lib/types/invitation.ts`):
```typescript
export interface InvitationFormData {
  // ... existing fields
  dresscode: string;
  giftRegistry: string;
}
```

2. **Update Initial State** (`/hooks/useInvitationForm.ts`):
```typescript
const INITIAL_FORM_STATE: InvitationFormData = {
  // ... existing
  dresscode: '',
  giftRegistry: '',
};
```

3. **Add Input Field** (in relevant step component):
```typescript
<div>
  <Label htmlFor="dresscode">Dress Code</Label>
  <Input
    id="dresscode"
    value={formData.dresscode}
    onChange={(e) => onUpdate('dresscode', e.target.value)}
  />
</div>
```

#### Troubleshooting

**API Connection Issues**

```bash
# Test backend connectivity
curl http://localhost:8080/api/invitations

# Check CORS settings
# Ensure backend allows origin: http://localhost:3000

# Verify environment variable
echo $NEXT_PUBLIC_API_URL
```

**CSV Parse Errors**

Common issues and solutions:
- **Special characters**: Ensure proper CSV escaping
- **Invalid emails**: Check email format validation
- **Missing headers**: CSV must have header row
- **Encoding issues**: Save CSV as UTF-8

Expected CSV format:
```csv
Name,Email,Phone,Group,DietaryRestrictions,Notes
John Doe,john@example.com,+1234567890,Family,Vegetarian,Plus one: Jane
```

**Draft Not Saving**

Check these common issues:
- Browser localStorage is enabled
- Not in private/incognito mode
- Storage quota not exceeded
- Check browser console for errors

**Build Errors**

```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

---

### 2. Feature Documentation

#### Feature 1: Invitation Creation

**Step 1: Event Details**

**Fields:**
- **Couple's Names** (required)
  - Example: "Emma & James" or "Sarah Johnson & Michael Chen"
  - Max 100 characters

- **Event Date** (required)
  - Date picker or manual entry
  - Must be future date
  - ISO format: YYYY-MM-DD

- **Event Time** (required)
  - Format: HH:MM (24-hour)
  - Example: "18:00" for 6:00 PM

- **Event Location** (required)
  - City and state/country
  - Example: "San Francisco, California"
  - Max 100 characters

- **Event Venue** (required)
  - Venue name and address
  - Example: "The Grand Ballroom, 123 Main Street"
  - Max 200 characters

- **Event Description** (optional)
  - Additional details
  - Example: "Black-tie optional. Reception to follow."
  - Max 500 characters

**Validation:**
- All required fields must be filled
- Date cannot be in the past
- Email-like format for location (city, state)

**Step 2: Design Customization**

**Template Selection:**
Choose from 6 pre-designed templates:

1. **Classic** - Traditional elegant serif design
2. **Modern** - Clean minimalist sans-serif
3. **Floral** - Romantic with botanical elements
4. **Minimal** - Ultra-simple aesthetic
5. **Gold** - Luxurious with gold accents
6. **Romantic** - Vintage-inspired script

**Color Customization:**
- **Background Color**: Default #f5f1ee (Ivory)
- **Accent Color**: Default #d4a574 (Champagne Gold)
- **Text Color**: Default #3d3d3d (Warm Gray)
- Use color picker or enter hex codes manually

**Font Style:**
- Classic Serif (Playfair Display)
- Modern Sans-Serif (Geist)
- Romantic Script

**Custom Message:**
- Optional personal message
- Appears on invitation
- Max 500 characters
- Example: "Together with our families, we invite you to celebrate our wedding"

**Step 3: Guest List Management**

**CSV Upload:**

Download template:
```csv
Name,Email,Phone,Group,DietaryRestrictions,Notes
John Doe,john@example.com,+1234567890,Family,Vegetarian,Plus one: Jane
Sarah Smith,sarah@example.com,+1987654321,Friends,,Table 5
```

Features:
- Bulk import up to 500 guests
- Automatic email validation
- Duplicate detection
- Error highlighting

**Manual Guest Addition:**

Fields per guest:
- **Name** (required)
- **Email** (required, validated)
- **Phone** (optional)
- **Group/Table** (optional)
- **Dietary Restrictions** (optional)
- **Notes** (optional)

**Guest Management:**
- View all guests in table
- Edit guest details inline
- Delete individual guests
- Search by name or email
- Export current list to CSV

**Step 4: Preview & Publish**

**Preview Section:**
- See invitation as guests will view it
- Colors, fonts, and layout applied
- Event details displayed
- Custom message shown

**Summary Section:**
- Event details recap
- Template and colors used
- Guest count
- Total invited

**Actions:**
- **Save as Draft**: Save progress to localStorage
- **Publish**: Send to backend and generate links

**After Publishing:**
- Display success message
- Show main invitation link
- List all guest links with emails
- Copy-to-clipboard for each link
- Bulk export option

#### Feature 2: Guest RSVP Experience

**Access:**
- Unique URL per guest: `/rsvp/[invitationId]/[guestId]`
- No login required
- Direct access via link

**Invitation Preview:**
- Beautiful header with couple names
- Event date and time prominently displayed
- Venue information
- Custom message
- Styled with invitation colors

**RSVP Form:**

**1. Attendance Status** (Required)
Three clear options:
- ✅ "I can't wait! I'm attending"
- ❌ "I'm sorry, I won't be able to attend"
- ⏰ "I'm still deciding"

**2. Dietary Restrictions** (Optional, shown if attending)
- Free-text field
- Examples provided
- Common: Vegetarian, Vegan, Gluten-free, Kosher, Halal, None

**3. Plus One** (Optional, shown if attending)
- Guest name field
- For bringing additional person
- Example: "Jane Doe"

**4. Personal Message** (Optional)
- Message for the couple
- Textarea for longer messages
- Example: "Congratulations! Can't wait to celebrate with you!"

**Submission:**
- Real-time validation
- Loading state during submission
- Success confirmation
- Error handling with retry

**Confirmation Page:**
- Thank you message
- Summary of submitted response
- "Looking forward to seeing you!" message
- No further action needed

#### Feature 3: Analytics Dashboard

**Access:**
- From invitations list page
- Click "Analytics" button on invitation
- Opens modal or full-page dashboard

**Metrics Overview:**

Four key metric cards:

1. **Total Guests**
   - Count of all invited guests
   - Large number display
   - Icon: Users

2. **Responded**
   - Number who have responded
   - Percentage of total
   - Icon: Check

3. **Pending**
   - Awaiting response
   - Visual indicator
   - Icon: Clock

4. **Response Rate**
   - Percentage responded
   - Progress bar
   - Color-coded (green > 70%)

**Visualizations:**

**Bar Chart:**
- X-axis: Response types (Accepted, Declined, Maybe)
- Y-axis: Count
- Color-coded bars
- Hover for exact numbers

**Pie Chart:**
- Response distribution
- Percentage labels
- Color legend
- Interactive segments

**Guest Response Table:**

Columns:
- Guest Name
- Email
- RSVP Status (badge with color)
- Dietary Restrictions
- Response Date & Time

Features:
- **Search**: Filter by name or email
- **Filter**: Show only specific status
- **Sort**: Click column headers
- **Pagination**: 10, 25, 50, or 100 per page
- **Export**: Download as CSV

**Real-time Updates:**
- Dashboard refreshes automatically
- New responses appear immediately
- Metrics update live
- No manual refresh needed

**Export Options:**

CSV includes:
- All guest information
- RSVP status
- Dietary restrictions
- Plus-one details
- Messages
- Response timestamps

#### Feature 4: Data Export

**Guest List Export:**

When: Before publishing
Format:
```csv
Name,Email,Phone,Group,Dietary Restrictions,Notes
```

**Guest Links Export:**

When: After publishing
Format:
```csv
Guest Email,Guest Name,RSVP Link
john@example.com,John Doe,https://domain.com/rsvp/inv-123/guest-456
```

**Response Export:**

When: After receiving RSVPs
Format:
```csv
Guest Name,Email,RSVP Status,Dietary,Plus One,Message,Responded At
```

**Use Cases:**
- **Seating arrangements**: Use guest groups
- **Catering**: Count meals by dietary restrictions
- **Follow-up**: Contact non-responders
- **Budget**: Calculate costs based on acceptances

---

### 3. API Specification

#### Base Configuration

```
Base URL: http://localhost:8080/api
Content-Type: application/json
Authentication: None (to be implemented)
CORS: Enabled for frontend origin
```

#### Endpoints Reference

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/invitations/publish` | Create and publish invitation | ⏳ |
| GET | `/invitations` | List all invitations | ⏳ |
| GET | `/invitations/{id}` | Get invitation details | ⏳ |
| GET | `/invitations/{id}/analytics` | Get RSVP analytics | ⏳ |
| DELETE | `/invitations/{id}` | Delete invitation | ⏳ |
| GET | `/invitations/{id}/export/csv` | Export responses | ⏳ |
| GET | `/invitations/{invId}/guests/{gId}` | Get guest invitation | - |
| POST | `/invitations/{invId}/guests/{gId}/rsvp` | Submit RSVP | - |
| PUT | `/invitations/{invId}/guests/{gId}` | Update guest | ⏳ |

*⏳ = Authentication required (to be implemented)*

#### Detailed Endpoint Documentation

**1. Publish Invitation**

```http
POST /api/invitations/publish
Content-Type: application/json
```

**Request Body:**
```json
{
  "coupleName": "Emma & James",
  "eventDate": "2024-06-15",
  "eventTime": "18:00",
  "eventLocation": "San Francisco, California",
  "eventVenue": "The Grand Ballroom, 123 Main Street",
  "eventDescription": "Black-tie optional. Dinner and dancing to follow.",
  "templateId": "classic",
  "backgroundColor": "#f5f1ee",
  "accentColor": "#d4a574",
  "textColor": "#3d3d3d",
  "fontStyle": "classic",
  "customMessage": "Together with our families, we invite you...",
  "status": "published",
  "guests": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "group": "Family",
      "dietaryRestrictions": "Vegetarian",
      "notes": "Plus one: Jane"
    }
  ]
}
```

**Success Response:** `201 Created`
```json
{
  "id": "inv-1703001234567-abc123",
  "coupleName": "Emma & James",
  "eventDate": "2024-06-15",
  "eventTime": "18:00",
  "eventLocation": "San Francisco, California",
  "eventVenue": "The Grand Ballroom, 123 Main Street",
  "status": "published",
  "createdAt": "2024-03-05T10:00:00Z",
  "updatedAt": "2024-03-05T10:00:00Z",
  "invitationLink": "https://happyendings.com/invitations/inv-1703001234567-abc123",
  "guestLinks": [
    {
      "guestId": "guest-1703001234568-xyz",
      "guestEmail": "john@example.com",
      "guestName": "John Doe",
      "invitationId": "inv-1703001234567-abc123",
      "guestLink": "https://happyendings.com/rsvp/inv-1703001234567-abc123/guest-1703001234568-xyz",
      "status": "pending",
      "rsvpStatus": null,
      "respondedAt": null
    }
  ]
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "eventDate": "Event date must be in the future",
    "guests[0].email": "Invalid email format"
  }
}
```

**2. List Invitations**

```http
GET /api/invitations
```

**Query Parameters:**
- `status` (optional): Filter by status (draft, published)
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 20)

**Success Response:** `200 OK`
```json
{
  "content": [
    {
      "id": "inv-1703001234567-abc123",
      "coupleName": "Emma & James",
      "eventDate": "2024-06-15",
      "eventTime": "18:00",
      "status": "published",
      "totalGuests": 50,
      "respondedGuests": 35,
      "createdAt": "2024-03-05T10:00:00Z"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

**3. Get Invitation Details**

```http
GET /api/invitations/{id}
```

**Success Response:** `200 OK`
```json
{
  "id": "inv-1703001234567-abc123",
  "coupleName": "Emma & James",
  "eventDate": "2024-06-15",
  "eventTime": "18:00",
  "eventLocation": "San Francisco, California",
  "eventVenue": "The Grand Ballroom",
  "eventDescription": "Black-tie optional",
  "templateId": "classic",
  "backgroundColor": "#f5f1ee",
  "accentColor": "#d4a574",
  "textColor": "#3d3d3d",
  "fontStyle": "classic",
  "customMessage": "Together with our families...",
  "status": "published",
  "createdAt": "2024-03-05T10:00:00Z",
  "guests": [
    {
      "id": "guest-1703001234568-xyz",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "group": "Family",
      "rsvpStatus": "accepted",
      "respondedAt": "2024-03-10T14:30:00Z"
    }
  ]
}
```

**4. Get Analytics**

```http
GET /api/invitations/{id}/analytics
```

**Success Response:** `200 OK`
```json
{
  "invitationId": "inv-1703001234567-abc123",
  "totalGuests": 50,
  "responded": 35,
  "pending": 15,
  "accepted": 30,
  "declined": 5,
  "maybe": 0,
  "responseRate": 0.70,
  "responses": [
    {
      "guestId": "guest-1703001234568-xyz",
      "guestName": "John Doe",
      "guestEmail": "john@example.com",
      "rsvpStatus": "accepted",
      "dietaryRestrictions": "Vegetarian",
      "plusOne": "Jane Doe",
      "message": "Can't wait to celebrate!",
      "respondedAt": "2024-03-10T14:30:00Z"
    }
  ],
  "dietarySummary": {
    "vegetarian": 5,
    "vegan": 2,
    "glutenFree": 3,
    "none": 20
  }
}
```

**5. Submit RSVP**

```http
POST /api/invitations/{invitationId}/guests/{guestId}/rsvp
Content-Type: application/json
```

**Request Body:**
```json
{
  "rsvpStatus": "accepted",
  "dietaryRestrictions": "Vegetarian",
  "plusOne": "Jane Doe",
  "message": "So excited! Can't wait to celebrate with you both!"
}
```

**Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "RSVP submitted successfully",
  "data": {
    "guestId": "guest-1703001234568-xyz",
    "rsvpStatus": "accepted",
    "dietaryRestrictions": "Vegetarian",
    "plusOne": "Jane Doe",
    "message": "So excited!",
    "respondedAt": "2024-03-10T14:30:00Z"
  }
}
```

**6. Export Responses CSV**

```http
GET /api/invitations/{id}/export/csv
Accept: text/csv
```

**Success Response:** `200 OK`
```
Content-Type: text/csv
Content-Disposition: attachment; filename="invitation-inv-123-responses.csv"

Guest Name,Email,RSVP Status,Dietary Restrictions,Plus One,Message,Responded At
John Doe,john@example.com,accepted,Vegetarian,Jane Doe,Can't wait!,2024-03-10T14:30:00Z
Sarah Smith,sarah@example.com,declined,,,Sorry I can't make it,2024-03-11T09:15:00Z
```

#### Data Validation Rules

**Invitation:**
- `coupleName`: Required, 1-100 characters
- `eventDate`: Required, ISO date (YYYY-MM-DD), must be future
- `eventTime`: Required, HH:MM format (00:00-23:59)
- `eventLocation`: Required, 1-100 characters
- `eventVenue`: Required, 1-200 characters
- `eventDescription`: Optional, max 500 characters
- `templateId`: Required, enum: classic|modern|floral|minimal|gold|romantic
- `backgroundColor`: Required, hex color (#RRGGBB)
- `accentColor`: Required, hex color (#RRGGBB)
- `textColor`: Required, hex color (#RRGGBB)
- `fontStyle`: Required, enum: classic|modern|romantic
- `customMessage`: Optional, max 500 characters
- `guests`: Required, array, minimum 1 guest

**Guest:**
- `name`: Required, 1-100 characters
- `email`: Required, valid email format
- `phone`: Optional, valid phone format
- `group`: Optional, max 50 characters
- `dietaryRestrictions`: Optional, max 200 characters
- `notes`: Optional, max 500 characters

**RSVP:**
- `rsvpStatus`: Required, enum: accepted|declined|maybe
- `dietaryRestrictions`: Optional, max 200 characters
- `plusOne`: Optional, max 100 characters
- `message`: Optional, max 500 characters

#### Error Handling

**Standard Error Format:**
```json
{
  "success": false,
  "message": "Human-readable error message",
  "code": "ERROR_CODE",
  "errors": {
    "fieldName": "Field-specific error message"
  },
  "timestamp": "2024-03-05T10:00:00Z"
}
```

**Common HTTP Status Codes:**
- `200 OK`: Successful GET/PUT
- `201 Created`: Successful POST (resource created)
- `204 No Content`: Successful DELETE
- `400 Bad Request`: Invalid input/validation error
- `401 Unauthorized`: Authentication required (future)
- `403 Forbidden`: Insufficient permissions (future)
- `404 Not Found`: Resource doesn't exist
- `409 Conflict`: Business logic constraint violated
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server-side error

**Example Error Responses:**

**Validation Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "errors": {
    "eventDate": "Event date must be in the future",
    "guests[0].email": "Invalid email format: missing @"
  },
  "timestamp": "2024-03-05T10:00:00Z"
}
```

**Not Found:**
```json
{
  "success": false,
  "message": "Invitation not found",
  "code": "NOT_FOUND",
  "timestamp": "2024-03-05T10:00:00Z"
}
```

**Business Logic Error:**
```json
{
  "success": false,
  "message": "Cannot delete published invitation. Only draft invitations can be deleted.",
  "code": "INVALID_OPERATION",
  "timestamp": "2024-03-05T10:00:00Z"
}
```

#### Rate Limiting

Recommended rate limits per user:

- Publish Invitation: **10 requests/hour**
- Submit RSVP: **1 request per guest per 5 minutes**
- Get Analytics: **30 requests/hour**
- List Invitations: **60 requests/hour**
- Export CSV: **10 requests/hour**

Rate limit headers:
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 8
X-RateLimit-Reset: 1709640000
```

#### CORS Configuration

**Spring Boot Example:**
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins(
                "http://localhost:3000",
                "https://happyendings.com",
                "https://*.happyendings.com"
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

---

### 4. Developer Guide

#### Quick Reference

**Essential Files**
| Purpose | File Path |
|---------|-----------|
| Form management | `/hooks/useInvitationForm.ts` |
| API client | `/lib/api/invitation.ts` |
| TypeScript types | `/lib/types/invitation.ts` |
| CSV utilities | `/lib/utils/csvParser.ts` |
| Design tokens | `/app/globals.css` |
| Util functions | `/lib/utils.ts` |

**Common Commands**
```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Production build
npm run start            # Run production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix lint issues

# Testing
npm run type-check       # TypeScript type checking
npm run format           # Format with Prettier (if configured)

# Dependencies
npm install <package>    # Install package
npm update               # Update all packages
npm audit fix            # Fix security vulnerabilities
```

#### Code Snippets

**1. Add New Form Field**

Update TypeScript types:
```typescript
// /lib/types/invitation.ts
export interface InvitationFormData {
  // ... existing fields
  newField: string;
}
```

Update initial state:
```typescript
// /hooks/useInvitationForm.ts
const INITIAL_FORM_STATE: InvitationFormData = {
  // ... existing
  newField: '',
};
```

Add form input:
```typescript
// In your component
<Input
  id="newField"
  value={formData.newField}
  onChange={(e) => onUpdate('newField', e.target.value)}
  placeholder="Enter value"
/>
```

**2. Create New API Endpoint**

```typescript
// /lib/api/invitation.ts
class InvitationAPI {
  // ... existing methods
  
  static async newEndpoint(id: string): Promise<ResponseType> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/endpoint/${id}`,
        {
          method: 'GET',
          headers: apiHeaders,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}
```

**3. Add New Component**

```typescript
// /components/MyNewComponent.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MyNewComponentProps {
  data: string;
  onAction: () => void;
}

export function MyNewComponent({ data, onAction }: MyNewComponentProps) {
  const [state, setState] = useState('');

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold">{data}</h2>
      <Button onClick={onAction}>
        Click Me
      </Button>
    </Card>
  );
}
```

**4. Custom Hook Pattern**

```typescript
// /hooks/useMyCustomHook.ts
import { useState, useCallback } from 'react';

export function useMyCustomHook() {
  const [state, setState] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performAction = useCallback(async (param: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Your logic here
      setState(param);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    state,
    loading,
    error,
    performAction,
  };
}
```

#### Common Patterns

**Loading State Button**
```typescript
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading...
    </>
  ) : (
    'Submit'
  )}
</Button>
```

**Error Display**
```typescript
{error && (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

**Conditional Rendering**
```typescript
{currentStep === 'details' ? (
  <EventDetailsStep {...props} />
) : currentStep === 'customization' ? (
  <CustomizationStep {...props} />
) : currentStep === 'guests' ? (
  <GuestListStep {...props} />
) : (
  <PreviewPublishStep {...props} />
)}
```

**Form Input with Validation**
```typescript
<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className={errors.email ? 'border-red-500' : ''}
  />
  {errors.email && (
    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
  )}
</div>
```

**Async Data Fetching**
```typescript
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await InvitationAPI.getInvitation(id);
      setInvitation(data);
    } catch (err) {
      setError('Failed to load invitation');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);
```

#### Testing Guide

**Unit Testing Setup** (if implemented)
```typescript
// Example with Jest and React Testing Library
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent data="test" onAction={() => {}} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
```

**Manual Testing Checklist**

**Invitation Creation:**
- [ ] All required fields validate correctly
- [ ] Color picker updates preview
- [ ] Template selection changes design
- [ ] CSV upload parses correctly
- [ ] Manual guest addition works
- [ ] Guest editing saves changes
- [ ] Guest deletion removes from list
- [ ] Publish generates links
- [ ] Draft saves to localStorage

**Guest RSVP:**
- [ ] Link loads invitation correctly
- [ ] Form validates required fields
- [ ] Dietary field appears for "attending"
- [ ] Plus-one field appears for "attending"
- [ ] Submission shows loading state
- [ ] Success shows confirmation
- [ ] Error displays retry option

**Analytics:**
- [ ] Metrics display correctly
- [ ] Charts render properly
- [ ] Table shows all responses
- [ ] Search filters results
- [ ] Status filter works
- [ ] CSV export downloads
- [ ] Real-time updates work

**Responsive:**
- [ ] Mobile (< 640px) - single column
- [ ] Tablet (640-1024px) - adjusted layout
- [ ] Desktop (> 1024px) - full layout
- [ ] Touch interactions work
- [ ] Keyboard navigation works

#### Performance Optimization

**Code Splitting**
```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const AnalyticsDashboard = dynamic(
  () => import('@/components/invitation/AnalyticsDashboard'),
  {
    loading: () => <Skeleton className="h-64" />,
    ssr: false,
  }
);
```

**Image Optimization**
```typescript
import Image from 'next/image';

<Image
  src="/template-classic.jpg"
  alt="Classic Template"
  width={300}
  height={400}
  priority={false}  // Don't load immediately
  loading="lazy"    // Lazy load
  placeholder="blur" // Show blur while loading
/>
```

**Memoization**
```typescript
import { useMemo } from 'react';

const filteredGuests = useMemo(() => {
  return guests.filter(g => 
    g.name.toLowerCase().includes(search.toLowerCase())
  );
}, [guests, search]);
```

**Debouncing**
```typescript
import { useDebounce } from '@/hooks/useDebounce';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    // Perform search with debouncedSearch
  }, [debouncedSearch]);

  return <Input value={search} onChange={e => setSearch(e.target.value)} />;
};
```

#### Security Best Practices

**Input Sanitization**
```typescript
// Sanitize user input before display
import DOMPurify from 'dompurify';

const sanitizedMessage = DOMPurify.sanitize(userMessage);
```

**Environment Variables**
```typescript
// Never expose secrets in client-side code
// Use NEXT_PUBLIC_ prefix for client-accessible variables

// ❌ Bad - exposes secret
const apiKey = process.env.SECRET_API_KEY;

// ✅ Good - only accessible on server
const apiKey = process.env.API_KEY; // Server-side only

// ✅ Good - public variable
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

**CSRF Protection** (when auth is implemented)
```typescript
// Include CSRF token in requests
headers: {
  'X-CSRF-Token': csrfToken,
}
```

**XSS Prevention**
```typescript
// React automatically escapes content
// Be careful with dangerouslySetInnerHTML

// ❌ Dangerous
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ Safe
<div>{userContent}</div>
```

---

## 🚀 Deployment

### Vercel (Recommended)

**One-Click Deploy**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Environment Variables** (Vercel Dashboard)
1. Go to Project Settings → Environment Variables
2. Add variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
   - Other environment-specific variables

**Automatic Deployments**
- Push to `main` branch → Production deployment
- Pull requests → Preview deployments
- Custom domains supported

### Docker Deployment

**Dockerfile**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

**docker-compose.yml**
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8080/api
    depends_on:
      - backend
  
  backend:
    image: your-backend:latest
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/wedding
    depends_on:
      - db
  
  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=wedding
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**Commands**
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop
docker-compose down
```

### Self-Hosted (VPS/Server)

**Using PM2**
```bash
# Install PM2
npm install -g pm2

# Build application
npm run build

# Start with PM2
pm2 start npm --name "happy-endings" -- start

# Save PM2 config
pm2 save

# Setup auto-restart on reboot
pm2 startup
```

**Nginx Configuration**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**SSL with Let's Encrypt**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal is set up automatically
```

### Environment-Specific Configuration

**Development**
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_ENV=development
```

**Staging**
```env
NEXT_PUBLIC_API_URL=https://api-staging.happyendings.com/api
NEXT_PUBLIC_ENV=staging
```

**Production**
```env
NEXT_PUBLIC_API_URL=https://api.happyendings.com/api
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

---

## 📊 Feature Checklist

### ✅ Completed Features

**Core Functionality**
- [x] Multi-step invitation creation wizard
- [x] 6 customizable invitation templates
- [x] Color and font customization
- [x] CSV guest list import/export
- [x] Manual guest management
- [x] Unique RSVP link generation
- [x] Guest RSVP form
- [x] Real-time analytics dashboard
- [x] Response tracking and export
- [x] Draft saving (localStorage)

**UI/UX**
- [x] Responsive design (mobile, tablet, desktop)
- [x] Loading states and error handling
- [x] Form validation
- [x] Success confirmations
- [x] Intuitive navigation
- [x] Accessible color contrast
- [x] Touch-friendly interfaces

**Technical**
- [x] TypeScript type safety
- [x] Component-based architecture
- [x] API client abstraction
- [x] CSV parsing utilities
- [x] State management hooks
- [x] Error boundaries
- [x] Performance optimization

### ⏳ Future Enhancements

**Authentication & Authorization**
- [ ] User registration and login
- [ ] JWT token authentication
- [ ] Role-based access control
- [ ] Password reset functionality
- [ ] OAuth integration (Google, Facebook)

**Communication**
- [ ] Email notifications (RSVP confirmation)
- [ ] Email reminders for non-responders
- [ ] SMS notifications (optional)
- [ ] Email template customization
- [ ] Bulk email sending

**Advanced Features**
- [ ] Multiple event support (rehearsal, reception, etc.)
- [ ] Seating chart creator
- [ ] Budget tracker
- [ ] Vendor management
- [ ] Timeline planner
- [ ] Photo gallery
- [ ] Gift registry integration

**Premium Features**
- [ ] Premium templates
- [ ] Video invitations
- [ ] Custom domain mapping
- [ ] Advanced analytics
- [ ] White-label solution
- [ ] API access for integrations

**Localization**
- [ ] Multi-language support (i18n)
- [ ] Right-to-left (RTL) languages
- [ ] Regional date/time formats
- [ ] Currency localization

**Mobile**
- [ ] React Native mobile app
- [ ] Push notifications
- [ ] Offline mode
- [ ] QR code scanning

---

## 🐛 Known Issues & Limitations

### Current Limitations

1. **Draft Storage**: Drafts saved in localStorage (not synced across devices)
2. **Authentication**: No user authentication system yet
3. **Email**: No automated email sending
4. **Image Upload**: Templates are pre-defined (no custom image upload)
5. **Multi-event**: Only supports single event per invitation
6. **Payments**: No payment integration for premium features
7. **Analytics Export**: CSV only (no PDF or Excel)
8. **Browser Support**: Optimized for modern browsers (Chrome, Firefox, Safari, Edge)

### Known Issues

1. **Safari iOS**: Color picker may have styling inconsistencies
2. **IE11**: Not supported (modern browsers only)
3. **Print**: Print styling not fully optimized
4. **Large CSV**: Performance may degrade with 1000+ guests

### Workarounds

**Issue**: Draft not syncing across devices
**Workaround**: Export guest list as CSV and re-import on other device

**Issue**: Email notifications not sent
**Workaround**: Manually copy guest links and send via email client

**Issue**: Custom image upload not available
**Workaround**: Choose from 6 pre-designed templates

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
```bash
git clone https://github.com/yourusername/happy-endings-frontend.git
cd happy-endings-frontend
```

2. **Create a feature branch**
```bash
git checkout -b feature/AmazingFeature
```

3. **Make your changes**
- Follow existing code style
- Add tests if applicable
- Update documentation

4. **Commit your changes**
```bash
git add .
git commit -m 'Add some AmazingFeature'
```

5. **Push to your fork**
```bash
git push origin feature/AmazingFeature
```

6. **Open a Pull Request**
- Describe your changes
- Reference any related issues
- Wait for review

### Development Guidelines

**Code Style**
- Use TypeScript for type safety
- Follow existing naming conventions
- Use functional components with hooks
- Keep components small and focused
- Comment complex logic

**Commit Messages**
```
feat: Add new feature
fix: Fix bug in component
docs: Update documentation
style: Format code
refactor: Refactor component
test: Add tests
chore: Update dependencies
```

**Pull Request Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added tests
- [ ] Updated documentation

## Screenshots (if applicable)
```

---

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2026 Happy Endings

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 💖 Support

### Documentation
📚 **Comprehensive Guides**
- Setup & Configuration - Installation and environment setup
- Feature Documentation - Detailed feature explanations
- API Specification - Backend integration requirements
- Developer Guide - Quick reference and code snippets

### Community
💬 **Get Help**
- GitHub Issues: [Report bugs or request features](https://github.com/your-repo/issues)
- Discussions: [Ask questions and share ideas](https://github.com/your-repo/discussions)
- Discord: [Join our community](https://discord.gg/happyendings)

### Commercial Support
🏢 **Enterprise Solutions**
For custom development, consulting, or enterprise support:
- 🌐 Website: https://happyendings.com
- 📧 Email: enterprise@happyendings.com
- 📞 Phone: +1 (555) 123-4567

---

## 🙏 Acknowledgments

This project wouldn't be possible without:

- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Recharts](https://recharts.org/)** - Composable charting library
- **[Lucide](https://lucide.dev/)** - Beautiful icon library
- **[Vercel](https://vercel.com/)** - Hosting and deployment platform

Special thanks to all contributors and the open-source community!

---

## 🗺️ Roadmap

### Q2 2026
- [ ] User authentication system (JWT)
- [ ] Email notification service
- [ ] Payment integration (Stripe)
- [ ] Premium templates (5 new designs)

### Q3 2026
- [ ] Mobile app (React Native)
- [ ] Multi-event support
- [ ] Seating chart creator
- [ ] Advanced analytics dashboard

### Q4 2026
- [ ] AI-powered design suggestions
- [ ] Multi-language support (5 languages)
- [ ] Video invitation support
- [ ] Vendor management system

### 2027
- [ ] White-label solution
- [ ] API for third-party integrations
- [ ] Budget planning tools
- [ ] Wedding website builder

---

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/your-repo/happy-endings?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-repo/happy-endings?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-repo/happy-endings)
![GitHub pull requests](https://img.shields.io/github/issues-pr/your-repo/happy-endings)

- **Version**: 1.0.0
- **Last Updated**: March 5, 2026
- **Active Users**: Growing
- **Invitations Created**: Counting...

---

<div align="center">

**Made with ❤️ for couples planning their special day**

[⬆ Back to Top](#-happy-endings---wedding-invitation--rsvp-platform)

---

**Happy Planning! 🎊**

</div>
