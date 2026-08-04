export const motionEase = [0.22, 1, 0.36, 1] as const;
export const motionEaseGentle = [0.25, 0.9, 0.3, 1] as const;

export const motionDurations = {
  fast: 0.22,
  base: 0.46,
  slow: 0.7,
  hero: 0.92,
} as const;

export const motionViewport = {
  once: true,
  amount: 0.22,
} as const;

export const motionViewportTight = {
  once: true,
  amount: 0.3,
} as const;

export const motionViewportRelaxed = {
  once: true,
  amount: 0.16,
} as const;

export const staggerPresets = {
  compact: 0.08,
  base: 0.12,
  spacious: 0.16,
} as const;
