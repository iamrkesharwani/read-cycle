import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import {
  getSwapsCollection,
  getBooksCollection,
} from '../../utils/collections.js';
import type { BookDoc } from '../../types/book.doc.js';

export const updateSwapStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'ID must be a string' });
    }

    if (!id || !ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: 'Valid Swap Request ID is required' });
    }

    const swapsCollection = await getSwapsCollection();
    const booksCollection = await getBooksCollection<BookDoc>();

    const swap = await swapsCollection.findOne({ _id: new ObjectId(id) });

    if (!swap) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    const isProposer = swap.proposerId.toString() === userId;
    const isReceiver = swap.receiverId.toString() === userId;

    if (!isProposer && !isReceiver) {
      return res
        .status(403)
        .json({ message: 'Not authorized to modify this swap' });
    }

    if (status === 'accepted' && !isReceiver) {
      return res
        .status(403)
        .json({ message: 'Only the recipient can accept a swap' });
    }

    const finalStatus =
      status === 'canceled' || status === 'rejected' ? 'canceled' : status;

    if (finalStatus === 'accepted') {
      const bookIds = [
        new ObjectId(swap.offeredBookId),
        new ObjectId(swap.requestedBookId),
      ];

      const books = await booksCollection
        .find({
          _id: { $in: bookIds },
          isSwapped: false,
          status: 'published',
        })
        .toArray();

      if (books.length !== 2) {
        return res
          .status(400)
          .json({ message: 'One or both books are no longer available' });
      }

      await booksCollection.updateMany(
        { _id: { $in: bookIds } },
        {
          $set: {
            isSwapped: true,
            status: 'inactive',
            updatedAt: new Date(),
          },
        }
      );

      await swapsCollection.updateMany(
        {
          _id: { $ne: new ObjectId(id) },
          status: 'pending',
          $or: [
            { offeredBookId: { $in: bookIds } },
            { requestedBookId: { $in: bookIds } },
          ],
        },
        {
          $set: {
            status: 'canceled',
            updatedAt: new Date().toISOString(),
          },
        }
      );
    }

    await swapsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: finalStatus,
          updatedAt: new Date().toISOString(),
        },
      }
    );

    res.status(200).json({ message: `Swap request ${finalStatus}` });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
