import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "FundFlow",
  description: " Create your account",
  openGraph: {
    title: "FundFlow - Create your account",
    description:
      "Create, track, and manage your campaigns effortlessly with FundFlow",
    url: "https://fund-flow-flax.vercel.app/dashboard", // Replace with your actual dashboard URL
    siteName: "FundFlow",
    images: [
      {
        url: "https://fund-flow-flax.vercel.app/assets/images/logo.png", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "FundFlow",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex items-center min-h-screen justify-center">
      {children}
    </main>
  );
}
