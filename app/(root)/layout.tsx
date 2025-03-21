import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import "../globals.css";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "FlowFund - Streamlined Financial Management",
  description: "FlowFund helps you manage finances efficiently with automated tracking and insightful analytics.",
  openGraph: {
    title: "FlowFund - Streamlined Financial Management",
    description: "FlowFund helps you manage finances efficiently with automated tracking and insightful analytics.",
    url: "https://yourwebsite.com", // Replace with your actual URL
    siteName: "FlowFund",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "FlowFund Dashboard Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowFund - Streamlined Financial Management",
    description: "Manage finances efficiently with FlowFund's automated tracking and analytics.",
    images: ["https://yourwebsite.com/og-image.jpg"], // Same as Open Graph image
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
