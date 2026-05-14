import type { Request, Response } from 'express';
import { z } from 'zod';
import { getUsersCollection } from '../../utils/collections.js';
import { ObjectId } from 'mongodb';
import { bioSchema } from '../../../../shared/schemas/auth/update.schema.js';

export const updateBio = async (req: Request, res: Response) => {
  try {
    const result = bioSchema.safeParse(req.body.bio);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0]?.message });
    }

    const bio = result.data;
    const usersCollection = await getUsersCollection();

    await usersCollection.updateOne(
      { _id: new ObjectId(req.userId) },
      { $set: { bio } }
    );

    res.status(200).json({ message: 'Bio updated', bio });
  } catch (error) {
    console.error('Error updating bio:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
