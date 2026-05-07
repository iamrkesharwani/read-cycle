import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getSwapsCollection } from '../../utils/collections.js';

export const updateSwapStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Valid ID is required' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const swapsCollection = await getSwapsCollection();
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

    const finalStatus =
      status === 'canceled' || status === 'rejected' ? 'canceled' : status;

    await swapsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: finalStatus, updatedAt: new Date().toISOString() } }
    );

    res.status(200).json({ message: `Swap request ${finalStatus}` });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
