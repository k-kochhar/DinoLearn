const axios = require("axios");

const generateRoadmapFromGemini = async (topic) => {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWeJDrQOtFE0U-_LhbPzuIIktjMY3E4E0";

  const prompt = `Create a 14-day roadmap for learning about "${topic}". Title each day and explain briefly.`;
  const res = await axios.post(url, {
    contents: [{ parts: [{ text: prompt }] }]
  });

  const text = res.data.candidates[0].content.parts[0].text;
  const lines = text.split("\n").filter(Boolean);
  const lessonTitles = lines.slice(0, 14).map(line => line.replace(/^\d+\.\s*/, ""));

  return {
    title: `${topic} Roadmap`,
    lessonTitles
  };
};

module.exports = { generateRoadmapFromGemini };
