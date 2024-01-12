import express from 'express';
import { v4 as uuidv4 } from 'uuid';

class Book {
  constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uuidv4()) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.authors = authors;
      this.favorite = favorite;
      this.fileCover = fileCover;
      this.fileName = fileName;
  }
}

const store = {
  books: [
    new Book(
      'Человек-невидимка',
      'В этом романе описывается судьба английского учёного-медика, а впоследствии физика Гриффина, который изобрёл аппарат, делающий человека невидимым',
      'Герберта Уэллс',
      'true',
      'fileCover.jpg',
      'fileName.pdf',
    ),
  ],
};

const app = express();

app.use(express.json());

// авторизация пользователя
app.post('/api/user/login', (req, res) => {
  res.status(201)
  res.json({ id: 1, mail: "test@mail.ru" })
});

// получить все книги
app.get('/api/books', (req, res) => {
  const { books } = store;
  res.json(books);
});

// получить книгу по ID
app.get('/api/books/:id', (req, res) => {
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
app.post('/api/books', (req, res) => {
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

// 	редактировать книгу по ID
app.put('/api/books/:id', (req, res) => {
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
app.delete('/api/books/:id', (req, res) => {
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

app.listen(3000);
