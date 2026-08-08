import dynamic from "next/dynamic";

const DynamicCourses = dynamic(() => import("./CoursesContent"), {
   ssr: false,
   loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
         <div className="animate-pulse font-bold text-blue-600">
            Loading Global Courses...
         </div>
      </div>
   ),
});

export default function CoursesPage() {
   return <DynamicCourses />;
}
