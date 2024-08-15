const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");
const uploadFolder = paht.resolve(__dirname, "uploads");

const MULTER = {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-$${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  tmpFolder,
  uploadFolder,
  MULTER,
};
