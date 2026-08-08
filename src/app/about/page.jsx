import Link from "next/link";
import {
   GraduationCap,
   ShieldCheck,
   Globe,
   Award,
   BookOpen,
   ArrowRight,
   CheckCircle2,
} from "lucide-react";

const UNIVERSITIES = [
   {
      name: "Adelaide University",
      country: "Australia",
      desc: "Unified global excellence combining modern curriculum and industry placements.",
   },
   {
      name: "The University of Melbourne",
      country: "Australia",
      desc: "Renowned for its distinctive Melbourne Model and world-class research output.",
   },
   {
      name: "The University of Sydney",
      country: "Australia",
      desc: "Australia’s first university offering comprehensive double degrees and global networks.",
   },
   {
      name: "The University of Auckland",
      country: "New Zealand",
      desc: "Top-ranked institution offering innovative programs across diverse faculties.",
   },
   {
      name: "Trinity College Dublin",
      country: "Ireland",
      desc: "Historic European university combining academic prestige with vibrant innovation.",
   },
];

export default function AboutPage() {
   return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
         {/* HERO SECTION */}
         <section className="relative py-20 lg:py-28 overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
               <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50 text-xs font-semibold">
                  <GraduationCap className="w-4 h-4" /> Empowering International
                  Scholars
               </div>
               <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto">
                  Simplifying Global Higher Education for{" "}
                  <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                     Indian Students
                  </span>
               </h1>
               <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  UniCompare is built to provide crystal-clear insights, accurate
                  tuition fees, entry criteria, and rigorous side-by-side course
                  comparisons for top-tier international institutions.
               </p>
            </div>
         </section>

         {/* CORE VALUES / FEATURES */}
         <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
               <h2 className="text-3xl font-bold">Why Choose UniCompare?</h2>
               <p className="text-slate-600 dark:text-slate-400">
                  We remove the guesswork from studying abroad with transparent,
                  data-driven course comparisons.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Verified Course Data</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                     Every course profile is scraped and validated directly from
                     official university handbooks, ensuring accurate annual tuition,
                     intakes, and duration.
                  </p>
               </div>

               <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                     <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Custom App Scoring</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                     Our unique weighting algorithm evaluates QS rankings, English
                     language accessibility (IELTS/PTE), and scholarships to rank
                     top-value programs.
                  </p>
               </div>

               <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                     <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Side-by-Side Matrix</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                     Compare up to 5 courses simultaneously across financial,
                     academic, and entry metrics to make informed decisions for your
                     future career.
                  </p>
               </div>
            </div>
         </section>

         {/* FEATURED UNIVERSITIES */}
         <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
               <div className="text-center max-w-2xl mx-auto space-y-4">
                  <h2 className="text-3xl font-bold">Our Partner Institutions</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                     Explore undergraduate and postgraduate degrees across five
                     prestigious global universities.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {UNIVERSITIES.map((uni) => (
                     <div
                        key={uni.name}
                        className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3 flex flex-col justify-between"
                     >
                        <div className="space-y-2">
                           <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                              {uni.country}
                           </span>
                           <h3 className="text-lg font-bold">{uni.name}</h3>
                           <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              {uni.desc}
                           </p>
                        </div>
                        <Link
                           href={`/courses?university=${encodeURIComponent(uni.name)}`}
                           className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-2"
                        >
                           Explore Programs <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
}
