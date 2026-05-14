import type { Request, Response } from 'express';
import { getUsersCollection } from '../../utils/collections.js';
import { ObjectId } from 'mongodb';
import { citySchema } from '../../../../shared/schemas/auth/update.schema.js';

export const updateCity = async (req: Request, res: Response) => {
  try {
    const result = citySchema.safeParse(req.body.city);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0]?.message });
    }

    const city = result.data;
    const usersCollection = await getUsersCollection();

    await usersCollection.updateOne(
      { _id: new ObjectId(req.userId) },
      { $set: { city } }
    );

    res.status(200).json({ message: 'City updated', city });
  } catch (error) {
    console.error('Error updating city:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
