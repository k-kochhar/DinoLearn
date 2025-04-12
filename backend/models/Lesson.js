const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  questions: [{ type: String, required: true }],
});

module.exports = mongoose.model('Lesson', lessonSchema);
