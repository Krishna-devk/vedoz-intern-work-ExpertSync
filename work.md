````md
# Real-Time Expert Booking System
# FINAL MASTER EXECUTION BLUEPRINT
# 24-Hour Internship Execution Plan
# Web + Mobile + Shared Backend + Production Deployment

---

# PROJECT OBJECTIVE

Build a production-grade real-time expert booking system with:

- Shared Node.js + Express backend
- React Web frontend
- React Native mobile app
- MongoDB transaction-based booking engine
- Socket.io real-time synchronization
- Shared schemas/types
- Concurrency-safe architecture
- Production deployment

---

# PROJECT POSITIONING

This project is NOT:

```txt
A CRUD booking app
````

This project IS:

```txt
A concurrency-safe real-time scheduling engine
```

The evaluator is NOT looking for:

* pretty buttons
* animations
* fancy dashboards

The evaluator IS looking for:

* transactional correctness
* race-condition prevention
* real-time synchronization
* engineering maturity

---

# EXECUTION PHILOSOPHY

This assignment has:

```txt
High System Complexity
+
Very Low Time Availability
```

Therefore:

```txt
Correctness > Features
Shipping > Perfection
Reliability > Fancy UI
```

---

# FINAL PRIORITY SYSTEM

| Priority | Component             | Mandatory |
| -------- | --------------------- | --------- |
| 1        | Backend Engine        | YES       |
| 2        | Web Frontend          | YES       |
| 3        | Production Deployment | YES       |
| 4        | Mobile App            | BONUS     |

---

# ABSOLUTE EXECUTION RULE

DO NOT start Mobile until ALL of these work:

```txt
Backend Stable
+
Web Stable
+
Production Deployment Working
+
409 Conflict Tested
+
Sockets Working
+
Real-Time Sync Working
```

At this stage:
you already have a winning submission.

Everything after this becomes bonus value.

---

# FINAL SYSTEM ARCHITECTURE

```txt
                   ┌──────────────────────┐
                   │  MongoDB Atlas DB    │
                   │   (Replica Set)      │
                   └──────────┬───────────┘
                              │
                   ┌──────────▼───────────┐
                   │  Node.js + Express   │
                   │   Socket.io Server   │
                   │ Transaction Engine   │
                   └───────┬───────┬──────┘
                           │       │
          ┌────────────────┘       └────────────────┐
          │                                         │
┌─────────▼─────────┐                 ┌────────────▼──────────┐
│   React Web App   │                 │ React Native Mobile   │
│     (Vercel)      │                 │      (Expo App)       │
└───────────────────┘                 └───────────────────────┘
```

---

# CORE ENGINEERING INTUITION

The hardest problem in this assignment is NOT UI.

The hardest problem is:

```txt
Concurrency Control
```

Two users may attempt:

```txt
Same Expert
+
Same Time Slot
+
Same Date
```

simultaneously.

Naive CRUD logic fails here.

Therefore the system MUST use:

```txt
MongoDB Transactions
+
Atomic Updates
+
Socket Synchronization
```

---

# FINAL CORE SYSTEM FLOW

```txt
Client Request
      ↓
Zod Validation
      ↓
Mongo Transaction Starts
      ↓
Atomic Slot Lock
(findOneAndUpdate)
      ↓
Booking Created
      ↓
Transaction Commit
      ↓
Socket Event Emitted
      ↓
React Query Cache Invalidated
      ↓
