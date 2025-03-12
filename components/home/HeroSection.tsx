"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function HeroSection() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 flex flex-col items-center justify-center">
        <div className="flex justify-center items-center gap-3">
          <Image
            src="/assets/logo.png"
            alt="FlowFund"
            width="40"
            height="40"
            className="object-cover mt-2"
          />
          <h1 className="relative z-10 text-5xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600  text-center font-sans font-bold">
            FundFlow
          </h1>
        </div>
        <p className="text-gray-300 max-w-xl mx-auto my-2 text-md text-center relative z-10">
          FundFlow is a decentralized crowdfunding platform that leverages
          blockchain technology and cryptocurrency to enable seamless,
          transparent, and secure fundraising for projects, startups, and social
          causes. Built on Ethereum (or other EVM-compatible chains like
          Polygon), FundFlow allows users to create campaigns, contribute funds,
          and manage payouts using cryptocurrencies like ETH, USDT, or
          platform-native tokens.
        </p>
        <div className="flex items-center gap-4 mt-6 sm:flex-row flex-col justify-center w-full">
          <Button className="bg-purple-700 hover:bg-purple-800 text-white cursor-pointer max-sm:w-full">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button className="border border-purple-700 hover:bg-purple-800 bg-transparent text-white cursor-pointer max-sm:w-full">
            Create Campaign
          </Button>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default HeroSection;
