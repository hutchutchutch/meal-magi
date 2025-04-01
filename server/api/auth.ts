import { Router } from 'express';
import { authController } from '../controllers/authController';

const router = Router();

// Auth routes
router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);
router.post('/signin/google', authController.signInWithGoogle);
router.post('/signout', authController.signOut);
router.get('/session', authController.getSession);

export default router;
