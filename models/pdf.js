const mongoose = require("mongoose");

const writtenSchema = mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  images: {
    image1: String,
    
  },
  booklink: { 
    type: String,
    require: true ,
  }
});

module.exports = mongoose.model("pdf", writtenSchema);
