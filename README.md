# Meal Magi: AI-Powered Personalized Meal Planning

Meal Magi is a comprehensive meal planning application that leverages AI to create personalized, mindful eating experiences tailored to users' unique dietary needs, preferences, and local seasonal ingredients.

## Project Overview

Meal Magi transforms the cooking experience by:
- Creating personalized meal plans based on user preferences, allergies, and dietary requirements
- Incorporating local, seasonal ingredients for sustainability and freshness
- Providing mindfulness meditations to enhance the connection with food
- Helping users reduce food waste by utilizing pantry items effectively
- Simplifying cooking with detailed, step-by-step instructions

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, Supabase
- **AI Integration**: LangGraph agents for intelligent meal planning

## LangGraph Agent Architecture

Our AI-powered system utilizes multiple specialized agents working together to create a comprehensive meal planning experience:

### 1. User Profile Agent

**Purpose**: Processes and interprets user information to create a comprehensive dietary profile.

**Tasks**:
- Analyzes user preferences, allergies, and dietary restrictions
- Interprets health goals and nutritional needs
- Considers location data for seasonal produce recommendations
- Processes pantry inventory for ingredient utilization

### 2. Recipe Generation Agent

**Purpose**: Creates personalized recipes based on the user's profile.

**Tasks**:
- Generates recipes matching dietary restrictions and preferences
- Incorporates seasonal produce based on user's location
- Utilizes pantry items to reduce waste
- Ensures nutritional balance according to health goals
- Creates step-by-step instructions with helpful tips for novice cooks

### 3. Meditation Generation Agent

**Purpose**: Creates mindfulness content to enhance the cooking and eating experience.

**Tasks**:
- Develops mindfulness meditations specific to each recipe
- Creates content that focuses on ingredient appreciation
- Provides mindful cooking guidance
- Helps users connect emotionally with their food

### 4. Seasonal Produce Agent

**Purpose**: Identifies local, seasonal ingredients based on user location.

**Tasks**:
- Maintains database of seasonal produce by region
- Recommends seasonal alternatives to recipe ingredients
- Provides information on local farmers' markets
- Suggests sustainable food choices

### 5. Pantry Optimization Agent

**Purpose**: Helps users manage and utilize their pantry effectively.

**Tasks**:
- Tracks pantry inventory and expiration dates
- Suggests recipes to use items before they expire
- Recommends optimal pantry stocking strategies
- Reduces food waste through intelligent planning

### 6. Orchestration Agent

**Purpose**: Coordinates the workflow between all specialized agents.

**Tasks**:
- Manages the sequence of agent interactions
- Ensures consistency across generated content
- Resolves conflicts between agent outputs
- Optimizes the overall meal planning experience

## Data Schema

The application utilizes the following key data models:

- **User Profiles**: Stores user preferences, allergens, dietary restrictions, and location data
- **Recipes**: Stores generated recipes with ingredients, steps, and tips
- **Meditations**: Links mindfulness content to specific recipes
- **Pantry Items**: Tracks user's available ingredients and quantities
- **Meal Plans**: Organizes weekly meal schedules with associated recipes
- **Shopping Lists**: Generates grocery lists based on meal plans and pantry inventory

## Key Features

### Personalized Meal Planning

Users can receive completely personalized meal plans that take into account:
- Dietary restrictions and preferences
- Seasonal ingredient availability
- Current pantry inventory
- Nutritional goals and requirements

### Mindful Cooking Experience

The application enhances the cooking experience through:
- Recipe-specific meditation guides
- Mindful cooking instructions
- Educational content about ingredients
- Cultural context for dishes

### Waste Reduction

Meal Magi helps users reduce food waste by:
- Tracking pantry inventory
- Suggesting recipes to use items before expiration
- Optimizing shopping lists
- Providing tips for ingredient preservation and reuse

### Simplified Cooking

The application makes cooking accessible to users of all skill levels by:
- Breaking down recipes into detailed, manageable steps
- Providing tips and tricks for each cooking stage
- Offering substitution suggestions for hard-to-find ingredients
- Including instructional content for cooking techniques

## Getting Started

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

## Architecture Documentation

For more details on the client-server architecture, see [README.client-server.md](./README.client-server.md).

## License

This project is licensed under the MIT License - see the LICENSE file for details.