Fresh State Pulled
```

This flow is the heart of the assignment.

---

# FINAL TECH STACK

## Backend

```txt
Node.js
Express.js
MongoDB Atlas
Mongoose
Socket.io
Zod
dotenv
cors
morgan
faker.js
date-fns OR dayjs
```

---

## Web Frontend

```txt
React
Vite
TypeScript
TailwindCSS
shadcn/ui
TanStack Query
Axios
React Router
React Hook Form
Zod
Socket.io Client
date-fns OR dayjs
```

---

## Mobile Frontend

```txt
Expo
React Native
TypeScript
TanStack Query
Axios
React Navigation
React Hook Form
Zod
Socket.io Client
React Native StyleSheet
date-fns OR dayjs
```

IMPORTANT:

```txt
NO NativeWind
NO complex mobile styling systems
```

Shipping reliability matters more than styling elegance.

---

# CRITICAL ENGINEERING RULES

---

## RULE 1

# MongoDB Transactions REQUIRE Replica Sets

Use:

* MongoDB Atlas

DO NOT waste time configuring local replica sets.

Atlas already supports transactions.

---

## RULE 2

# Backend Stores ISO Dates ONLY

Correct:

```txt
2026-05-10T10:00:00.000Z
```

Wrong:

```txt
10:00 AM
```

Frontend formats dates ONLY for display.

---

## RULE 3

# NEVER Use Naive Booking Logic

NEVER:

```js
if (slotAvailable) {
  createBooking()
}
```

This creates race conditions.

---

## RULE 4

# REQUIRED BOOKING STRATEGY

MUST USE:

```js
mongoose.startSession()
+
session.withTransaction()
+
findOneAndUpdate()
```

If the coding agent generates:

* `findOne()`
* followed by `create()`

REJECT IT IMMEDIATELY.

---

## RULE 5

# NEVER Use Global Socket Broadcasting

NEVER:

```js
io.emit()
```

ALWAYS:

```js
io.to(roomId).emit()
```

---

## RULE 6

# React Query Is Source of Truth

Sockets ONLY notify.

Correct:

```ts
socket.on("SLOT_UPDATED", () => {
  queryClient.invalidateQueries()
})
```

Do NOT manually mutate arrays.

---

## RULE 7

# Mobile Uses Polling Fallback

React Native sockets can die in background.

Therefore:

```txt
Sockets = Primary
Polling = Fallback
```

Required React Query config:

```ts
refetchOnWindowFocus: true
refetchInterval: 30000
```

---

## RULE 8

# Shared Types MUST Use NPM Workspaces

Without workspaces:

* Vite breaks
* Expo Metro breaks
* shared imports fail

---

## RULE 9

# Expo Requires Metro Workspace Patch

Metro does NOT support monorepo symlinks automatically.

Without custom Metro config:

```txt
Expo WILL crash
```

with:

```txt
Cannot resolve module '@shared/...'
```

---

## RULE 10

# Render Free Tier Cold Start

Render free tier sleeps after inactivity.

This can create:

* 40-50 second first load
* evaluator thinks app is broken
* instant rejection risk

---

# REQUIRED FIX

Use:
[https://cron-job.org/](https://cron-job.org/)

Ping:

```txt
/health
```

every:

```txt
14 minutes
```

to keep backend awake.

---

# REQUIRED FRONTEND LOADING MESSAGE

When app first loads:

```txt
"Waking up the scheduling engine... first load may take up to 45 seconds."
```

This prevents evaluator confusion.

---

# FINAL MONOREPO STRUCTURE

```txt
expert-booking-system/
│
├── package.json
│
├── shared/
│   ├── package.json
│   │
│   ├── schemas/
│   │   ├── bookingSchema.ts
│   │   └── expertSchema.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── constants/
│       └── bookingStatus.ts
│
├── backend/
│   ├── package.json
│   │
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── sockets/
│       ├── scripts/
│       ├── utils/
│       └── server.js
│
├── web-client/
│   ├── package.json
│   ├── .env
│   │
│   └── src/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       ├── sockets/
│       ├── utils/
│       └── main.tsx
│
├── mobile-client/
│   ├── package.json
│   ├── metro.config.js
│   │
│   └── src/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── navigation/
│       ├── screens/
│       ├── sockets/
│       ├── utils/
│       └── App.tsx
│
├── README.md
└── .gitignore
```

---

# ROOT WORKSPACE CONFIGURATION

Create:

```txt
package.json
```

with:

```json
{
  "private": true,
  "workspaces": [
    "backend",
    "web-client",
    "mobile-client",
    "shared"
  ]
}
```

---

# SHARED PACKAGE CONFIGURATION

Create:

```txt
shared/package.json
```

This allows:

```ts
import { bookingSchema } from "@shared/schemas"
```

instead of fragile relative imports.

---

# FINAL DEVELOPMENT ORDER

```txt
Workspace Setup
↓
Backend Foundation
↓
Database Models
↓
Transactions
↓
Seeder
↓
API Testing
↓
Socket Testing
↓
Web Frontend
↓
Production Deployment
↓
Mobile App
↓
README + Video
```

---

# PHASE 0

# SYSTEM CONSTRAINT PROMPT

## COPY-PASTE TO CODING AGENT

```txt
You are a Senior Full Stack Engineer.

