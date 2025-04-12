"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MagnifyingGlassIcon, 
  ArrowPathIcon,
  AcademicCapIcon,
  TagIcon,
  ClockIcon,
  BookOpenIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";

export default function MyCourses() {
  // Sample course data with completion status
  const courses = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      category: "AI & Data Science",
      progress: 100,
      completedDate: "Mar 12, 2025",
      duration: "4 weeks",
      lessons: 24,
      certificationAvailable: true,
      icon: <AcademicCapIcon className="h-6 w-6" />
    },
    {
      id: 2,
      title: "Advanced JavaScript Patterns",
      category: "Web Development",
      progress: 100,
      completedDate: "Feb 28, 2025",
      duration: "3 weeks",
      lessons: 18,
      certificationAvailable: true,
      icon: <BookOpenIcon className="h-6 w-6" />
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      category: "Design",
      progress: 78,
      completedDate: null,
      duration: "6 weeks",
      lessons: 32,
      certificationAvailable: true,
      icon: <TagIcon className="h-6 w-6" />
    },
    {
      id: 4,
      title: "Mobile App Development with React Native",
      category: "App Development",
      progress: 62,
      completedDate: null,
      duration: "8 weeks",
      lessons: 40,
      certificationAvailable: false,
      icon: <BookOpenIcon className="h-6 w-6" />
    },
    {
      id: 5,
      title: "Python for Data Analysis",
      category: "Data Science",
      progress: 45,
      completedDate: null,
      duration: "5 weeks",
      lessons: 30,
      certificationAvailable: true,
      icon: <AcademicCapIcon className="h-6 w-6" />
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'in-progress'
  
  // Filter courses based on search query and completion status
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "completed") {
      return matchesSearch && course.progress === 100;
    } else if (filter === "in-progress") {
      return matchesSearch && course.progress < 100;
    }
    
    return matchesSearch;
  });

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
            <Link href="/my-courses" className="text-[#43587C] font-bold border-b-2 border-[#E17454] pb-1">My Courses</Link>
            <Link href="/create-course" className="text-[#2C3342] hover:text-[#E17454] transition-colors">Create Course</Link>
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
      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#43587C] mb-3">My Learning Journey</h1>
            <p className="text-[#2C3342]/70">Track your progress and revisit completed courses</p>
            <div className="h-1 w-20 bg-[#E17454]/20 rounded-full mt-4"></div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search your courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-[#2C3342] w-full py-3 px-10 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#2C3342]/10 focus:outline-none focus:border-[#E17454] focus:ring-2 focus:ring-[#E17454]/20"
              />
              <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#2C3342]/50" />
            </div>
            
            <div className="flex items-center bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#2C3342]/10 p-1">
              <button 
                className={`py-2 px-4 rounded-lg font-medium text-sm transition-all ${filter === 'all' ? 'bg-[#E17454] text-white' : 'text-[#2C3342] hover:bg-gray-100'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`py-2 px-4 rounded-lg font-medium text-sm transition-all ${filter === 'in-progress' ? 'bg-[#E17454] text-white' : 'text-[#2C3342] hover:bg-gray-100'}`}
                onClick={() => setFilter('in-progress')}
              >
                In Progress
              </button>
              <button 
                className={`py-2 px-4 rounded-lg font-medium text-sm transition-all ${filter === 'completed' ? 'bg-[#E17454] text-white' : 'text-[#2C3342] hover:bg-gray-100'}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
        
        {/* Course List */}
        <div className="space-y-6">
          {filteredCourses.map(course => (
            <div 
              key={course.id}
              className="bg-white rounded-xl p-6 shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-[#9EC1D9]/20 hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:border-[#E17454]/30 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Course Icon and Title */}
                <div className="flex items-center gap-5 flex-grow">
                  <div className="h-16 w-16 bg-[#9EC1D9]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[#43587C]">{course.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3342] mb-1">{course.title}</h3>
                    <p className="text-[#2C3342]/70 text-sm">{course.category}</p>
                  </div>
                </div>
                
                {/* Course Meta Info */}
                <div className="flex flex-wrap md:flex-nowrap gap-6 items-center">
                  <div className="flex items-center gap-1.5">
                    <ClockIcon className="h-4 w-4 text-[#2C3342]/60" />
                    <span className="text-sm text-[#2C3342]/70">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpenIcon className="h-4 w-4 text-[#2C3342]/60" />
                    <span className="text-sm text-[#2C3342]/70">{course.lessons} lessons</span>
                  </div>
                  
                  {/* Status Display */}
                  {course.progress === 100 ? (
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">
                        Completed
                      </span>
                      <span className="text-xs text-[#2C3342]/60">
                        {course.completedDate}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col min-w-[100px]">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[#2C3342]/70">Progress</span>
                        <span className="font-medium text-[#2C3342]">{course.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#E0E0E0] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#E17454] rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Action Button */}
                <div>
                  {course.progress === 100 ? (
                    <button className="min-w-[120px] bg-[#43587C] text-white py-2.5 px-5 rounded-lg hover:bg-[#374a70] transition-colors font-medium text-sm">
                      {course.certificationAvailable ? "View Certificate" : "Review Course"}
                    </button>
                  ) : (
                    <button className="min-w-[120px] bg-[#E17454] text-white py-2.5 px-5 rounded-lg hover:bg-[#cf6143] transition-colors font-medium text-sm flex items-center justify-center gap-1.5">
                      <ArrowPathIcon className="h-4 w-4" />
                      Continue
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
              <p className="text-[#2C3342] text-lg font-bold mb-4">No courses match your search criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setFilter("all");
                }}
                className="mt-2 bg-[#E17454] px-6 py-3 rounded-xl text-white hover:bg-[#cf6143] transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}