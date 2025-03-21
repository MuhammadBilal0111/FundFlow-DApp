"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

function HeroSection() {
  const router = useRouter();
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-5xl md:max-w-7xl mx-auto p-4 flex flex-col gap-2 items-center justify-center">
        <div className="flex justify-center items-center gap-3">
          <Image
            src="/assets/images/logo.png"
            alt="FlowFund"
            width="70"
            height="70"
            className="object-cover mt-2"
          />
          <h1 className="relative z-10 text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600  text-center font-sans font-bold">
            FundFlow
          </h1>
        </div>
        <p className="flex flex-col text-gray-300 max-w-7xl mx-auto my-2 text-center relative z-10">
          <span className="text-2xl md:text-4xl lg:text-6xl uppercase font-extrabold mb-4 px-4 py-6">
            PITCH YOUR STARTUP AND CONNECT WITH ENTERPRENEURS
          </span>
          <span className="flex flex-row justify-center items-center gap-4 mt-3">
            <Button
              className="bg-purple-700 hover:bg-purple-800 text-white cursor-pointer max-sm:w-full duration-75"
              onClick={() => router.push("/campaigns")}
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              className="border border-purple-700 hover:bg-purple-800 bg-transparent text-white cursor-pointer max-sm:w-full duration-75"
              onClick={() => router.push("/dashboard?tab=create-campaigns")}
            >
              Create Campaign
            </Button>
          </span>
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default HeroSection;
