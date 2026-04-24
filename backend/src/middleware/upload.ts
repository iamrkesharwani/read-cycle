import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';

const uploadDir = 'uploads/books';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}.jpg`);
  },
});

export const uploadImages = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).array('images', 4);
