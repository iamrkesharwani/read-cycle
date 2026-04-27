import type { Request, Response } from 'express';
import {
  updateUsernameSchema,
  usernameSchema,
} from '../../../../shared/schemas/auth/username.schema.js';
import { getUsersCollection } from '../../utils/collections.js';
import { ObjectId } from 'mongodb';

export const checkUsername = async (req: Request, res: Response) => {
  try {
    const result = usernameSchema.safeParse(req.query.username);
    if (!result.success) {
      return res.status(200).json({
        available: false,
        message: result.error.issues[0]?.message,
      });
    }

    const username = result.data.toLowerCase();
    const usersCollection = await getUsersCollection();
    const existing = await usersCollection.findOne({ username });

    return res.status(200).json({
      available: !existing,
      message: existing
        ? 'Username is already taken.'
        : 'Username is available!',
    });
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUsername = async (req: Request, res: Response) => {
  try {
    const result = updateUsernameSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0]?.message,
      });
    }

    const username = result.data.username.toLowerCase();
    const usersCollection = await getUsersCollection();

    const existing = await usersCollection.findOne({
      username,
      _id: { $ne: new ObjectId(req.userId) },
    });

    if (existing) {
      return res.status(409).json({ message: 'Username is already taken.' });
    }

    await usersCollection.updateOne(
      { _id: new ObjectId(req.userId) },
      { $set: { username } }
    );

    res.status(200).json({ message: 'Username updated', username });
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
