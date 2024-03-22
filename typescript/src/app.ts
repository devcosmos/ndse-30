interface Book {
  id: number,
  title: string,
  description: string,
  authors: string,
  favorite: boolean,
  fileCover: string,
  fileName: string,
  fileBook: string,
  count: number,
}

abstract class BooksRepository {
  createBook(book: Book): void { // создание книги.
    console.log(`create ${book.title}`);
  }

  getBook(id: number): void { // получение книги по id.
    console.log(`get book by ${id}`);
  }

  getBooks(): void { // получение всех книг.
    console.log('get books');
  }

  updateBook(id: number): void { // обновление книги.
    console.log(`update book by ${id}`);
  }

  deleteBook(id: number): void { // удаление книги.
    console.log(`delete book by ${id}`);
  }
}
