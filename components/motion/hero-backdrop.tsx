"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionDurations, motionEase } from "@/components/motion/tokens";

export function HeroBackdrop() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 z-0">
      <motion.div
        animate={{
          opacity: 0.4,
          scale: 1,
        }}
        className="h-full w-full bg-cover bg-center mix-blend-overlay"
        initial={{
          opacity: 0,
          scale: shouldReduceMotion ? 1 : 1.08,
        }}
        style={{
          backgroundImage: "url('/home-of-magis.jpg')",
        }}
        transition={{
          duration: shouldReduceMotion ? motionDurations.fast : motionDurations.hero,
          ease: motionEase,
        }}
      />
      <motion.div
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-transparent"
        initial={{ opacity: 0 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.08,
          duration: shouldReduceMotion ? motionDurations.fast : motionDurations.slow,
          ease: motionEase,
        }}
      />
    </div>
  );
}
