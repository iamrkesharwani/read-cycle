import bcrypt from 'bcryptjs';
import { getUsersCollection } from '../utils/collections.js';
import type { User } from '../types/user.js';
import type { Request, Response } from 'express';
import { registerSchema } from '../schemas/auth.schema.js';

export const registerUser = async (req: Request, res: Response) => {
  const validatedData = registerSchema.parse(req.body);
  const { name, email, password, city } = validatedData;
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

  const result = await usersCollection.insertOne(newUser);

  res.status(201).json({
    message: 'User registered successfully',
    userId: result.insertedId,
  });
};
