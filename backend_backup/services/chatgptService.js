const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateLessonContent = async (title) => {
  const prompt = `Generate an in-depth explanation and a quiz with 2 questions for a lesson titled "${title}". Include:
- Overview
- Two key questions`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const output = response.choices[0].message.content;
  const [overviewPart, ...questionsPart] = output.split("\n").filter(Boolean);

  return {
    title,
    overview: overviewPart.replace("Overview: ", ""),
    questions: questionsPart.map((line) => line.replace(/^\d+\.\s*/, "")),
  };
};

module.exports = { generateLessonContent };
