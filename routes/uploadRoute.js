const express = require("express");
const {
  saveFile,
  createFile,
  deleteFile,
  updateFile,
} = require("../controllers/uploadController");
const protect = require("../middleware/authMiddleWare");
const uploadMiddleware = require("../middleware/MulterMiddleware");

const router = express.Router();

router.patch("/:id", protect, uploadMiddleware.single("file"), updateFile);
router.get("/", protect, saveFile);
router.delete("/:id", protect, deleteFile);

router.post("/", protect, uploadMiddleware.single("file"), createFile);

module.exports = router;
