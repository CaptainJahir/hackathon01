import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/custom/Navbar";

// auth session provider
import AuthSessionProvider from "@/components/auth/AuthSessionProvider";
import AuthSessionChecker from "@/components/auth/AuthSessionChecker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VConnect",
  description: "A Social connecting platform for Vitans",
  // icons: {
  //   icon: '/favicon.png', // Ensure this file exists in your public/ directory
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>VConnect</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#e3f0ff]`}>
        <AuthSessionProvider>
          <AuthSessionChecker>
            {/* <Navbar /> */}
            {children}
          </AuthSessionChecker>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
