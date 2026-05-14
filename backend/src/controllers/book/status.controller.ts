import type { Request, Response } from 'express';
import {
  getBooksCollection,
  getSwapsCollection,
} from '../../utils/collections.js';
import type { BookDoc } from '../../models/book.doc.js';
import { ObjectId } from 'mongodb';

export const updateBookStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Valid listing ID is required' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid listing ID' });
    }

    const booksCollection = await getBooksCollection<BookDoc>();
    const swapsCollection = await getSwapsCollection();
    const bookId = new ObjectId(id);
    const userId = new ObjectId(req.userId);

    const result = await booksCollection.updateOne(
      { _id: bookId, ownerId: userId },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: 'Listing not found or unauthorized' });
    }

    if (status !== 'published') {
      await swapsCollection.updateMany(
        {
          $or: [{ offeredBookId: bookId }, { requestedBookId: bookId }],
          status: 'pending',
        },
        {
          $set: {
            status: 'canceled',
            updatedAt: new Date().toISOString(),
          },
        }
      );
    }

    res.status(200).json({ message: `Listing marked as ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
