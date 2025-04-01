import { Router } from 'express';
import { userController } from '../controllers/userController';

const router = Router();

// User profile routes
router.get('/', userController.getUserProfile);
router.post('/', userController.createUserProfile);
router.put('/', userController.updateUserProfile);

// Preference routes
router.put('/allergens', userController.updateAllergens);
router.put('/preferences', userController.updateFoodPreferences);

export default router;
