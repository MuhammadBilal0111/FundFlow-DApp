import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "react-hot-toast";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowFund",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} dark`}>
        <div className=" bg-white text-gray-900 dark:bg-[rgb(10,10,10)] dark:text-gray-200 min-h-screen">
          <Navbar />
          <main>
            <Toaster position="bottom-left" reverseOrder={false} />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
