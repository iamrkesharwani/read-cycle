import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getBooksCollection } from '../../utils/collections.js';
import type { BookDoc } from '../../types/book.doc.js';

export const swapListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Valid listing ID is required' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid listing ID' });
    }

    const booksCollection = await getBooksCollection<BookDoc>();

    const result = await booksCollection.updateOne(
      {
        _id: new ObjectId(id),
        ownerId: new ObjectId(req.userId),
        isSwapped: false,
      },
      { $set: { isSwapped: true, status: 'inactive', updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Listing not found, unauthorized, or already swapped',
      });
    }

    res.status(200).json({ message: `Listing marked as swapped` });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
