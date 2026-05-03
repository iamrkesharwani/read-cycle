import { Router } from 'express';
import { authGuard } from '../middleware/auth.middleware.js';
import { toggleInterest } from '../controllers/interest/toggle.controller.js';
import { getInterestedUsers } from '../controllers/interest/getUsers.controller.js';

const router = Router();

router.post('/:bookId/toggle', authGuard, toggleInterest);
router.get('/:bookId/users', authGuard, getInterestedUsers);

export default router;
