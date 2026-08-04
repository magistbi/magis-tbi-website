"use client";

import { motion } from "motion/react";

export const motionElements = {
  article: motion.article,
  div: motion.div,
  footer: motion.footer,
  header: motion.header,
  li: motion.li,
  main: motion.main,
  nav: motion.nav,
  section: motion.section,
  span: motion.span,
  ul: motion.ul,
} as const;

export type MotionElementTag = keyof typeof motionElements;
