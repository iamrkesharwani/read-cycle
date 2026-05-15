import type { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getMessagesCollection } from '../../utils/collections.js';

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { swapId } = req.params;

    if (typeof swapId !== 'string') {
      return res.json(400).json({ message: 'Swap ID needs to be a string' });
    }

    if (!ObjectId.isValid(swapId)) {
      return res.status(400).json({ message: 'Invalid Swap ID' });
    }

    const messagesCollection = await getMessagesCollection();

    const messages = await messagesCollection
      .find({ swapId: new ObjectId(swapId) })
      .sort({ createdAt: 1 })
      .toArray();

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
