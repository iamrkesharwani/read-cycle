import { Router } from 'express';
import { registerUser } from '../controllers/auth/register.controller.js';
import { loginUser } from '../controllers/auth/login.controller.js';
import { authGuard } from '../middleware/auth.middleware.js';
import { getMe } from '../controllers/auth/me.controller.js';
import {
  checkUsername,
  updateUsername,
} from '../controllers/auth/username.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authGuard, getMe);
router.get('/username/check', checkUsername);
router.patch('/username', updateUsername);

export default router;
