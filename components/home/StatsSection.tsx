"use client";

import { motion } from "framer-motion";
import { BarChart3, Rocket, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function StatsSection() {
  return (
    <AnimatedSection className="py-24 bg-black">
      {(controls: any) => (
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-gray-900 p-8 rounded-xl text-center"
            >
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                $120M+
              </h3>
              <p className="text-gray-300">Total Funds Raised</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="bg-gray-900 p-8 rounded-xl text-center"
            >
              <Rocket className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                15,000+
              </h3>
              <p className="text-gray-300">Successful Projects</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              className="bg-gray-900 p-8 rounded-xl text-center"
            >
              <Users className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                2.5M+
              </h3>
              <p className="text-gray-300">Global Backers</p>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
}
