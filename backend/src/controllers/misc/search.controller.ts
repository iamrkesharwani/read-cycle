import type { Request, Response } from 'express';
import { getBooksCollection } from '../../utils/collections.js';
import type { BookDoc } from '../../types/book.doc.js';

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const booksCollection = await getBooksCollection<BookDoc>();
    const searchRegex = new RegExp(q, 'i');
    const results = await booksCollection
      .find({
        status: 'published',
        $or: [
          { title: searchRegex },
          { author: searchRegex },
          { genre: searchRegex },
          { description: searchRegex },
        ],
      })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
