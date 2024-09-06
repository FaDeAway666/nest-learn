import * as multer from 'multer'
import * as fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('uploads')) {
      fs.mkdir('uploads', err => {
        if (err) {
          console.log(err)
          return
        }
      })
    }
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const suffix =
      Date.now().toString() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname
    console.log(suffix, 'suffix')
    cb(null, suffix)
  },
})

export default storage
