"use client";

import { useEffect, type ReactNode } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedSectionProps {
  children: (controls: any) => ReactNode;
  className?: string;
}

export default function AnimatedSection({
  children,
  className = "",
}: AnimatedSectionProps) {
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
}
