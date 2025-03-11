"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  BarChart3,
  Heart,
  LightbulbIcon,
  Rocket,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Animation component for sections
const AnimatedSection = ({
  children,
  className = "",
}: {
  children: any;
  className: string;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children(controls)}
    </div>
  );
};
export default function Home() {
  return (
    // Hero Section
    <section className="overflow-hidden">
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
            transparent, and secure fundraising for projects, startups, and
            social causes. Built on Ethereum (or other EVM-compatible chains
            like Polygon), FundFlow allows users to create campaigns, contribute
            funds, and manage payouts using cryptocurrencies like ETH, USDT, or
            platform-native tokens.
          </p>

          <div className="flex items-center gap-4 mt-6 active:*:">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white cursor-pointer">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button className="border-3 border-purple-700 hover:bg-purple-800 text-white cursor-pointer">
              Create Campaign
            </Button>
          </div>
        </div>
        <BackgroundBeams />
      </div>

      <AnimatedSection className="py-24 bg-gradient-to-b from-gray-900 to-black">
        {(controls: any) => (
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center">
              How It Works
            </h2>
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
                  src="/assets/bitcoin.jpg"
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

      {/* Featured Projects */}
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
                <Button className="bg-purple-700 hover:bg-purple-800 text-white">
                  Back This Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatedSection>

      {/* Success Stories */}
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
                  idea. Thanks to this platform, we've now provided clean water
                  to over 100,000 people in developing countries."
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
                <Button className="bg-purple-700 hover:bg-purple-800 text-white">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatedSection>

      {/* Stats Section */}
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

      {/* CTA Section */}
      <AnimatedSection className="py-24 bg-gradient-to-b from-black to-gray-900">
        {(controls: any) => (
          <div className="container mx-auto px-4 text-center">
            <motion.div
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Bring Your Idea to Life?
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Join thousands of creators who have successfully funded their
                projects on our platform.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r bg-purple-700 hover:bg-purple-800 text-white"
              >
                Start Your Project Today
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatedSection>
    </section>
  );
}
