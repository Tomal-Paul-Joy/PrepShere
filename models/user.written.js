const mongoose = require("mongoose");

const writtenSchema = mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  images: {
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    image6: String,
    image7: String,
    image8: String,
  },
});

module.exports = mongoose.model("Written", writtenSchema);
