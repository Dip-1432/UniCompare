import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCompareStore = create(
   persist(
      (set, get) => ({
         comparedCourses: [],

         // Add course with 5-item limit check & duplicate prevention
         addCourse: (course) => {
            const { comparedCourses } = get();

            if (comparedCourses.length >= 5) {
               return {
                  success: false,
                  message: 'You can compare a maximum of 5 courses at a time.',
               };
            }

            const exists = comparedCourses.some(
               (c) =>
                  c.course_url === course.course_url ||
                  (c.course_title === course.course_title &&
                     c.university_name === course.university_name)
            );

            if (exists) {
               return {
                  success: false,
                  message: 'This course is already in your comparison list.',
               };
            }

            set({ comparedCourses: [...comparedCourses, course] });
            return { success: true, message: 'Course added to comparison!' };
         },

         // Remove course by its URL key
         removeCourse: (courseUrl) => {
            set({
               comparedCourses: get().comparedCourses.filter(
                  (c) => c.course_url !== courseUrl
               ),
            });
         },

         // Clear all compared courses
         clearCompare: () => set({ comparedCourses: [] }),
      }),
      {
         name: 'univ-compare-storage', // Key in localStorage
      }
   )
);
