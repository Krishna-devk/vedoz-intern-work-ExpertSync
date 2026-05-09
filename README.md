# ExpertSync: Real-Time Expert Booking Platform

A high-performance, real-time booking ecosystem built with a modern monorepo architecture. ExpertSync connects users with domain experts through a seamless, premium interface across Web and Mobile.

## 🚀 Key Features

- **Real-Time Availability**: Powered by **Socket.io**, time slots update instantly across all platforms when a booking occurs.
- **Global Theme Engine**: Complete cross-platform support for **Premium Light and Dark Modes** with persistent user settings.
- **Race-Condition Protection**: Atomic database operations and unique constraints prevent double-booking of the same slot.
- **Glassmorphic UI**: A state-of-the-art design system featuring mesh gradients, translucent components, and fluid animations.
- **Infinite Discovery**: High-performance infinite scroll (Mobile) and intersection observers (Web) for seamless expert browsing.
- **Shared Type Safety**: Zod schemas and TypeScript types shared via a central `@expertsync/shared` package for 100% full-stack consistency.

## 🛠️ Technology Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.io
- **Web**: React 19, Vite 6, Tailwind CSS 4, TanStack Query 5
- **Mobile**: React Native, Expo, Lucide Icons, AsyncStorage
- **Shared**: Zod (Schema Validation), TypeScript

## 🏁 Getting Started

### 1. Installation
Run the following command in the root directory to install all dependencies for the entire monorepo:
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
Populate the platform with high-quality expert profiles and available slots:
```bash
npm run seed
```

### 4. Running the Project
Launch the development services from the root:

- **Full Stack**: `npm run dev` (Starts backend, web, and mobile simultaneously)
- **Individual Services**:
  - **Web Client**: `npm run dev:web`
  - **Backend Server**: `npm run dev:backend`
  - **Mobile Client**: `npm run dev:mobile`

## 🌐 Live Deployments

- **Backend API**: [https://vedoz-intern-work-expertsync-backend.onrender.com](https://vedoz-intern-work-expertsync-backend.onrender.com)
- **API Documentation**: [https://vedoz-intern-work-expertsync-backend.onrender.com/api-docs](https://vedoz-intern-work-expertsync-backend.onrender.com/api-docs)

## 📱 Mobile App (Android APK)

The Android APK is available for direct download. It is pre-configured to connect to the live Render backend.

**To download and install:**
1. Navigate to the [Latest Releases](https://github.com/Krishna-devk/vedoz-intern-work-ExpertSync/releases) page.
2. Download the `ExpertSync.apk` file from the assets section.
3. On your Android device, open the file and follow the prompts to install (you may need to "Allow installation from unknown sources").

## 🏗️ Architecture

```text
├── backend/          # Node.js Express API & Sockets
├── web-client/       # React 19 + Tailwind 4 SPA
├── mobile-client/    # Expo React Native App
├── shared/           # Common Zod schemas and TypeScript interfaces
└── docs/             # API Documentation & Assets
```

---
Built with ❤️ for the ExpertSync Internship Assessment.

