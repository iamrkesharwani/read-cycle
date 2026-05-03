import { Router } from 'express';
import { createListing } from '../controllers/book/create.controller.js';
import { authGuard, optionalAuth } from '../middleware/auth.middleware.js';
import { uploadImages } from '../middleware/upload.middleware.js';
import {
  getListingById,
  getUserListings,
} from '../controllers/book/get.controller.js';
import { deleteListing } from '../controllers/book/delete.controller.js';
import { updateBookStatus } from '../controllers/book/status.controller.js';
import { updateListing } from '../controllers/book/update.controller.js';
import { swapListing } from '../controllers/book/swap.controller.js';
import { searchBooks } from '../controllers/public/search.controller.js';
import { getPublicUserListings } from '../controllers/public/profile.controller.js';

const router = Router();

router.post('/create', authGuard, uploadImages, createListing);
router.get('/me', authGuard, getUserListings);
router.get('/search', searchBooks);
router.get('/user/:userId', getPublicUserListings);
router.get('/:id', optionalAuth, getListingById);
router.patch('/:id/edit', authGuard, uploadImages, updateListing);
router.delete('/:id', authGuard, deleteListing);
router.patch('/:id/status', authGuard, updateBookStatus);
router.patch('/:id/swap', authGuard, swapListing);

export default router;
