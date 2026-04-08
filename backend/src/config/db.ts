import { Db, MongoClient } from 'mongodb';
import 'dotenv/config';

const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!url) {
  console.log('MongoDB URI not set');
  process.exit(1);
}

if (!dbName) {
  console.log('DB name is not set in database');
  process.exit(1);
}

const client = new MongoClient(url);
let db: Db;

export const connectDb = async (): Promise<Db> => {
  if (db) return db;
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const closeDb = async () => {
  await client.close();
  console.log('MongoDB connection closed');
};
