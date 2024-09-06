import multer from 'multer'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'api/books')
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()} ${file.originalname}`)
  }
})

export = multer({ storage })
