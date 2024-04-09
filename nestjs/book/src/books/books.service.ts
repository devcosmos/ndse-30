import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  getBooks(): string[] {
    return ['Book 1', 'Book 2'];
  }
}
