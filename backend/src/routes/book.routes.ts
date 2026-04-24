import { Router } from 'express';
import { createListing } from '../controllers/book/create.controller.js';
import { authGuard } from '../middleware/auth.middleware.js';
import { uploadImages } from '../middleware/upload.js';
import { getListingById } from '../controllers/book/get.controller.js';

const router = Router();

router.post('/create', authGuard, uploadImages, createListing);
router.get('/:id', getListingById)

export default router;
