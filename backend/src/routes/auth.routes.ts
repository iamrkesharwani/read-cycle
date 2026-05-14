import { Router } from 'express';
import { authLimiter } from '../middleware/rateLimit.middleware.js';
import { registerUser } from '../controllers/auth/register.controller.js';
import { loginUser } from '../controllers/auth/login.controller.js';
import { authGuard } from '../middleware/auth.middleware.js';
import { getMe } from '../controllers/auth/me.controller.js';
import { updateName } from '../controllers/user/name.controller.js';
import { updateEmail } from '../controllers/user/email.controller.js';
import { updatePhone } from '../controllers/user/phone.controller.js';
import { updateCity } from '../controllers/user/city.controller.js';
import { updateBio } from '../controllers/user/bio.controller.js';
import { deleteAccount } from '../controllers/auth/delete.controller.js';
import { getPublicProfile } from '../controllers/user/profile.controller.js';
import {
  checkUsername,
  updateUsername,
} from '../controllers/user/username.controller.js';
import { logoutUser } from '../controllers/auth/logout.controller.js';

const router = Router();

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.post('/logout', logoutUser);
router.get('/profile/:username', getPublicProfile);
router.get('/me', authGuard, getMe);
router.get('/username/check', checkUsername);
router.patch('/name', authGuard, updateName);
router.patch('/email', authGuard, updateEmail);
router.patch('/username', authGuard, updateUsername);
router.patch('/phone', authGuard, updatePhone);
router.patch('/city', authGuard, updateCity);
router.patch('/bio', authGuard, updateBio);
router.delete('/account', authGuard, deleteAccount);

export default router;
