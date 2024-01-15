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

export const store = {
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
