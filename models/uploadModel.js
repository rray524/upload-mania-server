const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    files: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Upload = mongoose.model("Upload", uploadSchema);
module.exports = Upload;
