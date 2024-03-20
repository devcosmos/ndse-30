import multer, { diskStorage } from 'multer';

const storage = diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/public/books')
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const fileMulter = multer({storage});

export default fileMulter;
