import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getSwapsCollection } from '../../utils/collections.js';

export const getUserSwaps = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.userId);
    const { type } = req.body;
    const swapsCollection = await getSwapsCollection();

    const query =
      type === 'incoming' ? { receiverId: userId } : { proposerId: userId };

    const swaps = await swapsCollection
      .aggregate([
        { $match: query },
        { $sort: { createdAt: -1 } },
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
        { $unwind: { path: 'offeredBook', preserveNullAndEmptyArrays: true } },
        {
          $unwind: { path: '$requestedBook', preserveNullAndEmptyArrays: true },
        },
      ])
      .toArray();

    return res.status(200).json(swaps);
  } catch (error) {
    console.error('Fetch Swaps Error:', error);
    return res.status(500).json({ message: 'Failed to fetch swap history' });
  }
};
