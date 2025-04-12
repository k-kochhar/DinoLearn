"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon, XCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function MonkeysLesson1() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [progress, setProgress] = useState(0);

  const handleAnswer = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const checkAnswer = (questionIndex) => {
    setRevealed(prev => ({ ...prev, [questionIndex]: true }));
    
    // Update progress when user answers a question
    const answeredCount = Object.keys(selectedAnswers).length;
    setProgress(Math.min(100, Math.round((answeredCount / lessonData.lesson.length) * 100)));
  };

  // Sample lesson data
  const lessonData = {
    "day": 1,
    "title": "Introduction to Monkeys",
    "summary": "This lesson introduces monkeys as fascinating primates, exploring their classification, global habitats, and unique physical traits. You'll learn about their social behaviors, distinguishing features, and problem-solving skills.",
    "lesson": [
      {
        "paragraph": "Monkeys are intriguing primates recognized for their playful nature and remarkable intelligence. They adapt well to diverse environments, from tropical rainforests to arid savannas, making them one of nature’s most versatile animal groups.",
        "question": {
          "prompt": "Which description best captures the nature of monkeys?",
          "options": [
            "Cold-blooded reptiles",
            "Intelligent, social primates",
            "Migratory birds",
            "Marine mammals"
          ],
          "answer": "Intelligent, social primates"
        }
      },
      {
        "paragraph": "These primates are divided into two major categories: Old World monkeys and New World monkeys. Old World monkeys inhabit Africa and Asia, while New World monkeys are primarily found in Central and South America.",
        "question": {
          "prompt": "Where are Old World monkeys primarily found?",
          "options": [
            "North America",
            "Africa and Asia",
            "Europe",
            "Antarctica"
          ],
          "answer": "Africa and Asia"
        }
      },
      {
        "paragraph": "Monkeys vary widely in size, from tiny marmosets to larger baboons, yet they often share similar features like expressive faces and agile movements. Many New World monkeys even have prehensile tails that aid in grasping branches.",
        "question": {
          "prompt": "Which feature is common among many New World monkeys?",
          "options": [
            "Non-prehensile tails",
            "Prehensile tails",
            "Feathers",
            "Scales"
          ],
          "answer": "Prehensile tails"
        }
      },
      {
        "paragraph": "Monkeys have demonstrated impressive problem-solving skills and adaptability in the wild. Their ability to use tools and learn from their environments has made them a focus of scientific study and a symbol of natural intelligence.",
        "question": {
          "prompt": "What behavior best demonstrates the intelligence of monkeys?",
          "options": [
            "Building elaborate nests",
            "Using tools to solve problems",
            "Hibernating during winter",
            "Migrating seasonally"
          ],
          "answer": "Using tools to solve problems"
        }
      }
    ]
  };
  

  const isCorrect = (questionIndex, option) => {
    return revealed[questionIndex] && selectedAnswers[questionIndex] === option && option === lessonData.lesson[questionIndex].question.answer;
  };

  const isIncorrect = (questionIndex, option) => {
    return revealed[questionIndex] && selectedAnswers[questionIndex] === option && option !== lessonData.lesson[questionIndex].question.answer;
  };

  const showCorrectAnswer = (questionIndex, option) => {
    return revealed[questionIndex] && option === lessonData.lesson[questionIndex].question.answer;
  };

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
              <span className="text-xl font-bold text-[#43587C]">DinoLearn</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-[#2C3342] hover:text-[#E17454] transition-colors">Dashboard</Link>
            <Link href="/courses" className="text-[#43587C] font-bold border-b-2 border-[#E17454] pb-1">My Courses</Link>
            <Link href="/library" className="text-[#2C3342] hover:text-[#E17454] transition-colors">Library</Link>
            <div className="flex items-center gap-2 bg-white py-1.5 px-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="h-9 w-9 bg-[#9EC1D9] rounded-full flex items-center justify-center">
                <span className="text-[#43587C] font-medium">KS</span>
              </div>
              <span className="text-[#2C3342] hidden sm:inline font-medium">Kshitij</span>
              <ChevronDownIcon className="h-4 w-4 text-[#2C3342]/70" />
            </div>
          </nav>
          
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white py-1.5 px-2 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="h-8 w-8 bg-[#9EC1D9] rounded-full flex items-center justify-center">
                <span className="text-[#43587C] font-medium">KS</span>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-[#2C3342]/70" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto pb-20 px-6">
        {/* Course Navigation */}
        <div className="flex justify-between items-center py-10">
          <Link href="/dashboard" className="flex items-center gap-2 text-[#43587C] hover:text-[#E17454] transition-colors">
            <ChevronLeftIcon className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[#2C3342] font-medium">Lesson {lessonData.day} of 14</span>
            <div className="h-2.5 w-32 bg-[#E0E0E0] rounded-full overflow-hidden ml-2">
              <div 
                className="h-full bg-[#E17454] rounded-full" 
                style={{ width: `${(lessonData.day / 14) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Lesson Title and Progress */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] mb-8">
          <div className="bg-[#43587C] rounded-t-3xl p-10 text-white">
            <h1 className="text-3xl font-bold mb-4">Lesson {lessonData.day}: {lessonData.title}</h1>
            <p className="text-white/90 leading-relaxed max-w-3xl">{lessonData.summary}</p>
          </div>
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-[#2C3342] font-medium">Your Progress</span>
              <span className="text-[#2C3342] font-bold">{progress}% Complete</span>
            </div>
            <div className="h-2.5 w-full bg-[#E0E0E0] rounded-full overflow-hidden mt-3">
              <div 
                className="h-full bg-[#E17454] rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="space-y-8">
          {lessonData.lesson.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] overflow-hidden">
              {/* Content Section */}
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-8 w-8 bg-[#9EC1D9]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#43587C] font-bold">{index + 1}</span>
                  </div>
                  <p className="text-[#2C3342] leading-relaxed">{section.paragraph}</p>
                </div>
                
                {/* Question Section */}
                <div className="ml-12 mt-8">
                  <div 
                    className="bg-[#F5F5F5] rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex === index ? null : index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-[#43587C] font-bold">Knowledge Check</h3>
                      <ChevronDownIcon 
                        className={`h-5 w-5 text-[#43587C] transition-transform ${activeQuestionIndex === index ? 'rotate-180' : ''}`} 
                      />
                    </div>
                  </div>
                  
                  {activeQuestionIndex === index && (
                    <div className="bg-white border border-gray-100 rounded-xl p-6 mt-3 shadow-sm">
                      <h4 className="font-medium text-[#2C3342] mb-4">{section.question.prompt}</h4>
                      <div className="space-y-3">
                        {section.question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex}
                            onClick={() => !revealed[index] && handleAnswer(index, option)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              selectedAnswers[index] === option 
                                ? 'border-[#43587C] bg-[#9EC1D9]/10' 
                                : 'border-gray-200 hover:border-[#9EC1D9]'
                            } ${
                              isCorrect(index, option) 
                                ? 'border-green-500 bg-green-50' 
                                : isIncorrect(index, option)
                                ? 'border-red-500 bg-red-50'
                                : showCorrectAnswer(index, option)
                                ? 'border-green-500 bg-green-50'
                                : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`h-5 w-5 rounded-full border ${
                                selectedAnswers[index] === option 
                                  ? 'border-[#43587C] bg-[#43587C]' 
                                  : 'border-gray-300'
                              } mr-3 flex-shrink-0`}>
                                {selectedAnswers[index] === option && (
                                  <div className="h-full w-full flex items-center justify-center">
                                    <div className="h-2 w-2 rounded-full bg-white"></div>
                                  </div>
                                )}
                              </div>
                              <span className={`${
                                isCorrect(index, option) || showCorrectAnswer(index, option)
                                  ? 'text-green-600 font-medium' 
                                  : isIncorrect(index, option)
                                  ? 'text-red-600 font-medium'
                                  : 'text-[#2C3342]'
                              }`}>
                                {option}
                              </span>
                              
                              {isCorrect(index, option) && (
                                <CheckCircleIcon className="h-5 w-5 text-green-500 ml-auto" />
                              )}
                              {isIncorrect(index, option) && (
                                <XCircleIcon className="h-5 w-5 text-red-500 ml-auto" />
                              )}
                              {!isCorrect(index, option) && !isIncorrect(index, option) && showCorrectAnswer(index, option) && (
                                <CheckCircleIcon className="h-5 w-5 text-green-500 ml-auto" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        {!revealed[index] ? (
                          <button 
                            onClick={() => checkAnswer(index)}
                            disabled={!selectedAnswers[index]}
                            className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                              selectedAnswers[index]
                                ? 'bg-[#E17454] text-white hover:bg-[#cf6143]'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            Check Answer
                          </button>
                        ) : (
                          <div className="text-[#2C3342] p-4 bg-[#F5F5F5] rounded-lg">
                            {selectedAnswers[index] === section.question.answer ? (
                              <p className="text-green-600 font-medium">Correct! Well done.</p>
                            ) : (
                              <p className="text-red-600 font-medium">Not quite. The correct answer is highlighted.</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Buttons */}
        <div className="mt-12 flex justify-between">
          <button 
            disabled={true}
            className="flex items-center gap-2 bg-white py-3 px-6 rounded-xl shadow-sm text-[#43587C]/50 font-medium opacity-60 cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <span>Previous Lesson</span>
          </button>
          
          <Link 
            href="/lessons/monkeys-101/2"
            className="flex items-center gap-2 bg-[#E17454] py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all text-white font-medium"
          >
            <span>Next Lesson</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </main>
    </div>
  );
} 