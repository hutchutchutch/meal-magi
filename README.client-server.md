# Meal-Magi Client-Server Architecture

This project has been restructured to use a client-server architecture for better separation of concerns, improved security, and maintainability.

## Architecture Overview

The codebase is now organized into two main directories:

- `/src/client` - Contains all client-side code (React components, styles, client-side hooks)
- `/src/server` - Contains all server-side code (API endpoints, business logic, database operations)

## Directory Structure

### Client Structure

```
/src/client
  /components         # UI components
  /hooks              # Client-side React hooks
  /lib                # Client utilities
  /pages              # Page components
  /integrations       # Client-side integrations
  /styles             # CSS files
  /types              # TypeScript definitions
  api.ts              # API client for making requests to the server
  App.tsx             # Main app component
  main.tsx            # Entry point
```

### Server Structure

```
/src/server
  /api                # API route controllers
  /controllers        # Business logic controllers
  /services           # Service layer for data operations
  /models             # Data models
  /utils              # Server utilities
  /integrations       # Server integrations (Supabase)
  /types              # Server type definitions
  index.ts            # Server entry point
```

## Key Changes

1. **Backend Services**: All data-fetching and processing logic has been moved to server-side services.
2. **API Layer**: Added a RESTful API layer with Express.js.
3. **Client API**: Created a client-side API interface for communication with the backend.
4. **Authentication**: Modified auth flow to work through the backend while maintaining Supabase security.

## Running the Application

### Development Mode

To run both client and server in development mode:

```bash
npm run dev:all
```

Or to run them separately:

```bash
# Client only (Vite dev server)
npm run dev

# Server only (with hot reloading)
npm run dev:server
```

### Build and Production

Build both client and server:

```bash
npm run build:all
```

Start the production server:

```bash
npm run start
```

## Environment Variables

Environment variables are now stored in `.env` files and used as follows:

- `.env` - Shared variables for both client and server
- `.env.local` - Local overrides (not committed to git)

## API Routes

The following API endpoints have been implemented:

- `/api/auth/*` - Authentication endpoints
- `/api/profiles/*` - User profile management
- `/api/pantry/*` - Pantry item management
- `/api/meal-plans/*` - Meal planning functionality
- `/api/recipes/*` - Recipe management
- `/api/produce/*` - Seasonal produce information

## Future Improvements

1. Complete implementation of remaining API endpoints
2. Add comprehensive testing for both client and server
3. Implement proper error handling and logging
4. Add documentation for the API
5. Set up continuous integration and deployment workflows