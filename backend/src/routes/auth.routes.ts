import { Router } from 'express';
import { registerUser } from '../controllers/auth/register.controller.js';
import { loginUser } from '../controllers/auth/login.controller.js';
import { authGuard } from '../middleware/auth.middleware.js';
import { getMe } from '../controllers/auth/me.controller.js';
import { updateName } from '../controllers/auth/name.controller.js';
import { updateEmail } from '../controllers/auth/email.controller.js';
import { updatePhone } from '../controllers/auth/phone.controller.js';
import { updateCity } from '../controllers/auth/city.controller.js';
import { updateBio } from '../controllers/auth/bio.controller.js';
import { deleteAccount } from '../controllers/auth/delete.controller.js';
import { getPublicProfile } from '../controllers/public/profile.controller.js';
import {
  checkUsername,
  updateUsername,
} from '../controllers/auth/username.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
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
