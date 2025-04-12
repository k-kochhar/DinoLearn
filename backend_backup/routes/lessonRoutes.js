const express = require('express');
const Lesson = require('../models/Lesson');
const router = express.Router();

// Get all lessons
router.get('/', async (req, res) => {
  const lessons = await Lesson.find();
  res.json(lessons);
});

// Get single lesson
router.get('/:id', async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  res.json(lesson);
});

module.exports = router;
