import type { Request, Response } from 'express';
import { nameSchema } from '../../../../shared/schemas/auth/update.schema.js';
import { getUsersCollection } from '../../utils/collections.js';
import { ObjectId } from 'mongodb';

export const updateName = async (req: Request, res: Response) => {
  try {
    const result = nameSchema.safeParse(req.body.name);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0]?.message });
    }

    const name = result.data;
    const usersCollection = await getUsersCollection();

    await usersCollection.updateOne(
      { _id: new ObjectId(req.userId) },
      { $set: { name } }
    );

    res.status(200).json({ message: 'Name updated', name });
  } catch (error) {
    console.error('Error updating name:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
