"use client";

import { useState } from "react";
import {
   Mail,
   Phone,
   MapPin,
   Send,
   CheckCircle2,
   MessageSquare,
} from "lucide-react";

export default function ContactPage() {
   const [submitted, setSubmitted] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      universityOfInterest: "Adelaide University",
      message: "",
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.message) return;
      setSubmitted(true);
   };

   return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-16 lg:py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* HEADER */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
               <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50 text-xs font-semibold">
                  <MessageSquare className="w-4 h-4" /> Get in Touch
               </div>
               <h1 className="text-4xl font-extrabold tracking-tight">
                  We’re Here to Help Your Study Abroad Journey
               </h1>
               <p className="text-slate-600 dark:text-slate-400">
                  Have questions about course comparisons, entry criteria, or
                  scholarships? Send us a message!
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               {/* CONTACT INFO CARD */}
               <div className="lg:col-span-1 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
                  <div className="space-y-2">
                     <h3 className="text-xl font-bold">Contact Information</h3>
                     <p className="text-sm text-slate-600 dark:text-slate-400">
                        Reach out to our student advisory team for personalized
                        guidance.
                     </p>
                  </div>

                  <div className="space-y-6 text-sm">
                     <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                           <Mail className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="font-semibold text-slate-900 dark:text-white">
                              Support Email
                           </p>
                           <p className="text-slate-500 dark:text-slate-400">
                              support@unicompare.edu
                           </p>
                        </div>
                     </div>

                     <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0">
                           <Phone className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="font-semibold text-slate-900 dark:text-white">
                              Helpline (India)
                           </p>
                           <p className="text-slate-500 dark:text-slate-400">
                              +91 (033) 4567-8900
                           </p>
                        </div>
                     </div>

                     <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 shrink-0">
                           <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="font-semibold text-slate-900 dark:text-white">
                              Regional Office
                           </p>
                           <p className="text-slate-500 dark:text-slate-400">
                              New Town, Action Area I, Kolkata, WB
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* CONTACT FORM */}
               <div className="lg:col-span-2 p-8 lg:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                  {submitted ? (
                     <div className="py-16 text-center space-y-4">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                           <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold">
                           Message Received Successfully!
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-sm">
                           Thank you for reaching out. One of our study abroad advisors
                           will get back to your email within 24 hours.
                        </p>
                        <button
                           onClick={() => setSubmitted(false)}
                           className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-blue-700 transition-colors"
                        >
                           Send Another Inquiry
                        </button>
                     </div>
                  ) : (
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                 Your Full Name
                              </label>
                              <input
                                 type="text"
                                 required
                                 value={formData.name}
                                 onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                 }
                                 placeholder="e.g. Rahul Sharma"
                                 className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              />
                           </div>

                           <div className="space-y-2">
                              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                 Email Address
                              </label>
                              <input
                                 type="email"
                                 required
                                 value={formData.email}
                                 onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                 }
                                 placeholder="e.g. rahul@example.com"
                                 className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                              Target University of Interest
                           </label>
                           <select
                              value={formData.universityOfInterest}
                              onChange={(e) =>
                                 setFormData({
                                    ...formData,
                                    universityOfInterest: e.target.value,
                                 })
                              }
                              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                           >
                              <option value="Adelaide University">
                                 Adelaide University
                              </option>
                              <option value="The University of Melbourne">
                                 The University of Melbourne
                              </option>
                              <option value="The University of Sydney">
                                 The University of Sydney
                              </option>
                              <option value="The University of Auckland">
                                 The University of Auckland
                              </option>
                              <option value="Trinity College Dublin">
                                 Trinity College Dublin
                              </option>
                           </select>
                        </div>

                        <div className="space-y-2">
                           <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                              Your Message / Query
                           </label>
                           <textarea
                              required
                              rows={5}
                              value={formData.message}
                              onChange={(e) =>
                                 setFormData({ ...formData, message: e.target.value })
                              }
                              placeholder="Mention specific courses or eligibility concerns..."
                              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                           />
                        </div>

                        <button
                           type="submit"
                           className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
                        >
                           Send Message <Send className="w-4 h-4" />
                        </button>
                     </form>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
