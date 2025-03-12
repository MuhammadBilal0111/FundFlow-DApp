"use client";

import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import FeaturedProjectsSection from "./FeaturedProjectSection";
import SuccessStoriesSection from "./SuccessStoriesSection";
import StatsSection from "./StatsSection";
import CTASection from "./CTASection";

export default function Home() {
  return (
    <section className="overflow-hidden">
      <HeroSection />
      <HowItWorksSection />
      <FeaturedProjectsSection />
      <SuccessStoriesSection />
      <StatsSection />
      <CTASection />
    </section>
  );
}
