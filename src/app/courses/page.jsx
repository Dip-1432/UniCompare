// This file acts as a Server wrapper that forces Vercel to dynamically render the route,
// completely bypassing the prerender error caused by useSearchParams.

export const dynamic = "force-dynamic";

import CoursesClient from "./CoursesClient";

export default function CoursesPage() {
   return <CoursesClient />;
}
