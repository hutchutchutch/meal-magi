import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Import API routes when they are created
// import authRoutes from './api/auth';
// import pantryRoutes from './api/pantry';
// import recipesRoutes from './api/recipes';
// import mealPlansRoutes from './api/mealPlans';
// import preferencesRoutes from './api/preferences';
// import produceRoutes from './api/produce';
// import profilesRoutes from './api/profiles';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/pantry', pantryRoutes);
// app.use('/api/recipes', recipesRoutes);
// app.use('/api/meal-plans', mealPlansRoutes);
// app.use('/api/preferences', preferencesRoutes);
// app.use('/api/produce', produceRoutes);
// app.use('/api/profiles', profilesRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;