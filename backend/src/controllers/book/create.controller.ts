import z from 'zod';
import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getBooksCollection } from '../../utils/collections.js';
import type { Book } from '../../types/book.js';
import { createBookSchema } from '../../schemas/book/create.schema.js';

export const createListing = async (req: Request, res: Response) => {
  try {
    const validation = createBookSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: z.treeifyError(validation.error),
      });
    }

    const { title, author, genre, condition, description } = validation.data;
    const booksCollection = await getBooksCollection();

    const newBook: Book = {
      ownerId: new ObjectId(req.userId),
      title,
      author,
      genre,
      condition,
      description,
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
