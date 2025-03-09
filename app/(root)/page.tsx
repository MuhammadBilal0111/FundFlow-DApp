"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          FundFlow
        </h1>
        <p className="text-neutral-500 max-w-xl mx-auto my-2 text-sm text-center relative z-10">
          FundFlow is a decentralized crowdfunding platform that leverages
          blockchain technology and cryptocurrency to enable seamless,
          transparent, and secure fundraising for projects, startups, and social
          causes. Built on Ethereum (or other EVM-compatible chains like
          Polygon), FundFlow allows users to create campaigns, contribute funds,
          and manage payouts using cryptocurrencies like ETH, USDT, or
          platform-native tokens.
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
}
