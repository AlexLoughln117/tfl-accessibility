# Free Flow Routes

A modern, accessible journey planner for London's public transport network with a focus on accessibility information.

## Features

- Plan accessible journeys across London
- Get detailed step-free access information
- Customize route preferences (fewer transfers, less walking)
- Dark mode support
- Responsive design for all devices
- Offline capability (PWA)
- Accessible to screen readers and keyboard navigation

## Tech Stack

- Next.js 14 (React framework)
- TypeScript for type safety
- Tailwind CSS for styling
- MapBox GL for maps
- SWR for data fetching
- Zustand for state management
- Radix UI / Headless UI for accessible components

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/free-flow-routes.git
cd free-flow-routes

# Install dependencies
npm install
# or
yarn

# Start the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                  # App router pages
├── components/           # Reusable UI components
│   ├── accessibility/    # Accessibility-specific components
│   ├── journey/          # Journey planning components
│   ├── layout/           # Layout components (header, footer)
│   ├── map/              # Map-related components
│   └── ui/               # Base UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and APIs
│   └── api/              # API integration (TfL API)
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_TFL_APP_ID=your-tfl-app-id
NEXT_PUBLIC_TFL_APP_KEY=your-tfl-app-key
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
```

## Deployment

This project can be deployed to Vercel with zero configuration:

```bash
npm run build
# or
yarn build
```

## TypeScript Setup

This project uses TypeScript for type safety. The following type declarations have been set up:

- **React Types**: Custom declarations for React hooks and components in `src/types/react.d.ts`
- **Next.js Types**: Type definitions for Next.js features in `src/types/next.d.ts`
- **Third-party Libraries**: Type declarations for libraries like next-themes, framer-motion, etc. in `src/types/third-party.d.ts`
- **Testing Types**: Jest and Testing Library type definitions in `src/types/testing.d.ts`
- **Node.js Types**: NodeJS-specific types in `src/types/nodejs.d.ts`

### State Management

The application uses Zustand for state management with two main stores:

1. **Journey Store** (`useJourneyStore.ts`): Manages journey planning state, history, and preferences
2. **Station Store** (`useStationStore.ts`): Handles station data, search, and selection

Both stores are configured with persistence to maintain state across page reloads.

## License

MIT 