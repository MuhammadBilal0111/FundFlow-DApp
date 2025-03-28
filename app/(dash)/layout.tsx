import type { Metadata } from "next";
import LeftBar from "@/components/dashboard/LeftSideBar";
import "../globals.css";
import DashboardTopBar from "@/components/dashboard/TopBar";
import DashboardBottomBar from "@/components/dashboard/BottomBar";

export const metadata: Metadata = {
  title: "FundFlow Dashboard - Manage Your Campaigns",
  description:
    "Create, track, and manage your campaigns effortlessly with FundFlow's powerful dashboard.",
  openGraph: {
    title: "FundFlow Dashboard - Manage Your Campaigns",
    description:
      "Create, track, and manage your campaigns effortlessly with FundFlow's powerful dashboard.",
    url: "https://fund-flow-flax.vercel.app/dashboard", // Replace with your actual dashboard URL
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
    title: "FundFlow Dashboard - Manage Your Campaigns",
    description:
      "Effortlessly create, track, and manage your campaigns in one place.",
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
