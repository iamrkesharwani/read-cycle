import type { Request, Response } from 'express';
import {
  getBooksCollection,
  getSwapsCollection,
} from '../../utils/collections.js';
import { ObjectId } from 'mongodb';
import type { BookDoc } from '../../models/book.doc.js';
import type { SwapDoc } from '../../models/swap.doc.js';

export const proposeSwap = async (req: Request, res: Response) => {
  try {
    const proposerId = req.userId;
    const { offeredBookId, requestedBookId } = req.body;

    if (!offeredBookId || !requestedBookId) {
      return res.status(400).json({ message: 'Both book IDs are required' });
    }

    const booksCollection = await getBooksCollection<BookDoc>();
    const swapsCollection = await getSwapsCollection();

    const [bookA, bookB] = await Promise.all([
      booksCollection.findOne({ _id: new ObjectId(offeredBookId) }),
      booksCollection.findOne({ _id: new ObjectId(requestedBookId) }),
    ]);

    if (!bookA || !bookB) {
      return res.status(404).json({ message: 'One or both books not found' });
    }

    if (bookA.ownerId.toString() !== proposerId) {
      return res
        .status(403)
        .json({ message: 'You can only offer your own books' });
    }

    if (bookB.ownerId.toString() === proposerId) {
      return res.status(400).json({ message: 'Self-swapping is not allowed' });
    }

    if (bookA.status !== 'published' || bookB.status !== 'published') {
      return res.status(400).json({ message: 'Both books must be active' });
    }

    const inFlightSwap = await swapsCollection.findOne({
      $or: [
        { offeredBookId: new ObjectId(offeredBookId) },
        { requestedBookId: new ObjectId(offeredBookId) },
      ],
      status: 'pending',
    });

    if (inFlightSwap) {
      return res.status(400).json({
        message:
          'The book you are offering is already part of a pending swap request.',
      });
    }

    const newSwap: Omit<SwapDoc, '_id'> = {
      proposerId: new ObjectId(proposerId),
      receiverId: bookB.ownerId,
      offeredBookId: new ObjectId(offeredBookId),
      requestedBookId: new ObjectId(requestedBookId),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await swapsCollection.insertOne(newSwap as any);

    res.status(201).json({
      message: 'Swap proposal sent!',
      swapId: result.insertedId,
    });
  } catch (error) {
    console.error('Swap Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
