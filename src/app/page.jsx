"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  ArrowRight,
  ChevronRight,
  Globe,
  Sparkles,
} from "lucide-react";
import TopCoursesRanking from "@/components/TopCoursesRanking";
import CourseCard from "@/components/CourseCard";
import universitiesData from "@/data/universities_courses.json";
import Image from "next/image";

// High-quality open-source institutional imagery for the bottom showcase
const UNIVERSITY_IMAGES = {
  "Adelaide University":
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
  "The University of Melbourne":
    "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
  "The University of Sydney":
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
  "The University of Auckland":
    "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
  "Trinity College Dublin":
    "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80",
};

export default function HomePage() {
  const [activeUniIndex, setActiveUniIndex] = useState(0);

  // Auto-scroll showcase feature for the bottom university section (every 3 seconds)
  useEffect(() => {
    if (!universitiesData || universitiesData.length === 0) return;

    const timer = setInterval(() => {
      setActiveUniIndex(
        (prevIndex) => (prevIndex + 1) % universitiesData.length,
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-20">
      {/* 1. HERO SECTION (Top Courses Ranking Auto-Slider) */}
      <TopCoursesRanking />

      {/* 2. UNIVERSITY SECTIONS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 mt-12">
        {universitiesData.map((uniBlock) => {
          const uniSlug = uniBlock.university
            .toLowerCase()
            .replace(/[\s]+/g, "-");

          return (
            <section key={uniBlock.university} className="space-y-6">
              {/* SECTION TITLE & VIEW ALL LINK */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/40">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {uniBlock.university}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Explore featured undergraduate and postgraduate programs
                    </p>
                  </div>
                </div>

                <Link
                  href={`/courses?university=${encodeURIComponent(uniBlock.university)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors shadow-sm self-start sm:self-auto"
                >
                  View All Programs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* COURSES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uniBlock.courses_and_qualifications
                  .slice(0, 3)
                  .map((course, idx) => (
                    <CourseCard key={idx} course={course} />
                  ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* 3. PARTNER UNIVERSITIES AUTO-SCROLL SHOWCASE (3-second interval) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 lg:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50">
              <Sparkles className="w-3.5 h-3.5" /> Global Institutions
            </span>
            <h2 className="text-3xl font-extrabold">
              Featured University Showcase
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Automatically cycling through our premier academic partners every
              3 seconds.
            </p>
          </div>

          {/* SHOWCASE CARD */}
          <div className="relative overflow-hidden rounded-2xl h-80 sm:h-96 shadow-xl bg-slate-900">
            {universitiesData.map((uni, idx) => {
              const isActive = idx === activeUniIndex;
              const imgUrl =
                UNIVERSITY_IMAGES[uni.university] ||
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80";
              const slug = uni.university.toLowerCase().replace(/[\s]+/g, "-");

              return (
                <div
                  key={uni.university}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {/* Background Image with Overlay */}
                  <Image
                    src={imgUrl}
                    alt={uni.university}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="absolute inset-0 object-cover transform scale-105 animate-subtle-zoom"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-2 max-w-xl">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                        Featured Partner #{idx + 1}
                      </span>
                      <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                        {uni.university}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                        Explore verified undergraduate and postgraduate programs
                        tailored for international student success.
                      </p>
                    </div>

                    <Link
                      href={`/courses?university=${encodeURIComponent(uni.university)}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-blue-50 transition-colors shadow-lg shrink-0"
                    >
                      Visit University <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DOT CONTROLS FOR SHOWCASE */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {universitiesData.map((uni, idx) => (
              <button
                key={uni.university}
                onClick={() => setActiveUniIndex(idx)}
                className={`transition-all duration-300 rounded-full ${activeUniIndex === idx
                    ? "w-8 h-2 bg-blue-600"
                    : "w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                  }`}
                aria-label={`Showcase ${uni.university}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
