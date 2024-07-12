const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileDescription: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  files: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    red: "User",
    required: true,
  },
});

module.exports = mongoose.model("Notes", NotesSchema);
