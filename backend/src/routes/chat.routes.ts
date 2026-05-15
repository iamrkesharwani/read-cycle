import { Router } from 'express';
import { authGuard } from '../middleware/auth.middleware.js';
import { getChatHistory } from '../controllers/chat/get.controller.js';

const router = Router();

router.get('/:swapId', authGuard, getChatHistory);

export default router;
