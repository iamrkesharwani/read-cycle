import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import {
  getBooksCollection,
  getSwapsCollection,
  getUsersCollection,
  getInterestsCollection,
} from '../../utils/collections.js';
import type { BookDoc } from '../../models/book.doc.js';
import path from 'node:path';
import fs from 'node:fs';

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.userId);
    const usersCollection = await getUsersCollection();
    const booksCollection = await getBooksCollection<BookDoc>();
    const swapsCollection = await getSwapsCollection();
    const interestsCollection = await getInterestsCollection();

    const userBooks = await booksCollection.find({ ownerId: userId }).toArray();

    for (const book of userBooks) {
      if (book.images && Array.isArray(book.images)) {
        book.images.forEach((imagePath) => {
          const fileName = path.basename(imagePath);
          const fullPath = path.join(
            process.cwd(),
            'uploads',
            'books',
            fileName
          );

          try {
            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath);
            }
          } catch (error) {
            console.error(`Failed to delete image file: ${fullPath}`, error);
          }
        });
      }
    }

    await booksCollection.deleteMany({ ownerId: userId });

    await interestsCollection.deleteMany({
      $or: [
        { userId: userId },
        { bookId: { $in: userBooks.map((b) => b._id) } },
      ],
    });

    await swapsCollection.updateMany(
      {
        $or: [{ proposerId: userId }, { receiverId: userId }],
        status: 'pending',
      },
      {
        $set: {
          status: 'canceled',
          updatedAt: new Date().toISOString(),
        },
      }
    );

    const result = await usersCollection.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Account and related data purged' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
