import { Router } from 'express';
import { createListing } from '../controllers/book/createBook.controller.js';
import { authGuard } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create', authGuard, createListing);

export default router;
