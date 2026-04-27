import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getUsersCollection } from '../../utils/collections.js';

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const usersCollection = await getUsersCollection();
    const result = await usersCollection.deleteOne({
      _id: new ObjectId(req.userId),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
