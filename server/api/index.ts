import express from 'express';
import authRoutes from './auth';
import pantryRoutes from './pantry';
import profilesRoutes from './profiles';
import langGraphRoutes from './langGraph';

const router = express.Router();

// Register API routes
router.use('/auth', authRoutes);
router.use('/pantry', pantryRoutes);
router.use('/profiles', profilesRoutes);
router.use('/langgraph', langGraphRoutes);

export default router;