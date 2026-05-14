import type { Request, Response } from 'express';
import {
  getBooksCollection,
  getInterestsCollection,
  getUsersCollection,
} from '../../utils/collections.js';
import { ObjectId } from 'mongodb';
import type { BookDoc } from '../../models/book.doc.js';
import type { InterestDoc } from '../../models/interest.doc.js';

export const getInterestedUsers = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const currentUserId = req.userId;

    if (typeof bookId !== 'string') {
      return res.json(400).json({ message: 'Not a valid book id' });
    }

    const booksCollection = await getBooksCollection<BookDoc>();
    const book = await booksCollection.findOne({ _id: new ObjectId(bookId) });

    if (!book || book.ownerId.toString() !== currentUserId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const interestsCollection = await getInterestsCollection<InterestDoc>();
    const interests = await interestsCollection
      .find({
        bookId: new ObjectId(bookId),
      })
      .toArray();

    const userIds = interests.map((i) => i.userId);
    const usersCollection = await getUsersCollection();

    const users = await usersCollection
      .find(
        { _id: { $in: userIds } },
        { projection: { name: 1, username: 1, city: 1 } }
      )
      .toArray();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
