import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import {
  getBooksCollection,
  getSwapsCollection,
  getUsersCollection,
} from '../../utils/collections.js';

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.userId);
    const usersCollection = await getUsersCollection();
    const booksCollection = await getBooksCollection();
    const swapsCollection = await getSwapsCollection();

    await booksCollection.deleteMany({ ownerId: userId });

    await swapsCollection.updateMany(
      {
        $or: [{ proposerId: userId }, { receiverId: userId }],
        status: 'pending',
      },
      {
        $set: {
          status: 'canceled',
          updatedAt: new Date().toISOString(),
        },
      }
    );

    const result = await usersCollection.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Account and related data purged' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
