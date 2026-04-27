import type { Request, Response } from 'express';
import { usernameSchema } from '../../../../shared/schemas/auth/update.schema.js';
import { getUsersCollection } from '../../utils/collections.js';
import { ObjectId } from 'mongodb';

const USERNAME_COOLDOWN_DAYS = 30;

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
    const result = usernameSchema.safeParse(req.body.username);
    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0]?.message,
      });
    }

    const usersCollection = await getUsersCollection();
    const currentUser = await usersCollection.findOne({
      _id: new ObjectId(req.userId),
    });

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (currentUser.usernameUpdatedAt) {
      const daysSinceUpdate =
        (Date.now() - new Date(currentUser.usernameUpdatedAt).getTime()) /
        (1000 * 60 * 60 * 24);

      if (daysSinceUpdate < USERNAME_COOLDOWN_DAYS) {
        const nextAvailable = new Date(currentUser.usernameUpdatedAt);
        nextAvailable.setDate(nextAvailable.getDate() + USERNAME_COOLDOWN_DAYS);
        return res.status(429).json({
          message: `You can only change your username once every ${USERNAME_COOLDOWN_DAYS} days.`,
          nextAvailableAt: nextAvailable.toISOString(),
        });
      }
    }

    const username = result.data.toLowerCase();
    const existing = await usersCollection.findOne({
      username,
      _id: { $ne: new ObjectId(req.userId) },
    });

    if (existing) {
      return res.status(409).json({ message: 'Username is already taken.' });
    }

    const usernameUpdatedAt = new Date();
    await usersCollection.updateOne(
      { _id: new ObjectId(req.userId) },
      { $set: { username, usernameUpdatedAt } }
    );

    res.status(200).json({
      message: 'Username updated',
      username,
      usernameUpdatedAt: usernameUpdatedAt.toISOString(),
    });
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
