import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'node:path';
import { apiLimiter } from './middleware/rateLimit.middleware.js';
import cookieParser from 'cookie-parser';
import { connectDb } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import interestRoutes from './routes/interest.routes.js';
import swapRoutes from './routes/swap.routes.js';
import chatRoutes from './routes/chat.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { getMessagesCollection } from './utils/collections.js';
import { ObjectId } from 'mongodb';

const app = express();
const port = Number(process.env.PORT) || 5000;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use('/api', apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/chat', chatRoutes);

app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'uploads', 'books'))
);

const onlineUsers = new Map<string, Set<string>>();

io.on('connection', (socket) => {
  console.log('User connected to socket:', socket.id);

  socket.on(
    'join_chat',
    ({ swapId, userId }: { swapId: string; userId: string }) => {
      socket.join(swapId);
      socket.data.userId = userId;
      socket.data.swapId = swapId;

      if (!onlineUsers.has(swapId)) onlineUsers.set(swapId, new Set());
      onlineUsers.get(swapId)!.add(userId);

      socket.to(swapId).emit('partner_online', { userId, isOnline: true });
      console.log(`User ${socket.id} joined room: ${swapId}`);
    }
  );

  socket.on('typing_start', (data: { swapId: string }) => {
    socket.to(data.swapId).emit('display_typing', { isTyping: true });
  });

  socket.on('typing_stop', (data: { swapId: string }) => {
    socket.to(data.swapId).emit('display_typing', { isTyping: false });
  });

  socket.on('send_message', async (data) => {
    const { swapId, senderId, text, tempId } = data;

    try {
      const messagesCollection = await getMessagesCollection();

      const newMessage = {
        swapId: new ObjectId(swapId),
        senderId: new ObjectId(senderId),
        text: text,
        createdAt: new Date(),
      };

      const result = await messagesCollection.insertOne(newMessage);

      const savedMessage = {
        _id: result.insertedId.toString(),
        swapId,
        senderId,
        text,
        createdAt: newMessage.createdAt.toISOString(),
      };

      socket.emit('message_confirmed', { tempId, message: savedMessage });
      socket.to(swapId).emit('receive_message', savedMessage);
    } catch (error) {
      console.error('Socket Message Error:', error);
      socket.emit('message_error', { tempId, error: 'Failed to send message' });
    }
  });

  socket.on('disconnect', () => {
    const { userId, swapId } = socket.data as {
      userId?: string;
      swapId?: string;
    };

    if (userId && swapId) {
      onlineUsers.get(swapId)?.delete(userId);
      socket.to(swapId).emit('partner_online', { userId, isOnline: false });
    }
    
    console.log('User disconnected from socket');
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb();
    httpServer.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on port ${port}`);
      console.log(`Allowed CORS Origin: ${corsOrigin}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

startServer();
