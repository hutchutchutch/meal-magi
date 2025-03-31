# LangGraph Agent Implementation for Meal Magi

This directory contains the implementation of the LangGraph-based agent system that powers Meal Magi's personalized meal planning capabilities.

## Agent Architecture

The agent system is designed with a multi-agent architecture to handle different aspects of the meal planning process:

```
                           ┌───────────────────┐
                           │                   │
                           │   Orchestration   │
                           │       Agent       │
                           │                   │
                           └─────────┬─────────┘
                                     │
            ┌──────────┬─────────────┼──────────────┬──────────┐
            │          │             │              │          │
┌───────────▼───────┐  │  ┌──────────▼─────────┐    │  ┌───────▼──────────┐
│                   │  │  │                    │    │  │                  │
│   User Profile    │  │  │      Recipe        │    │  │   Meditation     │
│      Agent        │  │  │     Generation     │    │  │   Generation     │
│                   │  │  │       Agent        │    │  │      Agent       │
└───────────────────┘  │  └────────────────────┘    │  └──────────────────┘
                       │                            │
               ┌───────▼──────────┐      ┌──────────▼──────────┐
               │                  │      │                     │
               │     Seasonal     │      │       Pantry        │
               │     Produce      │      │    Optimization     │
               │      Agent       │      │       Agent         │
               │                  │      │                     │
               └──────────────────┘      └─────────────────────┘
```

## Components

### 1. Orchestration Agent (`orchestrationAgent.ts`)

The central coordinator that manages the workflow between all specialized agents. This agent:
- Initializes the workflow based on user requests
- Determines the sequence of agent calls
- Aggregates and validates outputs from specialized agents
- Resolves conflicts between agent outputs
- Ensures the final meal plan meets all user requirements

### 2. User Profile Agent (`userProfileAgent.ts`)

Processes user information and preferences to create a comprehensive dietary profile. This agent:
- Analyzes preferences data (likes/dislikes)
- Processes allergy and dietary restriction information
- Interprets health goals and nutritional needs
- Formats user data for consumption by other agents

### 3. Recipe Generation Agent (`recipeGenerationAgent.ts`)

Creates personalized recipes based on user profiles. This agent:
- Generates recipe ideas based on user preferences
- Includes ingredients that match dietary restrictions
- Creates detailed, step-by-step instructions
- Adds cooking tips for various skill levels
- Optimizes recipes for nutritional content

### 4. Meditation Generation Agent (`meditationGenerationAgent.ts`)

Creates mindfulness content related to recipes. This agent:
- Develops meditation scripts focused on the cooking process
- Creates content for mindful eating experiences
- Highlights sensory aspects of ingredients
- Provides cultural or historical context for dishes

### 5. Seasonal Produce Agent (`seasonalProduceAgent.ts`)

Identifies local, seasonal ingredients. This agent:
- Determines available seasonal produce based on location and date
- Suggests seasonal alternatives for recipe ingredients
- Provides information on nutritional benefits of seasonal eating
- Recommends local sources for seasonal ingredients

### 6. Pantry Optimization Agent (`pantryOptimizationAgent.ts`)

Helps utilize existing pantry inventory effectively. This agent:
- Analyzes user's current pantry inventory
- Prioritizes recipes that use existing ingredients
- Identifies items nearing expiration for urgent use
- Minimizes food waste through intelligent planning

## Integration Points

### Database Integration

The agents interact with the Supabase database to:
- Retrieve user profile information
- Store generated recipes and meal plans
- Track pantry inventory
- Record user interactions with recipes

### API Endpoints

The agent system is exposed through these API endpoints:
- `/api/meal-plans/generate` - Generate a new meal plan
- `/api/recipes/create` - Create a single recipe
- `/api/meditations/generate` - Generate a meditation for a specific recipe
- `/api/pantry/optimize` - Get recipe suggestions based on pantry items

## Agent State Management

Agent state is managed using LangGraph's state management system, with:
- Clear state definitions for each agent
- Persistent state storage for long-running operations
- Proper error handling and recovery mechanisms
- Optimized memory management for large context operations

## Implementation Notes

- All agents are implemented using LangGraph's agent framework
- The system uses a hybrid approach of retrieval-augmented generation and creative generation
- Each agent has its own prompt template optimized for its specific task
- The system incorporates few-shot examples to improve output quality
- Memory management is optimized to handle complex meal planning scenarios

## Future Enhancements

Planned enhancements to the agent system include:
- Improved nutritional analysis capabilities
- More sophisticated seasonal produce recommendations based on climate data
- Advanced pantry management with expiration date tracking
- Expanded meditation content with audio generation
- Personalized difficulty scaling for cooking instructions