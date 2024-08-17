const multer = require("multer");
const path = require("path");

const storage =  multer.diskStorage({
    destination: function (req, file, cb) {
      let ext = path.extname(file.originalname);
      if (ext === ".pdf" || ext === ".docx" || ext === ".doc") {
        cb(null, path.join(__dirname, "../public/document"));
        return;
      }
      else cb(null, path.join(__dirname, "../public/image"));
    },
    filename: function (req, file, cb) {
      let ext = path.extname(file.originalname);
      if (ext === ".pdf" || ext === ".docx" || ext === ".doc") {
        cb(
          null,
          "Doc" +
            "_" +
            Math.floor(Math.random() * Date.now()).toString(16) +
            path.extname(file.originalname)
        );
        return;
      }
      else cb(
        null,
        "Img" +
          "_" +
          Math.floor(Math.random() * Date.now()).toString(16) +
          path.extname(file.originalname)
      );;
    },
  });

module.exports = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".doc" &&
      ext !== ".pdf" &&
      ext !== ".docx"
    ) {
      cb(new Error("unsupported fileype"), false);
      return;
    }
    cb(null, true);
  },

});
