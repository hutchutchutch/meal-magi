# Project Structure Documentation

The Meal Magi application has been restructured to follow a clear client-server architecture, improving separation of concerns and maintainability.

## Directory Structure

```
meal-magi/
├── client/                  # Client-side React application
│   ├── public/              # Static assets
│   │   ├── favicon.ico
│   │   ├── 3D models (.bin, .gltf)
│   │   └── ...
│   ├── src/                 # Client source code
│   │   ├── components/      # Reusable React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Client utilities
│   │   ├── pages/           # Page components
│   │   └── integrations/    # Client-side integrations
│   ├── index.html           # HTML entry point
│   ├── vite.config.ts       # Vite configuration
│   ├── tsconfig.json        # TypeScript configuration
│   └── package.json         # Client dependencies
│
├── server/                  # Server-side application
│   ├── api/                 # API routes
│   │   ├── auth.ts          # Authentication endpoints
│   │   ├── pantry.ts        # Pantry management endpoints
│   │   └── ...
│   ├── controllers/         # Request handlers
│   ├── services/            # Business logic services
│   ├── langGraph/           # LangGraph agent implementation
│   │   ├── agents/          # AI agent definitions
│   │   └── ...
│   ├── integrations/        # External service integrations
│   ├── utils/               # Utility functions
│   ├── index.ts             # Server entry point
│   ├── tsconfig.json        # Server TypeScript configuration
│   └── package.json         # Server dependencies
│
├── .env                     # Environment variables (shared)
├── .gitignore               # Git ignore file
├── README.md                # Project documentation
├── README.client-server.md  # Architecture documentation
└── package.json             # Root package.json for scripts
```

## Key Files and Directories

### Client

- `client/public/`: Contains static assets including 3D models and images
- `client/src/components/`: UI components organized by functionality
- `client/src/pages/`: Page-level components with routing
- `client/src/hooks/`: Custom React hooks for state management and shared logic
- `client/src/integrations/`: Client-side integration with external services

### Server

- `server/api/`: Express route definitions organized by resource
- `server/controllers/`: Request handler logic
- `server/services/`: Core business logic and data operations
- `server/langGraph/`: LangGraph-based agent system for AI features
- `server/integrations/`: Supabase and other external integrations

## Architecture Benefits

1. **Clear Separation of Concerns**:
   - Frontend UI logic is isolated in the client directory
   - Backend processing and data access is in the server directory

2. **Independent Development**:
   - Frontend and backend can be developed and tested independently
   - Specialized teams can work on their respective areas

3. **Improved Security**:
   - Sensitive operations and data processing happen on the server
   - API endpoints can implement proper authentication/authorization

4. **Scalability**:
   - Server can be scaled independently of the client
   - LangGraph agents can be distributed across multiple instances

## Running the Application

```bash
# Install all dependencies
npm run install:all

# Run both client and server in development mode
npm run dev

# Run only the client
npm run dev:client

# Run only the server
npm run dev:server

# Build for production
npm run build

# Start production server
npm run start
```

## API Communication

The client communicates with the server through a RESTful API:

1. Client makes requests to API endpoints
2. Server processes requests through controllers
3. Controllers use services for business logic
4. Services interact with database and external services
5. Server returns formatted responses to the client

The client uses a centralized API client (`client/src/api.ts`) to make these requests, ensuring consistent error handling and request formatting.