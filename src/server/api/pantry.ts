import { Router } from 'express';
import { pantryController } from '../controllers/pantryController';

const router = Router();

// Pantry routes
router.get('/', pantryController.getPantryItems);
router.post('/', pantryController.addPantryItem);
router.put('/:itemId', pantryController.updatePantryItem);
router.delete('/:itemId', pantryController.deletePantryItem);

export default router;
