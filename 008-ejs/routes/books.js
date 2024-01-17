import { Router } from 'express';
import { store, Book } from '../store.js';
import fileMulter from '../middleware/fileMulter.js';

const booksRouter = Router();

// Вывод списка всех книг
booksRouter.get('/', (req, res) => {
  const { books } = store;

  res.render('books/index', {
    title: 'Все книги',
    books: books,
  });
});

// Вывод формы добавления новой книги
booksRouter.get('/create', (req, res) => {
  res.render('books/create', {
    title: 'Новая книга',
    book: new Book(),
    requiredBookFile: true,
  });
});

// Добавление новой книги
booksRouter.post('/create', fileMulter.single('fileBook'), (req, res) => { 
  if (req.file) {
    const { books } = store;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { path } = req.file;
  
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, path);
    books.push(newBook);
  
    res.redirect('/books');
  } else {
    res.redirect('/400');
  }
});

// Вывод информации по ID книги
booksRouter.get('/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const idx = books.findIndex(el => el.id === id);

  if (idx === -1) {
    res.redirect('/404');
  }

  res.render('books/view', {
    title: books[idx].title,
    book: books[idx],
  });
});

// Вывод формы редактирования книги
booksRouter.get('/update/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const idx = books.findIndex(el => el.id === id);


  if (idx === -1) {
    res.redirect('/404');
  } 

  res.render('books/update', {
    title: books[idx].title,
    book: books[idx],
    requiredBookFile: false,
  });
});

// Обновить книгу
booksRouter.post('/update/:id', fileMulter.single('fileBook'), (req, res) => { 
  const { books } = store;
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;

  const idx = books.findIndex(el => el.id === id);

  if (idx === -1) {
    res.redirect('/404');
  } 

  books[idx] = {
    ...books[idx], title, description, authors, favorite, fileCover, fileName
  }

  if (req.file) {
    const { path } = req.file;
    books[idx].fileBook = path;
  }

  res.redirect('/books');
});

export default booksRouter;