We are building a production-grade Real-Time Expert Booking System.

Architecture:
- Shared backend
- React Web frontend
- React Native mobile app
- Shared workspace package

We will work phase by phase.

Do not move to next phase until I confirm.

Critical Rules:

- Use ES Modules
- Use Clean Architecture
- Use MongoDB Transactions
- Use session.withTransaction()
- Use findOneAndUpdate()
- Use Socket.io room synchronization
- Use React Query invalidation
- Use centralized error handling
- Use shared schemas/types package
- Use ISO date storage only
- Use date-fns OR dayjs consistently

Critical:
- Prevent double booking
- Never use naive booking logic
- Never use global socket broadcasting
- Mobile uses polling fallback
- Do not use NativeWind

Workspace setup required:
- root package.json
- npm workspaces
- shared package

Expo setup required:
- metro.config.js
- watchFolders
- unstable_enableSymlinks
- unstable_enablePackageExports

Wait for confirmation after every phase.
```

---

# PHASE 1

# WORKSPACE + BACKEND FOUNDATION

## OBJECTIVE

Create monorepo workspace architecture.

---

## INTUITION

The backend is the engine.

The shared package is the brain.

The web and mobile clients are only interfaces.

Everything depends on:

* shared schemas
* backend correctness
* transaction safety

---

## COPY-PASTE PROMPT

```txt
Initialize project using npm workspaces.

Create root package.json with:

workspaces:
- backend
- web-client
- mobile-client
- shared

Create shared package:
shared/package.json

Backend requirements:
- Node.js + Express
- ES Modules
- dotenv
- cors
- morgan
- centralized error middleware

Create folders:

backend/src/
config/
controllers/
middleware/
models/
routes/
sockets/
scripts/
utils/

shared/
schemas/
types/
constants/

Create:
- server.js
- MongoDB connection utility
- health route

Environment variables:
PORT
MONGO_URI
CLIENT_URL

Ensure MongoDB Atlas supports transactions.
```

---

# AFTER PHASE 1 TEST

Run:

```bash
npm install
npm run dev
```

Verify:

* workspace works
* shared imports work
* server works
* MongoDB connected

---

# PHASE 2

# DATABASE MODELS + TRANSACTION ENGINE

## OBJECTIVE

Build concurrency-safe booking engine.

---

## INTUITION

This is the MOST IMPORTANT PHASE.

This project wins or loses here.

The system must safely handle:

```txt
Two users booking the same slot simultaneously
```

---

## COPY-PASTE PROMPT

```txt
Create Expert and Booking models.

Use shared schemas/types package.

Expert schema:
- name
- category
- experience
- rating
- bio
- availableSlots:
   [
     {
       startTime: Date,
       endTime: Date,
       isBooked: Boolean
     }
   ]

Booking schema:
- expertId
- name
- email
- phone
- slotStartTime
- slotEndTime
- notes
- status:
   Pending
   Confirmed
   Completed

Add:
- timestamps
- indexes
- validation

Implement booking transaction logic using:
- mongoose.startSession()
- session.withTransaction()
- findOneAndUpdate()

Logic:
1. start transaction
2. lock available slot atomically
3. create booking
4. commit transaction
5. rollback on failure

Return:
409 Conflict if slot already booked.

Use ISO dates only.
```

---

# AFTER PHASE 2 TEST

Test:

* same slot
* same time
* two requests simultaneously

Expected:

```txt
First succeeds
Second returns 409
```

---

# PHASE 3

# REST API LAYER

## OBJECTIVE

Build complete backend APIs.

---

## REQUIRED ROUTES

```txt
GET /experts
GET /experts/:id
POST /bookings
PATCH /bookings/:id/status
GET /bookings?email=
```

---

## COPY-PASTE PROMPT

```txt
Implement REST APIs.

