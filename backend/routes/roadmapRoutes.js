const express = require("express");
const Roadmap = require("../models/Roadmap");
const Lesson = require("../models/Lesson");
const { generateRoadmapFromGemini } = require("../services/geminiService");
const { generateLessonContent } = require("../services/chatgptService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { topic } = req.body;
    const roadmapData = await generateRoadmapFromGemini(topic);

    const lessons = await Promise.all(
      roadmapData.lessonTitles.map((title) => generateLessonContent(title))
    );

    const lessonDocs = await Lesson.insertMany(lessons);
    const lessonIds = lessonDocs.map((lesson) => lesson._id);

    const roadmap = new Roadmap({
      title: roadmapData.title,
      lessons: lessonIds
    });

    await roadmap.save();
    res.json(roadmap);
  } catch (err) {
    console.error("❌ Roadmap generation error:", err);  // <- more detailed log
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

router.get("/", async (req, res) => {
  const roadmaps = await Roadmap.find().populate("lessons");
  res.json(roadmaps);
});

module.exports = router;



// const express = require("express");
// const Roadmap = require("../models/Roadmap");
// const Lesson = require("../models/Lesson");
// const router = express.Router();

// async function generateLesson(title) {
//   // Call your larger model here
//   return {
//     title,
//     overview: `Overview of ${title}...`,
//     questions: [
//       `What is the main idea of ${title}?`,
//       `Why is ${title} important?`,
//     ],
//   };
// }

// async function generateRoadmap(topic) {
//   // Call your AI model here
//   return {
//     title: `${topic} Roadmap`,
//     lessonTitles: Array.from(
//       { length: 14 },
//       (_, i) => `${topic} Lesson ${i + 1}`
//     ),
//   };
// }

// // Create a roadmap
// router.post("/generate-roadmap", async (req, res) => {
//   const { topic } = req.body;
//   if (!topic) return res.status(400).json({ error: "Missing topic" });

//   // Step 1: Generate roadmap + lesson titles
//   const roadmapData = await generateRoadmap(topic);
//   const roadmap = new Roadmap({ title: roadmapData.title });
//   await roadmap.save();

//   // Step 2: Generate each lesson (overview + questions)
//   const lessonPromises = roadmapData.lessonTitles.map(async (title) => {
//     const { overview, questions } = await generateLesson(title);
//     const lesson = new Lesson({ title, overview, questions });
//     await lesson.save();
//     roadmap.lessons.push(lesson._id);
//     return lesson;
//   });

//   const lessons = await Promise.all(lessonPromises);
//   await roadmap.save();

//   res.status(201).json({
//     roadmap,
//     lessons,
//   });
// });

// // Get all roadmaps with populated lessons
// router.get("/", async (req, res) => {
//   const roadmaps = await Roadmap.find().populate("lessons");
//   res.json(roadmaps);
// });

// // Add a lesson to a roadmap
// router.post("/:id/add-lesson", async (req, res) => {
//   const { title, overview, questions } = req.body;
//   const lesson = new Lesson({ title, overview, questions });
//   await lesson.save();

//   const roadmap = await Roadmap.findById(req.params.id);
//   roadmap.lessons.push(lesson._id);
//   await roadmap.save();

//   res.status(201).json({ roadmap, addedLesson: lesson });
// });

// module.exports = router;
