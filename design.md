# FRONTEND UI/UX DESIGN BLUEPRINT
# Real-Time Expert Booking System
# Web + Mobile Design Architecture
# Production UI Execution Guide

---

# DESIGN PHILOSOPHY

The UI should feel like:

```txt
Calendly
+
Linear
+
Modern SaaS Dashboard
```

NOT:

```txt
Student CRUD project
```

---

# CORE UI PRINCIPLES

```txt
Minimal
Fast
Professional
Readable
Responsive
Real-Time Focused
```

---

# COLOR SYSTEM

## Primary Colors

```txt
Primary Background    → #0B0F19
Secondary Background  → #111827
Card Background       → #1F2937
Border                → #374151
Primary Accent        → #3B82F6
Success               → #10B981
Danger                → #EF4444
Warning               → #F59E0B
Text Primary          → #F9FAFB
Text Secondary        → #9CA3AF
```

---

# TYPOGRAPHY

```txt
Font:
Inter

Heading:
font-bold

Subheading:
font-semibold

Body:
font-normal
```

---

# GLOBAL LAYOUT STRUCTURE

```txt
┌──────────────────────────────────────────────┐
│ NAVBAR                                       │
├──────────────────────────────────────────────┤
│                                              │
│ PAGE CONTENT                                 │
│                                              │
├──────────────────────────────────────────────┤
│ FOOTER                                       │
└──────────────────────────────────────────────┘
```

---

# NAVBAR DESIGN

## INTUITION

Navbar should feel:
- premium
- lightweight
- clean

---

# ASCII DESIGN

```txt
┌────────────────────────────────────────────────────────────┐
│ ExpertSync                               My Bookings  ☺   │
└────────────────────────────────────────────────────────────┘
```

---

# NAVBAR FEATURES

## Left Side
- Logo
- App Name

## Right Side
- My Bookings button
- Theme Toggle (optional)
- User Avatar Icon

---

# HERO SECTION

## PURPOSE

Instantly communicate:

```txt
Real-Time Expert Booking Platform
```

---

# ASCII DESIGN

