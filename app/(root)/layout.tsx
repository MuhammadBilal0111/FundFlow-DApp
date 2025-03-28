import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import "../globals.css";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "FundFlow - Streamlined Financial Management",
  description:
    "FundFlow helps you manage finances efficiently with automated tracking and insightful analytics.",
  openGraph: {
    title: "FundFlow - Streamlined Financial Management",
    description:
      "FundFlow helps you manage finances efficiently with automated tracking and insightful analytics.",
    url: "https://fund-flow-flax.vercel.app", // Replace with your actual URL
    siteName: "FundFlow",
    images: [
      {
        url: "https://fund-flow-flax.vercel.app/assets/images/logo.png", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "FundFlow Dashboard Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FundFlow - Streamlined Financial Management",
    description:
      "Manage finances efficiently with FundFlow's automated tracking and analytics.",
    images: ["https://fund-flow-flax.vercel.app/assets/images/logo.png"], // Same as Open Graph image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className="min-h-[800px]">{children}</main>
      <Footer />
    </div>
  );
}
