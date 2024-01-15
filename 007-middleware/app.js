import express from 'express';
import userRouter from './routes/user.js';
import booksRouter from './routes/books.js';

const app = express();

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

app.listen(3000);
