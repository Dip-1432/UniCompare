"use client";

import Link from "next/link";
import {
   Scale,
   Trash2,
   ExternalLink,
   ArrowLeft,
   Award,
   Banknote,
   Clock,
   GraduationCap,
   Calendar,
   CheckCircle2,
   XCircle,
   Sparkles,
} from "lucide-react";
import { useCompareStore } from "@/store/compareStore";

export default function ComparePage() {
   const { comparedCourses, removeCourse, clearCompare } = useCompareStore();

   return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-10 lg:py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* HEADER & BACK LINK */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div className="space-y-2">
                  <Link
                     href="/courses"
                     className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                     <ArrowLeft className="w-4 h-4" /> Back to Course Catalog
                  </Link>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                     Course{" "}
                     <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Comparison Matrix
                     </span>
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                     Comparing {comparedCourses.length} of 5 selected programs
                     side-by-side.
                  </p>
               </div>

               {comparedCourses.length > 0 && (
                  <button
                     onClick={clearCompare}
                     className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 hover:bg-red-100 transition-colors self-start md:self-auto"
                  >
                     <Trash2 className="w-4 h-4" /> Clear All Comparisons
                  </button>
               )}
            </div>

            {/* COMPARISON CONTENT */}
            {comparedCourses.length === 0 ? (
               /* EMPTY STATE */
               <div className="py-24 text-center space-y-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto px-6">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto">
                     <Scale className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">
                     No Courses Selected for Comparison
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                     You haven&apos;t added any courses to your comparison tray yet.
                     Browse our course catalog and click the &quot;Compare&quot; button
                     on up to 5 programs.
                  </p>
                  <div className="pt-4">
                     <Link
                        href="/courses"
                        className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                     >
                        Explore Courses Now
                     </Link>
                  </div>
               </div>
            ) : (
               /* RESPONSIVE COMPARISON GRID (Horizontal on Laptop, Vertical Stack on Mobile) */
               <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                  {comparedCourses.map((course, index) => {
                     const hasScholarships =
                        Array.isArray(course.scholarships_available) &&
                        course.scholarships_available.length > 0;

                     return (
                        <div
                           key={course.course_url || index}
                           className="flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative group"
                        >
                           {/* CARD HEADER */}
                           <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 space-y-3">
                              <div className="flex items-center justify-between">
                                 <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                                    Slot #{index + 1}
                                 </span>
                                 <button
                                    onClick={() => removeCourse(course.course_url)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                                    title="Remove from comparison"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>

                              <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 min-h-12">
                                 {course.course_title}
                              </h3>

                              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate">
                                 {course.university_name}
                              </p>
                           </div>

                           {/* METRICS ROWS */}
                           <div className="p-6 space-y-6 text-xs flex-1 flex flex-col justify-between">
                              <div className="space-y-6">
                                 {/* App Score */}
                                 <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                                    <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                                       <Sparkles className="w-3.5 h-3.5 text-amber-500" />{" "}
                                       App Score
                                    </span>
                                    <div className="flex items-center gap-2">
                                       <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                                          {course.app_score || "N/A"}
                                       </span>
                                       <span className="text-[10px] text-slate-400">
                                          / 100
                                       </span>
                                    </div>
                                 </div>

                                 {/* Qualification Level */}
                                 <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                                    <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                                       <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />{" "}
                                       Level
                                    </span>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                                       {course.qualification_level || "N/A"}
                                    </p>
                                 </div>

                                 {/* Annual Tuition Fees */}
                                 <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                                    <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                                       <Banknote className="w-3.5 h-3.5 text-blue-500" />{" "}
                                       Annual Tuition
                                    </span>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                                       {course.tuition_fees_annual || "N/A"}
                                    </p>
                                 </div>

                                 {/* Course Duration */}
                                 <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                                    <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                                       <Clock className="w-3.5 h-3.5 text-amber-500" />{" "}
                                       Duration
                                    </span>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                                       {course.course_duration || "N/A"}
                                    </p>
                                 </div>

                                 {/* Intake Months */}
                                 <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                                    <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                                       <Calendar className="w-3.5 h-3.5 text-indigo-500" />{" "}
                                       Intakes
                                    </span>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                                       {Array.isArray(course.intake_months)
                                          ? course.intake_months.join(", ")
                                          : course.intake_months || "N/A"}
                                    </p>
                                 </div>

                                 {/* English Requirements */}
                                 <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                                    <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                                       <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />{" "}
                                       English Requirement
                                    </span>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                                       IELTS: {course.ielts_score || "N/A"}
                                    </p>
                                    <p className="text-[11px] text-slate-500">
                                       PTE: {course.pte_score || "N/A"}
                                    </p>
                                 </div>

                                 {/* Scholarships Available */}
                                 <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                                    <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                                       <Award className="w-3.5 h-3.5 text-amber-500" />{" "}
                                       Scholarships
                                    </span>
                                    {hasScholarships ? (
                                       <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                                          {course.scholarships_available.map((sch, i) => (
                                             <li key={i} className="flex items-start gap-1">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                                <span className="line-clamp-2">{sch}</span>
                                             </li>
                                          ))}
                                       </ul>
                                    ) : (
                                       <p className="text-slate-400 italic">
                                          None explicitly listed
                                       </p>
                                    )}
                                 </div>

                                 {/* Eligibility Criteria India */}
                                 <div className="space-y-1">
                                    <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                                       Eligibility (India)
                                    </span>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-4">
                                       {course.eligibility_criteria_india ||
                                          "Check official university website for specific board requirements."}
                                    </p>
                                 </div>
                              </div>

                              {/* OFFICIAL LINK FOOTER */}
                              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                                 <a
                                    href={course.course_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1.5 w-full py-2.5 px-4 bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-xl font-bold transition-colors text-center"
                                 >
                                    Official Page <ExternalLink className="w-3.5 h-3.5" />
                                 </a>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}
         </div>
      </div>
   );
}
