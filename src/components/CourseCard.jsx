"use client";

import { useState } from "react";
import Link from "next/link";
import {
   Building2,
   Clock,
   Banknote,
   GraduationCap,
   Calendar,
   ExternalLink,
   Check,
   Plus,
   Award,
   Globe,
   FileText,
   ChevronDown,
   ChevronUp,
} from "lucide-react";
import { useCompareStore } from "@/store/compareStore";

export default function CourseCard({ course }) {
   const { comparedCourses, addCourse, removeCourse } = useCompareStore();
   const [toastMessage, setToastMessage] = useState(null);
   const [expanded, setExpanded] = useState(false); // Toggle to view full eligibility/scholarships

   // Check if course is already in the comparison array
   const isCompared = comparedCourses.some(
      (c) =>
         c.course_url === course.course_url ||
         (c.course_title === course.course_title &&
            c.university_name === course.university_name),
   );

   const handleCompareToggle = () => {
      if (isCompared) {
         removeCourse(course.course_url);
         showToast("Removed from comparison");
      } else {
         const result = addCourse(course);
         showToast(result.message);
      }
   };

   const showToast = (msg) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 2500);
   };

   const hasScholarships =
      Array.isArray(course.scholarships_available) &&
      course.scholarships_available.length > 0;

   return (
      <div className="relative group flex flex-col justify-between bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
         {/* TOAST NOTIFICATION BADGE */}
         {toastMessage && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-slate-900 dark:bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg border border-slate-700 animate-fade-in">
               {toastMessage}
            </div>
         )}

         {/* TOP HEADER SECTION */}
         <div>
            <div className="flex items-center justify-between gap-2 mb-3">
               <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide ${course.qualification_level
                        ?.toLowerCase()
                        .includes("undergraduate")
                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50"
                        : "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/50"
                     }`}
               >
                  {course.qualification_level || "Degree Program"}
               </span>

               {hasScholarships && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/50">
                     <Award className="w-3.5 h-3.5" /> Scholarships
                  </span>
               )}
            </div>

            {/* COURSE TITLE & UNIVERSITY */}
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
               {course.course_title}
            </h3>

            <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
               <Building2 className="w-4 h-4 text-blue-500 shrink-0" />
               <span className="truncate">{course.university_name}</span>
            </div>

            {/* COMPREHENSIVE METRICS GRID */}
            <div className="grid grid-cols-2 gap-3 my-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 text-xs">
               {/* Tuition Fee */}
               <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
                     <Banknote className="w-3.5 h-3.5 text-blue-500" /> Annual Tuition
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                     {course.tuition_fees_annual || "N/A"}
                  </span>
               </div>

               {/* Duration */}
               <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
                     <Clock className="w-3.5 h-3.5 text-amber-500" /> Duration
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                     {course.course_duration || "N/A"}
                  </span>
               </div>

               {/* English Requirements */}
               <div className="flex flex-col gap-0.5 col-span-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
                     <GraduationCap className="w-3.5 h-3.5 text-emerald-500" /> English
                     Proficiency
                  </span>
                  <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200 text-xs">
                     <span>
                        IELTS:{" "}
                        <strong className="text-blue-600 dark:text-blue-400">
                           {course.ielts_score || "N/A"}
                        </strong>
                     </span>
                     <span>
                        PTE:{" "}
                        <strong className="text-indigo-600 dark:text-indigo-400">
                           {course.pte_score || "N/A"}
                        </strong>
                     </span>
                  </div>
               </div>

               {/* Intakes */}
               <div className="flex flex-col gap-0.5 col-span-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
                     <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Intake Months
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                     {Array.isArray(course.intake_months)
                        ? course.intake_months.join(", ")
                        : course.intake_months || "N/A"}
                  </span>
               </div>
            </div>

            {/* EXPANDABLE DETAILS SECTION (Eligibility & Scholarships) */}
            <div className="space-y-3 mb-4 text-xs">
               {/* Eligibility Criteria (India) */}
               <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-slate-800/30 border border-blue-100 dark:border-slate-800">
                  <p className="font-semibold text-blue-900 dark:text-blue-300 mb-1 flex items-center gap-1">
                     <Globe className="w-3.5 h-3.5" /> India Eligibility:
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                     {course.eligibility_criteria_india ||
                        "Refer to official guidelines for board percentages."}
                  </p>
               </div>

               {/* Expanded view for full scholarships list if toggled */}
               {expanded && hasScholarships && (
                  <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 space-y-1 animate-fade-in">
                     <p className="font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> Available Scholarships:
                     </p>
                     <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-0.5">
                        {course.scholarships_available.map((sch, i) => (
                           <li key={i} className="truncate">
                              {sch}
                           </li>
                        ))}
                     </ul>
                  </div>
               )}
            </div>
         </div>

         {/* CARD FOOTER ACTIONS */}
         <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
            {/* Toggle Compare Button */}
            <button
               onClick={handleCompareToggle}
               className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 ${isCompared
                     ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                     : "bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900/90 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60"
                  }`}
            >
               {isCompared ? (
                  <>
                     <Check className="w-4 h-4" /> Added to Compare
                  </>
               ) : (
                  <>
                     <Plus className="w-4 h-4" /> Compare Program
                  </>
               )}
            </button>

            {/* Expand / Collapse extra info toggle */}
            {hasScholarships && (
               <button
                  onClick={() => setExpanded(!expanded)}
                  className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title={expanded ? "Show Less" : "Show Scholarships"}
               >
                  {expanded ? (
                     <ChevronUp className="w-4 h-4" />
                  ) : (
                     <ChevronDown className="w-4 h-4" />
                  )}
               </button>
            )}

            {/* View Official Webpage Link */}
            <a
               href={course.course_url}
               target="_blank"
               rel="noopener noreferrer"
               className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
               title="View Official University Course Page"
            >
               <ExternalLink className="w-4 h-4" />
            </a>
         </div>
      </div>
   );
}
