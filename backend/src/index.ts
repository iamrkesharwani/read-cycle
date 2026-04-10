import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDb } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, '127.0.0.1', () => {
      console.log(`Server listening on http://127.0.0.1:${port}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

startServer();
