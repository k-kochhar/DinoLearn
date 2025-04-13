"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import IntroQuiz from "../../../../components/IntroQuiz";

export default function RoadmapPage() {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedLessons, setExpandedLessons] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const toggleLesson = (lessonId) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        if (id.startsWith("demo-")) {
          const demoData = localStorage.getItem(`demoRoadmap-${id}`);
          if (demoData) {
            setRoadmap(JSON.parse(demoData));
            setLoading(false);
            return;
          }
        }

        const response = await fetch(`http://localhost:5000/api/roadmaps`);

        if (!response.ok) {
          throw new Error("Failed to fetch roadmaps");
        }

        const roadmaps = await response.json();
        const foundRoadmap = roadmaps.find((r) => r._id === id);

        if (foundRoadmap) {
          setRoadmap(foundRoadmap);
        } else {
          setError("Roadmap not found");
        }
      } catch (err) {
        console.error("Error fetching roadmap:", err);
        setError("Failed to load roadmap. " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E5FCFF] flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="h-12 w-12 text-[#E17454] animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-[#000000]">
            Loading your learning journey...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#E5FCFF] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#000000] mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-[#2C3342]/70 mb-8">{error}</p>
          <Link
            href="/create-course"
            className="inline-block bg-[#E17454] text-white py-3 px-6 rounded-xl hover:bg-[#cf6143] transition-colors"
          >
            Create a New Roadmap
          </Link>
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-[#E5FCFF] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#000000] mb-4">
            Roadmap Not Found
          </h2>
          <p className="text-[#2C3342]/70 mb-8">
            We couldn&apos;t find the roadmap you&apos;re looking for.
          </p>
          <Link
            href="/create-course"
            className="inline-block bg-[#E17454] text-white py-3 px-6 rounded-xl hover:bg-[#cf6143] transition-colors"
          >
            Create a New Roadmap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E5FCFF]">
      {/* Header */}
      <header className="bg-[#E5FCFF] py-5 px-6 border-b border-[#9EC1D9]/30 shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <Image
                  src="/Head.png"
                  alt="DinoLearn logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-[#000000]">
                DinoLearn
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-6">
        {!quizCompleted ? (
          <IntroQuiz
            topic={roadmap.title}
            onComplete={() => setQuizCompleted(true)}
          />
        ) : (
          <>
            {/* Top Section */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <span className="px-4 py-1.5 bg-[#9EC1D9]/20 text-[#000000] rounded-full text-sm font-medium mb-4 inline-block">
                    14-Day Learning Path
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#000000] mb-2">
                    {roadmap.title}
                  </h1>
                  <div className="h-1 w-20 bg-[#E17454]/20 rounded-full mt-4"></div>
                </div>

                <div className="flex gap-4">
                  <button className="py-3 px-6 rounded-xl border border-[#E17454] text-[#E17454] font-medium hover:bg-[#E17454] hover:text-white transition-colors">
                    Save to My Courses
                  </button>
                  <button className="py-3 px-6 rounded-xl bg-[#E17454] text-white font-medium hover:bg-[#cf6143] transition-colors">
                    Begin Learning
                  </button>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="bg-white rounded-xl p-6 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#2C3342] mb-1">
                      Progress Overview
                    </h2>
                    <p className="text-[#2C3342]/70">
                      {roadmap.lessons.length} lessons • Estimated completion: 2
                      weeks
                    </p>
                  </div>

                  <div className="flex flex-col w-full md:w-1/3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[#2C3342]">
                        0% Complete
                      </span>
                      <span className="text-sm text-[#2C3342]/70">
                        0/{roadmap.lessons.length} lessons
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#E0E0E0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E17454] rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lessons */}
            <div className="space-y-4">
              {roadmap.lessons.map((lesson, index) => (
                <div
                  key={lesson._id}
                  className="bg-white rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.05)] overflow-hidden"
                >
                  <div
                    className="p-6 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleLesson(lesson._id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-[#9EC1D9]/20 flex items-center justify-center text-[#000000]">
                        <BookOpenIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#2C3342]">
                          Day {index + 1}: {lesson.title}
                        </h3>
                      </div>
                    </div>

                    <button className="p-2 rounded-full hover:bg-[#F5F5F5] transition-colors">
                      {expandedLessons[lesson._id] ? (
                        <ChevronDownIcon className="h-5 w-5 text-[#2C3342]" />
                      ) : (
                        <ChevronRightIcon className="h-5 w-5 text-[#2C3342]" />
                      )}
                    </button>
                  </div>

                  {expandedLessons[lesson._id] && (
                    <div className="px-6 pb-6 border-t border-[#E0E0E0] pt-4">
                      <div className="mb-4">
                        <h4 className="text-lg font-medium text-[#000000] mb-2">
                          Overview
                        </h4>
                        <p className="text-[#2C3342]/80">{lesson.overview}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-[#000000] mb-2">
                          Key Questions
                        </h4>
                        <ul className="space-y-2">
                          {lesson.questions.map((question, qIndex) => (
                            <li key={qIndex} className="flex items-start gap-2">
                              <CheckCircleIcon className="h-5 w-5 text-[#E17454] flex-shrink-0 mt-0.5" />
                              <span className="text-[#2C3342]/80">
                                {question}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6">
                        <Link
                          href={`/lesson/${lesson._id}`}
                          className="inline-flex items-center gap-1.5 py-2.5 px-5 rounded-lg bg-[#000000] text-white font-medium hover:bg-[#374a70] transition-colors"
                        >
                          Start Lesson
                          <ChevronRightIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
