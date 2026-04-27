import type { Request, Response } from 'express';
import { getUsersCollection } from '../../utils/collections.js';
import { ObjectId } from 'mongodb';
import { emailSchema } from '../../../../shared/schemas/auth/update.schema.js';

export const updateEmail = async (req: Request, res: Response) => {
  try {
    const result = emailSchema.safeParse(req.body.email);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0]?.message });
    }

    const email = result.data;
    const usersCollection = await getUsersCollection();

    const existing = await usersCollection.findOne({
      email,
      _id: { $ne: new ObjectId(req.userId) },
    });

    if (existing) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }

    await usersCollection.updateOne(
      { _id: new ObjectId(req.userId) },
      { $set: { email } }
    );

    res.status(200).json({ message: 'Email updated', email });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
