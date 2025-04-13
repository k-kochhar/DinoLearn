"use client";

import { useEffect, useState } from "react";

export default function IntroQuiz({ topic, onComplete }) {
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    if (topic) {
      setQuizQuestions([
        `What are the key concepts in ${topic}?`,
        `Explain the importance of ${topic} in real-world applications.`,
        `How does ${topic} compare to other similar technologies or approaches?`,
      ]);
    }
  }, [topic]);

  return (
    <div className="bg-white max-w-3xl mx-auto mt-10 p-8 rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-[#000000] mb-4">Quick Quiz</h2>
      <p className="text-[#000000]/80 mb-6">
        Before diving into the course, answer a few questions so we can tailor
        your learning experience.
      </p>

      <div className="text-left space-y-4 mb-6">
        {quizQuestions.map((q, index) => (
          <div key={index}>
            <p className="font-medium text-[#000000] mb-1">{q}</p>
            <input
              type="text"
              placeholder="Your answer..."
              className="w-full border border-gray-300 text-[#000000] rounded-lg px-4 py-2"
            />
          </div>
        ))}
      </div>

      <button
        className="py-3 px-6 bg-[#E17454] text-white rounded-xl hover:bg-[#cf6143] transition-colors"
        onClick={onComplete}
      >
        Submit Quiz
      </button>
    </div>
  );
}
