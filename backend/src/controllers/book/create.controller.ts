import { z } from 'zod';
import fs from 'node:fs';
import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getBooksCollection } from '../../utils/collections.js';
import type { BookDoc } from '../../models/book.doc.js';
import {
  serverBookSchema,
  draftBookSchema,
} from '../../../../shared/schemas/book/create.schema.js';

export const createListing = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[] | undefined;

  try {
    const isDraft = req.body.status === 'draft';

    if (!files || files.length < 2) {
      if (files) files.forEach((f) => fs.unlinkSync(f.path));
      return res
        .status(400)
        .json({ message: 'At least 2 images are required' });
    }

    const schema = isDraft ? draftBookSchema : serverBookSchema;
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      files.forEach((f) => fs.unlinkSync(f.path));
      return res.status(400).json({
        message: 'Validation failed',
        errors: z.treeifyError(validation.error),
      });
    }

    const images = files.map((file) => `/uploads/${file.filename}`);
    const booksCollection = await getBooksCollection<BookDoc>();

    const newBook: BookDoc = {
      ...(validation.data as z.infer<typeof serverBookSchema>),
      ownerId: new ObjectId(req.userId),
      images,
      isSwapped: false,
      status: isDraft ? 'draft' : 'published',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await booksCollection.insertOne(newBook);

    res.status(201).json({
      message: 'Listing created successfully',
      book: { _id: result.insertedId },
    });
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
