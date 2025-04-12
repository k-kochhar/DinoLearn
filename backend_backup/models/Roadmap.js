const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
