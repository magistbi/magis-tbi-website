"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { motionElements, type MotionElementTag } from "@/components/motion/elements";
import { motionDurations, motionEase, motionEaseGentle, motionViewport } from "@/components/motion/tokens";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "none";
type RevealTone = "default" | "calm" | "strong";
type RevealTrigger = "mount" | "inView";

type RevealProps = {
  children: ReactNode;
  as?: MotionElementTag;
  ["aria-label"]?: string;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  id?: string;
  role?: string;
  style?: CSSProperties;
  tone?: RevealTone;
  title?: string;
  trigger?: RevealTrigger;
  viewport?: typeof motionViewport;
};

const revealOffsets: Record<RevealDirection, { x?: number; y?: number; scale?: number }> = {
  down: { y: -26 },
  left: { x: 30 },
  none: {},
  right: { x: -30 },
  scale: { scale: 0.96 },
  up: { y: 26 },
};

const toneSettings = {
  calm: {
    duration: motionDurations.base,
    ease: motionEaseGentle,
    multiplier: 0.55,
  },
  default: {
    duration: motionDurations.slow,
    ease: motionEase,
    multiplier: 1,
  },
  strong: {
    duration: motionDurations.hero,
    ease: motionEase,
    multiplier: 1.2,
  },
} as const;

export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  direction = "up",
  tone = "default",
  trigger = "inView",
  viewport = motionViewport,
  ...rest
}: RevealProps) {
  const Component = motionElements[as];
  const shouldReduceMotion = useReducedMotion();
  const settings = toneSettings[tone];
  const offset = revealOffsets[direction];

  const hiddenState = shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        scale: offset.scale ?? 1,
        x: (offset.x ?? 0) * settings.multiplier,
        y: (offset.y ?? 0) * settings.multiplier,
      };

  const visibleState = {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  };

  const sharedProps = {
    className,
    initial: hiddenState,
    transition: {
      delay,
      duration: shouldReduceMotion ? motionDurations.fast : settings.duration,
      ease: settings.ease,
    },
    ...rest,
  };

  if (trigger === "mount") {
    return (
      <Component animate={visibleState} {...sharedProps}>
        {children}
      </Component>
    );
  }

  return (
    <Component viewport={viewport} whileInView={visibleState} {...sharedProps}>
      {children}
    </Component>
  );
}
