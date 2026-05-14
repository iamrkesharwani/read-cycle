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
        {
          $lookup: {
            from: 'users',
            localField: 'proposerId',
            foreignField: '_id',
            as: 'proposer',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'receiverId',
            foreignField: '_id',
            as: 'receiver',
          },
        },
        { $unwind: '$offeredBook' },
        { $unwind: '$requestedBook' },
        { $unwind: '$proposer' },
        { $unwind: '$receiver' },
        {
          $project: {
            'proposer.password': 0,
            'proposer.email': 0,
            'receiver.password': 0,
            'receiver.email': 0,
          },
        },
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
