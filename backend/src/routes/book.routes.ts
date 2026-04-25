import { Router } from 'express';
import { createListing } from '../controllers/book/create.controller.js';
import { authGuard } from '../middleware/auth.middleware.js';
import { uploadImages } from '../middleware/upload.js';
import {
  getListingById,
  getUserListings,
} from '../controllers/book/get.controller.js';
import { deleteListing } from '../controllers/book/delete.controller.js';
import { updateBookStatus } from '../controllers/book/status.controller.js';

const router = Router();

router.post('/create', authGuard, uploadImages, createListing);
router.get('/me', authGuard, getUserListings);
router.get('/:id', getListingById);
router.delete('/:id', authGuard, deleteListing);
router.patch('/:id/status', authGuard, updateBookStatus);

export default router;
