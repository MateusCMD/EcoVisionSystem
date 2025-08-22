# Overview

Ecovision is an intelligent recycling system built as a full-stack web application. The system allows users to log in with their CPF (Brazilian tax ID), submit different types of recyclable materials (cans, glass, paper, plastic), earn credits based on material types, and view rankings of top recyclers. The application features a modern React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration using Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **API Design**: RESTful API with JSON responses
- **Development Setup**: Hot module replacement with Vite integration for development

## Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Two main tables - users and transactions
- **User Management**: CPF-based authentication with automatic user creation
- **Transactions**: Track material submissions with credit calculations

## Authentication & Authorization
- **Authentication**: Simple CPF-based login system without traditional passwords
- **Session Management**: Client-side storage using localStorage for user data
- **User Creation**: Automatic user registration on first login attempt

## Key Features
- **Material Submission**: Support for four material types (cans, glass, paper, plastic) with different credit values
- **Credit System**: Dynamic credit calculation based on material type and quantity
- **Rankings**: User leaderboard based on total accumulated credits
- **Responsive Design**: Mobile-first design with adaptive layouts

# External Dependencies

## Database
- **Neon Database**: PostgreSQL hosting service using @neondatabase/serverless driver
- **Drizzle Kit**: Database migration and schema management tool

## UI Components
- **Radix UI**: Comprehensive set of low-level UI primitives for accessibility
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel/slider component library

## Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast bundling for production builds

## Utilities
- **Class Variance Authority**: Utility for creating variant-based component APIs
- **clsx & tailwind-merge**: CSS class name utilities
- **date-fns**: Date manipulation and formatting library
- **Zod**: Schema validation for forms and API endpoints