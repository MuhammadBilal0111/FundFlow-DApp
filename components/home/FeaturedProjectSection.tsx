"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import AnimatedSection from "./AnimatedSection";

export default function FeaturedProjectsSection() {
  const router = useRouter();

  return (
    <AnimatedSection className="py-24 bg-gradient-to-b from-black to-gray-900">
      {(controls: any) => (
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">
            Featured Projects
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
                src="/assets/home.jpg"
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
                EcoSmart Home System
              </h3>
              <p className="text-xl mb-6 text-gray-300">
                A revolutionary smart home system that reduces energy
                consumption by 50% while improving comfort and convenience.
              </p>
              <div className="mb-6">
                <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>$75,000 raised</span>
                  <span>$100,000 goal</span>
                </div>
              </div>
              <Button
                className="bg-purple-700 hover:bg-purple-800 text-white"
                onClick={() => router.push("/campaigns/ecoSmart-Home-system")}
              >
                Back This Project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
}
