import jwt from 'jsonwebtoken';
import z from 'zod';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { loginSchema } from '../../schemas/auth/login.schema.js';
import { getUsersCollection } from '../../utils/collections.js';
import type { Request, Response } from 'express';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: z.treeifyError(result.error),
      });
    }

    const { email, password } = result.data;
    const usersCollection = await getUsersCollection();

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id?.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id?.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
