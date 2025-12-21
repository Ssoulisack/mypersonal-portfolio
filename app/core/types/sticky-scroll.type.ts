import type { ReactNode } from "react";

export interface TechStackItem {
  name: string;
  url?: string;
}

export interface KeyFeature {
  title: string;
  description?: string;
}

export interface Challenge {
  title: string;
  description?: string;
}

export interface WorkItems {
  id: number;
  title: string;
  description: string;
  content?: string;
  url?: string
  keyFeatures?: KeyFeature[];
  techStack?: TechStackItem[];
  challenges?: Challenge[];
  outcome?: string;
}

export interface StickyScrollProps {
  content: WorkItems[];
  contentClassName?: string;
  limit?: number;
}

export interface ScrollBoundary {
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollingDown: boolean;
  scrollingUp: boolean;
}