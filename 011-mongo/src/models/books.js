import { model, Schema } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: 'string',
    require: true,
  },
  description: {
    type: 'string',
    require: true,
  },
  authors: {
    type: 'string',
    require: true,
  },
  favorite: {
    type: 'string',
    require: true,
  },
  fileCover: {
    type: 'string',
    require: true,
  },
  fileName: {
    type: 'string',
    require: true,
  },
  fileBook: {
    type: 'string',
    require: true,
  }
});

export const Book = model('Books', bookSchema);
