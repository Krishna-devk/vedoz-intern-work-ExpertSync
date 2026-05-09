# ExpertSync: Real-Time Expert Booking Platform

A high-performance, real-time booking ecosystem built with a modern monorepo architecture. ExpertSync connects users with domain experts through a seamless, glassmorphic interface across Web and Mobile.

## 🚀 Key Features

- **Real-Time Availability**: Powered by Socket.io, time slots update instantly across all platforms when a booking occurs.
- **Glassmorphic Design**: A premium, dark-mode UI with mesh gradients and translucent "glass" components.
- **Multi-Platform Sync**: Unified backend serving both a React Web Client and a React Native (Expo) Mobile App.
- **Shared Logic**: Zod schemas and TypeScript types shared via a central `@expertsync/shared` package.
- **Seamless Meeting Integration**: Instant "Join Meeting" capability for confirmed sessions.

## 🛠️ Technology Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.io
- **Web**: React 19, Vite 6, Tailwind CSS 4, TanStack Query 5
- **Mobile**: React Native, Expo, NativeWind (Tailwind), Lucide Icons
- **Shared**: Zod (Schema Validation), TypeScript

## 🏁 Getting Started

### 1. Installation
Run the following command in the root directory:
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_uri
PORT=5000
```

### 3. Database Seeding
Populate the platform with professional experts and available slots:
```bash
npm run seed
```

### 4. Running the Project
Launch all services simultaneously from the root:

- **Web Client**: `npm run dev:web`
- **Backend Server**: `npm run dev:backend`
- **Mobile Client**: `npm run dev:mobile` (Press `s` to switch between Android/iOS emulators or use the Expo Go app)

## 🏗️ Architecture

```text
├── backend/          # Node.js Express API & Sockets
├── web-client/       # React 19 + Tailwind 4 SPA
├── mobile-client/    # Expo React Native App
└── shared/           # Common schemas and types
```

---
Built with ❤️ for the ExpertSync Developer Portfolio.
