"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { motionElements, type MotionElementTag } from "@/components/motion/elements";
import { motionDurations, motionEase } from "@/components/motion/tokens";

type SurfaceTone = "button" | "card" | "subtle";

type MotionSurfaceProps = {
  children: ReactNode;
  as?: MotionElementTag;
  ["aria-label"]?: string;
  className?: string;
  id?: string;
  role?: string;
  style?: CSSProperties;
  tone?: SurfaceTone;
  title?: string;
};

const surfaceStates = {
  button: {
    hover: { scale: 1.01, y: -1 },
    tap: { scale: 0.99, y: 0 },
  },
  card: {
    hover: { scale: 1.005, y: -4 },
    tap: { scale: 0.996, y: -1 },
  },
  subtle: {
    hover: { scale: 1.002, y: -1 },
    tap: { scale: 0.998, y: 0 },
  },
} as const;

export function MotionSurface({
  children,
  as = "div",
  className,
  tone = "card",
  ...rest
}: MotionSurfaceProps) {
  const Component = motionElements[as];
  const shouldReduceMotion = useReducedMotion();
  const states = surfaceStates[tone];

  return (
    <Component
      className={className}
      transition={{ duration: motionDurations.base, ease: motionEase }}
      whileHover={shouldReduceMotion ? undefined : states.hover}
      whileTap={shouldReduceMotion ? undefined : states.tap}
      {...rest}
    >
      {children}
    </Component>
  );
}
