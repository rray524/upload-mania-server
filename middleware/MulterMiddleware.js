const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const validFileTypes = /pdf|docx/; // Create regex to match jpg and png

  // Do the regex match to check if file extenxion match
  const extname = validFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  if (extname === true) {
    cb(null, true);
  } else {
    cb(new Error("only .pdf & .docx format files are allowed to upload"));
  }
};

const uploadMiddleware = multer({ storage, fileFilter });

module.exports = uploadMiddleware;
