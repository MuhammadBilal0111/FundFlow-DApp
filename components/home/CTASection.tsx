"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";
import AnimatedSection from "./AnimatedSection";

export default function CTASection() {
  const router = useRouter();

  const handleCreateCampaign = () => {
    router.push("/campaigns?tab=create-campaign");
  };

  return (
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
              onClick={handleCreateCampaign}
            >
              Start Your Project Today
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatedSection>
  );
}
