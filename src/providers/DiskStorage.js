const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/updload");

class DiskStorage {
  async savefile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadFolder, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
