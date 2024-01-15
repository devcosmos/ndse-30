import { Router } from 'express';
import { store } from '../store.js';

const booksRouter = Router();

// получить все книги
booksRouter.get('/', (req, res) => {
  const { books } = store;
  res.json(books);
});

// получить книгу по ID
booksRouter.get('/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404 | Книга не найдена');
  }
});

// создать книгу
booksRouter.post('/', (req, res) => {
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

// 	редактировать книгу по ID
booksRouter.put('/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;

  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    books[idx] = {
      ...books[idx], title, description, authors, favorite, fileCover, fileName
    }
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('404 | Книга не найдена');
  }
});

// удалить книгу по ID
booksRouter.delete('/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json('ok');
  } else {
    res.status(404);
    res.json('404 | Книга не найдена');
  }
});

export default booksRouter;
