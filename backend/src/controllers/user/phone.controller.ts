import type { Request, Response } from 'express';
import { phoneSchema } from '../../../../shared/schemas/auth/update.schema.js';
import { getUsersCollection } from '../../utils/collections.js';
import { ObjectId } from 'mongodb';

export const updatePhone = async (req: Request, res: Response) => {
  try {
    const result = phoneSchema.safeParse(req.body.phone);
    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0]?.message,
      });
    }

    const phone = `91${result.data}`;
    const usersCollection = await getUsersCollection();

    await usersCollection.updateOne(
      { _id: new ObjectId(req.userId) },
      { $set: { phone } }
    );

    res.status(200).json({ message: 'Phone number updated', phone });
  } catch (error) {
    console.error('Error updating phone:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
