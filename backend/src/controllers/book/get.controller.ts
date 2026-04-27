import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import {
  getBooksCollection,
  getUsersCollection,
} from '../../utils/collections.js';
import type { BookDoc } from '../../types/book.doc.js';

export const getListingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Valid listing ID is required' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid listing ID' });
    }

    const booksCollection = await getBooksCollection<BookDoc>();

    const [book] = await booksCollection
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: 'users',
            localField: 'ownerId',
            foreignField: '_id',
            as: 'owner',
            pipeline: [{ $project: { _id: 0, name: 1, username: 1 } }],
          },
        },
        {
          $addFields: {
            owner: { $arrayElemAt: ['$owner', 0] },
          },
        },
      ])
      .toArray();

    if (!book) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserListings = async (req: Request, res: Response) => {
  try {
    const booksCollection = await getBooksCollection<BookDoc>();
    const books = await booksCollection
      .find({ ownerId: new ObjectId(req.userId) })
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(books);
  } catch (error) {
    console.error('Fetch user listings error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
