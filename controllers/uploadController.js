const asyncHandler = require("express-async-handler");
const Upload = require("../models/uploadModel");

//**************** */ get uploaded files

const saveFile = asyncHandler(async (req, res) => {
  const allFiles = await Upload.find({ user: req.user.id });
  res.status(200).json(allFiles);
});

//*************** */ create a new file

const createFile = asyncHandler(async (req, res) => {
  const files = req.file.filename;

  // console.log(files);
  // console.log(req.body);

  await Upload.create({
    user: req.user.id,
    files,
  })
    .then((data) => {
      console.log("Uploaded Successfully...");
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});

//***************** */ delete a file
const deleteFile = asyncHandler(async (req, res) => {
  const file = await Upload.findById(req.params.id);
  // if file doesnt exist
  if (!file) {
    res.status(404);
    throw new Error("File not found");
  }
  // Match files to its user
  if (file.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await file.remove();
  res.status(200).json({ message: "File deleted." });
});

// ************** update file

const updateFile = asyncHandler(async (req, res) => {
  const file = req.file.filename;
  const files = await Upload.findById(req.params.id);
  const { id } = req.params;
  console.log(files, id);
  // if file doesnt exist
  if (!files) {
    res.status(404);
    throw new Error("File not found");
  }
  // Match product to its user
  if (files.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  // Update File
  const updatedFile = await Upload.findByIdAndUpdate(
    { _id: id },
    {
      files: file,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedFile);
});

module.exports = {
  saveFile,
  createFile,
  deleteFile,
  updateFile,
};
