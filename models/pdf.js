const mongoose = require("mongoose");

const writtenSchema = mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  bookpic: {
    type: String, // Store the filename as a string
  },
  booklink: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Pdf", writtenSchema);
