import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getBooksCollection } from '../../utils/collections.js';
import { GENRES, CONDITIONS, type Book } from '../../types/book.js';

export const createListing = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, condition, description } = req.body;

    if (!GENRES.includes(genre)) {
      return res.status(400).json({ message: 'Invalid genre.' });
    }

    if (!CONDITIONS.includes(condition)) {
      return res.status(400).json({ message: 'Invalid condition.' });
    }

    const booksCollection = await getBooksCollection();

    const newBook: Book = {
      ownerId: new ObjectId(req.userId),
      title: title.trim(),
      author: author.trim(),
      genre,
      condition,
      description: description?.trim() || '',
      isSwapped: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await booksCollection.insertOne(newBook);

    res.status(201).json({
      message: 'Listing created successfully',
      bookId: result.insertedId,
    });
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
