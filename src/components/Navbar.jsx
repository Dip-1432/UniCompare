"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
   GraduationCap,
   ChevronDown,
   Sun,
   Moon,
   Menu,
   X,
   Building2,
   BookOpen,
   Scale,
} from "lucide-react";
import { useCompareStore } from "@/store/compareStore";

const UNIVERSITIES = [
   { name: "Adelaide University", slug: "adelaide-university" },
   { name: "The University of Melbourne", slug: "the-university-of-melbourne" },
   { name: "The University of Sydney", slug: "the-university-of-sydney" },
   { name: "The University of Auckland", slug: "the-university-of-auckland" },
   { name: "Trinity College Dublin", slug: "trinity-college-dublin" },
];

const COURSE_TYPES = [
   { name: "All Courses", href: "/courses" },
   { name: "Undergraduate Courses", href: "/courses?level=Undergraduate" },
   { name: "Postgraduate Courses", href: "/courses?level=Postgraduate" },
];

export default function Navbar() {
   const pathname = usePathname();
   const { comparedCourses } = useCompareStore();

   // Mobile & Theme states
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [unisMobileOpen, setUnisMobileOpen] = useState(false);
   const [coursesMobileOpen, setCoursesMobileOpen] = useState(false);
   const [darkMode, setDarkMode] = useState(false);

   // Robust Desktop Dropdown States (prevents accidental closing)
   const [activeDropdown, setActiveDropdown] = useState(null);
   const timeoutRef = useRef(null);

   const handleMouseEnter = (dropdownName) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveDropdown(dropdownName);
   };

   const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
         setActiveDropdown(null);
      }, 150); // slight grace period for mouse travel
   };

   // Sync theme with document class
   useEffect(() => {
      const isDark =
         localStorage.theme === "dark" ||
         (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDarkMode(isDark);
      if (isDark) {
         document.documentElement.classList.add("dark");
      } else {
         document.documentElement.classList.remove("dark");
      }
   }, []);

   const toggleTheme = () => {
      const newMode = !darkMode;
      setDarkMode(newMode);
      if (newMode) {
         document.documentElement.classList.add("dark");
         localStorage.setItem("theme", "dark");
      } else {
         document.documentElement.classList.remove("dark");
         localStorage.setItem("theme", "light");
      }
   };

   const isActive = (path) => {
      if (path === "/") return pathname === "/";
      return pathname.startsWith(path);
   };

   return (
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
               {/* BRAND LOGO */}
               <Link href="/" className="flex items-center gap-2.5 group">
                  <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
                     <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-extrabold bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                     UniCompare
                  </span>
               </Link>

               {/* DESKTOP NAVIGATION LINKS */}
               <nav className="hidden md:flex items-center space-x-2">
                  {/* Home */}
                  <Link
                     href="/"
                     className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive("/") && pathname === "/"
                           ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm"
                           : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                        }`}
                  >
                     Home
                  </Link>

                  {/* Universities Dropdown (Robust Hover State Wrapper) */}
                  <div
                     className="relative"
                     onMouseEnter={() => handleMouseEnter("universities")}
                     onMouseLeave={handleMouseLeave}
                  >
                     <Link
                        href="/courses"
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive("/courses") && pathname.includes("university")
                              ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm"
                              : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                           }`}
                     >
                        Universities
                        <ChevronDown
                           className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "universities"
                                 ? "rotate-180 text-blue-600 dark:text-blue-400"
                                 : ""
                              }`}
                        />
                     </Link>

                     {/* Ultra-Professionally Styled Dropdown Container */}
                     {activeDropdown === "universities" && (
                        <div className="absolute left-0 top-full pt-2 w-72 z-50 animate-fade-in">
                           <div className="p-2.5 bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl space-y-1">
                              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1">
                                 Partner Institutions
                              </div>
                              {UNIVERSITIES.map((uni) => (
                                 <Link
                                    key={uni.slug}
                                    href={`/courses?university=${encodeURIComponent(uni.name)}`}
                                    onClick={() => setActiveDropdown(null)}
                                    className="flex items-center gap-3 px-3 py-3 text-sm rounded-xl text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium group"
                                 >
                                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                                       <Building2 className="w-4 h-4 shrink-0" />
                                    </div>
                                    <span className="truncate">{uni.name}</span>
                                 </Link>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Courses Dropdown (Robust Hover State Wrapper) */}
                  <div
                     className="relative"
                     onMouseEnter={() => handleMouseEnter("courses")}
                     onMouseLeave={handleMouseLeave}
                  >
                     <Link
                        href="/courses"
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive("/courses") && !pathname.includes("university")
                              ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm"
                              : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                           }`}
                     >
                        Courses
                        <ChevronDown
                           className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "courses"
                                 ? "rotate-180 text-blue-600 dark:text-blue-400"
                                 : ""
                              }`}
                        />
                     </Link>

                     {/* Ultra-Professionally Styled Dropdown Container */}
                     {activeDropdown === "courses" && (
                        <div className="absolute left-0 top-full pt-2 w-64 z-50 animate-fade-in">
                           <div className="p-2.5 bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl space-y-1">
                              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1">
                                 Degree Categories
                              </div>
                              {COURSE_TYPES.map((type) => (
                                 <Link
                                    key={type.name}
                                    href={type.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="flex items-center gap-3 px-3 py-3 text-sm rounded-xl text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium group"
                                 >
                                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                                       <BookOpen className="w-4 h-4 shrink-0" />
                                    </div>
                                    <span>{type.name}</span>
                                 </Link>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>

                  {/* About */}
                  <Link
                     href="/about"
                     className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive("/about")
                           ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm"
                           : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                        }`}
                  >
                     About
                  </Link>

                  {/* Contact */}
                  <Link
                     href="/contact"
                     className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive("/contact")
                           ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm"
                           : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                        }`}
                  >
                     Contact
                  </Link>
               </nav>

               {/* RIGHT ACTION BUTTONS */}
               <div className="flex items-center gap-3">
                  {/* Compare Button */}
                  <Link
                     href="/compare"
                     className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/90 transition-all border border-blue-200/60 dark:border-blue-800/50 shadow-sm"
                  >
                     <Scale className="w-4 h-4" />
                     <span className="hidden sm:inline">Compare</span>
                     {comparedCourses.length > 0 && (
                        <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-white bg-blue-600 rounded-full animate-pulse">
                           {comparedCourses.length}
                        </span>
                     )}
                  </Link>

                  {/* Theme Toggler */}
                  <button
                     onClick={toggleTheme}
                     aria-label="Toggle Theme"
                     className="p-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/60 dark:border-slate-800"
                  >
                     {darkMode ? (
                        <Sun className="w-4 h-4 text-amber-400" />
                     ) : (
                        <Moon className="w-4 h-4 text-slate-600" />
                     )}
                  </button>

                  {/* Mobile Toggle */}
                  <button
                     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                     className="md:hidden p-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800"
                     aria-label="Toggle Menu"
                  >
                     {mobileMenuOpen ? (
                        <X className="w-5 h-5" />
                     ) : (
                        <Menu className="w-5 h-5" />
                     )}
                  </button>
               </div>
            </div>
         </div>

         {/* MOBILE MENU */}
         {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
               <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
               >
                  Home
               </Link>

               <div>
                  <button
                     onClick={() => setUnisMobileOpen(!unisMobileOpen)}
                     className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                     <span>Universities</span>
                     <ChevronDown
                        className={`w-4 h-4 transition-transform ${unisMobileOpen ? "rotate-180" : ""}`}
                     />
                  </button>
                  {unisMobileOpen && (
                     <div className="pl-4 space-y-1 mt-1">
                        {UNIVERSITIES.map((uni) => (
                           <Link
                              key={uni.slug}
                              href={`/courses?university=${encodeURIComponent(uni.name)}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600"
                           >
                              {uni.name}
                           </Link>
                        ))}
                     </div>
                  )}
               </div>

               <div>
                  <button
                     onClick={() => setCoursesMobileOpen(!coursesMobileOpen)}
                     className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                     <span>Courses</span>
                     <ChevronDown
                        className={`w-4 h-4 transition-transform ${coursesMobileOpen ? "rotate-180" : ""}`}
                     />
                  </button>
                  {coursesMobileOpen && (
                     <div className="pl-4 space-y-1 mt-1">
                        {COURSE_TYPES.map((type) => (
                           <Link
                              key={type.name}
                              href={type.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600"
                           >
                              {type.name}
                           </Link>
                        ))}
                     </div>
                  )}
               </div>

               <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
               >
                  About
               </Link>

               <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
               >
                  Contact
               </Link>
            </div>
         )}
      </header>
   );
}
