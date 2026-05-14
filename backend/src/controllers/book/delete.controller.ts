import fs from 'node:fs';
import path from 'node:path';
import { ObjectId } from 'mongodb';
import {
  getBooksCollection,
  getSwapsCollection,
  getInterestsCollection,
} from '../../utils/collections.js';
import type { BookDoc } from '../../types/book.doc.js';
import type { Request, Response } from 'express';

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Valid listing ID is required' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid listing ID' });
    }

    const booksCollection = await getBooksCollection<BookDoc>();
    const swapsCollection = await getSwapsCollection();
    const interestsCollection = await getInterestsCollection();

    const bookId = new ObjectId(id);

    const book = await booksCollection.findOne({ _id: bookId });
    if (!book) return res.status(404).json({ message: 'Listing not found' });

    if (book.ownerId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

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

    await interestsCollection.deleteMany({ bookId: bookId });

    book.images.forEach((imagePath) => {
      const fullPath = path.join(
        process.cwd(),
        'uploads',
        'books',
        path.basename(imagePath)
      );
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    await booksCollection.deleteOne({ _id: new ObjectId(id) });
    
    res.status(200).json({ message: 'Listing and images deleted' });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
