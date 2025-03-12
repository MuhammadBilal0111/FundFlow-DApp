"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimatedSection from "./AnimatedSection";

export default function SuccessStoriesSection() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/campaigns?tab=view-campaign");
  };

  return (
    <AnimatedSection className="py-24 bg-gradient-to-b from-gray-900 to-black">
      {(controls: any) => (
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={{
                hidden: { x: -100, opacity: 0 },
                visible: { x: 0, opacity: 1 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-xl overflow-hidden"
            >
              <Image
                src="/assets/idea.jpg"
                width={800}
                height={100}
                alt="How crowdfunding works"
                className="w-full h-96 flex items-center rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.3)] object-cover"
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: { x: 100, opacity: 0 },
                visible: { x: 0, opacity: 1 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-4 text-gray-300">
                From Idea to Global Impact
              </h3>
              <p className="text-xl mb-6 text-gray-300">
                "Our sustainable water filtration project started as a simple
                idea. Thanks to this platform, we've now provided clean water to
                over 100,000 people in developing countries."
              </p>
              <div className="flex items-center mb-6">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Founder"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold">Sarah Johnson</p>
                  <p className="text-gray-400">Founder, AquaPure</p>
                </div>
              </div>
              <Button
                className="bg-purple-700 hover:bg-purple-800 text-white"
                onClick={handleGetStarted}
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
}
