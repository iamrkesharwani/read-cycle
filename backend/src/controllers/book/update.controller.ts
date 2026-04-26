import { z } from 'zod';
import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import fs from 'node:fs';
import { getBooksCollection } from '../../utils/collections.js';
import type { BookDoc } from '../../types/book.doc.js';
import { serverBookSchema } from '../../../../shared/schemas/book/create.schema.js';
import path from 'node:path';

export const updateListing = async (req: Request, res: Response) => {
  const newFiles = req.files as Express.Multer.File[] | undefined;

  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      newFiles?.forEach((f) => fs.unlinkSync(f.path));
      return res.status(400).json({ message: 'Valid listing ID is required' });
    }

    if (!ObjectId.isValid(id)) {
      newFiles?.forEach((f) => fs.unlinkSync(f.path));
      return res.status(400).json({ message: 'Invalid listing ID' });
    }

    const booksCollection = await getBooksCollection<BookDoc>();
    const book = await booksCollection.findOne({ _id: new ObjectId(id) });

    if (!book) {
      newFiles?.forEach((f) => fs.unlinkSync(f.path));
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (book.ownerId.toString() !== req.userId) {
      newFiles?.forEach((f) => fs.unlinkSync(f.path));
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const validation = serverBookSchema.safeParse(req.body);
    if (!validation.success) {
      newFiles?.forEach((f) => fs.unlinkSync(f.path));
      return res.status(400).json({
        message: 'Validation failed',
        errors: z.treeifyError(validation.error),
      });
    }

    const existingImages: string[] = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : [];

    const removedImages: string[] = book.images.filter(
      (img) => !existingImages.includes(img)
    );

    const newImagePaths = (newFiles ?? []).map((f) => `uploads/${f.filename}`);
    const finalImages = [...existingImages, ...newImagePaths];

    if (finalImages.length < 2) {
      newFiles?.forEach((f) => fs.unlinkSync(f.path));
      return res
        .status(400)
        .json({ message: 'At least 2 images are required' });
    }

    removedImages.forEach((imgPath) => {
      const fullPath = path.join(process.cwd(), 'public', imgPath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    });

    await booksCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...validation.data,
          images: finalImages,
          updatedAt: new Date(),
        },
      }
    );

    res.status(200).json({ message: 'Listing updated successfully' });
  } catch (error) {
    console.error('Update listing error:', error);
    newFiles?.forEach((f) => fs.unlinkSync(f.path));
    res.status(500).json({ message: 'Internal server error' });
  }
};
