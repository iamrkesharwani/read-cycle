import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { getUsersCollection } from '../utils/collections.js';
import { ObjectId } from 'mongodb';

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return secret;
};

const envToken = getJwtSecret();

interface JwtPayload {
  userId: string;
}

export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication required. No session found.' });
  }

  try {
    const decoded = jwt.verify(token, envToken);

    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'userId' in decoded
    ) {
      const userIdStr = (decoded as JwtPayload).userId;

      const usersCollection = await getUsersCollection();
      const userExists = await usersCollection.findOne({
        _id: new ObjectId(userIdStr),
      });

      if (!userExists) {
        res.clearCookie('token');
        return res
          .status(401)
          .json({ message: 'User account no longer exists' });
      }

      req.userId = userIdStr;
      return next();
    }

    return res.status(401).json({ message: 'Invalid token payload' });
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, envToken);
    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'userId' in decoded
    ) {
      const userIdStr = (decoded as JwtPayload).userId;

      const usersCollection = await getUsersCollection();
      const userExists = await usersCollection.findOne({
        _id: new ObjectId(userIdStr),
      });

      if (userExists) {
        req.userId = userIdStr;
      } else {
        res.clearCookie('token');
      }
    }
    
    return next();
  } catch (error) {
    return next();
  }
};
