import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'url';
import userRouter from './routes/user.js';
import booksRouter from './routes/books.js';
import apiBooksRouter from './routes/api-books.js';
import { error404, error400, error500 } from './middleware/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const URL_DB = process.env.MONGO_URL  + '/test';

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/api/user', userRouter);
app.use('/api/books', apiBooksRouter);
app.use('/books', booksRouter);
app.use('/400', error400);
app.use('/500', error500);
app.use(error404);

const connectDB = async (port, urlDB) => {
  try {
    await mongoose.connect(urlDB);
    app.listen(port);
  } catch (e) {
    console.log(e);
  }
} 

connectDB(PORT, URL_DB);
