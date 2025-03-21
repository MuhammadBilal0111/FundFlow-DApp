"use client";

import { motion } from "framer-motion";
import { Heart, LightbulbIcon, Rocket, Users } from "lucide-react";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

export default function HowItWorksSection() {
  return (
    <AnimatedSection className="py-24 bg-gradient-to-b from-gray-900 to-black">
      {(controls: any) => (
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center overflow-hidden">
            <motion.div
              variants={{
                hidden: { x: -100, opacity: 0 },
                visible: { x: 0, opacity: 1 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-xl overflow-hidden order-2 md:order-1"
            >
              <Image
                src="/assets/images/bitcoin.jpg"
                width={800}
                height={100}
                alt="How crowdfunding works"
                className="w-full h-96 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.3)] object-cover"
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
              className="order-1 md:order-2"
            >
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="bg-purple-900/50 p-3 rounded-lg h-fit">
                    <LightbulbIcon className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      1. Share Your Idea
                    </h3>
                    <p className="text-gray-300">
                      Create a compelling project page that showcases your
                      vision and goals.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-purple-900/50 p-3 rounded-lg h-fit">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      2. Build a Community
                    </h3>
                    <p className="text-gray-300">
                      Engage with potential backers and spread the word about
                      your project.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-purple-900/50 p-3 rounded-lg h-fit">
                    <Heart className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      3. Get Funded
                    </h3>
                    <p className="text-gray-300">
                      Receive contributions from backers who believe in your
                      vision.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-purple-900/50 p-3 rounded-lg h-fit">
                    <Rocket className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      4. Launch Your Project
                    </h3>
                    <p className="text-gray-300">
                      Bring your idea to life and keep your backers updated on
                      your progress.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
}
