import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import z from 'zod';
import { getUsersCollection } from '../../utils/collections.js';
import type { Request, Response } from 'express';
import type { UserDocument } from '../../../../shared/types/user.js';
import { registerSchema } from '../../../../shared/schemas/auth/register.schema.js';
import { generateUsername } from '../../utils/username.js';

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error('JWT_SECRET is not defined in environment variables');
  return secret;
};

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
    const username = await generateUsername(name, (candidate) =>
      usersCollection.findOne({ username: candidate }).then(Boolean)
    );

    const newUser: UserDocument = {
      name,
      email,
      passwordHash,
      city,
      username,
      createdAt: new Date(),
    };

    const inserted = await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { userId: inserted.insertedId.toString() },
      getJwtSecret(),
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
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
