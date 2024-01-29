import { Router } from 'express';
import { Book } from '../models/books.js';
import fileMulter from '../middleware/fileMulter.js';

const apiBooksRouter = Router();

// получить все книги
apiBooksRouter.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    
    res.json(books);
  } catch (e) {
    res.status(500).json(e);
  }
  
});

// получить книгу по ID
apiBooksRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    res.json(book);
  } catch (e) {
    res.status(500).json(e);
  }
});

// создать книгу
apiBooksRouter.post('/', fileMulter.single('fileBook'), async (req, res) => { 
  if (req.file) {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { path } = req.file;

    const newBook = new Book({ title, description, authors, favorite, fileCover, fileName, fileBook: path });
    
    try {
      await newBook.save();
      res.json(newBook);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(400).json('400 | Некорректный запрос');
  }
});

//	редактировать книгу по ID
apiBooksRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  
  const newBook = { title, description, authors, favorite, fileCover, fileName };
  
  if (req.file) {
    const { path } = req.file;
    newBook.fileBook = path;
  }

  try {
    await Book.findByIdAndUpdate(id, newBook);
    res.redirect(`/api/books/${id}`);
  } catch (e) {
    res.status(500).json(e);
  }
});

// удалить книгу по ID
apiBooksRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Book.deleteOne({_id: id });

    res.json('ok');
  } catch (e) {
    res.status(500).json(e);
  }
});

export default apiBooksRouter;
