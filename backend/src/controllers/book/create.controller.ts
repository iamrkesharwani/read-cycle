import z from 'zod';
import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getBooksCollection } from '../../utils/collections.js';
import { createBookSchema } from '../../../../shared/schemas/book/create.schema.js';
import type { BookDoc } from '../../types/book.doc.js';

export const createListing = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length < 2) {
      return res
        .status(400)
        .json({ message: 'At least 2 images are required' });
    }

    const validation = createBookSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: z.treeifyError(validation.error),
      });
    }

    const imageUrls = files.map((file) => `/uploads/${file.filename}`);
    const { title, author, genre, condition, description } = validation.data;
    const booksCollection = await getBooksCollection<BookDoc>();

    const newBook: BookDoc = {
      ownerId: new ObjectId(req.userId),
      title,
      author,
      genre,
      condition,
      description,
      imageUrls,
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
