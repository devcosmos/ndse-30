import { v4 as uuidv4 } from 'uuid';

export class Book {
  constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", fileBook = "", id = uuidv4()) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.authors = authors;
      this.favorite = favorite;
      this.fileCover = fileCover;
      this.fileName = fileName;
      this.fileBook = fileBook;
  }
}

export const store = {
  books: [
    new Book(
      'Человек-невидимка',
      'В этом романе описывается судьба английского учёного-медика, а впоследствии физика Гриффина, который изобрёл аппарат, делающий человека невидимым',
      'Герберта Уэллс',
      'true',
      'fileCover.jpg',
      'fileName.pdf',
      'public/books/the-invisible-man.jpeg',
    ),
    new Book(
      'Машина времени',
      'Основная часть этого романа описывает мир будущего (802 701 год), в который отправляется Путешественник во Времени.',
      'Герберта Уэллс',
      'true',
      'fileCover.jpg',
      'fileName.pdf',
      'public/books/the-time-machine.jpeg',
    ),
  ],
};
