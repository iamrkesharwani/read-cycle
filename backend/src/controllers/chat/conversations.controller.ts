import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getSwapsCollection } from '../../utils/collections.js';

export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.userId);
    const swapsCollection = await getSwapsCollection();

    const conversations = await swapsCollection
      .aggregate([
        {
          $match: {
            status: 'accepted',
            $or: [{ proposerId: userId }, { receiverId: userId }],
          },
        },
        {
          $lookup: {
            from: 'messages',
            localField: '_id',
            foreignField: 'swapId',
            as: 'allMessages',
            pipeline: [{ $sort: { createdAt: -1 } }, { $limit: 1 }],
          },
        },
        {
          $addFields: {
            lastMessage: { $arrayElemAt: ['$allMessages', 0] },
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
            allMessages: 0,
            'proposer.passwordHash': 0,
            'receiver.passwordHash': 0,
            'proposer.email': 0,
            'receiver.email': 0,
          },
        },
        {
          $sort: {
            'lastMessage.createdAt': -1,
            updatedAt: -1,
          },
        },
      ])
      .toArray();

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
