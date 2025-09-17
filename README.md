# Zeni - Mental Health Tracking App

A modern mental health tracking application built with React Native, Expo, and Supabase.

## 🏗️ Architecture

This is a monorepo containing:

- **Mobile App** - React Native with Expo
- **Web App** - Future web interface
- **Admin Dashboard** - Future admin interface
- **Shared Packages** - Reusable code across platforms
- **Supabase Backend** - Database, Auth, and Edge Functions

## 📁 Project Structure

```
zeni/
├── apps/
│   ├── mobile/                 # React Native app
│   ├── web/                   # Future web app
│   └── admin/                 # Future admin dashboard
├── packages/
│   ├── shared/                # Shared utilities
│   │   ├── types/            # Shared TypeScript types
│   │   ├── utils/            # Shared utility functions
│   │   ├── constants/        # Shared constants
│   │   └── validations/      # Shared Zod schemas
│   ├── ui/                   # Shared UI components
│   └── config/               # Shared configuration
├── services/
│   ├── supabase/             # Supabase backend
│   │   ├── migrations/       # Database migrations
│   │   ├── functions/        # Edge Functions
│   │   ├── seed/            # Database seed data
│   │   └── types/           # Generated types
│   └── api/                 # API layer
│       ├── client/          # Supabase client config
│       ├── queries/         # Database queries
│       └── mutations/       # Database mutations
└── docs/                   # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Expo CLI
- Supabase CLI

### Installation

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd zeni
pnpm install
```

2. **Set up Supabase:**

```bash
cd services/supabase
supabase init
supabase start
```

3. **Generate types:**

```bash
pnpm run generate-types
```

4. **Start mobile app:**

```bash
cd apps/mobile
pnpm start
```

## 🛠️ Development

### Available Scripts

- `pnpm dev` - Start all development servers
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm test` - Run all tests

### Mobile App

```bash
cd apps/mobile
pnpm start          # Start Expo dev server
pnpm android        # Run on Android
pnpm ios           # Run on iOS
```

### Supabase Backend

```bash
cd services/supabase
pnpm migrate       # Run migrations
pnpm reset         # Reset database
pnpm generate-types # Generate TypeScript types
```

## 📦 Packages

### @zeni/shared

Shared utilities, types, and constants used across all apps.

### @zeni/ui

Reusable UI components and design system.

### @zeni/api

API layer with Supabase client, queries, and mutations.

### @zeni/supabase

Supabase configuration, migrations, and Edge Functions.

## 🔧 Configuration

### Environment Variables

Create `.env.local` files in each app:

**apps/mobile/.env.local:**

```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

**services/supabase/.env:**

```
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🗄️ Database Schema

The app uses PostgreSQL with the following main tables:

- `users` - User profiles and authentication
- `assessments` - Mental health assessments
- `moods` - Daily mood tracking
- `goals` - User goals and objectives

## 🚀 Deployment

### Mobile App

- **iOS**: Deploy via App Store Connect
- **Android**: Deploy via Google Play Console

### Supabase

- **Database**: Deploy migrations via Supabase CLI
- **Edge Functions**: Deploy via Supabase CLI

## 📚 Documentation

- [Mobile App Docs](./apps/mobile/README.md)
- [API Docs](./services/api/README.md)
- [Database Schema](./services/supabase/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
