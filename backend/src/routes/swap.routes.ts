import { Router } from 'express';
import { authGuard } from '../middleware/auth.middleware.js';
import { proposeSwap } from '../controllers/swap/propose.controller.js';
import { getMySwaps } from '../controllers/swap/get.controller.js';
import { updateSwapStatus } from '../controllers/swap/respond.controller.js';

const router = Router();

router.post('/propose', authGuard, proposeSwap);
router.get('/me', authGuard, getMySwaps);
router.patch('/:id/status', authGuard, updateSwapStatus);

export default router;
