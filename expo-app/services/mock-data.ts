// Mock data for development while backend is being fixed
import { LessonData, RoadmapData } from './api';

// Dinosaur Roadmap
export const dinosaurRoadmap: RoadmapData = {
  "topic": "Dinosaurs",
  "roadmap": [
    { "day": 1, "title": "What Are Dinosaurs?" },
    { "day": 2, "title": "The Triassic Period: The Rise Begins" },
    { "day": 3, "title": "The Jurassic Period: Giants Take Over" },
    { "day": 4, "title": "The Cretaceous Period: Peak Diversity" },
    { "day": 5, "title": "Famous Dinosaur Types: Herbivores vs Carnivores" },
    { "day": 6, "title": "Tyrannosaurus Rex and Other Apex Predators" },
    { "day": 7, "title": "How Dinosaurs Lived: Behavior and Ecosystems" },
    { "day": 8, "title": "Dinosaur Evolution and Adaptations" },
    { "day": 9, "title": "Fossils: How We Know What We Know" },
    { "day": 10, "title": "Theories Behind Dinosaur Extinction" },
    { "day": 11, "title": "Birds: The Living Dinosaurs" },
    { "day": 12, "title": "Dinosaur Myths and Pop Culture" },
    { "day": 13, "title": "Modern Paleontology and New Discoveries" },
    { "day": 14, "title": "Quiz Day: Test Your Dinosaur Knowledge" }
  ]
};

// Dinosaur Lessons
export const dinosaurLessons: Record<number, LessonData> = {
  1: {
    "topic": "Dinosaurs",
    "day": 1,
    "title": "What Are Dinosaurs?",
    "summary": "This lesson introduces dinosaurs, explaining what makes them unique among reptiles. You'll learn about their defining features, how they lived, and why they continue to fascinate scientists and the public today.",
    "lesson": [
      {
        "paragraph": "Dinosaurs were a diverse group of reptiles that lived during the Mesozoic Era, which lasted from about 252 to 66 million years ago. They ranged widely in size, from small chicken-sized creatures to enormous long-necked giants. Unlike other reptiles, dinosaurs had an upright stance, with legs positioned directly beneath their bodies, which made them more agile and powerful.",
        "question": {
          "prompt": "What physical trait helped set dinosaurs apart from other reptiles?",
          "options": [
            "Having flippers instead of legs",
            "Legs positioned directly beneath their bodies",
            "Cold-blooded metabolism",
            "Ability to fly"
          ],
          "answer": "Legs positioned directly beneath their bodies"
        }
      },
      {
        "paragraph": "The term 'dinosaur' comes from the Greek words 'deinos' meaning terrible, and 'sauros' meaning lizard. However, dinosaurs were not lizards. They were a unique group of reptiles with distinctive hips and limb structures. Some were herbivores, others were carnivores, and they adapted to a wide range of environments across the planet.",
        "question": {
          "prompt": "What does the word 'dinosaur' mean in Greek?",
          "options": [
            "Fast predator",
            "Old reptile",
            "Terrible lizard",
            "Big monster"
          ],
          "answer": "Terrible lizard"
        }
      },
      {
        "paragraph": "Dinosaurs lived during three major periods within the Mesozoic Era: the Triassic, Jurassic, and Cretaceous. During these times, they evolved and diversified into thousands of species. While some dinosaurs were fierce predators, others were peaceful plant-eaters, traveling in herds and caring for their young.",
        "question": {
          "prompt": "During which era did dinosaurs live?",
          "options": [
            "Cenozoic",
            "Mesozoic",
            "Paleozoic",
            "Precambrian"
          ],
          "answer": "Mesozoic"
        }
      },
      {
        "paragraph": "Dinosaurs continue to capture our imagination today due to their size, mystery, and the clues they left behind in the fossil record. Scientists study dinosaur bones, footprints, and other fossils to understand how they moved, what they ate, and how they might have behaved.",
        "question": {
          "prompt": "What do scientists study to learn about dinosaurs?",
          "options": [
            "Live recordings",
            "Ancient scrolls",
            "Fossils",
            "DNA samples"
          ],
          "answer": "Fossils"
        }
      }
    ]
  }
};

// Additional empty lesson templates for each day (to be filled with real content later)
for (let day = 2; day <= 14; day++) {
  const dayLesson = dinosaurRoadmap.roadmap.find(item => item.day === day);
  if (dayLesson) {
    dinosaurLessons[day] = {
      "topic": "Dinosaurs",
      "day": day,
      "title": dayLesson.title,
      "summary": `This is day ${day} of your dinosaur learning journey: ${dayLesson.title}. We'll explore this fascinating topic through interactive lessons.`,
      "lesson": [
        {
          "paragraph": `This is placeholder content for day ${day} of the dinosaur roadmap. When fully implemented, this will contain detailed information about "${dayLesson.title}".`,
          "question": {
            "prompt": `Sample question for day ${day}?`,
            "options": [
              "First option",
              "Second option",
              "Third option",
              "Fourth option"
            ],
            "answer": "Second option"
          }
        },
        {
          "paragraph": `Another placeholder paragraph for day ${day}. This would typically contain more information about "${dayLesson.title}".`,
          "question": {
            "prompt": `Another sample question for day ${day}?`,
            "options": [
              "Option A",
              "Option B",
              "Option C",
              "Option D"
            ],
            "answer": "Option C"
          }
        }
      ]
    };
  }
} 