/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
   Search,
   SlidersHorizontal,
   ArrowUpDown,
   X,
   BookOpen,
   ChevronLeft,
   ChevronRight,
   Building2,
   GraduationCap,
   ChevronDown,
   Check,
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import universitiesData from "@/data/universities_courses.json";
import { calculateAppScore } from "@/lib/utils";

// ==========================================
// PRODUCTION CONFIGURABLES
// ==========================================
const COURSES_PER_PAGE = 10;

// Reusable Custom Styled Dropdown Component
function CustomDropdown({ value, options, onChange, icon: Icon }) {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);

   useEffect(() => {
      function handleClickOutside(event) {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const selectedOption =
      options.find((opt) => opt.value === value) || options[0];

   return (
      <div className="relative" ref={dropdownRef}>
         <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm"
         >
            <div className="flex items-center gap-2 truncate">
               {Icon && <Icon className="w-4 h-4 text-slate-400 shrink-0" />}
               <span className="truncate">{selectedOption?.label}</span>
            </div>
            <ChevronDown
               className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
            />
         </button>

         {isOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden backdrop-blur-xl p-1.5 space-y-1 animate-fade-in max-h-64 overflow-y-auto scrollbar-thin">
               {options.map((opt) => (
                  <button
                     key={opt.value}
                     type="button"
                     onClick={() => {
                        onChange(opt.value);
                        setIsOpen(false);
                     }}
                     className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${value === opt.value
                           ? "bg-blue-600 text-white font-semibold shadow-md"
                           : "text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800/80"
                        }`}
                  >
                     <span className="truncate">{opt.label}</span>
                     {value === opt.value && (
                        <Check className="w-3.5 h-3.5 shrink-0 ml-2" />
                     )}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
}

// 1. Rename the main functional component to "CoursesContent"
function CoursesContent() {
   const searchParams = useSearchParams();

   const initialLevel = searchParams.get("level") || "all";
   const initialUni = searchParams.get("university") || "all";

   // State Management
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedUniversity, setSelectedUniversity] = useState(initialUni);
   const [selectedLevel, setSelectedLevel] = useState(initialLevel);
   const [sortBy, setSortBy] = useState("app_score_desc");
   const [currentPage, setCurrentPage] = useState(1);

   // Keyboard Navigation States for Autocomplete
   const [selectedIndex, setSelectedIndex] = useState(-1);
   const suggestionListRef = useRef(null);

   // Sync state instantly when URL search params change
   useEffect(() => {
      const levelParam = searchParams.get("level");
      const uniParam = searchParams.get("university");

      if (levelParam) {
         setSelectedLevel(levelParam);
      } else {
         setSelectedLevel("all");
      }

      if (uniParam) {
         setSelectedUniversity(uniParam);
      } else {
         setSelectedUniversity("all");
      }
   }, [searchParams]);

   // 1. Flatten all courses and enrich with metrics
   const allCourses = useMemo(() => {
      return universitiesData.flatMap((uni) =>
         uni.courses_and_qualifications.map((course) => {
            let numericFee = 0;
            if (
               course.tuition_fees_annual &&
               course.tuition_fees_annual !== "N/A"
            ) {
               const match = course.tuition_fees_annual.match(/([\d,]+)/);
               if (match) {
                  numericFee = parseInt(match[1].replace(/,/g, ""), 10);
               }
            }

            let numericIelts = 0;
            if (course.ielts_score && course.ielts_score !== "N/A") {
               const match = course.ielts_score.match(/(\d+\.\d+|\d+)/);
               if (match) numericIelts = parseFloat(match[1]);
            }

            let numericPte = 0;
            if (course.pte_score && course.pte_score !== "N/A") {
               const match = course.pte_score.match(/(\d+)/);
               if (match) numericPte = parseInt(match[1], 10);
            }

            return {
               ...course,
               university_name: uni.university,
               app_score: calculateAppScore(course),
               numericFee,
               numericIelts,
               numericPte,
            };
         }),
      );
   }, []);

   // Options configuration for Custom Dropdowns
   const universityOptions = useMemo(() => {
      const list = universitiesData.map((u) => ({
         label: u.university,
         value: u.university,
      }));
      return [{ label: "All Universities", value: "all" }, ...list];
   }, []);

   const levelOptions = [
      { label: "All Degree Levels", value: "all" },
      { label: "Undergraduate", value: "Undergraduate" },
      { label: "Postgraduate", value: "Postgraduate" },
   ];

   const sortOptions = [
      { label: "App Score: High to Low", value: "app_score_desc" },
      { label: "App Score: Low to High", value: "app_score_asc" },
      { label: "Tuition Fee: Low to High", value: "fee_asc" },
      { label: "Tuition Fee: High to Low", value: "fee_desc" },
      { label: "IELTS Score: Low to High", value: "ielts_asc" },
      { label: "IELTS Score: High to Low", value: "ielts_desc" },
      { label: "PTE Score: Low to High", value: "pte_asc" },
      { label: "PTE Score: High to Low", value: "pte_desc" },
   ];

   // Autocomplete search suggestions list
   const autocompleteSuggestions = useMemo(() => {
      if (!searchQuery.trim() || searchQuery.length < 2) return [];
      const query = searchQuery.toLowerCase();
      return allCourses
         .filter(
            (c) =>
               c.course_title.toLowerCase().includes(query) ||
               c.university_name.toLowerCase().includes(query),
         )
         .slice(0, 5)
         .map((c) => c.course_title);
   }, [searchQuery, allCourses]);

   useEffect(() => {
      setSelectedIndex(-1);
   }, [searchQuery]);

   // Keyboard Navigation Handler for Search
   const handleKeyDown = (e) => {
      if (autocompleteSuggestions.length === 0) return;

      if (e.key === "ArrowDown") {
         e.preventDefault();
         setSelectedIndex((prev) =>
            prev < autocompleteSuggestions.length - 1 ? prev + 1 : 0,
         );
      } else if (e.key === "ArrowUp") {
         e.preventDefault();
         setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : autocompleteSuggestions.length - 1,
         );
      } else if (e.key === "Enter") {
         if (
            selectedIndex >= 0 &&
            selectedIndex < autocompleteSuggestions.length
         ) {
            e.preventDefault();
            setSearchQuery(autocompleteSuggestions[selectedIndex]);
            setSelectedIndex(-1);
         }
      } else if (e.key === "Escape") {
         setSelectedIndex(-1);
      }
   };

   // 2. Filter & Sort Logic
   const filteredAndSortedCourses = useMemo(() => {
      let result = [...allCourses];

      if (searchQuery.trim()) {
         const q = searchQuery.toLowerCase();
         result = result.filter(
            (c) =>
               c.course_title.toLowerCase().includes(q) ||
               c.university_name.toLowerCase().includes(q),
         );
      }

      if (selectedUniversity !== "all") {
         result = result.filter(
            (c) =>
               c.university_name.toLowerCase() ===
               selectedUniversity.toLowerCase() ||
               c.university_name
                  .toLowerCase()
                  .includes(selectedUniversity.toLowerCase()),
         );
      }

      if (selectedLevel !== "all") {
         result = result.filter((c) =>
            c.qualification_level
               ?.toLowerCase()
               .includes(selectedLevel.toLowerCase()),
         );
      }

      result.sort((a, b) => {
         switch (sortBy) {
            case "app_score_desc":
               return b.app_score - a.app_score;
            case "app_score_asc":
               return a.app_score - b.app_score;
            case "fee_asc":
               return a.numericFee - b.numericFee;
            case "fee_desc":
               return b.numericFee - a.numericFee;
            case "ielts_asc":
               return a.numericIelts - b.numericIelts;
            case "ielts_desc":
               return b.numericIelts - a.numericIelts;
            case "pte_asc":
               return a.numericPte - b.numericPte;
            case "pte_desc":
               return b.numericPte - a.numericPte;
            default:
               return 0;
         }
      });

      return result;
   }, [allCourses, searchQuery, selectedUniversity, selectedLevel, sortBy]);

   useEffect(() => {
      setCurrentPage(1);
   }, [searchQuery, selectedUniversity, selectedLevel, sortBy]);

   // 3. Pagination Logic (10 per page)
   const totalPages =
      Math.ceil(filteredAndSortedCourses.length / COURSES_PER_PAGE) || 1;
   const paginatedCourses = useMemo(() => {
      const start = (currentPage - 1) * COURSES_PER_PAGE;
      return filteredAndSortedCourses.slice(start, start + COURSES_PER_PAGE);
   }, [filteredAndSortedCourses, currentPage]);

   const handleClearFilters = () => {
      setSearchQuery("");
      setSelectedUniversity("all");
      setSelectedLevel("all");
      setSortBy("app_score_desc");
   };

   return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-10 lg:py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* HEADER */}
            <div className="space-y-3">
               <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50 text-xs font-semibold">
                  <BookOpen className="w-4 h-4" /> Comprehensive Program Catalog
               </div>
               <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                  Explore & Compare{" "}
                  <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                     Global Courses
                  </span>
               </h1>
               <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
                  Filter instantly by university or degree level with professionally
                  styled custom dropdown menus.
               </p>
            </div>

            {/* SEARCH & PROFESSIONAL FILTERS BAR */}
            <div className="p-6 lg:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
               <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {/* SEARCH INPUT WITH KEYBOARD NAVIGATION */}
                  <div className="relative lg:col-span-1">
                     <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                           type="text"
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           onKeyDown={handleKeyDown}
                           placeholder="Search course or university..."
                           className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 shadow-sm"
                        />
                        {searchQuery && (
                           <button
                              onClick={() => setSearchQuery("")}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                           >
                              <X className="w-4 h-4" />
                           </button>
                        )}
                     </div>

                     {/* Styled Autocomplete Suggestions Dropdown */}
                     {autocompleteSuggestions.length > 0 && (
                        <div
                           ref={suggestionListRef}
                           className="absolute left-0 right-0 mt-2 bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden backdrop-blur-xl divide-y divide-slate-100 dark:divide-slate-800/80"
                        >
                           {autocompleteSuggestions.map((title, idx) => (
                              <button
                                 key={idx}
                                 onClick={() => {
                                    setSearchQuery(title);
                                    setSelectedIndex(-1);
                                 }}
                                 className={`w-full text-left px-4 py-3 text-xs font-medium transition-colors truncate ${selectedIndex === idx
                                       ? "bg-blue-600 text-white"
                                       : "hover:bg-blue-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300"
                                    }`}
                              >
                                 {title}
                              </button>
                           ))}
                        </div>
                     )}
                  </div>

                  {/* CUSTOM UNIVERSITY FILTER DROPDOWN */}
                  <div>
                     <CustomDropdown
                        value={selectedUniversity}
                        options={universityOptions}
                        onChange={setSelectedUniversity}
                        icon={Building2}
                     />
                  </div>

                  {/* CUSTOM LEVEL FILTER DROPDOWN */}
                  <div>
                     <CustomDropdown
                        value={selectedLevel}
                        options={levelOptions}
                        onChange={setSelectedLevel}
                        icon={GraduationCap}
                     />
                  </div>

                  {/* CUSTOM SORT DROPDOWN */}
                  <div>
                     <CustomDropdown
                        value={sortBy}
                        options={sortOptions}
                        onChange={setSortBy}
                        icon={ArrowUpDown}
                     />
                  </div>
               </div>

               {/* ACTIVE FILTERS FOOTER */}
               <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                     Showing{" "}
                     <strong className="text-slate-900 dark:text-white">
                        {filteredAndSortedCourses.length}
                     </strong>{" "}
                     matching courses
                  </span>

                  {(searchQuery ||
                     selectedUniversity !== "all" ||
                     selectedLevel !== "all" ||
                     sortBy !== "app_score_desc") && (
                        <button
                           onClick={handleClearFilters}
                           className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
                        >
                           <X className="w-3.5 h-3.5" /> Clear All Filters
                        </button>
                     )}
               </div>
            </div>

            {/* COURSES GRID */}
            {paginatedCourses.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedCourses.map((course, idx) => (
                     <CourseCard key={idx} course={course} />
                  ))}
               </div>
            ) : (
               <div className="py-20 text-center space-y-3 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <h3 className="text-xl font-bold">No matching courses found</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                     Try adjusting your search terms or filters to find what you are
                     looking for.
                  </p>
                  <button
                     onClick={handleClearFilters}
                     className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-blue-700 transition-colors"
                  >
                     Reset Filters
                  </button>
               </div>
            )}

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
               <div className="flex items-center justify-center gap-2 pt-6">
                  <button
                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                     disabled={currentPage === 1}
                     className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
                  >
                     <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <span className="text-xs font-semibold px-4 text-slate-600 dark:text-slate-400">
                     Page {currentPage} of {totalPages}
                  </span>
                  <button
                     onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                     }
                     disabled={currentPage === totalPages}
                     className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
                  >
                     Next <ChevronRight className="w-4 h-4" />
                  </button>
               </div>
            )}
         </div>
      </div>
   );
}

// 2. Export a new default component that wraps the content in a Suspense boundary
export default function CoursesPage() {
   return (
      <Suspense
         fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
               <div className="animate-pulse flex items-center gap-2 text-blue-600 font-bold">
                  <BookOpen className="w-5 h-5 animate-bounce" /> Loading Courses...
               </div>
            </div>
         }
      >
         <CoursesContent />
      </Suspense>
   );
}