GET /experts
Features:
- pagination
- category filter
- search

GET /experts/:id

POST /bookings
Requirements:
- Zod validation
- transaction booking
- proper errors

PATCH /bookings/:id/status

GET /bookings?email=
Requirements:
- case insensitive search

Add:
- validation middleware
- async handler utility
- proper JSON responses
- controller separation
```

---

# PHASE 3.5

# DATABASE SEEDER

## OBJECTIVE

Generate realistic testing data.

---

## COPY-PASTE PROMPT

```txt
Create database seeder.

Requirements:
- use faker.js
- generate 10 experts
- generate slots for next 7 days
- realistic categories
- realistic ratings

IMPORTANT:
- slot expertIds must map correctly to generated expert _ids

Create:
backend/src/scripts/seed.js

Add:
npm run seed
```

---

# AFTER PHASE 3.5 TEST

Run:

```bash
npm run seed
```

Verify:

* experts created
* slots created
* API returns usable data

---

# PHASE 4

# SOCKET.IO ENGINE

## OBJECTIVE

Build real-time synchronization.

---

## COPY-PASTE PROMPT

```txt
Integrate Socket.io.

Requirements:
- users join expert-specific rooms
- event:
   join_expert_room

When booking succeeds:
- emit SLOT_UPDATED only to relevant room

Use:
io.to(roomId).emit()

Create:
socketHandler.js
```

---

# AFTER PHASE 4 TEST

Verify:

* room join works
* scoped updates work
* no global emit

---

# PHASE 5

# WEB FRONTEND FOUNDATION

## OBJECTIVE

Build scalable React frontend.

---

## COPY-PASTE PROMPT

```txt
Create React web frontend using:

- React
- Vite
- TypeScript
- TailwindCSS
- shadcn/ui
- TanStack Query
- Axios
- React Router
- React Hook Form
- Zod
- date-fns OR dayjs

Use shared schemas/types package.

Create:
- routing
- QueryClientProvider
- axios client
- layouts
- loading states
- error states

Pages:
- Home
- ExpertDetail
- MyBookings
```

---

# AFTER PHASE 5 TEST

Verify:

* shared imports work
* routing works
* API works

---

# PHASE 6

# WEB EXPERT LISTING

## OBJECTIVE

Build marketplace UI.

---

## COPY-PASTE PROMPT

```txt
Build Expert Listing page.

Requirements:
- responsive card grid
- search input
- category filter
- pagination
- loading skeletons
- empty states
- error states

Use:
- TanStack Query
- debounced search
- TailwindCSS
- shadcn/ui

IMPORTANT:
If backend is sleeping, show:
"Waking up the scheduling engine... first load may take up to 45 seconds."
```

---

# PHASE 7

# WEB BOOKING FLOW

## OBJECTIVE

Build booking interaction system.

---

## COPY-PASTE PROMPT

```txt
Build Expert Detail page and Booking flow.

Requirements:
- grouped slots
- disabled booked slots
- booking form
- validation
- success/error toasts

Use:
- React Hook Form
- Zod

On success:
- invalidate queries
- refresh slot data

Use ISO dates only.
```

---

# PHASE 8

# WEB REAL-TIME SYNC

## OBJECTIVE

Connect sockets + React Query.

---

## COPY-PASTE PROMPT

```txt
Integrate Socket.io client.

Requirements:
- join expert room
- listen for SLOT_UPDATED
- invalidate queries
- refresh automatically

Use:
queryClient.invalidateQueries()

