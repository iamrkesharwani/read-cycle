import fs from 'node:fs';
import path from 'node:path';
import { ObjectId } from 'mongodb';
import { getBooksCollection } from '../../utils/collections.js';
import type { BookDoc } from '../../types/book.doc.js';
import type { Request, Response } from 'express';

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Valid listing ID is required' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid listing ID' });
    }

    const booksCollection = await getBooksCollection<BookDoc>();
    const book = await booksCollection.findOne({ _id: new ObjectId(id) });
    if (!book) return res.status(404).json({ message: 'Listing not found' });

    if (book.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    book.images.forEach((imagePath) => {
      const fullPath = path.join(process.cwd(), 'public', imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    await booksCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Listing and images deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
