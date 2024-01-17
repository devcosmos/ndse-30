import express from 'express';
import userRouter from './routes/user.js';
import booksRouter from './routes/books.js';
import apiBooksRouter from './routes/api-books.js';
import { error404, error400 } from './middleware/error.js';

const app = express();

app.set('view engine', 'ejs');

app.use('/api/user', userRouter);
app.use('/api/books', apiBooksRouter);
app.use('/books', booksRouter);
app.use('/400', error400);
app.use(error404);

app.listen(3000);
