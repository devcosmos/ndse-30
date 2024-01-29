import { Router } from 'express';
import { store, Book } from '../store.js';
import fileMulter from '../middleware/fileMulter.js';

const apiBooksRouter = Router();

// получить все книги
apiBooksRouter.get('/', (req, res) => {
  const { books } = store;
  res.json(books);
});

// получить книгу по ID
apiBooksRouter.get('/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    fetch(`${process.env.COUNTER_URL}/counter/${id}/incr`, { method: 'POST' })
      .then(response => response.text())
      .then(result => {
        books[idx].count = result;
        
        res.json(books[idx]);
      }).catch(() => {
        res.status(500);
        res.json('500 | Внутренняя ошибка сервера');
      });
  } else {
    res.status(404);
    res.json('404 | Книга не найдена');
  }
});

// создать книгу
apiBooksRouter.post('/', fileMulter.single('fileBook'), (req, res) => { 
  if (req.file) {
    const { books } = store;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { path } = req.file;
  
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, path);
    books.push(newBook);
  
    res.status(201);
    res.json(newBook);
  } else {
    res.status(400);
    res.json('400 | Некорректный запрос');
  }
});

// 	редактировать книгу по ID
apiBooksRouter.put('/:id', (req, res) => {
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
apiBooksRouter.delete('/:id', (req, res) => {
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

// получить файл книги по ID
apiBooksRouter.get('/:id/download', (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.download(books[idx].fileBook);
  } else {
    res.status(404);
    res.json('404 | Книга не найдена');
  }
});

export default apiBooksRouter;
