const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const ensureAuth = require("../middleware/ensureAuth");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuth, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuth,
  upload.single("avatar"),
  (req, res) => {
    console.log(req.file.filename);
    res.json();
  }
);

module.exports = usersRoutes;