```txt
┌────────────────────────────────────────────────────────────┐
│                                                            │
│         Book Expert Sessions in Real-Time                  │
│                                                            │
│  Real-time scheduling engine with instant slot updates     │
│                                                            │
│        [ Search Experts ]  [ Explore Categories ]          │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

# HOME PAGE DESIGN
# EXPERT LISTING PAGE

# PURPOSE

Marketplace browsing interface.

This is the evaluator’s:
- first impression
- UI quality judgment
- responsiveness test

---

# PAGE STRUCTURE

```txt
┌──────────────────────────────────────────────┐
│ Navbar                                       │
├──────────────────────────────────────────────┤
│ Hero Section                                 │
├──────────────────────────────────────────────┤
│ Search + Filters                             │
├──────────────────────────────────────────────┤
│ Expert Grid                                  │
├──────────────────────────────────────────────┤
│ Pagination                                   │
├──────────────────────────────────────────────┤
│ Footer                                       │
└──────────────────────────────────────────────┘
```

---

# SEARCH + FILTER BAR

# ASCII DESIGN

```txt
┌──────────────────────────────────────────────────────────┐
│ 🔍 Search Experts...     [Category ▼]   [Sort ▼]        │
└──────────────────────────────────────────────────────────┘
```

---

# SEARCH BEHAVIOR

## Features

```txt
Debounced Search
Category Filter
Pagination
Loading States
Empty States
```

---

# EXPERT CARD DESIGN

# INTUITION

Cards should feel:
- clean
- premium
- informative
- actionable

---

# ASCII DESIGN

```txt
┌───────────────────────────────────┐
│ 👨‍⚕️ Dr. Sarah Johnson              │
│                                   │
│ AI Career Coach                   │
│                                   │
│ ⭐ 4.9       8 Years Experience   │
│                                   │
│ Helping professionals transition  │
│ into AI & ML careers.             │
│                                   │
│ [ View Availability ]             │
└───────────────────────────────────┘
```

---

# CARD FEATURES

## Must Include

```txt
Avatar
Name
Category
Rating
Experience
Short Bio
CTA Button
```

---

# GRID RESPONSIVENESS

## Desktop

```txt
4 Columns
```

## Tablet

```txt
2 Columns
```

## Mobile

```txt
1 Column
```

---

# LOADING SKELETON DESIGN

# ASCII DESIGN

```txt
┌───────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                                   │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                                   │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                                   │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└───────────────────────────────────┘
```

---

# EMPTY STATE DESIGN

# ASCII DESIGN

```txt
┌──────────────────────────────────────────────┐
│                                              │
│              No Experts Found                │
│                                              │
│     Try changing filters or search query     │
│                                              │
└──────────────────────────────────────────────┘
```

---

# EXPERT DETAIL PAGE

# PURPOSE

This is the:
- real-time synchronization page
- concurrency showcase page
- engineering demonstration page

---

# PAGE STRUCTURE

```txt
┌──────────────────────────────────────────────┐
│ Navbar                                       │
├──────────────────────────────────────────────┤
│ Expert Profile Header                        │
├──────────────────────────────────────────────┤
│ About Section                                │
├──────────────────────────────────────────────┤
│ Availability Calendar                        │
├──────────────────────────────────────────────┤
│ Booking Form                                 │
├──────────────────────────────────────────────┤
│ Footer                                       │
└──────────────────────────────────────────────┘
```

---

# EXPERT PROFILE HEADER

# ASCII DESIGN

```txt
┌────────────────────────────────────────────────────────────┐
│ 👨‍⚕️ Dr. Sarah Johnson                                     │
│                                                            │
│ AI Career Coach                                            │
│                                                            │
│ ⭐ 4.9      8 Years Experience                             │
│                                                            │
│ Helping professionals transition into AI careers.          │
└────────────────────────────────────────────────────────────┘
```

---

# SLOT SECTION

# INTUITION

Slots are the HEART of the project.

They MUST visually communicate:

```txt
Availability
Booking State
Real-Time Updates
```

---

# SLOT GRID DESIGN

# ASCII DESIGN

```txt
┌──────────────────────────────────────────────┐
│ Monday - May 10                              │
├──────────────────────────────────────────────┤
│                                              │
│ [10:00] [11:00] [12:00] [BOOKED]            │
│                                              │
│ [2:00 ] [3:00 ] [BOOKED] [5:00 ]            │
│                                              │
└──────────────────────────────────────────────┘
```

---

# SLOT COLORS

## Available

```txt
Blue Background
Hover Animation
Pointer Cursor
```

---

## Booked

```txt
Gray Background
Strikethrough
Disabled Cursor
```

---

## Selected

```txt
Green Border
Glow Effect
```

---

# REAL-TIME UPDATE UX

When another user books:

```txt
Selected Slot
↓
Turns Gray
↓
Toast Appears
```

---

# REAL-TIME TOAST

# ASCII DESIGN

```txt
┌────────────────────────────────────┐
│ ⚡ Slot just booked by another user │
└────────────────────────────────────┘
```

---

# BOOKING FORM DESIGN

# INTUITION

Simple.
Fast.
Professional.

---

# ASCII DESIGN

```txt
┌──────────────────────────────────────────────┐
│ Book Session                                 │
├──────────────────────────────────────────────┤
│ Name                                         │
│ [__________________________]                 │
│                                              │
│ Email                                        │
│ [__________________________]                 │
│                                              │
│ Phone                                        │
│ [__________________________]                 │
│                                              │
│ Notes                                        │
│ [__________________________]                 │
│                                              │
│ [ Confirm Booking ]                          │
└──────────────────────────────────────────────┘
```

---

# FORM UX RULES

## Validation

Show inline errors.

Example:

```txt
Invalid email address
```

---

## Submit Loading

Button transforms into:

```txt
[ Booking Session... ]
```

---

# SUCCESS MODAL

# ASCII DESIGN

```txt
┌──────────────────────────────────────┐
│ ✅ Booking Confirmed                  │
│                                      │
│ Your session has been successfully   │
│ scheduled.                           │
│                                      │
│ [ View My Bookings ]                 │
└──────────────────────────────────────┘
```

---

# MY BOOKINGS PAGE

# PURPOSE

Demonstrate:
- persistence
- booking state management
- query filtering

---

# PAGE STRUCTURE

```txt
┌──────────────────────────────────────────────┐
│ Navbar                                       │
├──────────────────────────────────────────────┤
│ Search by Email                              │
├──────────────────────────────────────────────┤
│ Booking Cards                                │
├──────────────────────────────────────────────┤
│ Footer                                       │
└──────────────────────────────────────────────┘
```

---

# EMAIL SEARCH BAR

# ASCII DESIGN

```txt
┌──────────────────────────────────────────────┐
│ 📧 Enter your email to fetch bookings        │
│ [_____________________________________]      │
│                                              │
│ [ Fetch Bookings ]                           │
└──────────────────────────────────────────────┘
```

---

# BOOKING CARD DESIGN

# ASCII DESIGN

```txt
┌──────────────────────────────────────────────┐
│ Dr. Sarah Johnson                            │
│                                              │
│ May 10 • 10:00 AM                            │
│                                              │
│ Status: CONFIRMED                            │
│                                              │
│ AI Career Coaching Session                   │
└──────────────────────────────────────────────┘
```

---

# STATUS COLORS

## Pending

```txt
Yellow Badge
```

---

## Confirmed

```txt
Green Badge
```

---

## Completed

```txt
Blue Badge
```

---

# MOBILE DESIGN SYSTEM

# MOBILE DESIGN PHILOSOPHY

The mobile app should feel like:

```txt
Linear Mobile
+
Calendly
+
Modern Scheduling App
```

---

# MOBILE NAVIGATION

Use:

```txt
Bottom Tab Navigation
```

---

# MOBILE NAVIGATION ASCII

```txt
┌─────────────────────────────┐
│                             │
│                             │
│                             │
├─────────────────────────────┤
│ Home   Bookings   Profile   │
└─────────────────────────────┘
```

---

# MOBILE HOME SCREEN

# ASCII DESIGN

```txt
┌─────────────────────────────┐
│ 🔍 Search Experts           │
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ 👨‍⚕️ Dr Sarah Johnson     │ │
│ │ ⭐ 4.9                  │ │
│ │ AI Career Coach         │ │
│ │ [View Slots]            │ │
│ └─────────────────────────┘ │
│                             │
└─────────────────────────────┘
```

---

# MOBILE SLOT SCREEN

# ASCII DESIGN

```txt
┌─────────────────────────────┐
│ Dr Sarah Johnson            │
├─────────────────────────────┤
│ May 10                      │
│                             │
│ [10] [11] [12]              │
│ [ X ] [ 2 ] [ 3 ]           │
│                             │
│ [ Continue Booking ]        │
└─────────────────────────────┘
```

---

# MOBILE BOOKING FORM

# ASCII DESIGN

```txt
┌─────────────────────────────┐
│ Book Session                │
├─────────────────────────────┤
│ Name                        │
│ [______________]            │
│                             │
│ Email                       │
│ [______________]            │
│                             │
│ Phone                       │
│ [______________]            │
│                             │
│ [ Confirm Booking ]         │
└─────────────────────────────┘
```

---

# MOBILE SUCCESS SCREEN

# ASCII DESIGN

```txt
┌─────────────────────────────┐
│                             │
│            ✅               │
│                             │
│ Booking Confirmed           │
│                             │
│ Your session is scheduled   │
│                             │
│ [ View Bookings ]           │
│                             │
└─────────────────────────────┘
```

---

# ANIMATION STRATEGY

# IMPORTANT

Animations should be:
- subtle
- fast
- minimal

---

# ALLOWED ANIMATIONS

```txt
Hover transitions
Fade-ins
Button scale
Toast slide
Card hover glow
```

---

# DO NOT USE

```txt
Heavy parallax
Complex motion systems
Overengineered transitions
```

---

# RESPONSIVENESS RULES

# Desktop

```txt
Max Width:
1280px
```

---

# Tablet

```txt
Responsive grid collapse
```

---

# Mobile

```txt
Single-column layout
Bottom spacing for navigation
```

---

# FINAL UI FEEL

The evaluator should feel:

```txt
"This looks like a real SaaS scheduling product."
```

NOT:

```txt
"This looks like a college CRUD project."
```

---

# FINAL FRONTEND POSITIONING

This frontend is NOT just:
- forms
- cards
- buttons

It is:

```txt id="0e7p71"
A real-time distributed scheduling interface
built around transactional consistency.
```