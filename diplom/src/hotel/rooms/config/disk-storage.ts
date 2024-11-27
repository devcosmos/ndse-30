import { diskStorage } from 'multer';

const randomName = (originalname: string) => Date.now() + '_' + originalname;

export const storageConfig = diskStorage({
  destination: './uploads',
  filename: (_, file, cb) => {
    cb(null, randomName(file.originalname));
  },
});
