import multer from "multer";

// cb means CallBack Function 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
    // as we have made folder in publi
    // c so where we want to save that file we can specify it here 
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // iska use unique id ke liye kya jaataa hei 

    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ 
    storage,
})