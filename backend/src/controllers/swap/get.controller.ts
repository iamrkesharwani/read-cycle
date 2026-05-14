import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getSwapsCollection } from '../../utils/collections.js';

export const getMySwaps = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.userId);
    const swapsCollection = await getSwapsCollection();

    const swaps = await swapsCollection
      .aggregate([
        {
          $match: {
            $or: [{ proposerId: userId }, { receiverId: userId }],
          },
        },
        {
          $lookup: {
            from: 'books',
            localField: 'offeredBookId',
            foreignField: '_id',
            as: 'offeredBook',
          },
        },
        {
          $lookup: {
            from: 'books',
            localField: 'requestedBookId',
            foreignField: '_id',
            as: 'requestedBook',
          },
        },
        { $unwind: '$offeredBook' },
        { $unwind: '$requestedBook' },
        { $sort: { updatedAt: -1 } },
      ])
      .toArray();

    const received = swaps.filter(
      (s) => s.receiverId.toString() === userId.toString()
    );
    
    const sent = swaps.filter(
      (s) => s.proposerId.toString() === userId.toString()
    );

    res.status(200).json({ received, sent });
  } catch (error) {
    console.error('Error fetching swaps:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
