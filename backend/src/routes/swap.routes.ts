import { Router } from 'express';
import { authGuard } from '../middleware/auth.middleware.js';
import { proposeSwap } from '../controllers/swap/propose.controller.js';

const router = Router();

router.post('/propose', authGuard, proposeSwap);

export default router;
