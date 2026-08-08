"use client";

import Link from "next/link";
import {
   GraduationCap,
   Heart,
   ExternalLink,
   ShieldCheck,
   Mail,
   Globe,
} from "lucide-react";

const UNIVERSITIES = [
   { name: "Adelaide University", slug: "adelaide-university" },
   { name: "The University of Melbourne", slug: "the-university-of-melbourne" },
   { name: "The University of Sydney", slug: "the-university-of-sydney" },
   { name: "The University of Auckland", slug: "the-university-of-auckland" },
   { name: "Trinity College Dublin", slug: "trinity-college-dublin" },
];

export default function Footer() {
   return (
      <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
               {/* BRAND COLUMN */}
               <div className="lg:col-span-2 space-y-4">
                  <Link href="/" className="inline-flex items-center gap-2 group">
                     <div className="p-2 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                        <GraduationCap className="w-6 h-6" />
                     </div>
                     <span className="text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        UniCompare
                     </span>
                  </Link>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                     Empowering Indian students with comprehensive insights, course
                     details, entry criteria, and tuition comparisons across top
                     global universities.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                     <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-950/80 text-blue-400 border border-blue-800/50">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified University
                        Data
                     </span>
                  </div>
               </div>

               {/* QUICK LINKS */}
               <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                     Quick Links
                  </h3>
                  <ul className="space-y-2.5 text-sm">
                     <li>
                        <Link
                           href="/"
                           className="hover:text-blue-400 transition-colors"
                        >
                           Home
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/courses"
                           className="hover:text-blue-400 transition-colors"
                        >
                           All Courses
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/compare"
                           className="hover:text-blue-400 transition-colors"
                        >
                           Compare Courses
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/about"
                           className="hover:text-blue-400 transition-colors"
                        >
                           About Us
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/contact"
                           className="hover:text-blue-400 transition-colors"
                        >
                           Contact Us
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* UNIVERSITIES */}
               <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                     Universities
                  </h3>
                  <ul className="space-y-2.5 text-sm">
                     {UNIVERSITIES.map((uni) => (
                        <li key={uni.slug}>
                           <Link
                              href={`/courses?university=${encodeURIComponent(uni.name)}`}
                              className="hover:text-blue-400 transition-colors truncate block"
                           >
                              {uni.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* DEGREE LEVELS & INFO */}
               <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                     Program Levels
                  </h3>
                  <ul className="space-y-2.5 text-sm">
                     <li>
                        <Link
                           href="/courses?level=Undergraduate"
                           className="hover:text-blue-400 transition-colors"
                        >
                           Undergraduate Degrees
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/courses?level=Postgraduate"
                           className="hover:text-blue-400 transition-colors"
                        >
                           Postgraduate Degrees
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/courses"
                           className="hover:text-blue-400 transition-colors"
                        >
                           Scholarship Eligible
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>

            {/* BOTTOM DIVIDER & COPYRIGHT */}
            <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
               <p>
                  © {new Date().getFullYear()} UniCompare. Built for Indian
                  international students.
               </p>
               <div className="flex items-center gap-6">
                  <Link
                     href="/about"
                     className="hover:text-slate-400 transition-colors"
                  >
                     Privacy Notice
                  </Link>
                  <Link
                     href="/contact"
                     className="hover:text-slate-400 transition-colors"
                  >
                     Terms of Service
                  </Link>
               </div>
            </div>
         </div>
      </footer>
   );
}
