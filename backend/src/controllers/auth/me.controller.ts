import { ObjectId } from 'mongodb';
import { getUsersCollection } from '../../utils/collections.js';
import type { Request, Response } from 'express';

export const getMe = async (req: Request, res: Response) => {
  try {
    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne(
      { _id: new ObjectId(req.userId) },
      { projection: { passwordHash: 0 } }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      city: user.city,
      username: user.username,
      usernameUpdatedAt: user.usernameUpdatedAt,
      phone: user.phone,
      bio: user.bio,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Error in /me route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
