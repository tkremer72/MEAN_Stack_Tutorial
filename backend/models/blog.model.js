const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" ,required: true }
});

module.exports = mongoose.model('Blog', blogSchema);

