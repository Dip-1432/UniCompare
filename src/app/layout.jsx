import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompareDrawer from "@/components/CompareDrawer";

export const metadata = {
  title: "UniCompare | Global Course & University Comparison Platform",
  description:
    "Compare undergraduate and postgraduate degrees, annual tuition fees, IELTS requirements, and scholarships across top global universities for international students.",
  keywords:
    "study abroad, university comparison, undergraduate courses, postgraduate degrees, tuition fees, international students, IELTS requirements",
  authors: [{ name: "UniCompare Team" }],
  openGraph: {
    title: "UniCompare | Global Course & University Comparison Platform",
    description:
      "Find, compare, and choose the best global university programs with data-driven insights.",
    url: "https://unicompare.edu",
    siteName: "UniCompare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniCompare | Global Course & University Comparison Platform",
    description:
      "Compare undergraduate and postgraduate courses, tuition fees, and scholarship opportunities easily.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-300">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Page Content */}
        <main className="flex-1">{children}</main>

        {/* Floating Course Comparison Drawer */}
        <CompareDrawer />

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
