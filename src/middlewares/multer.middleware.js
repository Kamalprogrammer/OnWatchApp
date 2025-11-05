import multer from "multer";

// cb means CallBack Function 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
    // file location to store 
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ 
    storage,
})