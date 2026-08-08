/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
   ChevronLeft,
   ChevronRight,
   Trophy,
   GraduationCap,
   Banknote,
   MapPin,
   ArrowRight,
} from "lucide-react";
import universitiesData from "@/data/universities_courses.json";
import { calculateAppScore } from "@/lib/utils";

export default function TopCoursesRanking() {
   const [topCourses, setTopCourses] = useState([]);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isHovered, setIsHovered] = useState(false);

   // 1. Process data on mount
   useEffect(() => {
      // Flatten all courses into a single array
      const allCourses = universitiesData.flatMap((uni) =>
         uni.courses_and_qualifications.map((course) => ({
            ...course,
            university_name: uni.university,
         })),
      );

      // Calculate scores, sort descending, and grab top 5
      const scoredCourses = allCourses
         .map((course) => ({
            ...course,
            app_score: calculateAppScore(course),
         }))
         .sort((a, b) => b.app_score - a.app_score)
         .slice(0, 5);

      setTopCourses(scoredCourses);
   }, []);

   // 2. Carousel Navigation Logic
   const nextSlide = useCallback(() => {
      setCurrentIndex((prevIndex) =>
         prevIndex === topCourses.length - 1 ? 0 : prevIndex + 1,
      );
   }, [topCourses.length]);

   const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex === 0 ? topCourses.length - 1 : prevIndex - 1,
      );
   };

   // 3. Auto-scroll Timer (5 seconds)
   useEffect(() => {
      if (topCourses.length === 0 || isHovered) return;

      const timer = setInterval(() => {
         nextSlide();
      }, 5000);

      return () => clearInterval(timer);
   }, [topCourses.length, isHovered, nextSlide]);

   if (topCourses.length === 0) return null; // Loading state fallback

   return (
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* SECTION HEADER */}
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-xl">
               <Trophy className="w-6 h-6" />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Top 5 Recommended Courses
               </h2>
               <p className="text-sm text-slate-500 dark:text-slate-400">
                  Ranked by affordability, ranking, and accessibility.
               </p>
            </div>
         </div>

         {/* HERO CAROUSEL WRAPPER */}
         <div
            className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
         >
            {/* SLIDER CONTAINER */}
            <div
               className="flex transition-transform duration-700 ease-out"
               style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
               {topCourses.map((course, index) => (
                  <div key={index} className="w-full shrink-0 relative">
                     {/* Background gradient & pattern */}
                     <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-slate-900 to-indigo-950 opacity-90" />
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />

                     <div className="relative px-6 py-12 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* LEFT CONTENT */}
                        <div className="w-full md:w-2/3 space-y-6">
                           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wide">
                              <span className="text-amber-400">#{index + 1}</span>
                              <span className="w-1 h-1 bg-white/30 rounded-full" />
                              App Score: {course.app_score}/100
                           </div>

                           <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                              {course.course_title}
                           </h3>

                           <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-300">
                              <div className="flex items-center gap-1.5">
                                 <MapPin className="w-4 h-4 text-blue-400" />
                                 {course.university_name}
                              </div>
                              <div className="flex items-center gap-1.5">
                                 <GraduationCap className="w-4 h-4 text-emerald-400" />
                                 {course.qualification_level}
                              </div>
                              <div className="flex items-center gap-1.5">
                                 <Banknote className="w-4 h-4 text-amber-400" />
                                 {course.tuition_fees_annual}
                              </div>
                           </div>

                           {course.scholarships_available?.length > 0 && (
                              <p className="text-sm text-blue-200 border-l-2 border-blue-500 pl-3">
                                 <strong>Scholarship Available:</strong>{" "}
                                 {course.scholarships_available[0]}
                              </p>
                           )}
                        </div>

                        {/* RIGHT ACTION */}
                        <div className="w-full md:w-1/3 flex md:justify-end">
                           <a
                              href={course.course_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-white/10"
                           >
                              View Official Program
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                           </a>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* MANUAL NAVIGATION CONTROLS */}
            <button
               onClick={prevSlide}
               className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors hidden md:block"
            >
               <ChevronLeft className="w-6 h-6" />
            </button>
            <button
               onClick={nextSlide}
               className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors hidden md:block"
            >
               <ChevronRight className="w-6 h-6" />
            </button>

            {/* DOT INDICATORS */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
               {topCourses.map((_, idx) => (
                  <button
                     key={idx}
                     onClick={() => setCurrentIndex(idx)}
                     className={`transition-all duration-300 rounded-full ${currentIndex === idx
                           ? "w-6 h-1.5 bg-blue-500"
                           : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                        }`}
                  />
               ))}
            </div>
         </div>
      </section>
   );
}
