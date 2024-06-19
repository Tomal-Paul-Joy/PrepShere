// models/video.js

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  iframeLink: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("video", videoSchema);
