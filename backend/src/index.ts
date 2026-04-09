import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDb } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb();
    console.log(`Server running on http://localhost:${port}`);
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

startServer();
