"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { motionElements, type MotionElementTag } from "@/components/motion/elements";
import {
  motionDurations,
  motionEase,
  motionEaseGentle,
  motionViewport,
  staggerPresets,
} from "@/components/motion/tokens";

type StaggerTrigger = "mount" | "inView";
type StaggerTone = "default" | "calm" | "strong";
type StaggerDirection = "up" | "down" | "left" | "right" | "scale" | "none";

type StaggerGroupProps = {
  children: ReactNode;
  as?: MotionElementTag;
  ["aria-label"]?: string;
  className?: string;
  delay?: number;
  id?: string;
  role?: string;
  style?: CSSProperties;
  stagger?: number;
  tone?: StaggerTone;
  title?: string;
  trigger?: StaggerTrigger;
  viewport?: typeof motionViewport;
};

type StaggerItemProps = {
  children: ReactNode;
  as?: MotionElementTag;
  ["aria-label"]?: string;
  className?: string;
  direction?: StaggerDirection;
  id?: string;
  role?: string;
  style?: CSSProperties;
  tone?: StaggerTone;
  title?: string;
};

const toneSettings = {
  calm: {
    duration: motionDurations.base,
    ease: motionEaseGentle,
    distance: 14,
    stagger: staggerPresets.compact,
  },
  default: {
    duration: motionDurations.slow,
    ease: motionEase,
    distance: 22,
    stagger: staggerPresets.base,
  },
  strong: {
    duration: motionDurations.hero,
    ease: motionEase,
    distance: 28,
    stagger: staggerPresets.spacious,
  },
} as const;

function buildOffset(direction: StaggerDirection, distance: number) {
  switch (direction) {
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    case "scale":
      return { scale: 0.96 };
    case "up":
      return { y: distance };
    default:
      return {};
  }
}

export function StaggerGroup({
  children,
  as = "div",
  className,
  delay = 0,
  stagger,
  tone = "default",
  trigger = "inView",
  viewport = motionViewport,
  ...rest
}: StaggerGroupProps) {
  const Component = motionElements[as];
  const shouldReduceMotion = useReducedMotion();
  const settings = toneSettings[tone];

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: shouldReduceMotion ? 0.02 : (stagger ?? settings.stagger),
      },
    },
  };

  if (trigger === "mount") {
    return (
      <Component animate="visible" className={className} initial="hidden" variants={variants} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={className}
      initial="hidden"
      variants={variants}
      viewport={viewport}
      whileInView="visible"
      {...rest}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className,
  direction = "up",
  tone = "default",
  ...rest
}: StaggerItemProps) {
  const Component = motionElements[as];
  const shouldReduceMotion = useReducedMotion();
  const settings = toneSettings[tone];
  const offset = buildOffset(direction, settings.distance);

  return (
    <Component
      className={className}
      variants={{
        hidden: shouldReduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              scale: offset.scale ?? 1,
              x: offset.x ?? 0,
              y: offset.y ?? 0,
            },
        visible: {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          transition: {
            duration: shouldReduceMotion ? motionDurations.fast : settings.duration,
            ease: settings.ease,
          },
        },
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
