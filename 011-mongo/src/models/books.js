import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const bookSchema = new Schema({
  id: {
    type: 'string',
    default: uuidv4(),
  }, 
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
  }
});

export const Books = model('Books', bookSchema);
