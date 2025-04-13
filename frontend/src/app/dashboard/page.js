"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ClockIcon,
  StarIcon,
  BoltIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  CursorArrowRaysIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("recent");
  const [courses, setCourses] = useState([]);

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to redirect to create course page
  const generateCourse = () => {
    window.location.href = "/create-course";
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCourses = async () => {
    try{
      const response = await fetch(
        "https://dinobackend-930h.onrender.com/api/roadmaps",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic: topic.trim() }),
        }
      );
    }catch{

    }
    setCourses([
      {
        id: 1,
        title: "Introduction to Machine Learning",
        category: "AI & Data Science",
        progress: 45,
        icon: <CpuChipIcon className="h-6 w-6" />,
      },
      {
        id: 2,
        title: "Advanced JavaScript Patterns",
        category: "Web Development",
        progress: 78,
        icon: <RocketLaunchIcon className="h-6 w-6" />,
      },
      {
        id: 3,
        title: "UI/UX Design Fundamentals",
        category: "Design",
        progress: 23,
        icon: <CursorArrowRaysIcon className="h-6 w-6" />,
      },
      {
        id: 4,
        title: "Mobile App Development with React Native",
        category: "App Development",
        progress: 62,
        icon: <BoltIcon className="h-6 w-6" />,
      },
      {
        id: 5,
        title: "Python for Data Analysis",
        category: "Data Science",
        progress: 15,
        icon: <CpuChipIcon className="h-6 w-6" />,
      },
      {
        id: 6,
        title: "Modern Frontend Frameworks",
        category: "Web Development",
        progress: 90,
        icon: <RocketLaunchIcon className="h-6 w-6" />,
      },
      {
        id: 7,
        title: "Responsive Web Design Mastery",
        category: "Design",
        progress: 38,
        icon: <CursorArrowRaysIcon className="h-6 w-6" />,
      },
      {
        id: 8,
        title: "Cloud Computing Essentials",
        category: "Cloud",
        progress: 55,
        icon: <BoltIcon className="h-6 w-6" />,
      },
    ]);
  };

  useEffect(() => {
    getCourses();
  }, []);

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
              <span className="text-xl font-bold text-[#43587C]">
                DinoLearn
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/dashboard"
              className="text-[#43587C] font-bold border-b-2 border-[#E17454] pb-1"
            >
              Dashboard
            </Link>
            <Link
              href="/my-courses"
              className="text-[#2C3342] hover:text-[#E17454] transition-colors"
            >
              My Courses
            </Link>
            <Link
              href="/library"
              className="text-[#2C3342] hover:text-[#E17454] transition-colors"
            >
              Library
            </Link>
            <Link
              href="/create-course"
              className="text-[#2C3342] hover:text-[#E17454] transition-colors"
            >
              Create Course
            </Link>
            <div className="flex items-center gap-2 bg-white py-1.5 px-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="h-9 w-9 bg-[#9EC1D9] rounded-full flex items-center justify-center">
                <span className="text-[#43587C] font-medium">KS</span>
              </div>
              <span className="text-[#2C3342] hidden sm:inline font-medium">
                Kshitij
              </span>
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
      <main className="max-w-7xl mx-auto pb-16">
        {/* Top Quarter - Search Section */}
        <div className="h-[25vh] flex flex-col items-center justify-center px-6 mt-8">
          <div className="max-w-2xl w-full">
            <h1 className="text-3xl font-bold text-[#43587C] mb-8 text-center">
              What would you like to learn today?
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for courses, topics, or skills..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="text-[#2C3342] w-full py-4 px-12 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#2C3342]/10 focus:outline-none focus:border-[#E17454] focus:ring-2 focus:ring-[#E17454]/20"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/3 -translate-y-1/4 h-5 w-5 text-[#2C3342]/50" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E17454] hover:text-[#cf6143] transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom 3/4 - Main Card with Courses */}
        <div className="min-h-[75vh] px-6 mt-8">
          <div className="bg-white rounded-3xl pt-12 pb-16 px-10 md:px-12 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <div className="mb-12 flex flex-col md:flex-row md:justify-between items-center gap-6">
              <div>
                <h2 className="text-2xl font-bold text-[#2C3342] mb-3">
                  Your Learning Journey
                </h2>
                <p className="text-[#2C3342]/70">
                  Continue where you left off or explore new courses
                </p>
                <div className="h-1 w-20 bg-[#E17454]/20 rounded-full mt-4"></div>
              </div>
              <div className="flex items-center bg-[#F5F5F5] p-1.5 rounded-full">
                <button
                  className={`flex items-center gap-2 py-2.5 px-5 rounded-full font-medium transition-all ${
                    activeFilter === "recent"
                      ? "bg-[#E17454] text-white shadow-md"
                      : "text-[#43587C] hover:bg-[#E0E0E0]"
                  }`}
                  onClick={() => setActiveFilter("recent")}
                >
                  <ClockIcon className="h-5 w-5" />
                  <span>Recent</span>
                </button>
                <button
                  className={`flex items-center gap-2 py-2.5 px-5 rounded-full font-medium transition-all ${
                    activeFilter === "popular"
                      ? "bg-[#E17454] text-white shadow-md"
                      : "text-[#43587C] hover:bg-[#E0E0E0]"
                  }`}
                  onClick={() => setActiveFilter("popular")}
                >
                  <StarIcon className="h-5 w-5" />
                  <span>Popular</span>
                </button>
              </div>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-[#F5F5F5] rounded-xl p-7 border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] hover:translate-y-[-4px] hover:border-[#E17454] transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="h-14 w-14 bg-[#9EC1D9]/30 rounded-lg flex items-center justify-center mb-5">
                    <span className="text-[#43587C]">{course.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2.5 line-clamp-2 text-[#2C3342]">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#2C3342]/70 mb-6">
                    {course.category}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm mb-3 text-[#2C3342]">
                      <span className="font-medium">Progress</span>
                      <span className="font-bold text-[#2C3342]">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-[#E0E0E0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E17454] rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#2C3342] text-lg font-bold mb-4">
                  No courses match your search criteria.
                </p>

                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-4 bg-[#E17454] px-8 py-3.5 rounded-xl text-white hover:bg-[#cf6143] transition-colors font-medium"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={generateCourse}
                    className="mt-4 bg-[#43587C] px-8 py-3.5 rounded-xl text-white hover:bg-[#374a6b] transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <RocketLaunchIcon className="h-5 w-5" />
                    <span>Create New Course</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
