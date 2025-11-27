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

export interface StickyScrollContentItem {
  title: string;
  description: string;
  content?: ReactNode;
  slug?: string;
  keyFeatures?: KeyFeature[];
  techStack?: TechStackItem[];
  challenges?: Challenge[];
  outcome?: string;
}

export interface StickyScrollProps {
  content: StickyScrollContentItem[];
  contentClassName?: string;
  limit?: number;
}

export interface ScrollBoundary {
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollingDown: boolean;
  scrollingUp: boolean;
}