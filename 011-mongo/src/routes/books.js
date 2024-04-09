import { Router } from 'express';
import fileMulter from '../middleware/fileMulter.js';
import { Book } from '../models/books.js';
import { container } from '../container.js';

const booksRouter = Router();

// Вывод списка всех книг
booksRouter.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    
    res.render('books/index', {
      title: 'Все книги',
      books: books,
    });
  } catch (e) {
    res.redirect('/500');
  }
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
booksRouter.post('/create', fileMulter.single('fileBook'), async (req, res) => { 
  if (req.file) {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { path } = req.file;

    const newBook = new Book({ title, description, authors, favorite, fileCover, fileName, fileBook: path });
    
    try {
      await newBook.save();
      res.redirect('/books');
    } catch (e) {
      res.redirect('/500');
    }
  } else {
    res.redirect('/400');
  }
});

// Вывод информации по ID книги
booksRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const repo = container.get(BooksRepository);

  try {
    const book = await repo.findById(id).select('-__v');

    res.render('books/view', {
      title: book.title,
      book: JSON.parse(JSON.stringify(book)),
    });
  } catch (e) {
    res.redirect('/500');
  }
});

// Вывод формы редактирования книги
booksRouter.get('/update/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).select('-__v');

    res.render('books/update', {
      title: book.title,
      book: JSON.parse(JSON.stringify(book)),
      requiredBookFile: false,
    });
  } catch (e) {
    res.redirect('/500');
  }
});

// Обновить книгу
booksRouter.post('/update/:id', fileMulter.single('fileBook'), async (req, res) => { 
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;

  const newBook = { title, description, authors, favorite, fileCover, fileName };
  
  if (req.file) {
    const { path } = req.file;
    newBook.fileBook = path;
  }

  try {
    await Book.findByIdAndUpdate(id, newBook);
    res.redirect('/books');
  } catch (e) {
    res.redirect('/500');
  }
});

export default booksRouter;
