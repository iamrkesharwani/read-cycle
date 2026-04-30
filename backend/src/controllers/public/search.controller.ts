import type { Request, Response } from 'express';
import { getBooksCollection } from '../../utils/collections.js';
import type { BookDoc } from '../../types/book.doc.js';

const escapeRegex = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const { q, genre, condition, city, page = '1', limit = '12' } = req.query;

    const pageNumber = Math.max(parseInt(page as string, 10) || 1, 1);
    const parsedLimit = parseInt(limit as string, 10);
    const limitNumber = Math.min(
      Math.max(isNaN(parsedLimit) ? 12 : parsedLimit, 1),
      50
    );
    const skip = (pageNumber - 1) * limitNumber;

    const booksCollection = await getBooksCollection<BookDoc>();

    const query: Record<string, unknown> = {
      status: 'published',
      isSwapped: false,
    };

    if (q && typeof q === 'string' && q.trim() !== '') {
      const safequery = escapeRegex(q.trim());
      const searchRegex = new RegExp(safequery, 'i');

      query.$or = [
        { title: searchRegex },
        { author: searchRegex },
        { genre: searchRegex },
        { description: searchRegex },
      ];
    }

    if (genre && typeof genre === 'string' && genre.trim() !== '') {
      query.genre = genre.trim();
    }

    if (condition && typeof condition === 'string' && condition.trim() !== '') {
      query.condition = condition.trim();
    }

    if (city && typeof city === 'string' && city.trim() !== '') {
      query.city = city.trim();
    }

    const [results, total] = await Promise.all([
      booksCollection
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .toArray(),

      booksCollection.countDocuments(query),
    ]);

    res.status(200).json({
      data: results,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
