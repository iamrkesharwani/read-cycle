import { getUsersCollection } from '../../utils/collections.js';
import { getBooksCollection } from '../../utils/collections.js';
import { ObjectId } from 'mongodb';
import type { Request, Response } from 'express';
import type { BookDoc } from '../../types/book.doc.js';

export const getPublicProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    if (typeof username !== 'string') {
      return res.status(400).json({ message: 'Invalid username' });
    }

    const usersCollection = await getUsersCollection();

    const user = await usersCollection.findOne(
      { username: username.toLowerCase() },
      {
        projection: {
          _id: 1,
          name: 1,
          username: 1,
          bio: 1,
          city: 1,
          createdAt: 1,
        },
      }
    );

    if (!user) {
      console.log(`User ${username} not found in DB`);
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPublicUserListings = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (typeof userId !== 'string') {
      return res.status(400).json({ message: 'Invalid username' });
    }

    const booksCollection = await getBooksCollection<BookDoc>();

    const books = await booksCollection
      .find({
        ownerId: new ObjectId(userId),
        status: 'published',
        isSwapped: false,
      })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
