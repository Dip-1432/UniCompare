// Hardcoded QS Rankings for the MVP universities (2025/2026 data)
const QS_RANKINGS = {
   "The University of Melbourne": 13,
   "The University of Sydney": 18,
   "The University of Auckland": 68,
   "Adelaide University": 82,
   "Trinity College Dublin": 87,
};

// Rough currency conversion rates to equalize tuition fee scoring
const EXCHANGE_RATES = {
   AUD: 1.0,
   NZD: 0.93,
   EUR: 1.65,
};

/**
 * Calculates a custom "App Score" out of 100 for a given course.
 * Higher score = Better value/accessibility for the student.
 */
export function calculateAppScore(course) {
   let score = 0;

   // 1. QS Ranking Score (Max 30 points)
   // Lower rank number is better. We subtract the rank from 100 and scale it.
   const qsRank = QS_RANKINGS[course.university_name] || 100;
   const rankScore = Math.max(0, 30 - qsRank * 0.2);
   score += rankScore;

   // 2. Scholarships Available (Max 20 points)
   // Major boost if the university offers financial aid.
   if (
      Array.isArray(course.scholarships_available) &&
      course.scholarships_available.length > 0
   ) {
      score += 20;
   }

   // 3. Tuition Fee Score (Max 25 points)
   // Lower fee gets more points.
   let feeScore = 10; // default baseline
   if (course.tuition_fees_annual && course.tuition_fees_annual !== "N/A") {
      // Extract currency code and numbers (e.g., "AUD $55,400" -> currency: AUD, amount: 55400)
      const match = course.tuition_fees_annual.match(/([A-Z]{3}).*?([\d,]+)/);
      if (match) {
         const currency = match[1];
         const amount = parseInt(match[2].replace(/,/g, ""), 10);
         const normalizedAmount = amount * (EXCHANGE_RATES[currency] || 1.0);

         // If normalized fee is under 40k = 25 pts, under 50k = 15 pts, over 60k = 5 pts.
         if (normalizedAmount < 40000) feeScore = 25;
         else if (normalizedAmount < 50000) feeScore = 15;
         else feeScore = 5;
      }
   }
   score += feeScore;

   // 4. IELTS / PTE Accessibility Score (Max 25 points)
   // Lower English requirement = easier entry = more points.
   let englishScore = 10; // default baseline
   if (course.ielts_score && course.ielts_score !== "N/A") {
      const ieltsMatch = course.ielts_score.match(/(\d+\.\d+|\d+)/);
      if (ieltsMatch) {
         const ieltsNum = parseFloat(ieltsMatch[0]);
         if (ieltsNum <= 6.0)
            englishScore = 25; // Very accessible
         else if (ieltsNum <= 6.5)
            englishScore = 18; // Standard
         else englishScore = 10; // High barrier
      }
   }
   score += englishScore;

   // Cap final score at 100 and round to 1 decimal
   return Math.min(100, Number(score.toFixed(1)));
}
