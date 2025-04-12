"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpenIcon, AcademicCapIcon, UserGroupIcon, LightBulbIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="bg-[#E5FCFF] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-[60px]">
        {/* Header */}
        <header className="flex justify-between items-center mb-24">
          <div className="flex items-center gap-3">
            <div className="h-15 w-15  rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <Image 
                src="/Head.png" 
                alt="Student learning online" 
                width={150} 
                height={150}
                className="rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
                priority
              />
            </div>
            <h1 className="text-2xl font-medium text-[#43587C]">DinoLearn</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#courses" className="text-[#2C3342] hover:text-[#E17454] transition-colors">Courses</a>
            <a href="#features" className="text-[#2C3342] hover:text-[#E17454] transition-colors">Features</a>
            <a href="#testimonials" className="text-[#2C3342] hover:text-[#E17454] transition-colors">Testimonials</a>
            <Link
              href="/login"
              className="rounded-xl px-5 py-2.5 text-white font-medium bg-[#E17454] hover:bg-[#cf6143] transition-colors"
            >
              Sign In
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="mb-32 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-8 text-[#43587C]">
              Unlock Your Learning<br/> Potential
            </h2>
            
            <p className="text-base leading-relaxed mb-12 text-[#2C3342]/80">
              DinoLearn provides interactive courses, expert instructors, and adaptive 
              learning paths to help you master new skills at your own pace. Join thousands
              of learners transforming their careers through education.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/dashboard"
                className="group flex items-center justify-center rounded-xl bg-[#E17454] px-8 py-3.5 text-white font-medium"
              >
                <span>Get Started</span>
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="flex justify-center rounded-xl px-8 py-3.5 text-[#E17454] font-medium bg-transparent border-2 border-[#E17454] hover:bg-[#E17454] hover:text-white transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="absolute -z-10 w-72 h-72 rounded-full bg-[#9EC1D9]/50 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative">
              <Image 
                src="/Reading.png" 
                alt="Student learning online" 
                width={500} 
                height={400}
                className="rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
                priority
              />

            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-32 py-12 px-8 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-[#43587C] mb-2">200+</h3>
              <p className="text-[#2C3342]/70">Expert Instructors</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-[#43587C] mb-2">500+</h3>
              <p className="text-[#2C3342]/70">Interactive Courses</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-[#43587C] mb-2">50k+</h3>
              <p className="text-[#2C3342]/70">Satisfied Students</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mb-32">
          <h2 className="text-3xl font-medium mb-4 text-[#43587C] text-center">Why Choose DinoLearn?</h2>
          <p className="text-center text-[#2C3342]/70 mb-16 max-w-2xl mx-auto">
            Our platform is designed to provide you with the best learning experience possible.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
              <div className="h-12 w-12 bg-[#9EC1D9] rounded-xl flex items-center justify-center mb-6">
                <AcademicCapIcon className="h-6 w-6 text-[#43587C]" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-[#43587C]">Adaptive Learning Paths</h3>
              <p className="text-[#2C3342]/70 leading-relaxed">
                Our AI-powered system adapts to your learning style and pace, creating a 
                personalized curriculum that maximizes your learning efficiency.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
              <div className="h-12 w-12 bg-[#9EC1D9] rounded-xl flex items-center justify-center mb-6">
                <UserGroupIcon className="h-6 w-6 text-[#43587C]" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-[#43587C]">Live Collaborative Sessions</h3>
              <p className="text-[#2C3342]/70 leading-relaxed">
                Connect with peers and instructors in real-time collaborative sessions 
                to solve problems together and enhance your understanding through discussion.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
              <div className="h-12 w-12 bg-[#9EC1D9] rounded-xl flex items-center justify-center mb-6">
                <LightBulbIcon className="h-6 w-6 text-[#43587C]" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-[#43587C]">Interactive Projects</h3>
              <p className="text-[#2C3342]/70 leading-relaxed">
                Apply your knowledge through hands-on projects and receive immediate 
                feedback to help you identify areas for improvement and growth.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
              <div className="h-12 w-12 bg-[#9EC1D9] rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-[#43587C]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4 text-[#43587C]">Certification Programs</h3>
              <p className="text-[#2C3342]/70 leading-relaxed">
                Earn industry-recognized certificates upon course completion to showcase 
                your skills and enhance your professional credentials.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="courses" className="mb-32 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-[#43587C]"></div>
          <div className="relative z-10 py-16 px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-6 text-white">Ready to Start Your Learning Journey?</h2>
            <p className="text-white/80 mb-12 max-w-2xl mx-auto">
              Join thousands of students who are already advancing their careers and personal growth with DinoLearn.
            </p>
            <Link
              href="/signup"
              className="inline-block rounded-xl bg-[#E17454] px-8 py-3.5 text-white font-medium hover:bg-[#cf6143] transition-colors"
            >
              Get Started For Free
            </Link>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section id="testimonials" className="mb-32">
          <h2 className="text-3xl font-medium mb-16 text-[#43587C] text-center">What Our Students Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-[#9EC1D9] flex items-center justify-center">
                  <span className="text-[#43587C] font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-medium">Jane Doe</h4>
                  <p className="text-sm text-[#2C3342]/70">Software Engineer</p>
                </div>
              </div>
              <p className="text-[#2C3342]/80 italic">
                &ldquo;DinoLearn transformed my career trajectory. The interactive courses and supportive community 
                helped me transition from a complete beginner to a confident software engineer in less than a year.&rdquo;
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-[#9EC1D9] flex items-center justify-center">
                  <span className="text-[#43587C] font-bold">JS</span>
                </div>
                <div>
                  <h4 className="font-medium">John Smith</h4>
                  <p className="text-sm text-[#2C3342]/70">Data Scientist</p>
                </div>
              </div>
              <p className="text-[#2C3342]/80 italic">
                &ldquo;The certification programs offered by DinoLearn are highly regarded in the industry. 
                Within weeks of completing my data science course, I received multiple job offers.&rdquo;
              </p>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="pt-12 border-t border-[#2C3342]/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 bg-[#43587C] rounded-full flex items-center justify-center">
                  <BookOpenIcon className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-medium text-[#43587C]">DinoLearn</span>
              </div>
              <p className="text-sm text-[#2C3342]/70">
                Empowering learners worldwide with accessible, high-quality education.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-[#2C3342]/70 hover:text-[#E17454]">Home</a></li>
                <li><a href="#courses" className="text-sm text-[#2C3342]/70 hover:text-[#E17454]">Courses</a></li>
                <li><a href="#features" className="text-sm text-[#2C3342]/70 hover:text-[#E17454]">Features</a></li>
                <li><a href="#testimonials" className="text-sm text-[#2C3342]/70 hover:text-[#E17454]">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-[#2C3342]/70 hover:text-[#E17454]">Blog</a></li>
                <li><a href="#" className="text-sm text-[#2C3342]/70 hover:text-[#E17454]">Support</a></li>
                <li><a href="#" className="text-sm text-[#2C3342]/70 hover:text-[#E17454]">Documentation</a></li>
                <li><a href="#" className="text-sm text-[#2C3342]/70 hover:text-[#E17454]">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Subscribe</h4>
              <p className="text-sm text-[#2C3342]/70 mb-4">Stay updated with our latest courses and offers.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-xl border border-[#2C3342]/10 focus:outline-none focus:border-[#E17454]"
                />
                <button className="bg-[#E17454] text-white px-4 py-2 rounded-r-xl hover:bg-[#cf6143] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center text-[#2C3342]/50 text-sm border-t border-[#2C3342]/10 pt-6 pb-2">
            © {new Date().getFullYear()} DinoLearn. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
