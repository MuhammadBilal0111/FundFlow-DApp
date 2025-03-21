import type { Metadata } from "next";
import LeftBar from "@/components/dashboard/LeftSideBar";
import "../globals.css";
import DashboardTopBar from "@/components/dashboard/TopBar";
import DashboardBottomBar from "@/components/dashboard/BottomBar";

export const metadata: Metadata = {
  title: "FlowFund Dashboard - Manage Your Campaigns",
  description: "Create, track, and manage your campaigns effortlessly with FlowFund's powerful dashboard.",
  openGraph: {
    title: "FlowFund Dashboard - Manage Your Campaigns",
    description: "Create, track, and manage your campaigns effortlessly with FlowFund's powerful dashboard.",
    url: "https://yourwebsite.com/dashboard", // Replace with your actual dashboard URL
    siteName: "FlowFund",
    images: [
      {
        url: "https://yourwebsite.com/dashboard-preview.jpg", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "FlowFund Dashboard Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowFund Dashboard - Manage Your Campaigns",
    description: "Effortlessly create, track, and manage your campaigns in one place.",
    images: ["https://yourwebsite.com/dashboard-preview.jpg"], // Same as Open Graph image
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashboardTopBar />
      <main className="flex flex-row">
        <LeftBar />
        <section className="flex min-h-screen flex-1 items-center flex-col px-6 pt-28 pb-10 sm:px-10 max-md:mb-20">
          <div className="w-full max-w-4xl">{children}</div>
        </section>
      </main>
      <DashboardBottomBar />
    </div>
  );
}
