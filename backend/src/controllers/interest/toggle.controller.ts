import type { Request, Response } from 'express';
import {
  getBooksCollection,
  getInterestsCollection,
} from '../../utils/collections.js';
import type { BookDoc } from '../../types/book.doc.js';
import { ObjectId } from 'mongodb';

export const toggleInterest = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const userId = req.userId;

    if (typeof bookId !== 'string') {
      return res.json(400).json({ message: 'Not a valid book id' });
    }

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const interestsCollection = await getInterestsCollection();
    const booksCollection = await getBooksCollection<BookDoc>();

    const book = await booksCollection.findOne({ _id: new ObjectId(bookId) });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.ownerId.toString() === userId) {
      return res
        .status(400)
        .json({ message: 'Cannot express interest in your own listing' });
    }

    const query = {
      bookId: new ObjectId(bookId),
      userId: new ObjectId(userId),
    };

    const existing = await interestsCollection.findOne(query);

    if (existing) {
      await interestsCollection.deleteOne({ _id: existing._id });
      return res.status(200).json({ interested: false });
    }

    await interestsCollection.insertOne({
      ...query,
      createdAt: new Date(),
    });

    res.status(201).json({ interested: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
