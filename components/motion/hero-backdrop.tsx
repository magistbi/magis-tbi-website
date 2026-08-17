"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionDurations, motionEase } from "@/components/motion/tokens";

export function HeroBackdrop() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 z-0">
      <motion.div
        animate={{
          opacity: 0.6,
          scale: 1,
        }}
        className="h-full w-full bg-cover bg-center"
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
        className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,26,72,0.92)_0%,rgba(0,45,114,0.82)_42%,rgba(248,249,255,0.08)_100%)]"
        initial={{ opacity: 0 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.08,
          duration: shouldReduceMotion ? motionDurations.fast : motionDurations.slow,
          ease: motionEase,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.18),transparent_28%),radial-gradient(circle_at_left_bottom,rgba(177,197,255,0.18),transparent_32%)]" />
    </div>
  );
}