Do not manually mutate arrays.
```

---

# PHASE 9

# WEB DEPLOYMENT

## OBJECTIVE

Deploy production-ready system.

---

## DEPLOYMENT TARGETS

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

## CRITICAL ENVIRONMENT VARIABLES

Frontend `.env` MUST use:

```env
VITE_API_URL=
VITE_SOCKET_URL=
```

Before deploying:

* set production URLs in Vercel dashboard
* THEN trigger build

Otherwise frontend will connect to localhost.

---

## REQUIRED RENDER FIX

Use:
[https://cron-job.org/](https://cron-job.org/)

Ping backend:

```txt
/health
```

every:

```txt
14 minutes
```

---

# PHASE 10

# MOBILE FOUNDATION

## OBJECTIVE

Create lightweight Expo mobile app.

---

## COPY-PASTE PROMPT

```txt
Create React Native app using Expo + TypeScript.

Requirements:
- Expo
- React Navigation
- TanStack Query
- Axios
- Socket.io-client
- React Hook Form
- Zod
- date-fns OR dayjs

Use shared schemas/types package.

Use React Native StyleSheet only.

Create:
- API layer
- QueryClientProvider
- navigation
- loading states
- error states

Screens:
- Expert List
- Expert Detail
- My Bookings

CRITICAL CONFIGURATION:

Because this is an NPM Workspace, generate custom metro.config.js using @expo/metro-config.

Configure:
- watchFolders
- unstable_enableSymlinks: true
- unstable_enablePackageExports: true

Ensure Expo can resolve shared workspace imports.
```

---

# ESCAPE HATCH

If:

* Metro errors continue
* shared imports break
* time becomes dangerous

DO THIS:

```txt
Copy shared folder directly into mobile-client
```

Shipping > Architectural purity.

---

# PHASE 11

# MOBILE BOOKING FLOW

## COPY-PASTE PROMPT

```txt
Build Expert List and Booking flow in React Native.

Requirements:
- FlatList
- search input
- grouped slots
- disabled booked slots
- booking form
- validation
- toast messages

Use:
- React Hook Form
- Zod
- StyleSheet

Use ISO dates only.
```

---

# PHASE 12

# MOBILE REAL-TIME SYNC

## COPY-PASTE PROMPT

```txt
Integrate Socket.io real-time synchronization.

Requirements:
- join expert room
- listen for SLOT_UPDATED
- invalidate queries
- refresh automatically

Add fallback:
- refetchOnWindowFocus: true
- refetchInterval: 30000

Do not manually mutate arrays.
```

---

# PHASE 13

# UI POLISH

## COPY-PASTE PROMPT

```txt
Polish UI for web and mobile.

Add:
- responsive layouts
- skeletons
- status badges
- navbar
- footer
- spacing improvements
- typography improvements

Keep design:
- clean
- minimal
- modern

Do not overengineer animations.
```

---

# PHASE 14

# README + DEPLOYMENT DOCS

## COPY-PASTE PROMPT

```txt
Create professional README.md.

Include:
- project overview
- architecture
- features
- API routes
- setup instructions
- deployment steps
- tech stack

Explain:
- MongoDB transactions
- atomic updates
- race condition prevention
- Socket.io room synchronization
- React Query invalidation
- shared schemas/types architecture

Also create:
- .env.example
```

---

# FINAL QA CHECKLIST

## TEST 1

# Double Booking

Expected:

```txt
First succeeds
Second returns 409
```

---

## TEST 2

# Web Real-Time Sync

Expected:

```txt
Second tab updates instantly
```

---

## TEST 3

# Mobile → Web Sync

Expected:

```txt
Web updates instantly
```

---

## TEST 4

# Persistence

Expected:

```txt
Booked slot remains unavailable
```

---

## TEST 5

# Validation

Expected:

```txt
Validation errors shown
```

---

# FINAL VIDEO STRATEGY

## 0:00 → 1:00

Show:

* two browser tabs
* same slot
* simultaneous booking
* real-time sync

Lead with engineering.

---

## 1:00 → 2:00

Show:

* mobile app booking
* web updating instantly

---

## 2:00 → END

Quickly show:

* search
* filter
* pagination
* bookings page

Finish by explaining:

```txt
MongoDB Transactions
Atomic Updates
Socket.io Rooms
Race Condition Prevention
React Query Cache Invalidation
```

---

# FINAL ENGINEERING POSITIONING

This project is:

```txt
A cross-platform real-time scheduling engine
with concurrency-safe booking architecture.
```

```
```
