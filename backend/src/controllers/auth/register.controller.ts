import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import z from 'zod';
import { getUsersCollection } from '../../utils/collections.js';
import type { User } from '../../types/user.js';
import type { Request, Response } from 'express';
import { registerSchema } from '../../schemas/auth/register.schema.js';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: z.treeifyError(result.error),
      });
    }

    const { name, email, password, city } = result.data;
    const usersCollection = await getUsersCollection();

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: User = {
      name,
      email,
      passwordHash,
      city,
      createdAt: new Date(),
    };

    const inserted = await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { userId: inserted.insertedId.toString() },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: inserted.insertedId.toString(),
        name: newUser.name,
        email: newUser.email,
        city: newUser.city,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
